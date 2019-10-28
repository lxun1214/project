package cn.springmvc.cache;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import cn.springmvc.redis.RedisClient;

public class ConfigCache {

	/**权限缓存配置表 key:adminId   value:privilege_id权限集合 */
	public static Map<Integer,Set<Integer>> resourceMap = new HashMap<>();
	
	/**redis链接缓存*/
	public static Map<String, RedisClient> redisMap = new HashMap<>();
}
