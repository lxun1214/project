package com.rt.common;

import com.rt.gloable.WebSocket;

/**
 * 基础消息类
 * 
 * @author xin.fengtao
 *
 */
public class Message {

	/** 消息编号 */
	private int cmd;

	/** PB消息体 */
	private Object body;

	private String broadCast = null;
	
	private WebSocket socket;
	
	public int getCmd() {
		return cmd;
	}

	public void setCmd(int cmd) {
		this.cmd = cmd;
	}

	@SuppressWarnings("unchecked")
	public <T> T getBody() {
		return (T) body;
	}

	public void setBody(Object body) {
		this.body = body;
	}

	public long getUserId() {
		return socket.getUserId();
	}
	
	public void setUserId(long userId) {
		socket.setUserId(userId);
	}

	public long getPlayerId() {
		return socket.getPlayerId();
	}
	
	public void setPlayerId(long playerId) {
		socket.setPlayerId(playerId);
	}

	public String getBroadCast() {
		return broadCast;
	}

	public void setBroadCast(String broadCast) {
		this.broadCast = broadCast;
	}

	public WebSocket getSocket() {
		return socket;
	}

	public void setSocket(WebSocket socket) {
		this.socket = socket;
	}

}
