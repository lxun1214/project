package com.rt.logic.bag.handler;

import com.rt.cache.GameCache;
import com.rt.common.GameConst;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GemRemoveRequest_10015;

/**
 * 宝石摘除
 */
public class GemRemoveHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		GemRemoveRequest_10015 req = msg.getBody();
		int columnLoc = req.getColumnLoc();
		int grooveLoc = req.getGrooveLoc();
		if (columnLoc < 0 || columnLoc >= GameConst.EQUIP_COLUMN_SIZE) {
			return;
		}
		if (grooveLoc < 0 || grooveLoc >= GameConst.GEM_GROOVE_SIZE) {
			return;
		}
		player.getEquipmentColumn().gemRemove(player, columnLoc, grooveLoc);

	}

	@Override
	public Object initBodyClass() {
		return GemRemoveRequest_10015.class;
	}

}
