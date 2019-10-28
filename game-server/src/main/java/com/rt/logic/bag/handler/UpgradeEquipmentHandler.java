package com.rt.logic.bag.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.UpgradeEquipRequest_10009;

/**
 * 装备升级
 *
 */
public class UpgradeEquipmentHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		UpgradeEquipRequest_10009 req = msg.getBody();
		int itemId = req.getItemId();

		player.getEquipmentColumn().upgradeEquipment(player, itemId);
	}

	@Override
	public Object initBodyClass() {
		return UpgradeEquipRequest_10009.class;
	}

}
