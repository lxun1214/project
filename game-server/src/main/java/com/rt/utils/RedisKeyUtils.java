package com.rt.utils;

public class RedisKeyUtils {

	static final String ARENA_RANK_SET_KEY = "ARENA_RANK_SET_KEY";

	static final String ARENA_RANK_MAP_KEY = "ARENA_RANK_MAP_KEY";

	static final String POWER_RANK_SET_KEY = "POWER_RANK_SET_KEY";
	
	static final String RECHARGE_RANK_SET_KEY = "RECHARGE_RANK_SET_KEY";
	
	static final String REBIRTH_NUM_SET_KEY = "REBIRTH_NUM_SET_KEY";
	/**竞技场排行奖励*/
	public static final String RANKING_SPORT_REWARD_KEY = "RANKING_SPORT_REWARD_KEY";
	
	/**已使用礼包激活码KEY*/
	public static final String USE_GIFT_CODE_KEY = "USE_GIFT_CODE_KEY";
	
	
	static final String GIFT_CODE = "GIFT_CODE_";
	
	
	public static String getGiftCodeKey(String code) {
		StringBuilder builder = new StringBuilder();
		builder.append(GIFT_CODE).append(code);
		return builder.toString();
	}
	
	/**
	 * 充值set key
	 * 
	 * @return
	 */
	public static String getRechargeSetKey() {
		return RECHARGE_RANK_SET_KEY;
	}
	/**
	 * 重生set key
	 * 
	 * @return
	 */
	public static String getRebirthSetKey() {
		return REBIRTH_NUM_SET_KEY;
	}
	/**
	 * 获取竞技排行榜set key
	 * 
	 * @return
	 */
	public static String getArenaSetKey() {
		return ARENA_RANK_SET_KEY;
	}

	/**
	 * 获取竞技排行榜map key
	 * 
	 * @return
	 */
	public static String getArenaMapKey() {
		return ARENA_RANK_MAP_KEY;
	}

	/**
	 * 获取战力排行榜set key
	 * 
	 * @return
	 */
	public static String getPowerSetKey() {
		return POWER_RANK_SET_KEY;
	}
}
