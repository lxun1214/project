package com.rt.common;

public class ErrorCode {

	/** 通用 */
	public static final int COMMON_CODE = 0;

//	/** 角色不存在 */
//	public static final int UNDEFIND_PLAYER = 1;

	/** 角色名称长度不符合 */
	public static final int NAME_LENGTH_ERROR = 2;

	/** 角色名称含有特殊字符 */
	public static final int NAME_HAVE_SYMBOL = 3;

	/** 角色名称包含屏蔽字 */
	public static final int HAVE_FILTER_WORD = 4;

	/** 已经有角色了不可以再创建了 */
	public static final int HAVE_PLAYER = 5;

//	/** 初始创建卡牌选择的卡牌不在初始列表里 */
//	public static final int FIRST_NOT_HAVE_CARD = 6;

//	/** 登陆游戏token异常 */
//	public static final int TOKEN_ERROR = 7;

//	/** 登陆游戏token超时了 */
//	public static final int TOKEN_TIME_OUT = 8;

//	/** uuid不匹配 */
//	public static final int UUID_ERROR = 9;

	/** 重名 */
	public static final int NAME_REPEAT = 10;

	/** 重生次数不足 */
	public static final int NAME_REPEAT_INSUFFICIENT = 11;

	/** 竞技场次数不足 */
	public static final int REBIRTHNUM_INSUFFICIENT = 12;

	/** 自己正在战斗中 */
	public static final int OWN_IS_FIGHT = 13;

	/** 对方正在战斗中 */
	public static final int OTHER_IS_FIGHT = 14;

	/** 对方不存在 */
	public static final int OTHER_NO_EXISTENT = 15;
	
	/** 奖励不存在（竞技场排行） */
	public static final int ARENA_REWARD_NO_EXISTENT = 16;
	
	/**任务没达成，不能领取奖励 */
	public static final int TASK_NOT_REACH = 17;
	
	/**已领取过奖励 */
	public static final int TASK_NOT_REWARD = 18;
	
	/**无法领取*/
	public static final int TASK_NOT_FRONT_REWARD = 19;
	
	/**已领取过月卡奖励 */
	public static final int MONTH_CARD_NOT_REWARD = 20;
	
	/**没有月卡信息*/
	public static final int MONTH_CARD_NOT_INFO = 21;
	
	/**激活码无效*/
	public static final int GIFT_CODE_NULL = 22;
	
	/**激活码有效时间已过*/
	public static final int GIFT_CODE_TIME_ERROR = 23;
	
	/**同组激活码只能使用一次*/
	public static final int GIFT_CODE_GROUP_ERROR = 24;
	
	/**激活码已使用过*/
	public static final int GIFT_CODE_STATE_ERROR = 25;
	
	/**投资计划已购买过，无法购买*/
	public static final int PURCHASE_INVESTMENT_ERROR = 26;
}
