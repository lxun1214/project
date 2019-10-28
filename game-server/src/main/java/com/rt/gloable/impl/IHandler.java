package com.rt.gloable.impl;

import com.rt.common.Message;

public interface IHandler {
	
	public void handler(Message msg) throws Throwable;

	/**
	 * 初始化消息体对象
	 */
	public abstract Object initBodyClass();

}
