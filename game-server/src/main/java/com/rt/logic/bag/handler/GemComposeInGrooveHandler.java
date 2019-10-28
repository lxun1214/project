package com.rt.logic.bag.handler;

import com.rt.cache.GameCache;
import com.rt.common.GameConst;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GemComposeInGrooveRequest_10017;

/**
 * 合成镶嵌在宝石槽的宝石
 */
public class GemComposeInGrooveHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		GemComposeInGrooveRequest_10017 req = msg.getBody();
		int columnLoc = req.getColumnLoc();
		int grooveLoc = req.getGrooveLoc();
		if (columnLoc < 0 || columnLoc >= GameConst.EQUIP_COLUMN_SIZE) {
			return;
		}
		if (grooveLoc < 0 || grooveLoc >= GameConst.GEM_GROOVE_SIZE) {
			return;
		}
		player.getEquipmentColumn().gemComposeInGroove(player, columnLoc, grooveLoc);

	}

	@Override
	public Object initBodyClass() {
		return GemComposeInGrooveRequest_10017.class;
	}

}
