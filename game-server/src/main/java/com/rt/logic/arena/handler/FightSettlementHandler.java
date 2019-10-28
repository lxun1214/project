package com.rt.logic.arena.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.FightSettlementRequest_10023;

/**
 * 战斗结算
 *
 */
public class FightSettlementHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		FightSettlementRequest_10023 req = msg.getBody();
		boolean isVictory = req.getIsVictory();
		player.getArena().fightSettlement(player, isVictory);
	}

	@Override
	public Object initBodyClass() {
		return FightSettlementRequest_10023.class;
	}

}
