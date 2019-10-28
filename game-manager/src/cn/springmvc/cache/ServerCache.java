package cn.springmvc.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.springmvc.entry.Server;



public class ServerCache {

	
	private static Map<String,Server> servers = new HashMap<String,Server>();
	
	
	
	public  static  void addServer(Server server){
		servers.put(server.getServerId(), server);
	}
	
	/**
	 * 返回有权限的服务器
	 * @return
	 */
	public  static List<Server> getServerList(){
		List<Server> list = new ArrayList<Server>();
		for(Server server:servers.values()){
			list.add(server);
		}
		return list;
	}
	
	public static Server getServer(String serverId){
		return servers.get(serverId);
	}
}
