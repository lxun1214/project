package com.rt.handler;

import javax.servlet.http.HttpServletResponse;

import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.UserLogic;
import com.rt.pb.PbUser.UserLoginRequest_1002;

/**
 * 用户登陆
 * @author xin.fengtao
 *
 */
public class UserLoginHandler implements IHandler{

	@Override
	public void handler(Message msg, HttpServletResponse response) throws Throwable {
		UserLoginRequest_1002 req = msg.getBody();
		String accountName = req.getAccountName();
		String password = req.getPassWord();
		
		UserLogic.getInstance().userLogin(accountName, password, response);
		
	}

	@Override
	public Object initBodyClass() {
		return UserLoginRequest_1002.class;
	}

}
