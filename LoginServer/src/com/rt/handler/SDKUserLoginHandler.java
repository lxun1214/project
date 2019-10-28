package com.rt.handler;

import javax.servlet.http.HttpServletResponse;

import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.UserLogic;
import com.rt.pb.PbUser.SDKUserLoginRequest_1005;

/**
 * SDK用户登陆
 * @author xin.fengtao
 *
 */
public class SDKUserLoginHandler implements IHandler{

	@Override
	public void handler(Message msg, HttpServletResponse response) throws Throwable {
		SDKUserLoginRequest_1005 req = msg.getBody();
		int sdkType = req.getSdkType();
		String sdkUserId = req.getSdkUserId();
		String ticket = req.getTicket();
		UserLogic.getInstance().sdkUserLogin(sdkType, sdkUserId, ticket, response);
		
	}

	@Override
	public Object initBodyClass() {
		return SDKUserLoginRequest_1005.class;
	}

}
