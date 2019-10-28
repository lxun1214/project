package com.rt.utils;

public class RedisKeyUtils {

	static final String ARENA_RANK_SET_KEY = "ARENA_RANK_SET_KEY_";

	static final String ARENA_RANK_MAP_KEY = "ARENA_RANK_MAP_KEY_";
	
	static final String POWER_RANK_SET_KEY = "POWER_RANK_SET_KEY_";

	/**
	 * 获取竞技排行榜set key
	 * 
	 * @param serverId
	 * @return
	 */
	public static String getArenaSetKey(int serverId) {
		StringBuilder builder = new StringBuilder();
		builder.append(ARENA_RANK_SET_KEY).append(serverId);
		return builder.toString();
	}

	/**
	 * 获取竞技排行榜map key
	 * 
	 * @param serverId
	 * @return
	 */
	public static String getArenaMapKey(int serverId) {
		StringBuilder builder = new StringBuilder();
		builder.append(ARENA_RANK_MAP_KEY).append(serverId);
		return builder.toString();
	}
	
	/**
	 * 获取战力排行榜set key
	 * @param serverId
	 * @return
	 */
	public static String getPowerSetKey(int serverId) {
		StringBuilder builder = new StringBuilder();
		builder.append(POWER_RANK_SET_KEY).append(serverId);
		return builder.toString();
	}
}
