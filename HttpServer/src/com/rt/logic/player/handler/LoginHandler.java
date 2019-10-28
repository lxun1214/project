package com.rt.logic.player.handler;

import javax.servlet.http.HttpServletRequest;

import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.ServerInfo;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.user.UserLogic;
import com.rt.pb.PbPlayer.LoginRequest_10001;

public class LoginHandler implements IHandler {
	@Override
	public void handler(Message msg,HttpServletRequest request, Response response) throws Throwable {
		if(ServerInfo.getServerState() != 1){
			return;
		}
		UserLogic.getInstance().login(msg,request, response);
	}

	@Override
	public Object initBodyClass() {
		return LoginRequest_10001.class;
	}

}
