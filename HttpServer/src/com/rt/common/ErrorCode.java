package com.rt.common;

public class ErrorCode {

	/** 通用 */
	public static final int COMMON_CODE = -1;

	/** 角色不存在 */
	public static final int UNDEFIND_PLAYER = 301;

	/** 角色名称长度不符合 */
	public static final int NAME_LENGTH_ERROR = 302;

	/** 角色名称含有特殊字符 */
	public static final int NAME_HAVE_SYMBOL = 303;

	/** 角色名称包含屏蔽字 */
	public static final int HAVE_FILTER_WORD = 303;

	/** 已经有角色了不可以再创建了 */
	public static final int HAVE_PLAYER = 304;

	/** 初始创建卡牌选择的卡牌不在初始列表里 */
	public static final int FIRST_NOT_HAVE_CARD = 305;

	/** 登陆游戏token异常 */
	public static final int TOKEN_ERROR = 306;

	/** 登陆游戏token超时了 */
	public static final int TOKEN_TIME_OUT = 306;

	/** uuid不匹配 */
	public static final int UUID_ERROR = 308;

	/** 重名 */
	public static final int NAME_REPEAT = 309;

	/** 重名次数不足 */
	public static final int NAME_REPEAT_INSUFFICIENT = 310;

	/** 竞技场次数不足 */
	public static final int REBIRTHNUM_INSUFFICIENT = 311;

	/** 自己正在战斗中 */
	public static final int OWN_IS_FIGHT = 311;

	/** 对方正在战斗中 */
	public static final int OTHER_IS_FIGHT = 312;

	/** 对方不存在 */
	public static final int OTHER_NO_EXISTENT = 313;
}
