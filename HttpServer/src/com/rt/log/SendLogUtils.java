package com.rt.log;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.WeakHashMap;

import com.rt.gloable.ServerInfo;
import com.rt.utils.FastJsonUtils;

/**
 * 发送日志
 * 
 * @author MaHaiDong
 *
 */
public class SendLogUtils {

	/**
	 * 记录用户登录
	 * @param playerId
	 * @param playerName
	 * @param date
	 */
	public static void sendLogin(Long playerId,String playerName,int channelId) {
		Map<String,String> map=new WeakHashMap<>();
		map.put("playerId", String.valueOf(playerId));
		map.put("playerName", playerName);
		map.put("date", dateToString(new Date()));
		map.put("serverId",String.valueOf(ServerInfo.getServerId()));
		map.put("channelId", String.valueOf(channelId));
		LogManager.getInstance().sendLog("LoginQueue", FastJsonUtils.toJSONString(map));
	}

	
	/**
	 * 创建角色
	 * @param playerId
	 * @param playerName
	 * @param roleId
	 */
	public static void sendCreatePlayer(Long playerId,String playerName,int roleId,int channelId){
		Map<String,String> map=new WeakHashMap<>();
		map.put("playerId", String.valueOf(playerId));
		map.put("playerName", playerName);
		map.put("date", dateToString(new Date()));
		map.put("serverId",String.valueOf(ServerInfo.getServerId()));
		map.put("roleId", String.valueOf(roleId));
		map.put("channelId", String.valueOf(channelId));
		LogManager.getInstance().sendLog("CreateUserQueue", FastJsonUtils.toJSONString(map));
	}
	
	
	/**
	 * 商城购买物品日志
	 * @param playerId
	 * @param playerName
	 * @param goodsId
	 */
	public static void sendShoppingMall(Long playerId,String playerName,int goodsId,int num,int goodsType,int shopId,int channelId){
		Map<String,String> map=new WeakHashMap<>();
		map.put("playerId", String.valueOf(playerId));
		map.put("playerName", playerName);
		map.put("date", dateToString(new Date()));
		map.put("serverId",String.valueOf(ServerInfo.getServerId()));
		map.put("goodsId", String.valueOf(goodsId));
		map.put("num", String.valueOf(num));
		map.put("goodsType", String.valueOf(goodsType));
		map.put("shopId", String.valueOf(shopId));
		map.put("channelId", String.valueOf(channelId));
		LogManager.getInstance().sendLog("ShopMallQueue", FastJsonUtils.toJSONString(map));
	}
	
	
	/**
	 * 发送获得/消耗金币
	 * @param playerId
	 * @param playerName
	 * @param type
	 * @param num
	 * @param gain_lost_type
	 */
	public static void sendAddDelGold(Long playerId,String playerName,int type,int num,int gain_lost_type,int channelId){
		Map<String,String> map=new WeakHashMap<>();
		map.put("playerId", String.valueOf(playerId));
		map.put("playerName", playerName);
		map.put("date", dateToString(new Date()));
		map.put("serverId",String.valueOf(ServerInfo.getServerId()));
		map.put("type", String.valueOf(type));
		map.put("num", String.valueOf(num));
		map.put("gainLostType", String.valueOf(gain_lost_type));
		map.put("channelId", String.valueOf(channelId));
		LogManager.getInstance().sendLog("AddDelGoldQueue", FastJsonUtils.toJSONString(map));
	}
	
	
	/**
	 * 发送获得/消耗钻石
	 * @param playerId
	 * @param playerName
	 * @param type
	 * @param num
	 * @param gain_lost_type
	 */
	public static void sendAddDelDiamond(Long playerId,String playerName,int type,int num,int gain_lost_type,int channelId){
		Map<String,String> map=new WeakHashMap<>();
		map.put("playerId", String.valueOf(playerId));
		map.put("playerName", playerName);
		map.put("date", dateToString(new Date()));
		map.put("serverId",String.valueOf(ServerInfo.getServerId()));
		map.put("type", String.valueOf(type));
		map.put("num", String.valueOf(num));
		map.put("gainLostType", String.valueOf(gain_lost_type));
		map.put("channelId", String.valueOf(channelId));
		LogManager.getInstance().sendLog("AddDelDiamondQueue", FastJsonUtils.toJSONString(map));
	}
	
	
	
	public static String dateToString(Date date) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(date);
	}
}
