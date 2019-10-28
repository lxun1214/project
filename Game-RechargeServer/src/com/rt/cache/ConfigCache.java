package com.rt.cache;

import java.util.HashMap;
import java.util.Map;

import com.rt.cache.data.GameServer;
import com.rt.cache.data.SdkInfo;

public class ConfigCache {

	/**游戏服务器缓存*/
	public static Map<String, GameServer> serverMap = new HashMap<>();
	
	
	/**sdk信息*/
	public static Map<Integer, SdkInfo> sdkMap = new HashMap<>();
}
