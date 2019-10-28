package com.rt.logic.player.handler;

import javax.servlet.http.HttpServletRequest;

import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.user.UserLogic;

/**
 * 获取随机名字
 */
public class GetRandomNameHandler implements IHandler{

	@Override
	public void handler(Message msg, HttpServletRequest request, Response response) throws Throwable {
		
		UserLogic.getInstance().getRandomName(response);
	} 

	@Override
	public Object initBodyClass() {
		return null;
	}

}
