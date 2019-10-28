package com.rt.logic.points.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.logic.points.PointsManager;

/**
 * 过关
 */
public class ClearanceHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		PointsManager.getInstance().clearance(player);
	}

	@Override
	public Object initBodyClass() {
		return null;
	}

}
