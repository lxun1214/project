package com.rt.logic.item.data;

import com.rt.common.GameModel;

/**
 * 宝石
 */
public class GemAttrConfig extends GameModel{
	
	public int id;
	/**战力*/
	public int initialScore;
	/**宝石类型*/
	public int AttrType;
	/**合成下一级需要的宝石数量*/
	public int compose;
	/**下一级id*/
	public int nextId;
}
