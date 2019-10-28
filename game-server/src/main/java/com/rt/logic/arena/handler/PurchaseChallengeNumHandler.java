package com.rt.logic.arena.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.PurchaseChallengeNumRequest_10021;

/**
 * 购买竞技场挑战次数
 */
public class PurchaseChallengeNumHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getArena().purchaseChallengeNum(player);
	}

	@Override
	public Object initBodyClass() {
		return PurchaseChallengeNumRequest_10021.class;
	}

}
