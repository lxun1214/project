package com.rt.logic.shop.config.data;

import com.rt.common.GameModel;

public class StoreConfig extends GameModel {

	/** 商城商品id */
	public int seqId;

	/** 物品，对应道具ID */
	public int goods;

	/** 商品类型 1 道具，2宝石，3竞技，4黑市 */
	public int storeType;

	/**
	 * 货币购买类型 money_1:经验值 money_2:金币 money_3:钻石 money_4:竞技币 money_5:技能玉
	 * money_6:神器强化石 money_7:装备强化石
	 */
	public String consume;

	/** 支付单价（数量) */
	public int consumeNum;

	/** 打折;千分比 */
	public int sale;

	/** 下架;0上架;1下架 */
	public int down;

	/** 限制玩家当前购买次数;0不限制 */
	public int limitPlayerNum;

	/** 限制玩家每天购买次数;0不限制 */
	public int limitPlayerDayNum;

}
