package com.rt.logic.arena.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GetRankingsMoneyRequest_30002;

public class GetRankingMoneyHandler implements IHandler{
	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getArena().getRankingsToMoney(player);
	}

	@Override
	public Object initBodyClass() {
		return GetRankingsMoneyRequest_30002.class;
	}
}
