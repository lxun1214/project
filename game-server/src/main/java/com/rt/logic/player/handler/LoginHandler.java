package com.rt.logic.player.handler;

import com.rt.common.Message;
import com.rt.gloable.ServerInfo;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.user.UserLogic;
import com.rt.pb.PbPlayer.LoginRequest_10001;

public class LoginHandler implements IHandler {
	@Override
	public void handler(Message msg) throws Throwable {
		if (ServerInfo.serverState != 1) {
			return;
		}
		UserLogic.getInstance().login(msg);
	}

	@Override
	public Object initBodyClass() {
		return LoginRequest_10001.class;
	}

}
