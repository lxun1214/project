package com.rt.logic.artifact.handler;

import javax.servlet.http.HttpServletRequest;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ActivationArtifactRequest_10018;

/**
 * 激活神器
 */
public class ActivationArtifactHandler implements IHandler {

	@Override
	public void handler(Message msg, HttpServletRequest request, Response response) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		ActivationArtifactRequest_10018 req = msg.getBody();
		int itemId = req.getItemId();
		player.getArtifact().activationArtifact(player, itemId, response);
	}

	@Override
	public Object initBodyClass() {
		return ActivationArtifactRequest_10018.class;
	}

}
