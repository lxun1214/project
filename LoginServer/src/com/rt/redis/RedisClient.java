package com.rt.redis;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.apache.log4j.Logger;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * Redis 客服端
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
	 * 释放连接对象
	 * 
	 * @Title:closeShardedJedis @param jedis @return void @throws
	 */
	public static void closeJedis(Jedis jedis) {
		if (null != jedis) {
			jedisPool.returnResource(jedis);
		}
	}

	public static boolean isConn() {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			if (jedis == null)
				return false;
			return jedis.isConnected();
		} catch (Exception e) {
			closeBrokenJedis(jedis);
			return false;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 释放异常的连接对象
	 * 
	 * @Title:closeShardedJedis @param jedis @return void @throws
	 */
	public static void closeBrokenJedis(Jedis jedis) {
		if (null != jedis) {
			System.out.println(".......................returnBrokenResource.............................");
			System.out.println("befor:" + RedisClient.jedisPool.getNumActive());
			jedisPool.returnBrokenResource(jedis);
			System.out.println("after:" + RedisClient.jedisPool.getNumActive());
			System.out.println("........................................................................");
		}
	}

	/**
	 * 获取连接对象
	 * 
	 * @Title:getShardedJedis @return ShardedJedis @throws
	 */
	private static Jedis getJedis() {
		try {
			if (RedisClient.jedisPool == null)
				return null;
			Jedis jedis = RedisClient.jedisPool.getResource();
			return jedis;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 根据redis的key找到对应的值
	 * 
	 * @param jediskey
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static String getJedisVal(String jediskey) {
		Jedis jedis = null;
		try {
			System.out.println("getJedisVal:" + jediskey);
			jedis = RedisClient.getJedis();
			String value = jedis.get(jediskey);
			return value;
		} catch (Exception e) {
			log.error("key:" + jediskey + "未能取到redis的值.");
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	public static byte[] get(byte[] jediskey) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			byte[] value = jedis.get(jediskey);
			return value;
		} catch (Exception e) {
			log.error("key:" + jediskey + "未能取到redis的值.");
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 存储redis的键值不设置时间
	 * 
	 * @param jediskey
	 *            redis键
	 * @param jedisval
	 *            redis值
	 */
	public static void setJedisVal(String jediskey, String jedisval) {
		System.out.println("setJedisVal:" + jediskey + "\tjedisval" + jedisval);

		setJedisVal(jediskey, jedisval, 0);
	}

	public static void setJedisVal(byte[] jediskey, byte[] jedisval) {
		Jedis jedis = null;
		int seconds = 0;
		try {
			jedis = RedisClient.getJedis();

			if (seconds > 0) {
				jedis.setex(jediskey, seconds, jedisval);
			} else {
				jedis.set(jediskey, jedisval);
			}
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 设置时间存储redis
	 * 
	 * @param jediskey
	 *            redis键
	 * @param jedisval
	 *            redis值
	 * @param seconds
	 *            时间(秒)
	 */
	public static void setJedisVal(String jediskey, String jedisval, int seconds) {
		System.out.println("setJedisVal:" + jediskey + "\tjedisval" + jedisval + "\tseconds:" + seconds);

		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();

			if (seconds > 0) {
				jedis.setex(jediskey, seconds, jedisval);
			} else {
				jedis.set(jediskey, jedisval);
			}
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 设置时间存储redis,
	 * 
	 * @param jediskey
	 *            redis键
	 * @param jedisval
	 *            redis值
	 * @param seconds
	 *            时间(秒)
	 */
	public static String getSetJedisVal(String jediskey, String jedisval, int seconds) {

		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();

			if (seconds > 0) {
				return jedis.setex(jediskey, seconds, jedisval);
			} else {
				// jedis.set(jediskey,jedisval);
				return jedis.getSet(jediskey, jedisval);
			}
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 根据redis键值删除redis
	 * 
	 * @param jediskey
	 *            键值
	 */
	public static boolean delJedis(String jediskey) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.del(jediskey) == 1;
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
		}
		return false;
	}

	/**
	 * 根据redis的key找到对应h的值
	 * 
	 * @param jediskey
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static String getJedishVal(String key, String field) {
		System.out.println("getJedishVal:" + key + "\tfield" + field);

		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			String value = jedis.hget(key, field);
			return value;
		} catch (Exception e) {
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 判断指定Key中的指定Field是否存在 1表示存在，0表示参数中的Field或Key不存在。
	 * 
	 * @param jediskey
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static boolean hexists(String key, String field) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			boolean value = jedis.hexists(key, field);
			return value;
		} catch (Exception e) {
			log.error("key:" + key + "--field:" + field + "未能取到redis的值.");
			closeBrokenJedis(jedis);
			return false;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 根据redis的key找到对应h的值
	 * 
	 * @param jediskey
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static Map<String, String> getJedishAllVal(String key) {
		System.out.println("getJedishAllVal:" + key);

		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			Map<String, String> value = jedis.hgetAll(key);
			return value;
		} catch (Exception e) {
			log.error("key:" + key + "未能取到redis的值.");
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 根据redis的key找到所有h的值集合
	 * 
	 * @param jediskey
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static List<String> getJedishvals(String key) {
		System.out.println("getJedishvals:" + key);

		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			List<String> value = jedis.hvals(key);
			return value;
		} catch (Exception e) {
			log.error("key:" + key + "未能取到redis的值.");
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 根据redis的key设置对应h的值
	 * 
	 * @param jediskey
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static Long setJedishVal(String key, String field, String value) {
		System.out.println("setJedishVal:" + key + "\tfield" + field + "\tvalue" + value);

		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.hset(key, field, value);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 时间复杂度中的N表示Key包含的Field数量。返回指定Key的所有Fields名。 RedisClient.setJedisHkeys()
	 * <BR>
	 * 
	 * @param key
	 * @return Field的列表。
	 */
	public static Set<String> getJedishkeys(String key) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.hkeys(key);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 根据redis的key找到对应h的个数
	 * 
	 * @param jediskey
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static Long getJedishlen(String key) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.hlen(key);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 创建一个数组，从头添加数据
	 * 
	 * @param key
	 * @param value
	 * @return
	 */
	public static Long lpush(String key, String value) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.lpush(key, value);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 创建一个数组,从末尾添加数值
	 * 
	 * @param key
	 * @param value
	 * @return
	 */
	public static Long rpush(String key, String value) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.rpush(key, value);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 获取list长度 RedisClient.getllen()<BR>
	 * 
	 * @param key
	 * @return
	 */
	public static Long getllen(String key) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			long len = jedis.llen(key);
			return len;
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 更具下标获取list值 RedisClient.indexof()<BR>
	 * 
	 * @param key
	 * @param index
	 * @return
	 */
	public static String indexof(String key, int index) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			String json = jedis.lindex(key, index);
			return json;
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	public static void llset(String key, int index, String value) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			jedis.lset(key, index, value);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 从指定的列表右边出队,添加到目的列表中 -->>注意:这个方法必须源list有数据,那么目的list你可以随便起个名
	 * 
	 * @param key
	 * @param value
	 * @return
	 */
	public static String rpoppush(String key, String value) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.rpoplpush(key, value);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 返回并弹出指定Key关联的链表中的最后一个元素，即尾部元素，。如果该Key不存，返回nil。 RedisClient.rpop()<BR>
	 * 
	 * @param key
	 * @return
	 */
	@SuppressWarnings("finally")
	public static String rpop(String key) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.rpop(key);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
			return null;

		}
	}

	/**
	 * 返回List中的个数
	 * 
	 * @param key
	 * @return
	 */
	@SuppressWarnings("finally")
	public static long len(String key) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.llen(key);

		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
			return 0l;
		}
	}

	/**
	 * 删除指定列表中的元素(1个)
	 * 
	 * @param key
	 * @param value
	 * @return
	 */
	@SuppressWarnings("finally")
	public static long lrem(String key, String value) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.lrem(key, 1, value);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
			return 0;

		}
	}

	/**
	 * 删除指定列表中的元素 RedisClient.lrem()<BR>
	 * 
	 * @param key
	 * @param count
	 *            0 删除所有与key关联的改元素
	 * @param value
	 * @return
	 */
	@SuppressWarnings("finally")
	public static long lrem(String key, long count, String value) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.lrem(key, count, value);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
			return 0;
		}
	}

	public static void ltrim(String key, long start, long end) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			jedis.ltrim(key, start, end);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 获取数据列表
	 * 
	 * @param key
	 * @param value
	 * @return
	 */
	public static List<String> lrange(String key, long start, long end) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.lrange(key, start, end);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
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
			jedis = RedisClient.getJedis();
			return jedis.exists(key);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return false;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 获取数据列表
	 * 
	 * @param key
	 * @param value
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static List lrange(String key) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.lrange(key, 0, -1);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 获取数据列表
	 * 
	 * @param key
	 * @param value
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static List lrange(String key, int start, int end) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.lrange(key, start, end);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 返回键存储在列表中的元素在指数指数。该指数是从零开始的，所以0表示第一个元素，1表示第二个元素等等。负的索引可以被用来指定元素列表的尾部开始。
	 * 在这里，-1表示最后一个元素，-2表示的倒数第二个，等等。 关键是当值不是一个列表，则返回一个错误。
	 * 
	 * @param key
	 * @param index
	 * @return
	 */

	public static String lindex(String key, long index) {

		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.lindex(key, index);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 根据redis的key, fields删除对应h的值
	 * 
	 * @param jediskey
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static Long delJedishVal(String key, String... fields) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			long k = 0;
			if (fields != null && fields.length > 0) {
				for (int i = 0; i < fields.length; i++) {
					k += jedis.hdel(key, fields[i]);
				}
			}
			return k;
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 保存
	 * 
	 * @param key
	 * @param value
	 */
	public static void set(String key, String value) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			jedis.set(key, value);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 保存
	 * 
	 * @param key
	 * @param value
	 */
	public static String get(String key) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			String value = jedis.get(key);
			return value;
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 根据redis的key, fields删除对应h的值
	 * 
	 * @param jediskey
	 *            redis键
	 * @return //返回redis储存信息
	 */
	public static void exper(String key, String... fields) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
		} finally {
			closeJedis(jedis);
		}
	}

	public static String lpop(String key) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.lpop(key);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * key 操作命令
	 * pattern支持glob-style的通配符格式，如*表示任意一个或多个字符，?表示任意字符，[abc]表示方括号中任意一个字母。
	 * RedisClient.keysPattern()<BR>
	 * 
	 * @param pattern
	 * @return
	 */
	public static Set<String> keysPattern(String pattern) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.keys(pattern);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	/**
	 * 该命令为参数中指定的Key设定超时的秒数，在超过该时间后，Key被自动的删除。如果该Key在超时之前被修改，与该键关联的超时将被移除。
	 * 
	 * @param key
	 * @param seconds
	 * @return 1表示超时被设置，0则表示Key不存在，或不能被设置。
	 */
	public static Long expire(String key, int seconds) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.expire(key, seconds);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	public static Long expire(byte[] key, int seconds) {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.expire(key, seconds);
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	public static Long dbSize() {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.dbSize();
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	public static String flushDB() {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.flushDB();
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

	public static String flushAll() {
		Jedis jedis = null;
		try {
			jedis = RedisClient.getJedis();
			return jedis.flushAll();
		} catch (Exception e) {
			e.printStackTrace();
			closeBrokenJedis(jedis);
			return null;
		} finally {
			closeJedis(jedis);
		}
	}

}
