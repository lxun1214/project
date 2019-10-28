package com.rt.logic.item.data;

import com.rt.common.GameModel;

public class ItemConfig extends GameModel{
	
	public int itemId;
	
	/**物品类型(1宝石2装备3神器4道具）*/
	public int itemType;
	/**使用职业类型*/
	public int heroType;
	/**需求等级*/
	public int requiredLevel;
	/**物品迭加数*/
	public int stackNums;
	/**是否可使用（0,不可使用；1，可使用）*/
	public int itemUse;
}
