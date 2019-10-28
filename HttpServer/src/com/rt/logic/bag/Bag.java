package com.rt.logic.bag;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import com.rt.cache.ConfigCache;
import com.rt.common.GameConst;
import com.rt.gloable.Response;
import com.rt.logic.item.Equipment;
import com.rt.logic.item.Item;
import com.rt.logic.item.ItemFactory;
import com.rt.logic.item.data.EquipConfig;
import com.rt.logic.item.data.GemAttrConfig;
import com.rt.logic.item.data.ItemConfig;
import com.rt.logic.player.IPlayer;
import com.rt.utils.KV;

public class Bag {

	/** 所有物品集合，key:唯一id */
	Map<Long, Item> itemUuidMap = new HashMap<>();

	/** Map<道具id, Map<相同道具的唯一id,Item>> */
	Map<Integer, Map<Long, Item>> itemMap = new HashMap<>();

	Lock lock = new ReentrantLock();

	public void initItemMap() {
		for (Map.Entry<Long, Item> entry : itemUuidMap.entrySet()) {
			Item item = entry.getValue();
			int itemId = item.getItemId();
			if (itemMap.containsKey(itemId)) {
				itemMap.get(itemId).put(item.getUuid(), item);
				continue;
			}
			Map<Long, Item> map = new HashMap<>();
			map.put(item.getUuid(), item);
			itemMap.put(itemId, map);
		}
	}

	/**
	 * 获取背包数据信息
	 * 
	 * @param response
	 */
	public void getBag(Response response) {
		BagMsg.sendBagMsg(response, itemUuidMap);
	}

	/**
	 * 重置装备等级为1级
	 */
	public void initEquipLevel() {
		for (Map.Entry<Long, Item> entry : itemUuidMap.entrySet()) {
			Item item = entry.getValue();
			Equipment equip = item.getEquipment();
			if (equip == null) {
				continue;
			}
			equip.setLevel(1);
		}
	}

	/**
	 * 添加新道具（重新占一个格子）
	 * 
	 * @param item
	 */
	public void addItem(Item item) {
		int itemId = item.getItemId();
		itemUuidMap.put(item.getUuid(), item);
		if (itemMap.containsKey(itemId)) {
			itemMap.get(itemId).put(item.getUuid(), item);
			return;
		}
		Map<Long, Item> map = new HashMap<>();
		map.put(item.getUuid(), item);
		itemMap.put(itemId, map);
	}

	public List<Item> addItem(int itemId, int num) {
		List<KV<Integer, Integer>> list = new ArrayList<>();
		KV<Integer, Integer> kv = new KV<Integer, Integer>(itemId, num);
		list.add(kv);
		return addItem(list);
	}

	/**
	 * 获得道具
	 * 
	 * @param addList
	 *            K:道具id，V：道具数量 return: 发生变化的道具列表
	 */
	public List<Item> addItem(List<KV<Integer, Integer>> addList) {
		try {
			lock.lock();
			List<Item> changeList = new ArrayList<>();
			for (int i = 0; i < addList.size(); i++) {
				KV<Integer, Integer> kv = addList.get(i);
				int itemId = kv.getK();
				int addNum = kv.getV();
				// 获取配置
				ItemConfig itemConfig = ConfigCache.itemConfigMap.get(itemId);
				if (itemConfig == null) {
					return null;
				}
				// 最大叠加数
				int stackNums = itemConfig.stackNums;
				int size = GameConst.MAX_BAG_SIZE - itemUuidMap.size();
				// 不可叠加的
				if (stackNums == 1) {
					// 容量是否已达最大上限
					if (size <= 0) {
						continue;
					}
					if (size < addNum) {
						addNum = size;
					}
					for (int j = 0; j < addNum; j++) {
						Item item = ItemFactory.createItem(itemId, 1);
						if (item != null) {
							addItem(item);
							changeList.add(item);
						}
					}
					continue;
				}
				// 可叠加的
				if (itemMap.containsKey(itemId)) {
					Map<Long, Item> map = itemMap.get(itemId);
					int stackNum = itemConfig.stackNums;
					for (Map.Entry<Long, Item> entry : map.entrySet()) {
						Item item = entry.getValue();
						int itemNum = item.getItemNum();
						if (itemNum >= stackNum) {
							continue;
						}
						int diffNum = stackNum - itemNum;
						if (diffNum >= addNum) {
							itemNum += addNum;
							item.setItemNum(itemNum);
							changeList.add(item);
							break;
						}
						item.setItemNum(itemConfig.stackNums);
						addNum -= diffNum;
					}
					while (addNum > 0) {
						// 容量是否已达最大上限
						if (itemUuidMap.size() <= GameConst.MAX_BAG_SIZE) {
							break;
						}
						if (stackNum >= addNum) {
							Item item = ItemFactory.createItem(itemId, addNum);
							if (item != null) {
								addItem(item);
								changeList.add(item);
							}
							break;
						}
						Item item = ItemFactory.createItem(itemId, stackNum);
						if (item != null) {
							addNum -= stackNum;
							addItem(item);
							changeList.add(item);
						}
					}
				}
			}
			return changeList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			lock.unlock();
		}
	}

