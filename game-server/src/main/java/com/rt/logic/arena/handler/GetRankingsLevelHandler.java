package com.rt.logic.arena.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GetRankingsLevelRequest_30001;
import com.rt.pb.PbPlayer.GetRankingsLevelResponse_40001;

public class GetRankingsLevelHandler implements IHandler{
	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getArena().getRankingsToLvl(player);
	}

	@Override
	public Object initBodyClass() {
		return GetRankingsLevelRequest_30001.class;
	}
}
