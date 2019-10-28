package com.rt.timer;

import java.util.Map;
import java.util.TimerTask;

import com.rt.cache.GameCache;
import com.rt.common.GameConst;
import com.rt.gloable.WebSocket;

public class HeartBeatTimerTask extends TimerTask {

	@Override
	public void run() {
		long curTime = System.currentTimeMillis();
		Map<Long, WebSocket> userIdWsMap = GameCache.userIdWsMap;
		for (Map.Entry<Long, WebSocket> entry : userIdWsMap.entrySet()) {
			WebSocket socket = entry.getValue();
			// 超过两次心跳断开连接
			if (socket.getLastOperateTime() + GameConst.HERAT_BEAT_TIME * 2 < curTime) {
				socket.colseSession();
			}
		}
	}
	

}
