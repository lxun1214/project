package com.rt.core.thread;

import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;

public class Task implements Runnable {

	IHandler handler;

	Message msg;

	long paraId;

	public Task(IHandler handler, Message msg, long paraId) {
		this.handler = handler;
		this.msg = msg;
		this.paraId = paraId;
	}

	@Override
	public void run() {
		try {
			handler.handler(msg);
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
