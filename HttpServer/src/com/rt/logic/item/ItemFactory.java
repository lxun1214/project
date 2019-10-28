package com.rt.logic.item;

import com.rt.cache.ConfigCache;
import com.rt.common.GameConst;
import com.rt.logic.item.data.EquipConfig;
import com.rt.logic.item.data.ItemConfig;
import com.rt.utils.IdFactory;

public class ItemFactory {

	public static Item createItem(int itemId, int itemNum) {
		ItemConfig itemConfig = ConfigCache.itemConfigMap.get(itemId);
		if(itemConfig == null) {
			return null;
		}
		Item item = new Item();
		item.init(itemId, itemNum);
		long uuid = IdFactory.createId();
		item.setUuid(uuid);
		int itemType = itemConfig.itemType;
		if(itemType == GameConst.EQUIP) {
			EquipConfig equipConfig = ConfigCache.equipConfigMap.get(itemId);
			if(equipConfig == null) {
				return null;
			}
			Equipment equipment = new Equipment();
			equipment.setItemId(itemId);
			item.setEquipment(equipment);
		}
		return item;
	}
}
