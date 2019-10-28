package com.rt.gloable.impl;

import com.google.protobuf.MessageLite;

/**
 * 消息体管理器接口
 */
public interface IMessageManager<M, N> {
	/**
	 * 获取消息体
	 * 
	 * @param msgCla
	 * @param body
	 * @return
	 */
	public abstract MessageLite getBody(Class<M> msgCla, byte[] body);

	/**
	 * 增加一个消息体对象
	 * 
	 * @param modelId
	 * @param actionId
	 * @param msgCla
	 */
	public abstract void addMessageCla(int cmd, Class<M> msgCla);

	/**
	 * 二进制转对象
	 * 
	 * @param modelId
	 * @param actionId
	 * @param body
	 * @return
	 */
	public abstract N getMessage(int cmd, byte[] body);

	/**
	 * 根据 moduleid和actionid获得消息对象
	 * 
	 * @param modelId
	 * @param actionId
	 * @return
	 */
	public N getMessage(int cmd);
}