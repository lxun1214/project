package com.rt.logic.arena.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GetRankingsRequest_10024;

/**
 * 获取竞技场排行榜
 *
 */
public class GetRankingsHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getArena().getRankings(player);
	}

	@Override
	public Object initBodyClass() {
		return GetRankingsRequest_10024.class;
	}

}
