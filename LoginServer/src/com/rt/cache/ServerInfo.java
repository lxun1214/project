package com.rt.cache;

import com.rt.db.domain.ServerInfoBean;

/**
 * 服务器信息
 * @author xin.fengtao
 *
 */
public class ServerInfo{

	ServerInfoBean bean;

	/** 服务器状态 0：未开启 1：正常 */
	int serverState;

	public int getServerState() {
		return serverState;
	}

	public void setServerState(int serverState) {
		this.serverState = serverState;
	}

	public ServerInfoBean getBean() {
		return bean;
	}

	public void setBean(ServerInfoBean bean) {
		this.bean = bean;
	}

}
