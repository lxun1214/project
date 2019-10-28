package com.rt.gloable.impl;

import javax.servlet.http.HttpServletRequest;

import com.rt.common.Message;
import com.rt.gloable.Response;

public interface IHandler {
	
	public void handler(Message msg,HttpServletRequest request,Response response) throws Throwable;

	/**
	 * 初始化消息体对象
	 */
	public abstract Object initBodyClass();

}
