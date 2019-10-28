package com.rt.log;

public class BaseTask implements Runnable{

	LogInfo log;
	
	public BaseTask(LogInfo log) {
		this.log = log;
	}
	
	@Override
	public void run() {
		LogServer.sendToLog(log);
	}
}
