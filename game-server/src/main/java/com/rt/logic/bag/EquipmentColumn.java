package com.rt.logic.bag;

import java.util.ArrayList;
import java.util.List;

import com.rt.cache.ConfigCache;
import com.rt.common.GameConst;
import com.rt.logic.item.Equipment;
import com.rt.logic.item.Item;
import com.rt.logic.item.data.EquipConfig;
import com.rt.logic.item.data.EquipGrowConfig;
import com.rt.logic.item.data.GemAttrConfig;
import com.rt.logic.item.data.ItemConfig;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.IPlayer;
import com.rt.logic.task.TaskConst;
import com.rt.pb.PbPlayer.PbEquipColumnInfo;

/**
 * 装备栏
 */
public class EquipmentColumn {

	/** 装备栏（0，武器；1，头盔；2，铠甲；3，披风） */
	Column[] columns = new Column[GameConst.EQUIP_COLUMN_SIZE];

	public void initColumns() {
		for (int i = 0; i < GameConst.EQUIP_COLUMN_SIZE; i++) {
			Column column = new Column();
			column.setLoc(i);
			column.initGroove();
			columns[i] = column;
		}
	}

	/**
	 * 镶嵌宝石
	 * 
	 * @param player
	 * @param columnLoc
	 * @param grooveLoc
	 * @param uuid
	 * @param response
	 */
	public void gemMount(IPlayer player, int columnLoc, int grooveLoc, long uuid) {
		Item item = player.getBag().getItemByUuid(uuid);
		// 物品不存在
		if (item == null) {
			GemMsg.sendGemMountMsg(player, false, 0);
			return;
		}
		ItemConfig itemConfig = ConfigCache.itemConfigMap.get(item.getItemId());
		if (itemConfig == null) {
			return;
		}
		// 不可使用
		if (itemConfig.itemUse == 0) {
			return;
		}
		// 不是宝石
		if (itemConfig.itemType != GameConst.GEM) {
			GemMsg.sendGemMountMsg(player, false, 0);
			return;
		}
		// 栏位
		Column column = columns[columnLoc];
		GemAttrConfig gemAttrConfig = ConfigCache.gemAttrConfigMap.get(item.getItemId());
		if (!column.canMountGem(grooveLoc, gemAttrConfig.AttrType)) {
			GemMsg.sendGemMountMsg(player, false, 0);
			return;
		}
		int fightPower = player.getFightPower();
		List<Item> itemChangeList = new ArrayList<>();
		// 槽位
		GemGroove groove = column.getGrooves()[grooveLoc];
		int curGemId = groove.getGemId();
		if (curGemId == 0) {// 镶嵌新的宝石
			groove.setGemId(item.getItemId());
			fightPower += gemAttrConfig.initialScore;
			player.updateFightPower(fightPower);
			// 扣除道具
			itemChangeList.add(player.getBag().delItem(uuid, 1));
			GemMsg.sendGemMountMsg(player, true, item.getItemId());
			BagMsg.sendItemChangeMsg(player.getPlayerId(), itemChangeList);
			return;
		}
		// 替换宝石
		GemAttrConfig curConfig = ConfigCache.gemAttrConfigMap.get(curGemId);
		fightPower -= curConfig.initialScore;
		itemChangeList.add(player.getBag().delItem(uuid, 1));
		itemChangeList.addAll(player.getBag().addItem(curGemId, 1, ItemConst.ITEM_GET_REPLACE));
		groove.setGemId(item.getItemId());
		fightPower += gemAttrConfig.initialScore;
		player.updateFightPower(fightPower);
		GemMsg.sendGemMountMsg(player, true, item.getItemId());
		BagMsg.sendItemChangeMsg(player.getPlayerId(), itemChangeList);
	}

	/**
	 * 宝石摘除
	 * 
	 * @param player
	 * @param columnLoc
	 * @param grooveLoc
	 * @param response
	 */
	public void gemRemove(IPlayer player, int columnLoc, int grooveLoc) {
		// 栏位
		Column column = columns[columnLoc];
		GemGroove groove = column.getGrooves()[grooveLoc];
		// 该部位没有镶嵌宝石
		int itemId = groove.getGemId();
		if (itemId <= 0) {
			GemMsg.sendGemRemoveMsg(player, false, columnLoc, grooveLoc);
			return;
		}
		int fightPower = player.getFightPower();
		GemAttrConfig gemAttrConfig = ConfigCache.gemAttrConfigMap.get(itemId);
		groove.setGemId(0);
		// 战斗力发生变化
		fightPower -= gemAttrConfig.initialScore;
		player.updateFightPower(fightPower);
		List<Item> itemChangeList = new ArrayList<>();
		itemChangeList.addAll(player.getBag().addItem(itemId, 1, ItemConst.ITEM_GET_REPLACE));

		GemMsg.sendGemRemoveMsg(player, true, columnLoc, grooveLoc);
		BagMsg.sendItemChangeMsg(player.getPlayerId(), itemChangeList);
	}

