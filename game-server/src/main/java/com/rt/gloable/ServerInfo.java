package com.rt.gloable;

import java.util.Date;

public class ServerInfo {
	/** 服务器状态 1:开启 2停服 */
	public static int serverState;
	/** 服务器id */
	public static int serverId;
	/** 开服时间 */
	public static Date openTime;
	/** 登陆服务器地址 */
	public static String loginServerUrl;
	
	//////////////dataete/////////////
	public static String baseDir;
	public static int logFileNum;
	public static int dataFileNum;
	public static String dataEyeAppId;

	
	///////////recharge////////////
	/**充值服务器注册地址*/
	public static String rechargeServerUrl;
	/**当前服务器接收充值服务器消息地址*/
	public static String rechargeNotifyUrl;
	/**向充值服务器创建订单地址*/
	public static String rechargeServerCreateOrder;
	
	
	
}
