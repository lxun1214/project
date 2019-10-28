package com.rt.gloable;

import java.io.IOException;
import java.nio.ByteBuffer;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.rt.cache.GameCache;

/**
 * @ServerEndpoint
 */
@ServerEndpoint("/websocket")
public class WebSocket {

	private Session session;

	private long playerId;

	private long userId;

	/** 上次操作时间 */
	long lastOperateTime;

	/**
	 * 连接建立成功调用的方法
	 * 
	 * @param session
	 *            可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
	 */
	@OnOpen
	public void onOpen(Session session) {
		this.session = session;
		this.lastOperateTime = System.currentTimeMillis();
	}

	/**
	 * 连接关闭调用的方法，这里只删除连接，不做存库删缓存处理
	 */
	@OnClose
	public void onClose() {
		if (userId > 0) {
			GameCache.userIdWsMap.remove(userId);
			// GameCache.userPoMap.remove(userId);
		}
		if (this.playerId > 0) {
			GameCache.playerWsMap.remove(playerId);
			// GameCache.playerMap.remove(playerId);
		}
	}

	/**
	 * 收到客户端消息后调用的方法
	 * 
	 * @param message
	 *            客户端发送过来的消息
	 * @param session
	 *            可选的参数
	 */
	// @OnMessage
	// public void onMessage(String message, Session session) {
	// System.out.println("来自客户端的消息:" + message);
	// // 群发消息
	// for (WebSocket item : GameCache.sessionIdWsMap.values()) {
	// try {
	// item.sendMessage(message);
	// } catch (IOException e) {
	// e.printStackTrace();
	// continue;
	// }
	// }
	// }

	@OnMessage
	public void onMessage(ByteBuffer data, Session session) {
		// System.out.println("来自客户端的消息:" + data);
		GloableService.getInstance().action(data, this);
	}

	/**
	 * 发生错误时调用
	 * 
	 * @param session
	 * @param error
	 */
	@OnError
	public void onError(Session session, Throwable error) {
		System.out.println("报错了。。。");
		error.printStackTrace();
	}

	public void colseSession() {
		try {
			this.session.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public  void sendMsg(ByteBuffer buffer) {
		synchronized (this) {
			try {
				if (session.isOpen()) {
					//getAsyncRemote为异步发送
					//getBasicRemote为同步发送
					session.getBasicRemote().sendBinary(buffer);
				}
			} catch (Exception e) {
				e.printStackTrace();
				try {
					session.close();
				} catch (IOException e1) {
					e.printStackTrace();
				}
			}
		}
	}

	public long getPlayerId() {
		return playerId;
	}

	public void setPlayerId(long playerId) {
		this.playerId = playerId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

	public long getLastOperateTime() {
		return lastOperateTime;
	}

	public void setLastOperateTime(long lastOperateTime) {
		this.lastOperateTime = lastOperateTime;
	}

}
