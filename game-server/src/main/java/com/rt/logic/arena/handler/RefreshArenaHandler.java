package com.rt.logic.arena.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.RefreshArenaRequest_10030;

/**
 * 刷新竞技场三位挑战者
 * @author Administrator
 *
 */
public class RefreshArenaHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getArena().refreshArena(player);
	}

	@Override
	public Object initBodyClass() {
		return RefreshArenaRequest_10030.class;
	}

}