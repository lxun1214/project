package com.rt.logic.arena;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.alibaba.fastjson.JSON;
import com.rt.cache.ConfigCache;
import com.rt.cache.GameCache;
import com.rt.common.ErrorCode;
import com.rt.common.ResponseMsg;
import com.rt.gloable.Response;
import com.rt.gloable.ServerInfo;
import com.rt.logic.arena.config.data.CommonTimesConfig;
import com.rt.logic.player.IPlayer;
import com.rt.logic.player.Player;
import com.rt.pb.PbPlayer.PbFightTargetInfo;
import com.rt.pb.PbPlayer.PbRankingsPlayerInfo;
import com.rt.redis.RedisClient;
import com.rt.utils.RedisKeyUtils;
import com.rt.utils.TimeUtils;

/**
 * 竞技场数据
 *
 */
public class Arena {

	/** 挑战次数（初始5次） */
	int fightNum = 5;

	/** 最后挑战的时间（一年当中的第几天），用于更新挑战次数 */
	int lastFightTime;

	/** 已购买次数 */
	int purchaseCount;

	/**
	 * 检测挑战次数是否可恢复
	 */
	public void checkFightNum() {
		if (lastFightTime != TimeUtils.getToday()) {
			// 小于5次恢复，大于5次不管
			if (fightNum < 5) {
				fightNum = 5;
			}
			purchaseCount = 0;
			lastFightTime = TimeUtils.getToday();
		}
	}

	/**
	 * 进入竞技场
	 * 
	 * @param player
	 * @param response
	 */
	public void intoArena(IPlayer player, Response response) {
		// 判断重生次数是否足够(策划定的3次)
		if (player.getRebirthNum() < ArenaConst.INTO_SPORT_MIN_REBIRTH_NUM) {
			ResponseMsg.sendErrorMsg(ErrorCode.NAME_REPEAT_INSUFFICIENT, response);
			return;
		}
		// 获取当前玩家最新的实时排名
		int rankings = getPlayerRankings(player.getPlayerId());
		if (rankings == -1) {
			// 没获取到，说明还没有排名
			String key = RedisKeyUtils.getArenaSetKey(ServerInfo.getServerId());
			Long total = RedisClient.srard(key);
			if (total == null || total.intValue() < 1000) {
				// 必须保证排行榜里的人大于等于1000人，因为虚拟玩家就最少1000
				ResponseMsg.sendErrorMsg(ErrorCode.COMMON_CODE, response);
				return;
			}
			rankings = total.intValue() + 1;
			addSetRankings(player.getPlayerId(), rankings);
		}
		// 根据自己的实时排名，找出对应规则的三位被挑战者
		List<PbFightTargetInfo> list = getFightTargetInfo(rankings);
		// 这里给客户端返回自己当前排名和根据排名自动刷新的三位被挑战者
		ArenaMsg.sendEnterArenaMsg(list, rankings, response);
	}

	/**
	 * 购买挑战次数
	 * 
	 * @param player
	 * @param response
	 */
	public void purchaseChallengeNum(IPlayer player, Response response) {
		CommonTimesConfig config = null;
		if (this.purchaseCount + 1 >= ConfigCache.MAX_PURCHASE_NUM) {
			config = ConfigCache.commonTimesMap.get(1).get(ConfigCache.MAX_PURCHASE_NUM);
		} else {
			config = ConfigCache.commonTimesMap.get(1).get(this.purchaseCount + 1);
		}
		if (config == null) {
			return;
		}
		// 判断钻石
		if (player.getDiamond() < config.consume) {
			ArenaMsg.sendPurchaseChallengeNumMsg(false, 0, response);
			return;
		}
		player.addDelDiamond(-config.consume);
		this.purchaseCount++;
		this.fightNum++;
		ArenaMsg.sendPurchaseChallengeNumMsg(true, player.getDiamond(), response);
	}

