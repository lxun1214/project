package com.rt.log;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class LogManager {

	static LogManager instance;

	ExecutorService executorService;

	public static LogManager getInstance() {
		if (instance == null) {
			instance = new LogManager();
		}
		return instance;
	}

	public void init() {
		executorService = Executors.newSingleThreadExecutor();// 单线程
		LogServer.init();
	}
	
	public void shutDown(){
		executorService.shutdown();
		LogServer.close();
	}

	/**
	 * 发送日志
	 * @param queueName
	 * @param message
	 */
	public void sendLog(String queueName,String message) {
		BaseTask task = createLogTask(queueName, message);
		executorService.execute(task);
	}

	/**
	 * 创建日志任务
	 * @param queueName
	 * @param message
	 * @return
	 */
	public BaseTask createLogTask(String queueName,String message) {
		LogInfo logInfo = new LogInfo();
		logInfo.setQueueName(queueName);
		logInfo.setMessage(message);
		BaseTask task = new BaseTask(logInfo);

		return task;
	}

}
