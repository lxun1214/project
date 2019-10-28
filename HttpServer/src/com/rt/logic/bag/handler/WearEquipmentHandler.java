package com.rt.logic.bag.handler;

import javax.servlet.http.HttpServletRequest;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.WearEquipRequest_10008;

/**
 * 穿装备
 */
public class WearEquipmentHandler implements IHandler{

	@Override
	public void handler(Message msg, HttpServletRequest request, Response response) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if(player == null) {
			return;
		}
		WearEquipRequest_10008 req = msg.getBody();
		long uuid = req.getUuid();
		player.getEquipmentColumn().wearEquip(player, uuid, response);
	}

	@Override
	public Object initBodyClass() {
		return WearEquipRequest_10008.class;
	}

}
