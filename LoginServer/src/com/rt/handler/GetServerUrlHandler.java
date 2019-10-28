package com.rt.handler;

import javax.servlet.http.HttpServletResponse;

import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.UserLogic;
import com.rt.pb.PbUser.GetServerUrlRequest_1004;

/**
 * 获取服务器url
 * @author xin.fengtao
 *
 */
public class GetServerUrlHandler implements IHandler{

	@Override
	public void handler(Message msg, HttpServletResponse response) throws Throwable {
		UserLogic.getInstance().getServerUrl(msg, response);
	}

	@Override
	public Object initBodyClass() {
		return GetServerUrlRequest_1004.class;
	}

}
