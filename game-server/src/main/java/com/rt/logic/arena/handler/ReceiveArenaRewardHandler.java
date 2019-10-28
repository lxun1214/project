package com.rt.logic.arena.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ReceiveArenaRewardRequest_10026;

/**
 * 领取排行奖励
 * @author Administrator
 *
 */
public class ReceiveArenaRewardHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getArena().receiveArenaReward(player);
	}

	@Override
	public Object initBodyClass() {
		return ReceiveArenaRewardRequest_10026.class;
	}

}
