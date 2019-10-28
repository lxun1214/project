package com.rt.logic.arena.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GetRankingsPowerRequest_10025;

/**
 * 获取战力排行榜
 *
 */
public class GetRankingsPowerHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getArena().getPowerRanings(player);
	}

	@Override
	public Object initBodyClass() {
		return GetRankingsPowerRequest_10025.class;
	}

}
