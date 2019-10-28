package com.rt.handler;

import javax.servlet.http.HttpServletResponse;

import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.ServerLogic;
import com.rt.pb.PbSs.GameServerStartRequest;

public class GameServerStartHandler implements IHandler{

	@Override
	public void handler(Message msg, HttpServletResponse response) throws Throwable {
		ServerLogic.getInstance().gameServerRegist(msg,response);
	}

	@Override
	public Object initBodyClass() {
		return GameServerStartRequest.class;
	}

}
