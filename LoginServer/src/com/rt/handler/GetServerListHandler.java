package com.rt.handler;

import javax.servlet.http.HttpServletResponse;

import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.UserLogic;

/**
 * 获取服务器列表
 * @author xin.fengtao
 *
 */
public class GetServerListHandler implements IHandler{

	@Override
	public void handler(Message msg, HttpServletResponse response) throws Throwable {
		UserLogic.getInstance().getServerList(response);
	}

	@Override
	public Object initBodyClass() {
		return null;
	}

}
