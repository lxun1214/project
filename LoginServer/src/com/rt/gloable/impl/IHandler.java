package com.rt.gloable.impl;

import javax.servlet.http.HttpServletResponse;

import com.rt.common.Message;

public interface IHandler {
	public void handler(Message msg,HttpServletResponse response) throws Throwable;

	/**
	 * 初始化消息体对象
	 */
	public abstract Object initBodyClass();

}
