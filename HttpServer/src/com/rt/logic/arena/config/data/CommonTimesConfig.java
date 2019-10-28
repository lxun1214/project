package com.rt.logic.arena.config.data;

import com.rt.common.GameModel;

public class CommonTimesConfig extends GameModel {

	public int id;
	/** 类型 1购买竞技场挑战次数配置 */
	public int type;
	/** 次数(上限，下限) */
	public int num;
	/** 消耗钻石 */
	public int consume;
	/** 每次获得数量 */
	public int times;

}
