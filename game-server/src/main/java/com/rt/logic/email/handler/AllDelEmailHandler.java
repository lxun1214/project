package com.rt.logic.email.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.AllDelEmailRequest_10041;

/**
 * 一键删除邮件
 * @author MaHaiDong
 * 2018年7月1日
 *
 */
public class AllDelEmailHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getPlayerEmail().delAllEmail(player);
	}

	@Override
	public Object initBodyClass() {
		return AllDelEmailRequest_10041.class;
	}

}
