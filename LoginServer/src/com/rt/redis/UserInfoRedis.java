package com.rt.redis;

import com.rt.db.domain.UserBean;

import testClient.util.FastJsonUtils;

public class UserInfoRedis {

	RedisClient redisClient;

	public void setRedisClient(RedisClient redisClient) {
		this.redisClient = redisClient;
	}

	private static String key = "USER_INFO_";

	/** redis保存时间,秒,暂定10分钟 */
	private static int saveTime = 600;

	public static String getUserInfoKey(long userId) {
		return key + "_" + userId;
	}

	/** 根据用户Id获得用户信息 */
	public static UserBean getUserInfo(long userId) {
		if (!RedisClient.isConn())
			return null;
		String text = RedisClient.getJedisVal(getUserInfoKey(userId));
		if (text != null) {
			return FastJsonUtils.parseObject(text, UserBean.class);
		} else
			return null;
	}

	/** 更新用户信息 */
	public static void upDateUserInfo(UserBean user) {
		if (!RedisClient.isConn())
			return;
		String text = FastJsonUtils.toJSONString(user);
		RedisClient.setJedisVal(getUserInfoKey(user.getUserId()), text,
				saveTime);
	}
}
