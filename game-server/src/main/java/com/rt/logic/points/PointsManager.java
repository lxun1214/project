package com.rt.logic.points;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.cache.ConfigCache;
import com.rt.logic.activity.ActivityConst;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.item.Item;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.IPlayer;
import com.rt.logic.player.config.data.SlotAttributeConfig;
import com.rt.logic.points.config.PointInfoConfig;
import com.rt.logic.task.TaskConst;
import com.rt.utils.KV;
import com.rt.utils.NumberUtils;

/**
 * 关卡
 */
public class PointsManager {
	private static PointsManager instance;

	public synchronized static PointsManager getInstance() {
		if (instance == null) {
			instance = new PointsManager();
		}
		return instance;
	}

	/**
	 * 过关
	 * 
	 * @param player
	 */
	public void clearance(IPlayer player) {
		// 当前关卡id
		int pointsId = player.getPointsId();
		PointInfoConfig config = ConfigCache.pointConfigMap.get(pointsId);
		// 验证是否可以通关 TODO
		if(config.maptype!=0&&config.maptype!=1){
			return;
		}
		// 金币
		int addGold = config.gold;
		if (addGold > 0) {
			player.addDelGold(addGold, CoinConst.GET_SCREEN);
		}
		// 经验
		int addExp = config.exp;
		player.addExp(addExp);

		// 检查双倍奖励
		int doubleRewardNum = 1;
		if (checkDoubleActivity()) {
			doubleRewardNum += 1;
		}

		// 神器石头
		player.addDelStrengthenArtifactStone(config.strengthenArtifactStone * doubleRewardNum, CoinConst.GET_SCREEN);

		// 道具
		List<Integer> addItems = config.itemIds;
		List<Item> changeItemList = null;
		List<KV<Integer, Integer>> addItemList = new ArrayList<>();
		if (addItems.size() > 0) {
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
			changeItemList = player.getBag().addItem(addItemList, ItemConst.ITEM_GET_SCREEN);
		}
		PointInfoConfig nextConfig = ConfigCache.pointConfigMap.get(pointsId + 1);
		List<Integer> equipCoordinateList = new ArrayList<>();
		List<List<Integer>> gemGrooveList = new ArrayList<>();
		if (nextConfig != null) {
			int nextId = nextConfig.pointId;
			int curPointsId = player.getPointsId();
			// 开启技能槽
			if (curPointsId > player.getMaxPointsId()) {
				SlotAttributeConfig slotConfig = ConfigCache.slotAttributeConfigMap.get(curPointsId);
				if (slotConfig != null) {
					// 解锁技能的装备栏部位集合
					equipCoordinateList = slotConfig.equipCoordinateList;
					// 解锁的宝石槽部位集合，与装备栏部位对应
					gemGrooveList = slotConfig.grooveList;
					for (int i = 0; i < equipCoordinateList.size(); i++) {
						int columnLoc = equipCoordinateList.get(i);
						List<Integer> grooveList = gemGrooveList.get(i);
						for (int j = 0; j < grooveList.size(); j++) {
							player.getEquipmentColumn().getColumns()[columnLoc].getGrooves()[grooveList.get(j)]
									.setOpen(true);
						}
					}
				}

				player.setMaxPointsId(nextId);
			}
			player.setPointsId(nextId);
			if(player.getHistoryMaxPointsId() < player.getPointsId()){
				player.setHistoryMaxPointsId(player.getPointsId());
			}
		}
		PointMsg.sendClearanceMsg(player, true, equipCoordinateList, gemGrooveList,addItemList);
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeItemList);
		// 监听主线任务
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.Z_SCREEN, pointsId, TaskConst.TYPE_REPLACE);
		// 监听每日任务
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.D_SCREEN, 1, TaskConst.TYPE_CUMULATIVE);
		// 监听成就
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.C_SCREEN, pointsId, TaskConst.TYPE_REPLACE);
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.C_KILL_BOSS, 1, TaskConst.TYPE_CUMULATIVE);
		// 监听活动
		player.getActivityInfo().monitorActivity(player.getPlayerId(), ActivityConst.ACTIVITY_LAYER, pointsId);
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

}
