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
import com.rt.logic.arena.config.data.CommonTimesConfig;
import com.rt.logic.arena.config.data.RankingAwardConfig;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.IPlayer;
import com.rt.logic.player.Player;
import com.rt.logic.task.TaskConst;
import com.rt.pb.PbPlayer.PbFightTargetInfo;
import com.rt.pb.PbPlayer.PbRankingsPlayerInfo;
import com.rt.redis.RedisClient;
import com.rt.utils.NumberUtils;
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

	/** 已购买挑战次数 */
	int purchaseCount;

	/** 已购买刷新次数 */
	int refreshPurchaseCount;

	List<PbFightTargetInfo> targetList = new ArrayList<>();

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
			refreshPurchaseCount = 0;
			targetList = new ArrayList<>();
			lastFightTime = TimeUtils.getToday();
		}
	}

	/**
	 * 进入竞技场
	 * 
	 * @param player
	 * @param response
	 */
	public void intoArena(IPlayer player) {
		long playerId = player.getPlayerId();
		// 判断重生次数是否足够(策划定的3次)
//		if (player.getRebirthNum() < ArenaConst.INTO_SPORT_MIN_REBIRTH_NUM) {
//			ResponseMsg.sendErrorMsg(playerId, ErrorCode.NAME_REPEAT_INSUFFICIENT);
//			return;
//		}
		// 获取当前玩家最新的实时排名
		int rankings = getPlayerRankings(playerId);
		if (rankings == -1) {
			// 没获取到，说明还没有排名
			String key = RedisKeyUtils.getArenaSetKey();
			Long total = RedisClient.srard(key);
			if (total == null || total.intValue() < 1000) {
				// // 必须保证排行榜里的人大于等于1000人，因为虚拟玩家就最少1000
				ResponseMsg.sendErrorMsg(playerId, ErrorCode.COMMON_CODE);
				return;
			}
			rankings = total.intValue() + 1;
			addSetRankings(playerId, rankings);
		}
		if (targetList.size() <= 0) {
			getFightTargetInfo(rankings);
		}
		// 这里给客户端返回自己当前排名和根据排名自动刷新的三位被挑战者
		ArenaMsg.sendEnterArenaMsg(playerId, targetList, rankings);
	}

	/**
	 * 刷新挑战者
	 * 
	 * @param player
	 */
	public void refreshArena(IPlayer player) {
		CommonTimesConfig config = null;
		if (this.refreshPurchaseCount + 1 >= ConfigCache.MAX_REFRESH_PURCHASE_NUM) {
			config = ConfigCache.commonTimesMap.get(ArenaConst.REFRESH_TARGET)
					.get(ConfigCache.MAX_REFRESH_PURCHASE_NUM);
		} else {
			config = ConfigCache.commonTimesMap.get(ArenaConst.REFRESH_TARGET).get(this.purchaseCount + 1);
		}
		// 判断钻石
		if (player.getDiamond() < config.consume) {
			return;
		}
		player.addDelDiamond(-config.consume,CoinConst.CONSUME_ARENA);
		this.refreshPurchaseCount++;
		int rankings = getPlayerRankings(player.getPlayerId());
		// 刷新
		getFightTargetInfo(rankings);
		ArenaMsg.sendRefreshArenaMsg(player.getPlayerId(), this.targetList);

	}

	/**
	 * 购买挑战次数
	 * 
	 * @param player
	 * @param response
	 */
	public void purchaseChallengeNum(IPlayer player) {
		CommonTimesConfig config = null;
		if (this.purchaseCount + 1 >= ConfigCache.MAX_PURCHASE_NUM) {
			config = ConfigCache.commonTimesMap.get(ArenaConst.PURCHASE_CHALLENGE_NUM)
					.get(ConfigCache.MAX_PURCHASE_NUM);
		} else {
			config = ConfigCache.commonTimesMap.get(ArenaConst.PURCHASE_CHALLENGE_NUM).get(this.purchaseCount + 1);
		}
		if (config == null) {
			return;
		}
		// 判断钻石
		if (player.getDiamond() < config.consume) {
			ArenaMsg.sendPurchaseChallengeNumMsg(player.getPlayerId(), false);
			return;
		}
		player.addDelDiamond(-config.consume,CoinConst.CONSUME_ARENA);
		this.purchaseCount++;
		this.fightNum++;
		ArenaMsg.sendPurchaseChallengeNumMsg(player.getPlayerId(), true);
	}

	/**
	 * 发起战斗
	 * 
	 * @param player
	 * @param otherPlayerId
	 * @param response
	 */
	public void launchFight(IPlayer player, long otherPlayerId) {
		long playerId = player.getPlayerId();
		if (this.fightNum < 1) {
			// 次数不足，返回
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.REBIRTHNUM_INSUFFICIENT);
			return;
		}
		// 先验证自己是不是被挑战中
		if (GameCache.fightPlayerMap.containsKey(playerId)) {
			// 自己被挑战中，无法战斗
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.OWN_IS_FIGHT);
			return;
		}
		// 检查对方是否正在战斗中
		if (GameCache.fightPlayerMap.containsKey(otherPlayerId)) {
			// 对方正在战斗中，不能挑战
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.OTHER_IS_FIGHT);
			return;
		}
		// 先从服务器缓存取，取不到从redis取
		Player otherPlayer = (Player) GameCache.playerMap.get(otherPlayerId);
		if (otherPlayer == null) {
			otherPlayer = getRedisMapValue(String.valueOf(otherPlayerId));
			if (otherPlayer == null) {
				// redis没取到
				ResponseMsg.sendErrorMsg(playerId, ErrorCode.OTHER_NO_EXISTENT);
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
		ArenaMsg.sendLaunchChallengeMsg(playerId, fight.getFightTargetDetailInfo());
		// 监听主线任务发起挑战
		player.getTask().monitorTask(playerId, TaskConst.Z_INTO_PVP, 1, TaskConst.TYPE_CUMULATIVE);
		// 监听主线任务发起挑战
		player.getTask().monitorTask(playerId, TaskConst.D_INTO_PVP, 1, TaskConst.TYPE_CUMULATIVE);
		// 监听成就
		player.getTask().monitorTask(playerId, TaskConst.C_INTO_PVP, 1, TaskConst.TYPE_CUMULATIVE);
	}

	/**
	 * 战斗结算
	 * 
	 * @param player
	 * @param otherPlayerId
	 * @param isVictory
	 * @param response
	 */
	public void fightSettlement(IPlayer player, boolean isVictory) {
		long playerId = player.getPlayerId();
		Fight fight = GameCache.fightPlayerMap.get(playerId);
		if (fight == null) {
			// 自己不再战斗中，返回
			ArenaMsg.sendFightSettlementMsg(playerId, false);
			return;
		}
		long otherPlayerId = fight.getFightTargetDetailInfo().getOtherPlayerId();
		if (!isVictory) {
			// 失败了,删除战斗状态，然后没逻辑了
			GameCache.fightPlayerMap.remove(playerId);
			GameCache.fightPlayerMap.remove(otherPlayerId);
			// 这里给客户端返回结果
			ArenaMsg.sendFightSettlementMsg(playerId, true);
			return;
		}
		// 胜利
		// 如果对方排名比自己低，不处理任何逻辑
		int otherRankings = fight.getFightTargetDetailInfo().getOtherRankings();
		if (otherRankings > fight.getRankings()) {
			GameCache.fightPlayerMap.remove(playerId);
			GameCache.fightPlayerMap.remove(otherPlayerId);
			ArenaMsg.sendFightSettlementMsg(playerId, true);
			return;
		}
		// 调换双方排名
		// playerId自己的ID，otherRankings对方的排名，换了就行
		addSetRankings(playerId, otherRankings);
		addSetRankings(otherPlayerId, fight.getRankings());
		GameCache.fightPlayerMap.remove(playerId);
		GameCache.fightPlayerMap.remove(otherPlayerId);
		ArenaMsg.sendFightSettlementMsg(playerId, true);
		// 胜利，排名变后刷新三位挑战者（otherRankings为自己排名改变后的值）
		getFightTargetInfo(otherRankings);
		// 监听成就
		player.getTask().monitorTask(playerId, TaskConst.C_PVP_RANKING, otherRankings, TaskConst.TYPE_REPLACE);
	}

	/**
	 * 获取等级排行榜
	 * 
	 * @param player
	 * @param response
	 */
	public void getRankingsToLvl(IPlayer player) {
		int rankings = getPlayerLvlRankings(player.getPlayerId());
		List<PbRankingsPlayerInfo> list = new ArrayList<>();
		String setKey = RedisKeyUtils.getRebirthSetKey();
		// 获取100条数据
		Set<String> sets = RedisClient.zrevrangeByScore(setKey, 0, 49);
		String[] playerIds = new String[sets.size()];
		String mapKey = RedisKeyUtils.getArenaMapKey();
		List<String> valueList = RedisClient.getMapValues(mapKey, sets.toArray(playerIds));
		for (int i = 0; i < valueList.size(); i++) {
			String value = valueList.get(i);
			if (value != null) {
				Player otherPlayer = JSON.parseObject(value, Player.class);
				PbRankingsPlayerInfo.Builder builder = PbRankingsPlayerInfo.newBuilder();
				builder.setOtherPlayerName(otherPlayer.getPlayerName());
				builder.setOtherFightPower(otherPlayer.getRebirthNum());
				builder.setOtherPlayerLevel(otherPlayer.getLevel());
				list.add(builder.build());
			}
		}
		ArenaMsg.sendGetLVLRankingsMsg(player.getPlayerId(), list, rankings);
	}
	
	/**
	 * 获取金币排行榜
	 * 
	 * @param player
	 * @param response
	 */
	public void getRankingsToMoney(IPlayer player) {
		int rankings = getPlayerMoneyRankings(player.getPlayerId());
		List<PbRankingsPlayerInfo> list = new ArrayList<>();
		String setKey = RedisKeyUtils.getRechargeSetKey();
		// 获取100条数据
		Set<String> sets = RedisClient.zrevrangeByScore(setKey, 0, 49);
		String[] playerIds = new String[sets.size()];
		String mapKey = RedisKeyUtils.getArenaMapKey();
		List<String> valueList = RedisClient.getMapValues(mapKey, sets.toArray(playerIds));
		for (int i = 0; i < valueList.size(); i++) {
			String value = valueList.get(i);
			if (value != null) {
				Player otherPlayer = JSON.parseObject(value, Player.class);
				PbRankingsPlayerInfo.Builder builder = PbRankingsPlayerInfo.newBuilder();
				builder.setOtherPlayerName(otherPlayer.getPlayerName());
				builder.setOtherFightPower(otherPlayer.getFightPower());
				builder.setOtherPlayerLevel(otherPlayer.getVipLevel());
				list.add(builder.build());
			}
		}
		ArenaMsg.sendGetMoneyRankingsMsg(player.getPlayerId(), list, rankings);
	}
	
	/**
	 * 获取竞技排行榜
	 * 
	 * @param player
	 * @param response
	 */
	public void getRankings(IPlayer player) {
		int rankings = getPlayerRankings(player.getPlayerId());
		List<PbRankingsPlayerInfo> list = new ArrayList<>();
		String setKey = RedisKeyUtils.getArenaSetKey();
		// 获取100条数据
		Set<String> sets = RedisClient.zangeByScore(setKey, 0, 49);
		String[] playerIds = new String[sets.size()];
		String mapKey = RedisKeyUtils.getArenaMapKey();
		List<String> valueList = RedisClient.getMapValues(mapKey, sets.toArray(playerIds));
		for (int i = 0; i < valueList.size(); i++) {
			String value = valueList.get(i);
			if (value != null) {
				Player otherPlayer = JSON.parseObject(value, Player.class);
				PbRankingsPlayerInfo.Builder builder = PbRankingsPlayerInfo.newBuilder();
				builder.setOtherPlayerName(otherPlayer.getPlayerName());
				builder.setOtherFightPower(otherPlayer.getFightPower());
				builder.setOtherPlayerLevel(otherPlayer.getLevel());
				list.add(builder.build());
			}
		}
		ArenaMsg.sendGetRankingsMsg(player.getPlayerId(), list, rankings);
	}

	/**
	 * 获取战力排行榜
	 * 
	 * @param player
	 * @param response
	 */
	public void getPowerRanings(IPlayer player) {
		int rankings = getPlayerPowerRankings(player.getPlayerId());
		List<PbRankingsPlayerInfo> list = new ArrayList<>();
		String setKey = RedisKeyUtils.getPowerSetKey();
		
		// 获取100条数据
		Set<String> sets = RedisClient.zrevrangeByScore(setKey, 0, 49);
		String[] playerIds = new String[sets.size()];
		String mapKey = RedisKeyUtils.getArenaMapKey();
		List<String> valueList = RedisClient.getMapValues(mapKey, sets.toArray(playerIds));
		for (int i = 0; i < valueList.size(); i++) {
			String value = valueList.get(i);
			if (value != null) {
				Player otherPlayer = JSON.parseObject(value, Player.class);
				PbRankingsPlayerInfo.Builder builder = PbRankingsPlayerInfo.newBuilder();
				builder.setOtherPlayerName(otherPlayer.getPlayerName());
				builder.setOtherFightPower(otherPlayer.getFightPower());
				builder.setOtherPlayerLevel(otherPlayer.getLevel());
				list.add(builder.build());
			}
		}
		ArenaMsg.sendGetPowerRankingsMsg(player.getPlayerId(), list, rankings);
		// 监听成就
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.C_FIGHT_POWER_RANKING, rankings,
				TaskConst.TYPE_REPLACE);
	}

	/**
	 * 领取竞技场排行奖励
	 * 
	 * @param player
	 */
	public void receiveArenaReward(IPlayer player) {
		String mapKey = RedisKeyUtils.RANKING_SPORT_REWARD_KEY;
		if (!RedisClient.hexists(mapKey, String.valueOf(player.getPlayerId()))) {
			ResponseMsg.sendErrorMsg(player.getPlayerId(), ErrorCode.ARENA_REWARD_NO_EXISTENT);
			return;
		}
		// 取出自己名次
		String rankings = RedisClient.getMapValue(mapKey, String.valueOf(player.getPlayerId()));
		int number = Integer.parseInt(rankings);
		RankingAwardConfig config = null;
		// 按排行奖励
		for (int i = 0; i < ConfigCache.rankAwardConfigList.size(); i++) {
			config = ConfigCache.rankAwardConfigList.get(i);
			if (number >= config.starNum && number <= config.endNum) {
				break;
			}
		}
		if (config == null) {
			ResponseMsg.sendErrorMsg(player.getPlayerId(), ErrorCode.COMMON_CODE);
			return;
		}
		// 删除redis
		RedisClient.delMapKey(mapKey, String.valueOf(player.getPlayerId()));
		// 加钻石
		player.addDelDiamond(config.diamond,CoinConst.GET_RANKING);
		// 加竞技币
		player.addDelSportsMoney(config.battleCurrency,CoinConst.GET_RANKING);
//		ArenaMsg.sendReceiveArenaRewardMsg(player.getPlayerId(), 0);
	}

	/**
	 * 获取根据自己排名的三个挑战者
	 * 
	 * @param rankings
	 *            自己排名
	 * @return
	 */
	void getFightTargetInfo(int rankings) {
		this.targetList = new ArrayList<>();
		// 刷新规则
		// 根据玩家排名计算前后玩家，（算法向上取整 正负-2区间随机）
		// 第一栏： 玩家名次*（1-0.34）
		// 第二栏： 玩家名次*（1-0.02）
		// 第三栏： 玩家名次*（1+0.05）
		// 当玩家为第二名的时候，做特殊处理，只显示第一名 和第三，第四名数据
		// 当玩家为第一名的事，显示 二，三，四 数据

		// TODO 这里等策划配1000个机器人
		// 更新三个挑战对象
		if (rankings == 1) {
			// 单独处理，找出排名2,3,4的玩家数据
			this.targetList.add(showPbFightTargetInfo(1, 2, rankings).build());
			this.targetList.add(showPbFightTargetInfo(2, 3, rankings).build());
			this.targetList.add(showPbFightTargetInfo(3, 4, rankings).build());
		} else if (rankings == 2) {
			// 单独处理，找出排名1,3,4的玩家数据
			this.targetList.add(showPbFightTargetInfo(1, 1, rankings).build());
			this.targetList.add(showPbFightTargetInfo(2, 3, rankings).build());
			this.targetList.add(showPbFightTargetInfo(3, 4, rankings).build());
		} else {
			int one,two,three;
			if(rankings > 70){
				one = (int) Math.ceil(rankings * (1 - 0.34));
				one = NumberUtils.getRandomNum(one + 2, one - 2);

				two = (int) Math.ceil(rankings * (1 - 0.02));
				two = NumberUtils.getRandomNum(two + 2, two - 2);

				three = (int) Math.ceil(rankings * (1 + 0.05));
				three = NumberUtils.getRandomNum(three + 2, three - 2);
			}else{
				one = rankings - 2;
				two = rankings - 1;
				three = rankings + 1;
			}
			this.targetList.add(showPbFightTargetInfo(1, one, rankings).build());
			this.targetList.add(showPbFightTargetInfo(2, two, rankings).build());
			this.targetList.add(showPbFightTargetInfo(3, three, rankings).build());
		}
	}

	/**
	 * @param loc
	 *            栏位
	 * @param otherRankings
	 *            目标排名
	 * @param rankings
	 *            自己排名
	 */
	PbFightTargetInfo.Builder showPbFightTargetInfo(int loc, int otherRankings, int rankings) {
		PbFightTargetInfo.Builder builder = PbFightTargetInfo.newBuilder();
		builder.setLoc(loc);
		String key = RedisKeyUtils.getArenaSetKey();
		// 这里的set只有一条，但是redis只能返回set集合，没有反单个的方法
		Set<String> sets = RedisClient.zangeByScore(key, otherRankings - 1, otherRankings - 1);
		if (sets == null || sets.size() <= 0) {
			// 如果根据排名没取到被挑战者，就取前一名（有可能自己是最后一名，或者最后几名，第三栏的规则有取不到情况）
			sets = RedisClient.zangeByScore(key, rankings - 1, rankings - 1);
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
				builder.setLevel(player.getLevel());
				builder.setOtherFightPower(player.getFightPower());
				builder.setOtherRankings(otherRankings);
				builder.setSex(player.getSex());
			}
		}
		return builder;
	}

	Player getRedisMapValue(String playerId) {
		String rankingsMapKey = RedisKeyUtils.getArenaMapKey();
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
		String rankingsSetKey = RedisKeyUtils.getArenaSetKey();
		RedisClient.zadd(rankingsSetKey, score, String.valueOf(playerId));
	}

	/**
	 * 获取战力排名 redis获取是下标排序 返回+1
	 * 
	 * @param playerId
	 * @return
	 */
	public int getPlayerPowerRankings(long playerId) {
		String key = RedisKeyUtils.getPowerSetKey();
		Long num = RedisClient.zrevrank(key, String.valueOf(playerId));
		if (num == null) {
			return -1;
		}
		// 这里返回加1是因为获取到的是下标，真实排名需要+1
		return num.intValue() + 1;
	}

	/**
	 * 获取等级排名 redis获取是下标排序 返回+1
	 * 
	 * @param playerId
	 * @return
	 */
	public int getPlayerLvlRankings(long playerId) {
		String key = RedisKeyUtils.getRebirthSetKey();
		Long num = RedisClient.zrevrank(key, String.valueOf(playerId));
		if (num == null) {
			return -1;
		}
		// 这里返回加1是因为获取到的是下标，真实排名需要+1
		return num.intValue() + 1;
	}
	
	/**
	 * 获取充值排名 redis获取是下标排序 返回+1
	 * 
	 * @param playerId
	 * @return
	 */
	public int getPlayerMoneyRankings(long playerId) {
		String key = RedisKeyUtils.getRechargeSetKey();
		Long num = RedisClient.zrevrank(key, String.valueOf(playerId));
		if (num == null) {
			return -1;
		}
		// 这里返回加1是因为获取到的是下标，真实排名需要+1
		return num.intValue() + 1;
	}
	/**
	 * 获取竞技排名 redis获取是下标排序 返回+1
	 * 
	 * @param playerId
	 * @param key
	 * @return
	 */
	public int getPlayerRankings(long playerId) {
		String key = RedisKeyUtils.getArenaSetKey();
		Long num = RedisClient.zrank(key, String.valueOf(playerId));
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

	public int getRefreshPurchaseCount() {
		return refreshPurchaseCount;
	}

	public void setRefreshPurchaseCount(int refreshPurchaseCount) {
		this.refreshPurchaseCount = refreshPurchaseCount;
	}
}
