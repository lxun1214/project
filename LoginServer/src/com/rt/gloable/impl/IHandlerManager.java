package com.rt.gloable.impl;

/**
 * 业务处理类管理类
 */
public interface IHandlerManager {

	/**
	 * 增加一个业务处理类
	 * 
	 * @param modelId
	 * @param actionId
	 * @param handler
	 */
	public abstract void addHandler(int cmd, IHandler handler);

	/**
	 * 获取一个业务处理类
	 * 
	 * @param modelId
	 * @param actionId
	 * @return
	 */
	public abstract IHandler getHandler(int cmd);

}