	/**
	 * 发起战斗
	 * 
	 * @param player
	 * @param otherPlayerId
	 * @param response
	 */
	public void launchFight(IPlayer player, long otherPlayerId, Response response) {
		long playerId = player.getPlayerId();
		if (this.fightNum < 1) {
			// 次数不足，返回
			ResponseMsg.sendErrorMsg(ErrorCode.REBIRTHNUM_INSUFFICIENT, response);
			return;
		}
		// 先验证自己是不是被挑战中
		if (GameCache.fightPlayerMap.containsKey(playerId)) {
			// 自己被挑战中，无法战斗
			ResponseMsg.sendErrorMsg(ErrorCode.OWN_IS_FIGHT, response);
			return;
		}
		// 检查对方是否正在战斗中
		if (GameCache.fightPlayerMap.containsKey(otherPlayerId)) {
			// 对方正在战斗中，不能挑战
			ResponseMsg.sendErrorMsg(ErrorCode.OTHER_IS_FIGHT, response);
			return;
		}
		// 先从服务器缓存取，取不到从redis取
		Player otherPlayer = (Player) GameCache.playerMap.get(otherPlayerId);
		if (otherPlayer == null) {
			otherPlayer = getRedisMapValue(String.valueOf(otherPlayerId));
			if (otherPlayer == null) {
				// redis没取到
				ResponseMsg.sendErrorMsg(ErrorCode.OTHER_NO_EXISTENT, response);
				return;
			}
		}
		// 获取对方排名
		int otherRankings = getPlayerRankings(otherPlayerId);
		// 自己排名
		int rankings = getPlayerRankings(playerId);
		// 设置为战斗中
		Fight fight = new Fight();
		fight.initOtherPlayerInfo(playerId, rankings, otherPlayer, otherRankings);
		GameCache.fightPlayerMap.put(playerId, fight);
		GameCache.fightPlayerMap.put(otherPlayerId, fight);
		// 扣除次数
		this.fightNum--;
		// 这里给客户端返回战斗对象的信息
		ArenaMsg.sendLaunchChallengeMsg(fight.getFightTargetDetailInfo(), response);
	}

	/**
	 * 战斗结算
	 * 
	 * @param player
	 * @param otherPlayerId
	 * @param isVictory
	 * @param response
	 */
	public void fightSettlement(IPlayer player, boolean isVictory, Response response) {
		long playerId = player.getPlayerId();
		Fight fight = GameCache.fightPlayerMap.get(playerId);
		if (fight == null) {
			// 自己不再战斗中，返回
			ArenaMsg.sendFightSettlementMsg(false, response);
			return;
		}
		long otherPlayerId = fight.getFightTargetDetailInfo().getOtherPlayerId();
		if (!isVictory) {
			// 失败了,删除战斗状态，然后没逻辑了
			GameCache.fightPlayerMap.remove(playerId);
			GameCache.fightPlayerMap.remove(otherPlayerId);
			// 这里给客户端返回结果
			ArenaMsg.sendFightSettlementMsg(true, response);
			return;
		}
		// 胜利
		// 如果对方排名比自己低，不处理任何逻辑
		int otherRankings = fight.getFightTargetDetailInfo().getOtherRankings();
		if (otherRankings > fight.getRankings()) {
			ArenaMsg.sendFightSettlementMsg(true, response);
			return;
		}
		// 调换双方排名
		// playerId自己的ID，otherRankings对方的排名，换了就行
		addSetRankings(playerId, otherRankings);
		addSetRankings(otherPlayerId, fight.getRankings());
		GameCache.fightPlayerMap.remove(playerId);
		GameCache.fightPlayerMap.remove(otherPlayerId);
		ArenaMsg.sendFightSettlementMsg(true, response);
	}

