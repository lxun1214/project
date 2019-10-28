package com.rt.common;

public class S2CMessageNum {

	/** 错误信息返回 */
	public static final int ERROR_MSG = 10;
	/** 心跳 */
	public static final int HEARTBEAT = 20000;
	/** 登陆 */
	public static final int LOGIN = 20001;
	/** 创建角色 */
	public static final int CREATE_PLAYER = 20002;
	/** 背包 */
	public static final int GET_BAG = 20003;
	/** 过关 */
	public static final int CLEARANCE = 20004;
	/** 死亡 */
	public static final int PLAYER_DIE = 20005;
	/** 技能升级 */
	public static final int UPGRADE_SKILL = 20006;
	/** 替换技能栏技能 */
	public static final int CHANGE_COLUMN_SKILL = 20007;
	/** 穿装备 */
	public static final int WEAR_EQUIPMENT = 20008;
	/** 装备升级 */
	public static final int UPGRADE_EQUIP = 20009;
	/** 装备升阶 */
	public static final int REINFORCED_EQUIP = 20010;
	/** 重生 */
	public static final int REBIRTH = 20011;
	/** 熔炼 */
	public static final int EQUIPMENT_DECOMPOSE = 20012;
	/** 请求购买商城物品 */
	public static final int BUY_SHOP_GOODS = 20013;
	/** 宝石镶嵌 */
	public static final int GEM_MOUNT = 20014;
	/** 宝石摘除 */
	public static final int GEM_REMOVE = 20015;
	/** 宝石合成 */
	public static final int GEM_COMPOSE_IN_BAG = 20016;
	/** 宝石槽中合成宝石 */
	public static final int GEM_COMPOSE_IN_GROOVE = 20017;
	/** 激活神器 */
	public static final int ACTIVATION_ARTIFACT = 20018;
	/** 神器升阶 */
	public static final int REINFORCED_ARTIFACT = 20019;
	/** 进入竞技场 */
	public static final int ENTER_ARENA = 20020;
	/** 购买竞技场挑战次数 */
	public static final int PURCHASE_CHALLENGE_NUM = 20021;
	/** 竞技场发起挑战 */
	public static final int LAUNCH_CHALLENGE = 20022;
	/** 竞技场战斗结算 */
	public static final int FIGHT_SETTLEMENT = 20023;
	/** 获取排行榜 */
	public static final int GET_RANKINGS = 20024;
	/** 获取战力排行榜 */
	public static final int GET_POWER_RANKINGS = 20025;
	/** 领取竞技场排行奖励 */
	public static final int  RECEIVE_ARENA_REWARD = 20026;
	/** 领取任务奖励 */
	public static final int  RECEIVE_TASK_REWARD = 20027;
	/** 请求进入副本 */
	public static final int  CHALLENGE_PART = 20028;
	/** 副本结算 */
	public static final int  PART_SETTLEMENT = 20029;
	/** 竞技场刷新挑战者 */
	public static final int  REFRESH_ARENA = 20030;
	/** 脱装备 */
	public static final int  TAKE_OFF_EQUIP = 20031;
	/** 领取活动奖励 */
	public static final int  RECEIVE_ACTIVITY_REWARD = 20032;
	/** 买入招财猫 */
	public static final int  PURCHASE_FORTUNE_CAT = 20033;
	/** 充值向服务器发送一条创建订单消息 */
	public static final int  GENERATE_RECHARGE_ORDER_INFO = 20034;
	/**开启箱子*/
	public static final int OPEN_BOX = 20035;
	
	
	/**读取邮件*/
	public static final int READ_EMAIL = 20037;
	/**领取奖励/一键领取*/
	public static final int RECEIVE_ALL_EMAIL = 20039;
	/**删除邮件*/
	public static final int DEL_EMAIL = 20040;
	/**一键删除*/
	public static final int DEL_ALL_EMAIL = 20041;
	/**抽卡*/
	public static final int  DRAW_CARD = 20042;
	 
	public static final int RECEIVE_VIP_REWARD = 20043;
	/**领取月卡奖励*/
	public static final int RECIEVE_MONTH_REARD = 20044; 
	/**使用激活码*/
	public static final int USE_GIFT_CODE = 20045; 
	/**购买投资计划*/
	public static final int PURCHASE_INVESTMENT = 20046; 
	
	
	/*聊天*/
	public static final int CHAT = 40000;
	public static final int LEVEL_RANK_BACK = 40001;
	public static final int MONEY_RANK_BACK = 40002;
	
	/*************************主动推送区域**********************************/
	/** 服务器通知客户端可以领取排行奖励 */
	public static final int RANKING_REWARD_CHANGE = 30001;
	/** 背包变化推送 */
	public static final int ITEM_CHANGE = 30002;
	/** 任务达成推送 */
	public static final int PLAYER_TASK_CHANGE = 30003;
	/** 战力变化推送 */
	public static final int FIGHT_POWER_CHANGE = 30004;
	/** 货币变化推送 */
	public static final int CURRENCY_CHANGE = 30005;
	/** 活动变化推送 */
	public static final int ACTIVITY_INFO_CHANGE = 30006;
	/** 0点推送刷新商城已购买次数信息*/
	public static final int  REFRESH_STORE = 30007;
	/**新增邮件推送推送*/
	public static final int ADD_EMAIL_CHANGE = 30008;
	/**vip发生变化推送*/
	public static final int VIP_LEVEL_CHANGE = 30009;
	/**月卡变化*/
	public static final int MONTH_CARD_CHANGE = 30010;
	
}
