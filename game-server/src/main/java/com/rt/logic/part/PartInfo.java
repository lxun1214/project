package com.rt.logic.part;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.cache.ConfigCache;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.item.Item;
import com.rt.logic.part.config.data.PartInfoConfig;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.IPlayer;
import com.rt.logic.task.TaskConst;
import com.rt.pb.PbPlayer.PbPartInfo;
import com.rt.utils.KV;
import com.rt.utils.NumberUtils;
import com.rt.utils.TimeUtils;

public class PartInfo {

	/** 挑战次数（按副本类型，初始3次） */
	Map<Integer, Integer> partChallengNumMap = new HashMap<>();

	/** 最后挑战的时间（一年当中的第几天），用于更新挑战次数 */
	int lastFightTime;

	/** 当前已完成挑战的副本ID */
	int currentPartId;

	/**
	 * 请求进入副本
	 * 
	 * @param player
	 * @param partId
	 */
	public void challengePart(IPlayer player, int partId) {
		checkPartChallengNum();
		PartInfoConfig config = ConfigCache.partInfoConfigMap.get(partId);
		if (config == null) {
			return;
		}
		int partChallengNum = partChallengNumMap.get(config.partType);
		if (partChallengNum <= 0) {
			PartInfoMsg.sendChallengePartMsg(player.getPlayerId(), false, partId, 0);
			return;
		}
		// 验证战力
		if (player.getFightPower() < config.entryConditions) {
			PartInfoMsg.sendChallengePartMsg(player.getPlayerId(), false, partId, 0);
			return;
		}
		currentPartId = partId;
		partChallengNum--;
		partChallengNumMap.put(config.partType, partChallengNum);
		PartInfoMsg.sendChallengePartMsg(player.getPlayerId(), true, partId, partChallengNum);
		// 监听主线
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.Z_INTO_PVE, 1, TaskConst.TYPE_CUMULATIVE);
		// 监听成就
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.C_INFO_PART, 1, TaskConst.TYPE_CUMULATIVE);

	}

	/**
	 * 副本结算
	 * 
	 * @param player
	 * @param partId
	 */
	public void partSettlement(IPlayer player, int partId, boolean isVictory) {
		PartInfoConfig config = ConfigCache.partInfoConfigMap.get(partId);
		if (config == null) {
			return;
		}
		// 验证战力
		if (player.getFightPower() < config.entryConditions) {
			return;
		}
		if (isVictory) {
			// 退出結算
			PartInfoConfig rewardConfig = ConfigCache.partInfoConfigMap.get(this.currentPartId);
			this.currentPartId = 0;
			if (rewardConfig != null) {
				addReward(player, rewardConfig);
			}
			PartInfoMsg.sendPartSettlementMsg(player.getPlayerId(), true, partId, player.getExp(), player.getLevel());
			return;
		}
		// 金币
		int addGold = config.gold;
		if (addGold > 0) {
			player.addDelGold(addGold,CoinConst.GET_PART);
		}
		// 经验
		int addExp = config.exp;
		player.addExp(addExp);
		// 返回
		PartInfoMsg.sendPartSettlementMsg(player.getPlayerId(), true, partId, player.getExp(), player.getLevel());
		if (config.nextPartID <= 0) {
			// 说明是最后一关，给结算奖励
			addReward(player, config);
			if (config.partType == 1) {
				// 监听每日
				player.getTask().monitorTask(player.getPlayerId(), TaskConst.D_OTHER_PART_1, 1,
						TaskConst.TYPE_CUMULATIVE);
			} else if (config.partType == 2) {
				// 监听每日
				player.getTask().monitorTask(player.getPlayerId(), TaskConst.D_OTHER_PART_2, 1,
						TaskConst.TYPE_CUMULATIVE);
			} else if (config.partType == 3) {
				// 监听每日
				player.getTask().monitorTask(player.getPlayerId(), TaskConst.D_OTHER_PART_3, 1,
						TaskConst.TYPE_CUMULATIVE);
			}
			this.currentPartId = 0;
			return;
		}
		this.currentPartId = partId;
	}

	private void addReward(IPlayer player, PartInfoConfig config) {
		// 检查双倍奖励
		int doubleRewardNum = 1;
		if (checkDoubleActivity()) {
			doubleRewardNum += 1;
		}
		// 技能玉
		player.addDelUpgradeSkillsJade(config.upgradeSkillsJade * doubleRewardNum,CoinConst.GET_PART);
		// 装备升阶段石头
		player.addDelReinforcedEquipmentStone(config.reinforcedEquipmentStone * doubleRewardNum,CoinConst.GET_PART);
		// 道具
		List<Integer> addItems = config.itemIds;
		List<Item> changeItemList = null;
		if (addItems.size() > 0) {
			List<KV<Integer, Integer>> addItemList = new ArrayList<>();
			Map<Integer, KV<Integer, Integer>> map = new HashMap<>();
			for (int i = 0; i < config.randomNum; i++) {
				int index = NumberUtils.getRandomNum(addItems.size() - 1, 0);
				int itemId = addItems.get(index);
				int num = 1 * doubleRewardNum;
				// 合并重复的道具
				if (map.containsKey(itemId)) {
					KV<Integer, Integer> kv = map.get(itemId);
					int itemNum = kv.getV() + num;
					kv.setV(itemNum);
					continue;
				}
				map.put(itemId, new KV<Integer, Integer>(itemId, num));
			}
			addItemList.addAll(map.values());
			changeItemList = player.getBag().addItem(addItemList,ItemConst.ITEM_GET_PART);
		}
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeItemList);
	}
	
	boolean checkDoubleActivity() {
		//TODO 暂时去掉了双倍掉落的活动 2018-07-04
//		OperationActivityConfig oaConfig = ConfigCache.operationActivityConfigMap
//				.get(ActivityConst.ACTIVITY_DOUBLE_FALLDOWN);
//		if (oaConfig == null) {
//			return false;
//		}
//		if (oaConfig.isOpen == 0) {
//			// 活动没有开启，不处理
//			return false;
//		}
//		// 验证活动是否在有效期
//		if (oaConfig.beginTime.equals("0")) {
//			if (!TimeUtils.checkTimeSection(ServerInfo.openTime, oaConfig.beginTime1, oaConfig.overTime1)) {
//				return false;
//			}
//		} else {
//			if (!TimeUtils.checkTimeCompare(oaConfig.beginTime, oaConfig.overTime)) {
//				return false;
//			}
//		}
		return false;
	}

	public void checkReward(IPlayer player) {
		if (this.currentPartId == 0) {
			return;
		}
		PartInfoConfig rewardConfig = ConfigCache.partInfoConfigMap.get(this.currentPartId);
		this.currentPartId = 0;
		if (rewardConfig != null) {
			addReward(player, rewardConfig);
		}
	}

	/**
	 * 检测挑战次数是否可恢复
	 */
	public void checkPartChallengNum() {
		if (lastFightTime != TimeUtils.getToday()) {
			partChallengNumMap.clear();
			for (Integer partType : ConfigCache.partInfoTypeSets) {
				partChallengNumMap.put(partType, 3);
			}
			lastFightTime = TimeUtils.getToday();
		}
	}

	public List<PbPartInfo> showPartChallengNumInfos() {
		checkPartChallengNum();
		List<PbPartInfo> list = new ArrayList<>();
		for (Integer partType : ConfigCache.partInfoTypeSets) {
			PbPartInfo.Builder builder = PbPartInfo.newBuilder();
			builder.setPartType(partType);
			builder.setPartChallengNum(partChallengNumMap.get(partType));
			list.add(builder.build());
		}
		return list;
	}

	public Map<Integer, Integer> getPartChallengNumMap() {
		return partChallengNumMap;
	}

	public void setPartChallengNumMap(Map<Integer, Integer> partChallengNumMap) {
		this.partChallengNumMap = partChallengNumMap;
	}

	public int getLastFightTime() {
		return lastFightTime;
	}

	public void setLastFightTime(int lastFightTime) {
		this.lastFightTime = lastFightTime;
	}

	public int getCurrentPartId() {
		return currentPartId;
	}

	public void setCurrentPartId(int currentPartId) {
		this.currentPartId = currentPartId;
	}

}
