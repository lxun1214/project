package com.rt.logic.points;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.cache.ConfigCache;
import com.rt.gloable.Response;
import com.rt.logic.item.Item;
import com.rt.logic.player.IPlayer;
import com.rt.logic.player.config.data.SlotAttributeConfig;
import com.rt.logic.points.config.PointInfoConfig;
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
	public void clearance(IPlayer player, Response response) {
		int oldLevel = player.getLevel();
		int oldPower = player.getFightPower();
		// 当前关卡id
		int pointsId = player.getPointsId();
		PointInfoConfig config = ConfigCache.pointConfigMap.get(pointsId);
		// 验证是否可以通关 TODO

		// 金币
		int addGold = config.gold;
		if (addGold > 0) {
			player.addDelGold(addGold);
		}
		// 经验
		int addExp = config.exp;
		player.addExp(addExp);

		// 道具
		List<Integer> addItems = config.itemIds;
		List<Item> changeItemList = null;
		if (addItems.size() > 0) {
			List<KV<Integer, Integer>> addItemList = new ArrayList<>();
			Map<Integer, KV<Integer, Integer>> map = new HashMap<>();
			for (int i = 0; i < config.randomNum; i++) {
				int index = NumberUtils.getRandomNum(addItems.size() - 1, 0);
				int itemId = addItems.get(index);
				KV<Integer, Integer> kv = new KV<Integer, Integer>(itemId, 1);
				// 合并重复的道具
				if (map.containsKey(itemId)) {
					KV<Integer, Integer> kv_ = map.get(itemId);
					int itemNum = kv.getV() + 1;
					kv.setV(itemNum);
					map.put(itemId, kv_);
					continue;
				}
				map.put(itemId, kv);
			}
			addItemList.addAll(map.values());
			changeItemList = player.getBag().addItem(addItemList);
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
		}
		PointMsg.sendClearanceMsg(response, player, true, oldLevel, oldPower, addGold, changeItemList, equipCoordinateList, gemGrooveList);
	}
}
