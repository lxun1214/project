package com.rt.logic.bag;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import com.rt.cache.ConfigCache;
import com.rt.cache.GameCache;
import com.rt.common.GameConst;
import com.rt.log.LogUtils;
import com.rt.log.dataeye.HttpLogServer;
import com.rt.log.dataeye.LogTaskFactory;
import com.rt.log.model.ItemBuyModel;
import com.rt.logic.artifact.config.data.ArtifactConfig;
import com.rt.logic.item.Equipment;
import com.rt.logic.item.Item;
import com.rt.logic.item.ItemFactory;
import com.rt.logic.item.data.EquipConfig;
import com.rt.logic.item.data.GemAttrConfig;
import com.rt.logic.item.data.ItemConfig;
import com.rt.logic.item.data.ItemDrawConfig;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.CurrencyConst;
import com.rt.logic.player.IPlayer;
import com.rt.logic.task.TaskConst;
import com.rt.utils.KV;

public class Bag {

	/** 所有物品集合，key:唯一id */
	Map<Long, Item> itemUuidMap = new HashMap<>();

	/** Map<道具id, Map<相同道具的唯一id,Item>> */
	Map<Integer, Map<Long, Item>> itemMap = new HashMap<>();

	Lock lock = new ReentrantLock();

	private IPlayer player;

	public Bag() {
	}
	
	public Bag(IPlayer player) {
		this.player = player;
	}

	public void initItemMap(IPlayer player) {
		this.player = player;
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
	public void getBag(IPlayer player) {
		BagMsg.sendBagMsg(player.getPlayerId(), itemUuidMap);
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
			equip.setLevel(0);
		}
	}

