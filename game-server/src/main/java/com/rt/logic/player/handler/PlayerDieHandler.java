package com.rt.logic.player.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;

/**
 * 死亡
 *
 */
public class PlayerDieHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.playerDie();
	}

	@Override
	public Object initBodyClass() {
		return null;
	}

}
