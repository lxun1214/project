package com.rt.log;

import java.io.IOException;

import org.apache.log4j.Logger;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.MessageProperties;
import com.rt.gloable.ServerInfo;

/**
 * 日志服务器连接初始化
 * 
 */
public class LogServer {
	
	public static ConnectionFactory factory;
	public static Channel channel;
	public static Connection connection;
	public static String endPointName;

	private static Logger logger = Logger.getLogger(LogServer.class);

	public static String ip="123.56.50.111";

	public static int port=5672;
	

	// /**
	// * 是否启用日志服务器连接
	// */
	// public boolean isStartup = false;
	//
	// public LogServer(int startup) {
	// if (startup == 1) {
	// this.isStartup = true;
	// }
	// }

	/**
	 * 初始化
	 */
	public static boolean init() {
		// 初始化连接对象
		factory = new ConnectionFactory();
		factory.setHost(ip);
		factory.setPort(port);
        factory.setUsername(ServerInfo.getLog_usernae());
        factory.setPassword(ServerInfo.getLog_password());
		try {
			connection = factory.newConnection();
			channel = connection.createChannel();
			logger.info("Log Server Init Successful.");
			return true;
		} catch (Exception e) {
			logger.info("Log Server Connect Fail");
		}
		return false;
	}

	/**
	 * 断线重连或持续连接, 如果开启了日志服务器
	 */
	public void onTime() {
		// if (this.isStartup) {
		if (connection == null || !connection.isOpen()) {
			// 连接
			if (!init()) {
				logger.info("Try connecting again the server log");
			}
		}
		// }
	}
	
	/** 发送消息到日志服务器 */
	public static void sendToLog(LogInfo log) {

		if (connection == null || !connection.isOpen())
			return;
		if (channel == null || !channel.isOpen())
			return;
		try {
			String queueName = log.getQueueName();
			String message = log.getMessage();
			channel.queueDeclare(queueName, true, false, false, null);
			channel.basicPublish("", queueName, MessageProperties.PERSISTENT_TEXT_PLAIN, message.getBytes("UTF-8"));
			// System.err.println(" [x] Sent to'" + "|" + queueName + "|" +
			// message + "'");
		} catch (IOException e) {
			logger.info("Log Server send msg err");
		}
	}

	public static void close() {
		try {
			channel.close();
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