	/**
	 * 彻底移除道具
	 * 
	 * @param item
	 */
	private void removeItem(Item item) {
		itemUuidMap.remove(item.getUuid());
		itemMap.get(item.getItemId()).remove(item.getUuid());
	}

	/**
	 * 通过唯一id扣除道具
	 * 
	 * @param uuid
	 * @param itemNum
	 * @return
	 */
	public Item delItem(long uuid, int delNum) {
		try {
			lock.lock();
			Item item = itemUuidMap.get(uuid);
			if (item == null) {
				return null;
			}
			int itemNum = item.getItemNum();
			if (itemNum < delNum) {
				return null;
			}
			itemNum -= delNum;
			item.setItemNum(itemNum);
			if (itemNum <= 0) {
				removeItem(item);
			}
			return item;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			lock.unlock();
		}
	}

	/**
	 * 通过道具id扣除道具
	 * 
	 * @param itemId
	 * @param delNum
	 * @return
	 */
	public List<Item> delItem(int itemId, int delNum) {
		try {
			Map<Long, Item> map = itemMap.get(itemId);
			boolean isEnough = false;
			int num = 0;
			//验证背包道具是否足够
			for(Map.Entry<Long, Item> entry : map.entrySet()) {
				Item bagItem = entry.getValue();
				num += bagItem.getItemNum();
				if(num >= delNum) {
					isEnough = true;
					break;
				}
			}
			if(!isEnough) {
				return null;
			}
			//扣道具
			List<Item> changeList = new ArrayList<>();
			List<Item> removeList = new ArrayList<>();
			for(Map.Entry<Long, Item> entry : map.entrySet()) {
				Item bagItem = entry.getValue();
				int itemNum = bagItem.getItemNum();
				if(itemNum >= delNum) {
					itemNum -= delNum;
					bagItem.setItemNum(itemNum);
					changeList.add(bagItem);
					if(itemNum <= 0) {
						removeList.add(bagItem);
					}
					break;
				}
				bagItem.setItemNum(0);
				changeList.add(bagItem);
				removeList.add(bagItem);
				delNum -= itemNum;
				if(delNum <= 0) {
					break;
				}
			}
			for(int i = 0;i < removeList.size();i++) {
				removeItem(removeList.get(i));
			}
			return changeList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}finally {
			lock.unlock();
		}
	}

	/**
	 * 装备熔炼分解
	 * 
	 * @param player
	 * @param uuids
	 * @param response
	 */
	public void decomposeEquipment(IPlayer player, List<Long> uuids, Response response) {
		if (uuids.size() < 1) {
			return;
		}
		int fenjieEquipmentStone = 0;
		List<Item> changeList = new ArrayList<>();
		for (int i = 0; i < uuids.size(); i++) {
			long uuid = uuids.get(i);
			Item item = itemUuidMap.get(uuid);
			if (item == null) {
				// 没找到道具
				continue;
			}
			EquipConfig equipConfig = ConfigCache.equipConfigMap.get(item.getItemId());
			if (equipConfig == null) {
				continue;
			}
			// 变化的背包道具
			changeList.add(delItem(uuid, item.getItemNum()));
			fenjieEquipmentStone += fenjieEquipmentStone * item.getItemNum();
		}
		// 增加升阶石头
		player.addDelReinforcedEquipmentStone(fenjieEquipmentStone);
		BagMsg.sendDecomposeEquipMsg(changeList, player.getReinforcedEquipmentStone(), response);
	}

	/**
	 * 背包中的宝石合成
	 * 
	 * @param itemId
	 * @param response
	 */
	public void gemCompose(int itemId, Response response) {
		GemAttrConfig config = ConfigCache.gemAttrConfigMap.get(itemId);
		int nextId = config.nextId;
		if (nextId <= 0) {
			return;
		}
		GemAttrConfig nextConfig = ConfigCache.gemAttrConfigMap.get(nextId);
		if (nextConfig == null) {
			return;
		}
		// 需要的同等宝石数量
		int needNum = config.compose;
		List<Item> changeList = delItem(itemId, needNum);
		if(changeList == null || changeList.size() < 1) {
			return;
		}
		//合成的宝石
		changeList.addAll(addItem(nextId, 1));
		GemMsg.sendGemComposeInBagMsg(changeList, response);
		
	}

	public Map<Long, Item> getItemUuidMap() {
		return itemUuidMap;
	}

	public void setItemUuidMap(Map<Long, Item> itemUuidMap) {
		this.itemUuidMap = itemUuidMap;
	}

	public Item getItemByUuid(long uuid) {
		return this.itemUuidMap.get(uuid);
	}
}
