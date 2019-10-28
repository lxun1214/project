package com.rt.cache;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.rt.common.UserPo;
import com.rt.logic.arena.Fight;
import com.rt.logic.player.IPlayer;

public class GameCache {

	/** 验证用户是否正确登陆，并做单点登陆处理，key:uuid value:UserPo */
	public static Map<String, UserPo> userUUIdMap = new HashMap<>();

	/** key:userId value:UserPo */
	public static Map<Long, UserPo> userPoMap = new HashMap<>();

	public static void delUserPo(String uuid) {
		UserPo po = userUUIdMap.get(uuid);
		userUUIdMap.remove(uuid);
		userPoMap.remove(po.getUserId());
		po = null;
	}

	public static Map<Long, IPlayer> playerMap = new ConcurrentHashMap<>();

	/** 正在战斗中的人 */
	public static Map<Long, Fight> fightPlayerMap = new HashMap<>();

}
