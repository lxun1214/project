package com.rt.logic.bag.handler;

import javax.servlet.http.HttpServletRequest;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ReinforcedEquipRequest_10010;

/**
 * 装备升阶
 *
 */
public class ReinforcedEquipmentHandler implements IHandler {

	@Override
	public void handler(Message msg, HttpServletRequest request, Response response) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		ReinforcedEquipRequest_10010 req = msg.getBody();
		int itemId = req.getItemId();

		player.getEquipmentColumn().reinforcedEquipment(player, itemId, response);
	}

	@Override
	public Object initBodyClass() {
		return ReinforcedEquipRequest_10010.class;
	}

}
