package com.rt.log.dataeye;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.dataeye.sdk.client.DCAgent;
import com.rt.gloable.ServerInfo;
import com.rt.log.dataeye.task.AbsLogTask;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.PlayerLogModel;

/**
 * dataEye日志发送
 * 
 * @author Mr.Ma version-2017
 *
 */
public class HttpLogServer {

	static DCAgent dcAgent;

	static ExecutorService executor = Executors.newSingleThreadExecutor();
	
	static{
		// 服务器名
		String svrName = String.valueOf(ServerInfo.serverId);
		// SDK文件存储目录，保证有5G以上的空间
		String baseDir =ServerInfo.baseDir;
		// SDK运行日志保存的最大天数
		int logFileNum = ServerInfo.logFileNum;
		// SDK保存的最大文件数目
		int dataFileNum = ServerInfo.dataFileNum;
		
		DCAgent.setBaseConf(svrName, baseDir, logFileNum, dataFileNum);
		dcAgent = DCAgent.getInstance(ServerInfo.dataEyeAppId);
	}
	
	/**
	 * 发送dataeye日志
	 * @param task
	 */
	public static void sendLog(int logType,PlayerLogModel model,BaseLogModel t){
		AbsLogTask task = LogTaskFactory.createLogTask(logType, model,t);
		executor.execute(task);
	}
}
