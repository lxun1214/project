package com.rt.common;

public class GameConst {

	/** token过期时间 */
	public static final int TOKEN_EXPIRED_TIME = 1000 * 60 * 10;
	
	/**心跳时间*/
	public static final int HERAT_BEAT_TIME = 1000 * 30;
	
	/**背包最大格子数*/
	public static final int MAX_BAG_SIZE = 150;
	
	/**技能最大等级*/
	public static final int MAX_SKILL_LIVE = 10;
	
	/**技能栏最大格子数*/
	public static final int MAX_SKILL_COLUMN_SIZE = 7;
	
	/**装备栏格子数*/
	public static final int EQUIP_COLUMN_SIZE = 10;
	
	/**宝石槽最大个数*/
	public static final int GEM_GROOVE_SIZE = 8;
	
	/**1:宝石，2：装备，3：神器，4：道具*/
	public static final int GEM = 1,EQUIP = 2,ARTIFACT = 3,ITEM = 4;
}
