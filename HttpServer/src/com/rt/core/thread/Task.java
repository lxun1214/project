package com.rt.core.thread;

import javax.servlet.http.HttpServletRequest;

import com.rt.common.Message;
import com.rt.gloable.Response;
import com.rt.gloable.impl.IHandler;

public class Task implements Runnable {
	
	IHandler handler;

	Message msg;

	HttpServletRequest request;

	Response response_;
	
	long paraId;

	public Task(IHandler handler, Message msg, HttpServletRequest request, Response response_,long paraId) {
		this.handler = handler;
		this.msg = msg;
		this.request = request;
		this.response_ = response_;
		this.paraId = paraId;
	}

	@Override
	public void run() {
		try {
			handler.handler(msg, request, response_);
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}

	public long getParaId() {
		return paraId;
	}

	public void setParaId(long paraId) {
		this.paraId = paraId;
	}
	
}
