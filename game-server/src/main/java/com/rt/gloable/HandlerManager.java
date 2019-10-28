package com.rt.gloable;

import java.util.HashMap;
import java.util.Map;

import com.rt.gloable.impl.IHandler;
import com.rt.gloable.impl.IHandlerManager;

/**
 * 业务处理管理类
 * @author xin.fengtao
 *
 */
public class HandlerManager implements IHandlerManager {

	private final Map<Integer, IHandler> handlerMap = new HashMap<Integer, IHandler>();

	/**
	 * 增加一个业务处理类
	 * 
	 * @param modelId
	 * @param actionId
	 * @param handler
	 */
	public void addHandler(int cmd, IHandler handler) {
		handlerMap.put(cmd, handler);
	}

	/**
	 * 获取一个业务处理类
	 * 
	 * @param modelId
	 * @param actionId
	 * @return
	 */
	public IHandler getHandler(int cmd) {
		return handlerMap.get(cmd);
	}

}
