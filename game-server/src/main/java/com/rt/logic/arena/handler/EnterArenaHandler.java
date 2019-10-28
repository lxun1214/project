package com.rt.logic.arena.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.EnterArenaRequest_10020;

/**
 * 进入竞技场
 *
 */
public class EnterArenaHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getArena().intoArena(player);
	}

	@Override
	public Object initBodyClass() {
		return EnterArenaRequest_10020.class;
	}

}
