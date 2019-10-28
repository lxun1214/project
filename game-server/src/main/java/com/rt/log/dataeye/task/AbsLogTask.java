package com.rt.log.dataeye.task;

import org.apache.log4j.Logger;

import com.dataeye.sdk.client.DCAgent;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.PlayerLogModel;

/**
 * 日志异步发送
 *
 */
public abstract class AbsLogTask implements Runnable {

	protected PlayerLogModel model;
	
	protected DCAgent dcAgent;
	 
	protected BaseLogModel t;

	Logger log = Logger.getLogger(getClass());
	
	public AbsLogTask(DCAgent dcAgent, PlayerLogModel model,BaseLogModel t) {
		this.dcAgent = dcAgent;
		this.model = model;
		this.t=t;
	}

	@Override
	public void run() {
		execute();
	}

	public abstract void execute();

	public void setModel(PlayerLogModel model) {
		this.model = model;
	}

}