	/**
	 * 获取竞技排行榜
	 * 
	 * @param player
	 * @param response
	 */
	public void getRankings(IPlayer player, Response response) {
		int rankings = getPlayerRankings(player.getPlayerId());
		List<PbRankingsPlayerInfo> list = new ArrayList<>();
		String setKey = RedisKeyUtils.getArenaSetKey(ServerInfo.getServerId());
		// 获取100条数据
		Set<String> sets = RedisClient.zangeByScore(setKey, 0, 99);
		String[] playerIds = new String[sets.size()];
		String mapKey = RedisKeyUtils.getArenaMapKey(ServerInfo.getServerId());
		List<String> valueList = RedisClient.getMapValues(mapKey, sets.toArray(playerIds));
		for (int i = 0; i < valueList.size(); i++) {
			String value = valueList.get(i);
			if (value != null) {
				Player otherPlayer = JSON.parseObject(value, Player.class);
				PbRankingsPlayerInfo.Builder builder = PbRankingsPlayerInfo.newBuilder();
				builder.setOtherPlayerName(otherPlayer.getPlayerName());
				builder.setOtherFightPower(otherPlayer.getFightPower());
				list.add(builder.build());
			}
		}
		ArenaMsg.sendGetRankingsMsg(list, rankings, response);
	}
	
	
	/**
	 * 获取战力排行榜
	 * @param player
	 * @param response
	 */
	public void getPowerRanings(IPlayer player, Response response){
		int rankings = getPlayerPowerRankings(player.getPlayerId());
		List<PbRankingsPlayerInfo> list = new ArrayList<>();
		String setKey = RedisKeyUtils.getPowerSetKey(ServerInfo.getServerId());
		// 获取100条数据
		Set<String> sets = RedisClient.zrevrangeByScore(setKey, 0, 99);
		String[] playerIds = new String[sets.size()];
		String mapKey = RedisKeyUtils.getArenaMapKey(ServerInfo.getServerId());
		List<String> valueList = RedisClient.getMapValues(mapKey, sets.toArray(playerIds));
		for (int i = 0; i < valueList.size(); i++) {
			String value = valueList.get(i);
			if (value != null) {
				Player otherPlayer = JSON.parseObject(value, Player.class);
				PbRankingsPlayerInfo.Builder builder = PbRankingsPlayerInfo.newBuilder();
				builder.setOtherPlayerName(otherPlayer.getPlayerName());
				builder.setOtherFightPower(otherPlayer.getFightPower());
				list.add(builder.build());
			}
		}
		ArenaMsg.sendGetPowerRankingsMsg(list, rankings, response);
	}

	/**
	 * 获取根据自己排名的三个挑战者
	 * 
	 * @param rankings
	 * @return
	 */
	List<PbFightTargetInfo> getFightTargetInfo(int rankings) {
		// 刷新规则
		// 根据玩家排名计算前后玩家，（算法向上取整）
		// 第一栏： 玩家名次*（1-0.34）
		// 第二栏： 玩家名次*（1-0.02）
		// 第三栏： 玩家名次*（1+0.05）
		// 当玩家为第二名的时候，做特殊处理，只显示第一名 和第三，第四名数据
		// 当玩家为第一名的事，显示 二，三，四 数据

		List<PbFightTargetInfo> list = new ArrayList<>();

		// 更新三个挑战对象
		if (rankings == 1) {
			// 单独处理，找出排名2,3,4的玩家数据
			list.add(showPbFightTargetInfo(1, 2).build());
			list.add(showPbFightTargetInfo(2, 3).build());
			list.add(showPbFightTargetInfo(3, 4).build());
		} else if (rankings == 2) {
			// 单独处理，找出排名1,3,4的玩家数据
			list.add(showPbFightTargetInfo(1, 1).build());
			list.add(showPbFightTargetInfo(2, 3).build());
			list.add(showPbFightTargetInfo(3, 4).build());
		} else {
			list.add(showPbFightTargetInfo(1, ((int) Math.ceil(rankings * (1 - 0.34)))).build());
			list.add(showPbFightTargetInfo(2, ((int) Math.ceil(rankings * (1 - 0.02)))).build());
			list.add(showPbFightTargetInfo(3, ((int) Math.ceil(rankings * (1 + 0.05)))).build());
		}
		return list;
	}

