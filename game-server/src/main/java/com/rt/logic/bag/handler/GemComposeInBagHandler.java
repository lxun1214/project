package com.rt.logic.bag.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GemComposeInBagRequest_10016;

/**
 * 合成背包中的宝石
 */
public class GemComposeInBagHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		GemComposeInBagRequest_10016 req = msg.getBody();
		int itemId = req.getItemId();

		player.getBag().gemCompose(player, itemId);
	}

	@Override
	public Object initBodyClass() {
		return GemComposeInBagRequest_10016.class;
	}

}