	/**
	 * 合成镶嵌在宝石槽的宝石
	 * 
	 * @param player
	 * @param columnLoc
	 * @param grooveLoc
	 * @param response
	 */
	public void gemComposeInGroove(IPlayer player, int columnLoc, int grooveLoc) {
		// 栏位
		Column column = columns[columnLoc];
		GemGroove groove = column.getGrooves()[grooveLoc];
		// 该部位没有镶嵌宝石
		int itemId = groove.getGemId();
		if (itemId <= 0) {
			return;
		}
		GemAttrConfig config = ConfigCache.gemAttrConfigMap.get(itemId);
		int nextId = config.nextId;
		if (nextId <= 0) {
			return;
		}
		GemAttrConfig nextConfig = ConfigCache.gemAttrConfigMap.get(nextId);
		if (nextConfig == null) {
			return;
		}
		// 需要的同等宝石数量，有一个镶嵌在这里，所以需要的数量减1
		int needNum = config.compose - 1;
		List<Item> changeList = player.getBag().delItem(itemId, needNum);
		if (changeList == null || changeList.size() < 1) {
			GemMsg.sendGemComposeInGrooveMsg(player, false, columnLoc, grooveLoc, 0);
			;
			return;
		}
		// 设置合成后的宝石id
		groove.setGemId(nextId);
		// 战斗力变化
		int fightPower = player.getFightPower();
		fightPower -= config.initialScore;
		fightPower += nextConfig.initialScore;
		player.updateFightPower(fightPower);

		GemMsg.sendGemComposeInGrooveMsg(player, true, columnLoc, grooveLoc, nextId);
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeList);

	}

	/**
	 * 穿装备
	 * 
	 * @param player
	 * @param uuid
	 * @param response
	 */
	public void wearEquip(IPlayer player, long uuid) {
		Item item = player.getBag().getItemByUuid(uuid);
		if (item == null) {
			return;
		}
		// 不是装备
		if (item.getEquipment() == null) {
			return;
		}
		int itemId = item.getItemId();
		EquipConfig equipConfig = ConfigCache.equipConfigMap.get(itemId);
		if (equipConfig == null) {
			return;
		}
		// 职业不符
		if (equipConfig.heroType != player.getJobId()) {
			return;
		}
		List<Item> changeList = new ArrayList<>();
		// 部位
		int loc = equipConfig.equipCoordinate;
		Item wearEquip = columns[loc].getItem();
		changeList.add(player.getBag().delItem(uuid, 1));
		if(loc == 4 || loc == 6)//懒得改pb了    戒指、手镯检测下
		{
			if(wearEquip != null)
			{
				Item wearEquipII = columns[loc+1].getItem();
				if(wearEquipII == null)
				{
					loc +=1;
					wearEquip = wearEquipII;
				}
				else if(wearEquip.getEquipment().getFightPower() > wearEquipII.getEquipment().getFightPower())
				{
					loc +=1;
					wearEquip = wearEquipII;
				}
			}
		}
		columns[loc].setItem(item);
		int fightPower = player.getFightPower();
		fightPower += item.getEquipment().getFightPower();
		if (wearEquip != null) {
			fightPower -= wearEquip.getEquipment().getFightPower();
			player.getBag().addItem(wearEquip);
			wearEquip.setItemNum(1);
			changeList.add(wearEquip);
		}
		player.updateFightPower(fightPower);

		BagMsg.sendWearEquipMsg(player.getPlayerId(), changeList,loc);
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeList);
	}

	/**
	 * 脱装备
	 * 
	 * @param player
	 * @param loc
	 */
	public void takeOffEquip(IPlayer player, int loc) {
		Item item = columns[loc].getItem();
		if (item == null) {
			BagMsg.sendTakeOffEquipMsg(player.getPlayerId(), false, loc);
			return;
		}
		Bag bag = player.getBag();
		if (GameConst.MAX_BAG_SIZE <= bag.itemUuidMap.size()) {
			BagMsg.sendTakeOffEquipMsg(player.getPlayerId(), false, loc);
			return;
		}
		int fightPower = player.getFightPower();
		fightPower -= item.getEquipment().getFightPower();
		player.updateFightPower(fightPower);
		columns[loc].setItem(null);
		item.setItemNum(1);
		bag.addItem(item);
		List<Item> changeList = new ArrayList<>();
		changeList.add(item);
		BagMsg.sendTakeOffEquipMsg(player.getPlayerId(), true, loc);
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeList);
	}

	/**
	 * 装备升级
	 * 
	 * @param player
	 * @param itemId
	 * @param response
	 */
	public void upgradeEquipment(IPlayer player, int itemId) {
		EquipConfig equipConfig = ConfigCache.equipConfigMap.get(itemId);

		int loc = equipConfig.equipCoordinate;
		Item item = columns[loc].getItem();
		if (item == null || item.getItemId() != itemId) {
			BagMsg.sendUpgradeEquipMsg(player, false);
			return;
		}
		Equipment equip = item.getEquipment();
		// 当前装备等级
		int equipLevel = equip.getLevel();
		if (!ConfigCache.equipGrowConfigMap.containsKey(equipLevel + 1)) {
			// 没有下一级了
			BagMsg.sendUpgradeEquipMsg(player, false);
			return;
		}
		EquipGrowConfig equipGrowConfig = ConfigCache.equipGrowConfigMap.get(equipLevel + 1);
		int needGold = equipGrowConfig.gold;
		// 检测有是否有神器消耗加成
		needGold -= needGold * player.getArtifact().getReduceConsumption() / (double) 100;
		// 金币不足
		if (player.getGold() < needGold) {
			BagMsg.sendUpgradeEquipMsg(player, false);
			return;
		}
		player.addDelGold(-needGold, CoinConst.CONSUME_EQUIP);
		int fightPower = player.getFightPower();
		fightPower -= equip.getFightPower();
		equip.setLevel(equipLevel + 1);
		fightPower += equip.getFightPower();
		// 刷新战力
		player.updateFightPower(fightPower);

		BagMsg.sendUpgradeEquipMsg(player, true);
		// 监听主线任务
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.Z_STRENGTHENING_EQUIPMENT, equip.getLevel(),
				TaskConst.TYPE_REPLACE);
		// 监听每日任务
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.D_STRENGTHENING_EQUIPMENT, 1,
				TaskConst.TYPE_CUMULATIVE);
		// 监听成就
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.C_STRENGTHENING_EQUIPMENT, equip.getLevel(),
				TaskConst.TYPE_REPLACE);

	}

	/**
	 * 装备升阶
	 * 
	 * @param player
	 * @param itemId
	 * @param response
	 */
	public void reinforcedEquipment(IPlayer player, int itemId) {
		EquipConfig equipConfig = ConfigCache.equipConfigMap.get(itemId);

		int loc = equipConfig.equipCoordinate;
		Item item = columns[loc].getItem();
		if (item == null || item.getItemId() != itemId) {
			BagMsg.sendReinforcedEquipMsg(player, false);
			return;
		}
		int nextId = equipConfig.nextId;
		// 没有下一阶了
		if (nextId <= 0) {
			BagMsg.sendReinforcedEquipMsg(player, false);
			return;
		}
		EquipConfig nextConfig = ConfigCache.equipConfigMap.get(nextId);
		if (nextConfig == null) {
			BagMsg.sendReinforcedEquipMsg(player, false);
			return;
		}
		int needReinforcedStone = equipConfig.reinforcedEquipmentStone;
		// 升阶石不足
		if (player.getReinforcedEquipmentStone() < needReinforcedStone) {
			BagMsg.sendReinforcedEquipMsg(player, false);
			return;
		}
		player.addDelReinforcedEquipmentStone(-needReinforcedStone, CoinConst.CONSUME_EQUIP);

		int fightPower = player.getFightPower();
		Equipment equip = item.getEquipment();
		fightPower -= equip.getFightPower();
		item.setItemId(nextId);
		equip.setItemId(nextId);
		fightPower += equip.getFightPower();
		// 刷新战力
		player.updateFightPower(fightPower);

		BagMsg.sendReinforcedEquipMsg(player, true);
		// 监听主线任务
		player.getTask().monitorTask(player.getPlayerId(), TaskConst.Z_RISE_EQUIPMENT, nextConfig.itemQuality,
				TaskConst.TYPE_REPLACE);
	}

	/**
	 * 重置装备等级
	 * 
	 * @param player
	 */
	public void initEquipLevel(IPlayer player) {
		for (int i = 0; i < columns.length; i++) {
			Item item = columns[i].getItem();
			if (item == null) {
				continue;
			}
			Equipment equip = item.getEquipment();
			int fightPower = player.getFightPower();
			fightPower -= equip.getFightPower();
			equip.setLevel(0);
			fightPower += equip.getFightPower();
			player.updateFightPower(fightPower);
		}
	}

	public List<PbEquipColumnInfo> showEquipColumn() {
		List<PbEquipColumnInfo> list = new ArrayList<>();

		for (int i = 0; i < columns.length; i++) {
			Column column = columns[i];
			PbEquipColumnInfo.Builder builder = column.showEquipColumInfo();
			list.add(builder.build());
		}
		return list;
	}

	public Column[] getColumns() {
		return columns;
	}

	public void setColumns(Column[] columns) {
		this.columns = columns;
	}

}
