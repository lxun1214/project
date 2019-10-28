package com.rt.logic.player.handler;

import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.user.UserLogic;
import com.rt.pb.PbPlayer.CreatePlayerRequest_10002;

public class CreatePlayerHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		UserLogic.getInstance().createPlayer(msg);
	}

	@Override
	public Object initBodyClass() {
		return CreatePlayerRequest_10002.class;
	}

}