	/**
	 * @param loc
	 *            栏位
	 * @param rankings
	 *            排名
	 */
	PbFightTargetInfo.Builder showPbFightTargetInfo(int loc, int rankings) {
		PbFightTargetInfo.Builder builder = PbFightTargetInfo.newBuilder();
		builder.setLoc(loc);
		String key = RedisKeyUtils.getArenaSetKey(ServerInfo.getServerId());
		// 这里的set只有一条，但是redis只能返回set集合，没有反单个的方法
		Set<String> sets = RedisClient.zrevrangeByScore(key, rankings - 1, rankings - 1);
		if (sets == null || sets.size() <= 0) {
			// 如果根据排名没取到被挑战者，就取前一名（有可能自己是最后一名，或者最后几名，第三栏的规则有取不到情况）
			sets = RedisClient.zrevrangeByScore(key, rankings - 1, rankings - 1);
		}
		Iterator<String> iter = sets.iterator();
		if (iter.hasNext()) {
			String otherPlayerId = iter.next();
			Player player = getRedisMapValue(otherPlayerId);
			if (player != null) {
				builder.setOtherPlayerId(player.getPlayerId());
				builder.setOtherPlayerName(player.getPlayerName());
				builder.setOtherJobId(player.getJobId());
				builder.setOtherHeadId(player.getHeadId());
				builder.setOtherFightPower(player.getFightPower());
				builder.setOtherRankings(rankings);
			}
		}
		return builder;
	}

	Player getRedisMapValue(String playerId) {
		String rankingsMapKey = RedisKeyUtils.getArenaMapKey(ServerInfo.getServerId());
		String value = RedisClient.getMapValue(rankingsMapKey, playerId);
		if (value != null) {
			Player player = JSON.parseObject(value, Player.class);
			return player;
		}
		return null;
	}

	/**
	 * 加入排行榜
	 * 
	 * @param player
	 * @param score
	 */
	public void addSetRankings(long playerId, int score) {
		// 存一份Set有序集合
		String rankingsSetKey = RedisKeyUtils.getArenaSetKey(ServerInfo.getServerId());
		RedisClient.zadd(rankingsSetKey, score, String.valueOf(playerId));
	}
	
	/**
	 * 获取战力排名 redis获取是下标排序 返回+1
	 * @param playerId
	 * @return
	 */
	public int getPlayerPowerRankings(long playerId){
		String key = RedisKeyUtils.getPowerSetKey(ServerInfo.getServerId());
		Long num = RedisClient.zrevrank(key, String.valueOf(playerId));
		if (num == null) {
			return -1;
		}
		// 这里返回加1是因为获取到的是下标，真实排名需要+1
		return num.intValue() + 1;
	}
	
	/**
	 * 获取竞技排名 redis获取是下标排序 返回+1
	 * @param playerId
	 * @param key
	 * @return
	 */
	public int getPlayerRankings(long playerId) {
		String key = RedisKeyUtils.getArenaSetKey(ServerInfo.getServerId());
		Long num = RedisClient.zrevrank(key, String.valueOf(playerId));
		if (num == null) {
			return -1;
		}
		// 这里返回加1是因为获取到的是下标，真实排名需要+1
		return num.intValue() + 1;
	}

	public int showFightNum() {
		checkFightNum();
		return this.fightNum;
	}

	public int getFightNum() {
		return fightNum;
	}

	public void setFightNum(int fightNum) {
		this.fightNum = fightNum;
	}

	public int getLastFightTime() {
		return lastFightTime;
	}

	public void setLastFightTime(int lastFightTime) {
		this.lastFightTime = lastFightTime;
	}

	public int getPurchaseCount() {
		return purchaseCount;
	}

	public void setPurchaseCount(int purchaseCount) {
		this.purchaseCount = purchaseCount;
	}
}
