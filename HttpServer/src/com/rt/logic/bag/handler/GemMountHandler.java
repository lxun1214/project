package com.rt.logic.bag.handler;

import javax.servlet.http.HttpServletRequest;

import com.rt.cache.GameCache;
import com.rt.common.GameConst;
import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GemMountRequest_10014;

/**
 * 宝石镶嵌
 */
public class GemMountHandler implements IHandler {

	@Override
	public void handler(Message msg, HttpServletRequest request, Response response) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		GemMountRequest_10014 req = msg.getBody();
		int columnLoc = req.getColumnLoc();
		int grooveLoc = req.getGrooveLoc();
		long uuid = req.getUuid();

		if(columnLoc < 0 || columnLoc >= GameConst.EQUIP_COLUMN_SIZE) {
			return;
		}
		if(grooveLoc < 0 || grooveLoc >= GameConst.GEM_GROOVE_SIZE) {
			return;
		}
		player.getEquipmentColumn().gemMount(player, columnLoc, grooveLoc, uuid, response);
	}

	@Override
	public Object initBodyClass() {
		return GemMountRequest_10014.class;
	}

}
