package com.rt.cache;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.rt.gloable.WebSocket;
import com.rt.log.model.PlayerLogModel;
import com.rt.logic.arena.Fight;
import com.rt.logic.player.IPlayer;

public class GameCache {

	public static Map<Long, WebSocket> playerWsMap = new HashMap<>();

	public static Map<Long, WebSocket> userIdWsMap = new HashMap<>();

	public static Map<Long, IPlayer> playerUserIdMap = new HashMap<>();

	public static Map<Long, IPlayer> playerMap = new ConcurrentHashMap<>();

	/** 正在战斗中的人 */
	public static Map<Long, Fight> fightPlayerMap = new HashMap<>();

	/** 排行榜里的机器人(服务器启动，读取策划配的表加载) */
	public static Set<String> rankingRobotSets = new HashSet<>();
	
	/** dataEye日志用户信息 */
	public static Map<Long, PlayerLogModel> logModelMap = new HashMap<>();
	
	
	public static IPlayer getIPlayerByPlayerName(String playerName){
		for(IPlayer player:playerMap.values()){
			if(player.getPlayerName().equals(playerName)&&playerWsMap.containsKey(player.getPlayerId())){
				return player;
			}
		}
		return null;
	}
}
