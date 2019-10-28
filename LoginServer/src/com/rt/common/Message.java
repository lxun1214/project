package com.rt.common;

/**
 * 基础消息类
 * @author xin.fengtao
 *
 */
public class Message {

	/**消息编号 */
	private int cmd;

	/** PB消息体*/
	private Object body;

	public int getCmd() {
		return cmd;
	}
	
	
	public void setCmd(int cmd) {
		this.cmd = cmd;
	}

	@SuppressWarnings("unchecked")
	public <T> T getBody() {
		return (T) body;
	}

	public void setBody(Object body) {
		this.body = body;
	}

}