	/**
	 * 添加新道具（重新占一个格子,调用该方法要验证背包是否已满）
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

	public List<Item> addItem(int itemId, int num, int getType) {
		List<KV<Integer, Integer>> list = new ArrayList<>();
		KV<Integer, Integer> kv = new KV<Integer, Integer>(itemId, num);
		list.add(kv);
		return addItem(list, getType);
	}

	/**
	 * 获得道具
	 * 
	 * @param addList
	 *            K:道具id，V：道具数量 return: 发生变化的道具列表
	 */
	public List<Item> addItem(List<KV<Integer, Integer>> addList, int getType) {
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

				// 发送获取物品日志
				HttpLogServer.sendLog(LogTaskFactory.ITEM_GET, GameCache.logModelMap.get(player.getPlayerId()),
						new ItemBuyModel(String.valueOf(itemId), LogUtils.getItemType(itemId), addNum, 0, null,
								LogUtils.getItemGetType(getType)));

				switch (itemConfig.itemType) {
				case GameConst.GEM: {// 宝石
					// 获得宝石，监听主线任务
					this.player.getTask().monitorTask(this.player.getPlayerId(), TaskConst.Z_GET_GEM, addNum,
							TaskConst.TYPE_CUMULATIVE);
					// 监听每日任务
					this.player.getTask().monitorTask(this.player.getPlayerId(), TaskConst.D_GET_GEM, addNum,
							TaskConst.TYPE_CUMULATIVE);
					// 监听成就
					this.player.getTask().monitorTask(this.player.getPlayerId(), TaskConst.C_GET_GEM, addNum,
							TaskConst.TYPE_CUMULATIVE);
					GemAttrConfig config = ConfigCache.gemAttrConfigMap.get(itemId);
					int nextId = config.nextId;
					if (nextId <= 0) {
						// 说明是10级宝石，监听成就
						this.player.getTask().monitorTask(this.player.getPlayerId(), TaskConst.C_GET_GEM_10, addNum,
								TaskConst.TYPE_CUMULATIVE);
					}
					break;
				}
				case GameConst.EQUIP: {// 装备
					EquipConfig config = ConfigCache.equipConfigMap.get(itemId);
					if (config.nextId <= 0) {
						// 监听成就
						this.player.getTask().monitorTask(this.player.getPlayerId(), TaskConst.C_COLLECT_MAX_EQUIP,
								addNum, TaskConst.TYPE_CUMULATIVE);
					}
					break;
				}
				case GameConst.ARTIFACT: {// 神器
					// 监听成就
					this.player.getTask().monitorTask(this.player.getPlayerId(), TaskConst.C_COLLECT_ARTIFACT, addNum,
							TaskConst.TYPE_CUMULATIVE);
					ArtifactConfig config = ConfigCache.artifactMap.get(itemId);
					if (config.nextId <= 0) {
						// 是滿阶神器，监听成就
						this.player.getTask().monitorTask(this.player.getPlayerId(), TaskConst.C_COLLECT_MAX_ARTIFACT,
								addNum, TaskConst.TYPE_CUMULATIVE);
					}
					break;
				}
				default:
					break;
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
				int stackNum = itemConfig.stackNums;
				if (itemMap.containsKey(itemId)) {
					Map<Long, Item> map = itemMap.get(itemId);
					for (Map.Entry<Long, Item> entry : map.entrySet()) {
						Item item = entry.getValue();
						int itemNum = item.getItemNum();
						if (itemNum >= stackNum) {
							continue;
						}
						changeList.add(item);
						int diffNum = stackNum - itemNum;
						if (diffNum >= addNum) {
							itemNum += addNum;
							item.setItemNum(itemNum);
							addNum = 0;
							break;
						}
						item.setItemNum(itemConfig.stackNums);
						addNum -= diffNum;
					}
				}
				while (addNum > 0) {
					// 容量是否已达最大上限
					if (itemUuidMap.size() >= GameConst.MAX_BAG_SIZE) {
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
			// 发送消耗道具日志
			HttpLogServer.sendLog(LogTaskFactory.ITEM_USE, GameCache.logModelMap.get(player.getPlayerId()),
					new ItemBuyModel(String.valueOf(item.getItemId()), LogUtils.getItemType(item.getItemId()), delNum, 0, null, "消耗"));
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
			lock.lock();
			Map<Long, Item> map = itemMap.get(itemId);
			boolean isEnough = false;
			int num = 0;
			// 验证背包道具是否足够
			for (Map.Entry<Long, Item> entry : map.entrySet()) {
				Item bagItem = entry.getValue();
				num += bagItem.getItemNum();
				if (num >= delNum) {
					isEnough = true;
					break;
				}
			}
			if (!isEnough) {
				return null;
			}
			// 发送消耗道具日志
			HttpLogServer.sendLog(LogTaskFactory.ITEM_USE, GameCache.logModelMap.get(player.getPlayerId()),
					new ItemBuyModel(String.valueOf(itemId), LogUtils.getItemType(itemId), delNum, 0, null, "消耗"));
			// 扣道具
			List<Item> changeList = new ArrayList<>();
			List<Item> removeList = new ArrayList<>();
			for (Map.Entry<Long, Item> entry : map.entrySet()) {
				Item bagItem = entry.getValue();
				int itemNum = bagItem.getItemNum();
				if (itemNum >= delNum) {
					itemNum -= delNum;
					bagItem.setItemNum(itemNum);
					changeList.add(bagItem);
					if (itemNum <= 0) {
						removeList.add(bagItem);
					}
					break;
				}
				bagItem.setItemNum(0);
				changeList.add(bagItem);
				removeList.add(bagItem);
				delNum -= itemNum;
				if (delNum <= 0) {
					break;
				}
			}
			for (int i = 0; i < removeList.size(); i++) {
				removeItem(removeList.get(i));
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
	 * 开启箱子
	 * @param player
	 * @param uuid
	 */
	public void openBox(IPlayer player, long uuid){
		long playerId = player.getPlayerId();
		Item item = itemUuidMap.get(uuid);
		if (item == null) {
			// 没找到道具
			BagMsg.sendOpenBoxMsg(playerId, false);
			return;
		}
		ItemDrawConfig config = ConfigCache.ItemDrawConfigMap.get(item.getItemId());
		if(config == null){
			BagMsg.sendOpenBoxMsg(playerId, false);
			return;
		}
		List<Item> changeList = new ArrayList<>();
		changeList.add(delItem(uuid, 1));
		
		//货币
		List<Map<String, String>> currencyList = config.getAwardCurrency();
		if(currencyList.size()>0){
			for(int i=0;i<currencyList.size();i++){
				Map<String, String> map = currencyList.get(i);
				String currencyType = map.get("currency");
				int num = Integer.parseInt(map.get("value"));
				if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
					player.addDelGold(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
					player.addDelDiamond(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
					player.addDelSportsMoney(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
					player.addDelUpgradeSkillsJade(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
					player.addDelReinforcedEquipmentStone(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
					player.addDelStrengthenArtifactStone(num,CoinConst.GET_ACTIVITY);
				}
			}
		}
		//道具
		List<KV<Integer, Integer>> addItemList = config.getAwardItem();
		if(addItemList.size()>0){
			changeList.addAll(player.getBag().addItem(addItemList,ItemConst.ITEM_GET_OPEN_BOX));
		}
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeList);
		BagMsg.sendOpenBoxMsg(playerId, true);
	}
	
	/**
	 * 装备熔炼分解
	 * 
	 * @param player
	 * @param uuids
	 * @param response
	 */
	public void decomposeEquipment(IPlayer player, List<Long> uuids) {
		if (uuids.size() < 1) {
			return;
		}
		int fenjieEquipmentStone = 0;
		int itemNum = 0;
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
			itemNum = item.getItemNum();
			// 变化的背包道具
			changeList.add(delItem(uuid, item.getItemNum()));
			fenjieEquipmentStone += equipConfig.fenjieEquipmentStone * itemNum;
		}
		// 增加升阶石头
		player.addDelReinforcedEquipmentStone(fenjieEquipmentStone,CoinConst.GET_DECOMPOSE);
		BagMsg.sendDecomposeEquipMsg(player.getPlayerId(), true);
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeList);
		// 监听每日任务
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.D_EQUIPMENT_DECOMPOSE, 1,
				TaskConst.TYPE_CUMULATIVE);
	}

	/**
	 * 背包中的宝石合成
	 * 
	 * @param itemId
	 * @param response
	 */
	public void gemCompose(IPlayer player, int itemId) {
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
		if (changeList == null || changeList.size() < 1) {
			return;
		}
		// 合成的宝石
		changeList.addAll(addItem(nextId, 1, ItemConst.ITEM_GET_REFINE));
		GemMsg.sendGemComposeInBagMsg(player.getPlayerId(), true);
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeList);
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
