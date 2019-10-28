package com.rt.logic.arena.handler;

import javax.servlet.http.HttpServletRequest;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.LaunchChallengeRequest_10022;

/**
 * 发起挑战
 *
 */
public class LaunchChallengeHandler implements IHandler {

	@Override
	public void handler(Message msg, HttpServletRequest request, Response response) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		LaunchChallengeRequest_10022 req = msg.getBody();
		long otherPlayerId = req.getOtherPlayerId();
		player.getArena().launchFight(player, otherPlayerId, response);
	}

	@Override
	public Object initBodyClass() {
		return LaunchChallengeRequest_10022.class;
	}

}
