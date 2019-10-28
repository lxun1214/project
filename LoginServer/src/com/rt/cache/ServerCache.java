package com.rt.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.cache.date.SdkInfo;
import com.rt.db.domain.ServerInfoBean;

/**
 * 登陆服务器缓存
 * @author xin.fengtao
 *
 */
public class ServerCache {
	
	/**服务器列表信息 key:服务器Id value:服务器信息*/
	private static Map<Integer,ServerInfo> serverInfoMap = new HashMap<>();
	
	/**按开启时间排序的list*/
	private static List<ServerInfo> serverInfoList = new ArrayList<>();
	
	/**sdk信息*/
	public static Map<Integer, SdkInfo> sdkMap = new HashMap<>();

	
	public static Map<Integer, ServerInfo> getServerInfoMap() {
		return serverInfoMap;
	}

	public static List<ServerInfo> getServerInfoList() {
		return serverInfoList;
	}
	
	public static ServerInfo addServer(ServerInfoBean bean){
		ServerInfo info = new ServerInfo();
		info.setBean(bean);
		serverInfoMap.put(bean.getServerId(), info);
		serverInfoList.add(info);
		
		return info;
	}
	
	public static ServerInfo getLastServer(){
		return serverInfoList.get(serverInfoList.size() - 1);
	}
	
	public static ServerInfo getServerInfoByServerId(int serverId) {
		return serverInfoMap.get(serverId);
	}
}
