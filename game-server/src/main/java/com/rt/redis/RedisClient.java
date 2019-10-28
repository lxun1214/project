package com.rt.redis;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import org.apache.log4j.Logger;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * Redis client
 */
public class RedisClient {

	public static Logger log = Logger.getLogger(RedisClient.class);
	private static JedisPool jedisPool;

	/**
	 * 初始化非切片池
	 * 
	 * @throws IOException
	 */
	public static void initialPool(String path) throws IOException {

		// 生成文件对象
		File f = new File(path + "/config/redis.properties");
		// 生成文件输入流
		FileInputStream in = null;
		in = new FileInputStream(f);
		Properties p = new Properties();
		p.load(in);
		// 池基本配置
		JedisPoolConfig config = new JedisPoolConfig();

		int maxTotal = Integer.parseInt(p.getProperty("maxTotal"));
		int maxIdel = Integer.parseInt(p.getProperty("maxIdle"));
		int minIdel = Integer.parseInt(p.getProperty("minIdle"));
		int maxWaitMillis = Integer.parseInt(p.getProperty("MaxWaitMillis"));
		String host = p.getProperty("host");
		int port = Integer.parseInt(p.getProperty("port"));

		config.setMaxTotal(maxTotal);
		config.setMaxIdle(maxIdel);
		config.setMinIdle(minIdel);
		config.setMaxWaitMillis(maxWaitMillis);
		config.setTestOnBorrow(false);

		// 无密码的
		jedisPool = new JedisPool(config, host, port);

	}

	/**
	 * 获取连接对象
	 */
	private static Jedis getJedis() {
		try {
			if (RedisClient.jedisPool == null)
				return null;
			Jedis jedis = jedisPool.getResource();
			return jedis;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 释放连接对象
	 */
	public static void closeJedis(Jedis jedis) {
		if (null != jedis) {
			jedis.close();
		}
	}

	/**
	 * 根据redis的key找到对应的值
	 * 
	 * @param key
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static String getValue(String key) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			String value = jedis.get(key);
			return value;
		} catch (Exception e) {
			log.error("key:" + key + "-->未能取到redis的值.");
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 存储redis的键值不设置时间
	 * 
	 * @param key
	 *            redis键
	 * @param value
	 *            redis值
	 */
	public static void setValue(String key, String value) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			jedis.set(key, value);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 设置时间存储redis
	 * 
	 * @param key
	 *            redis键
	 * @param value
	 *            redis值
	 * @param seconds
	 *            时间(秒)
	 */
	public static void setvalue(String key, String value, int seconds) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			if (seconds > 0) {
				jedis.setex(key, seconds, value);
			} else {
				jedis.set(key, value);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 根据redis键值删除redis
	 * 
	 * @param key
	 * @return
	 */
	public static boolean delJedis(String key) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.del(key) == 1;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return false;
	}
	
	/**
	 * 
	 * 删除Map里的单个Key
	 * @return
	 */
	public static boolean delMapKey(String mapKey,String key) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.hdel(mapKey, key) == 1;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return false;
	}

	/**
	 * 查看对象是否存在
	 * 
	 * @param key
	 * @return
	 */
	public static Boolean exists(String key) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.exists(key);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 重置过期时间
	 * 
	 * @param key
	 * @param seconds
	 */
	public static void expire(String key, int seconds) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			jedis.expire(key, seconds);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * member
	 * 
	 * @param key
	 * @param score
	 * @param member
	 *            PS:如果member存在，score则为替换
	 */
	public static void zadd(String key, int score, String member) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			jedis.zadd(key, score, member);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 向map中插入一条数据
	 * 
	 * @param mapKey
	 * @param key
	 * @param value
	 */
	public static void hSetValue(String mapKey, String key, String value) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			jedis.hset(mapKey, key, value);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 判断map里是否已存在
	 * @param mapKey
	 * @param key
	 * @return
	 */
	public static boolean hexists(String mapKey, String key) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.hexists(key, key);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return false;
	}

	/**
	 * 返回member在key集合中SCORE从大到小的下标 (倒序)
	 * 
	 * @param key
	 * @param member
	 * @return PS:如果key集合中有member，并且返回0.说明在第一位，key集合中没有member返回NULL
	 */
	public static Long zrevrank(String key, String member) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.zrevrank(key, member);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return null;
	}
	
	/**
	 * 返回member在key集合中 SCORE从小到大的下标 
	 * 
	 * @param key
	 * @param member
	 * @return PS:如果key集合中有member，并且返回0.说明在第一位，key集合中没有member返回NULL
	 */
	public static Long zrank(String key, String member) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.zrank(key, member);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return null;
	}

	/**
	 * 返回set集合元素数量
	 * 
	 * @param key
	 * @return
	 */
	public static Long srard(String key) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.zcard(key);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return null;
	}

	/**
	 * 小到大
	 * 
	 * @param key
	 * @param start
	 *            集合下标开始 0代表1
	 * @param end
	 *            集合下标结束 PS:获取前50名数据 传start=0 end=49
	 */
	public static Set<String> zangeByScore(String key, int star, int end) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.zrange(key, star, end);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return null;
	}

	/**
	 * 大到小
	 * @param key
	 * @param start
	 *            集合下标开始 0代表1
	 * @param end
	 *            集合下标结束 PS:获取前50名数据 传start=0 end=49
	 */
	public static Set<String> zrevrangeByScore(String key, int star, int end) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.zrevrange(key, star, end);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return null;
	}
	
	
	/**
	 * 通过key获取map的值
	 * 
	 * @param mapKey
	 * @param key
	 * @return
	 */
	public static String getMapValue(String mapKey, String key) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.hget(mapKey, key);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return null;
	}

	/**
	 * 通过keys获取map的多个值
	 * 
	 * @param mapKey
	 * @param key
	 * @return
	 */
	public static List<String> getMapValues(String mapKey, String... keys) {
		Jedis jedis = null;
		try {
			jedis = getJedis();
			return jedis.hmget(mapKey, keys);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeJedis(jedis);
		}
		return null;
	}

}
