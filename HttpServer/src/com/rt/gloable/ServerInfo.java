package com.rt.gloable;

import java.sql.Date;

public class ServerInfo {
	/** 服务器状态 1:开启 2停服 */
	private static int serverState;
	/** 服务器id */
	private static int serverId;
	/** 开服时间 */
	private static Date openTime;
	/** 登陆服务器地址 */
	private static String loginServerUrl;

	private static String log_server_appId;

	private static String log_server_name;

	private static String log_server_file;

	private static int log_server_logFileNum;

	private static int log_server_dataFileNum;

	private static String open_code_box_url;
	
	private static String open_cdk_code_box_url;
	
	private static String log_usernae;
	
	private static String log_password;
	

	public static String getOpen_cdk_code_box_url() {
		return open_cdk_code_box_url;
	}

	public static void setOpen_cdk_code_box_url(String open_cdk_code_box_url) {
		ServerInfo.open_cdk_code_box_url = open_cdk_code_box_url;
	}
	
	public static String getLog_usernae() {
		return log_usernae;
	}

	public static void setLog_usernae(String log_usernae) {
		ServerInfo.log_usernae = log_usernae;
	}

	public static String getLog_password() {
		return log_password;
	}

	public static void setLog_password(String log_password) {
		ServerInfo.log_password = log_password;
	}

	public static String getOpen_code_box_url() {
		return open_code_box_url;
	}

	public static void setOpen_code_box_url(String open_code_box_url) {
		ServerInfo.open_code_box_url = open_code_box_url;
	}

	public static String getLog_server_appId() {
		return log_server_appId;
	}

	public static void setLog_server_appId(String log_server_appId) {
		ServerInfo.log_server_appId = log_server_appId;
	}

	public static String getLog_server_name() {
		return log_server_name;
	}

	public static void setLog_server_name(String log_server_name) {
		ServerInfo.log_server_name = log_server_name;
	}

	public static String getLog_server_file() {
		return log_server_file;
	}

	public static void setLog_server_file(String log_server_file) {
		ServerInfo.log_server_file = log_server_file;
	}

	public static int getLog_server_logFileNum() {
		return log_server_logFileNum;
	}

	public static void setLog_server_logFileNum(int log_server_logFileNum) {
		ServerInfo.log_server_logFileNum = log_server_logFileNum;
	}

	public static int getLog_server_dataFileNum() {
		return log_server_dataFileNum;
	}

	public static void setLog_server_dataFileNum(int log_server_dataFileNum) {
		ServerInfo.log_server_dataFileNum = log_server_dataFileNum;
	}

	public static int getServerState() {
		return serverState;
	}

	public static void setServerState(int serverState) {
		ServerInfo.serverState = serverState;
	}

	public static int getServerId() {
		return serverId;
	}

	public static void setServerId(int serverId) {
		ServerInfo.serverId = serverId;
	}

	public static String getLoginServerUrl() {
		return loginServerUrl;
	}

	public static void setLoginServerUrl(String loginServerUrl) {
		ServerInfo.loginServerUrl = loginServerUrl;
	}

	public static Date getOpenTime() {
		return openTime;
	}

	public static void setOpenTime(Date openTime) {
		ServerInfo.openTime = openTime;
	}

}
