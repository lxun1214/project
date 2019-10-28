package com.rt.handler.init;

import com.rt.common.C2SMessageNum;
import com.rt.common.S2SMessageNum;
import com.rt.gloable.GloableService;
import com.rt.gloable.impl.IHandler;
import com.rt.handler.GameServerStartHandler;
import com.rt.handler.GameServerStopHandler;
import com.rt.handler.GetServerListHandler;
import com.rt.handler.GetServerUrlHandler;
import com.rt.handler.SDKUserLoginHandler;
import com.rt.handler.UserLoginHandler;

/**
 * handler消息注册
 * @author xin.fengtao
 *
 */
public class HandlerRegister {

	public static void init(GloableService service) {
		
		initHandler(service, S2SMessageNum.SERVER_REGIST, new GameServerStartHandler());
		initHandler(service, S2SMessageNum.SERVER_STOP, new GameServerStopHandler());

//		initHandler(service, C2SMessageNum.USER_REGIST, new UserRegistHandler());
		initHandler(service, C2SMessageNum.USER_LOGIN, new UserLoginHandler());
		initHandler(service, C2SMessageNum.GET_SERVER_LIST, new GetServerListHandler());
		initHandler(service, C2SMessageNum.GET_SERVER_URL, new GetServerUrlHandler());
		initHandler(service, C2SMessageNum.SDK_USER_LOGIN, new SDKUserLoginHandler());
	}

	@SuppressWarnings({ "unchecked" })
	private static void initHandler(GloableService service, int cmd, IHandler handler) {
		service.getHandlerManager().addHandler(cmd, handler);
		service.getPbMessageManager().addMessageCla(cmd, (Class<IHandler>) handler.initBodyClass());
	}

}
