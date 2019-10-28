package com.rt.gm;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GmRequest_100;

public class GMHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		GmRequest_100 req = msg.getBody();

		String command = req.getCommand();
		String parameter = null;
		if (req.hasParameter()) {
			parameter = req.getParameter();
		}
		GMRegister.GMMap.get(command).executor(player, parameter);
	}

	@Override
	public Object initBodyClass() {
		return GmRequest_100.class;
	}

}
