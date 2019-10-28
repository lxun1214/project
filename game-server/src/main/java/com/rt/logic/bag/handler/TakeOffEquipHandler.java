package com.rt.logic.bag.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.TakeOffEquipRequest_10031;

/**
 *  脱装备
 */
public class TakeOffEquipHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		TakeOffEquipRequest_10031 req = msg.getBody();
		int loc = req.getLoc();
		player.getEquipmentColumn().takeOffEquip(player, loc);
	}

	@Override
	public Object initBodyClass() {
		return TakeOffEquipRequest_10031.class;
	}

}
