package com.rt.logic.item;

import com.rt.cache.ConfigCache;
import com.rt.logic.item.data.EquipConfig;

public class Equipment {
	
	int itemId;

	/** 装备等级 */
	int level = 1;

	/**
	 * 获取装备战力
	 * @return
	 */
	public int getFightPower() {
		EquipConfig config = ConfigCache.equipConfigMap.get(itemId);
		int fightPower = config.initialScore + config.growScore * level;
		return fightPower;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

}
