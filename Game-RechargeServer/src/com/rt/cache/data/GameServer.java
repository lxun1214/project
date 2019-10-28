package com.rt.cache.data;

public class GameServer {

	public GameServer(String serverId,String httpUrl){
		this.serverId = serverId;
		this.httpUrl = httpUrl;
		
	}
	/**服务器ID*/
	private String serverId;
	
	/**访问地址*/
	private String httpUrl;

	public String getServerId() {
		return serverId;
	}

	public void setServerId(String serverId) {
		this.serverId = serverId;
	}

	public String getHttpUrl() {
		return httpUrl;
	}

	public void setHttpUrl(String httpUrl) {
		this.httpUrl = httpUrl;
	}
}
