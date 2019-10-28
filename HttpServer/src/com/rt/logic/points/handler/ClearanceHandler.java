package com.rt.logic.points.handler;

import javax.servlet.http.HttpServletRequest;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.logic.points.PointsManager;

/**
 * 过关
 */
public class ClearanceHandler implements IHandler{

	@Override
	public void handler(Message msg, HttpServletRequest request, Response response) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if(player == null) {
			return;
		}
		PointsManager.getInstance().clearance(player, response);
	}

	@Override
	public Object initBodyClass() {
		return null;
	}

}
