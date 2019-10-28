package com.rt.handler;

import javax.servlet.http.HttpServletResponse;

import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.ServerLogic;
import com.rt.pb.PbSs.GameServerStartRequest;

/**
 * 停服
 * @author MaHaiDong
 *
 */
public class GameServerStopHandler  implements IHandler{

	@Override
	public void handler(Message msg, HttpServletResponse response) throws Throwable {
		ServerLogic.getInstance().gameServerStop(msg,response);
	}

	@Override
	public Object initBodyClass() {
		return GameServerStartRequest.class;
	}

}
