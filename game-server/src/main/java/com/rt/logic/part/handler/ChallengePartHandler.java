package com.rt.logic.part.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ChallengePartRequest_10028;

/**
 * 请求进入副本
 * @author Administrator
 *
 */
public class ChallengePartHandler  implements IHandler{

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		ChallengePartRequest_10028 req = msg.getBody();
		int partId = req.getPartId();
		player.getPart().challengePart(player, partId);
	}

	@Override
	public Object initBodyClass() {
		return ChallengePartRequest_10028.class;
	}

}
