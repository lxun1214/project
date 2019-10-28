package com.rt.logic.bag.handler;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.DecomposeEquipmentRequest_10012;

/**
 * 熔炼分解装备
 */
public class DecomposeEquipmentHandler implements IHandler {

	@Override
	public void handler(Message msg, HttpServletRequest request, Response response) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		DecomposeEquipmentRequest_10012 req = msg.getBody();
		List<Long> uuids = req.getUuidsList();
		player.getBag().decomposeEquipment(player, uuids, response);
	}

	@Override
	public Object initBodyClass() {
		return DecomposeEquipmentRequest_10012.class;
	}

}
