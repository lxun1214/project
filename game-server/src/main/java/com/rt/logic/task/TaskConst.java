package com.rt.logic.task;

public class TaskConst {
    ////////////////////////////所有任务目标系数都分两种类型，累计和替换////////////////////////////
	/**替换*/
	public static final int TYPE_REPLACE = 1;
	/**累计*/
	public static final int TYPE_CUMULATIVE = 2;
	
	
	 ////////////////////////////主线////////////////////////////
	/** 主线，通过关卡 */
	public static final int Z_SCREEN = 32;

	/** 主线，重生次数 */
	public static final int Z_REBIRTHNUM = 33;

	/** 主线，获得宝石 */
	public static final int Z_GET_GEM = 34;

	/** 主线，挑战副本 */
	public static final int Z_INTO_PVE = 35;

	/** 主线，强化装备 */
	public static final int Z_STRENGTHENING_EQUIPMENT = 36;

	/** 主线，升阶装备 */
	public static final int Z_RISE_EQUIPMENT = 37;

	/** 主线，挑战PVP */
	public static final int Z_INTO_PVP = 38;
	
	////////////////////////////日常////////////////////////////
	
	/**每日，通过关卡3次 */
	public static final int D_SCREEN = 21;
	
	/**每日，强化装备10次 */
	public static final int D_STRENGTHENING_EQUIPMENT = 22;
	
	/**每日，PVP战斗3次 */
	public static final int D_INTO_PVP = 23;
	
	/**每日，获得1个宝石*/
	public static final int D_GET_GEM = 24;
	
	/**每日，分解1次装备*/
	public static final int D_EQUIPMENT_DECOMPOSE = 25;
	
	/**每日，技能升级1次*/
	public static final int D_UPGRADE_SKILL = 26;
	
	//TODO 没做
	/**每日，分享一次*/
	public static final int D_SHARE = 27;
	
	/**每日，通过副本一1次*/
	public static final int D_OTHER_PART_1 = 28;
	
	/**每日，通过副本二1次*/
	public static final int D_OTHER_PART_2 = 29;
	
	/**每日，通过副本三1次*/
	public static final int D_OTHER_PART_3 = 30;
	
	/**每日，商城购买1次*/
	public static final int D_SHOP = 31;
	
	
    ////////////////////////////成就////////////////////////////
	/**通关第多少层 */
	public static final int C_SCREEN = 1;
	
	/**重生多少次数 */
	public static final int C_REBIRTHNUM = 2;
	
	/**获得多少个宝石*/
	public static final int C_GET_GEM = 3;
	
	/**获得多少个10级宝石*/
	public static final int C_GET_GEM_10 = 4;
	
	/**装备强化到多少级 */
	public static final int C_STRENGTHENING_EQUIPMENT = 5;
	
	// TODO 没做(策划说先不做)
	/**收集齐N套套装*/
	public static final int C_COLLECT_SUIT = 6;
	
	/**拥有N件满阶装备*/
	public static final int C_COLLECT_MAX_EQUIP = 7;
	
	/**拥有N件神器*/
	public static final int C_COLLECT_ARTIFACT = 8;
	
	/**拥有N件满阶神器*/
	public static final int C_COLLECT_MAX_ARTIFACT = 9;
	
	/**完成N次PVP挑战 */
	public static final int C_INTO_PVP = 10;
	
	/**一掷千金 */
	public static final int C_SPEND_DIAMOND = 11;
	
	/**富甲一方*/
	public static final int C_COLLECT_DIAMOND = 12;
	
	/**小有积蓄，私房钱超多 */
	public static final int C_GET_DIAMOND = 13;
	
	/**拥有N个满级技能 */
	public static final int C_GET_MAX_SKILL = 14;
	
	//TODO 没做（策划说先不做）
	/**开启X各技能 */
	public static final int C_OPEN_SKILL = 15;
	
	//TODO 没做（需要过关结算的时候，发送击杀小怪数量）
	/**击杀N个小怪 */
	public static final int C_KILL_SMONSTER = 16;
	
	/**击杀N个BOSS */
	public static final int C_KILL_BOSS = 17;
	
	/**PVP排行榜*/
	public static final int C_PVP_RANKING = 18;
	
	/**战力排行榜*/
	public static final int C_FIGHT_POWER_RANKING = 19;
	
	/**进入副本次数*/
	public static final int C_INFO_PART = 20;
	
	
	//待续
}
