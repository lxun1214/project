package com.rt.common;

/**
 * 服务器之间通讯消息号
 * @author xin.fengtao
 *
 */
public class S2SMessageNum {
	/**游戏服务器启动注册到登陆服务器*/
	public static final int SERVER_REGIST = 101;
	/**游戏服务器停服，发送消息到登录服务器**/
	public static final int SERVER_STOP = 102;
}
