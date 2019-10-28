package com.rt.gloable;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import com.google.protobuf.GeneratedMessage;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.MessageLite;
import com.rt.gloable.impl.IMessageManager;

/**
 * 消息体管理类 通过配置或者程序注入的方式 根据 moduleid和actionid以及二进制协议可以得到对应的消息体
 * @author xin.fengtao
 *
 */
public class PBMessageManager implements IMessageManager<GeneratedMessage, MessageLite> {

	// private static final Logger log =
	// Logger.getLogger(PBMessageManager.class);

	private Map<Class<? extends GeneratedMessage>, MessageLite> bodyMap = new HashMap<Class<? extends GeneratedMessage>, MessageLite>();

	private Map<Integer, MessageLite> messageMap = new HashMap<Integer, MessageLite>();

	public MessageLite getMessage(int cmd, byte[] body) {
		try {
			MessageLite list = messageMap.get(cmd);
			if (list == null)
				return null;
			return list.newBuilderForType().mergeFrom(body).build();
		} catch (InvalidProtocolBufferException e) {
			// log.error(e);
			e.printStackTrace();
		}
		return null;
	}

	public MessageLite getMessage(int cmd) {
		MessageLite list = messageMap.get(cmd);
		return list;
	}

	public MessageLite getBody(Class<GeneratedMessage> msgCla, byte[] body) {
		if (msgCla == null)
			return null;
		if (body == null || body.length == 0)
			return null;
		MessageLite lite = bodyMap.get(msgCla);
		if (lite == null) {
			try {
				Method method = msgCla.getMethod("getDefaultInstance");
				lite = (MessageLite) method.invoke(null);
			} catch (Exception e) {
				// log.error(e);
				e.printStackTrace();
			}
			bodyMap.put(msgCla, lite);
		}
		;
		try {
			return lite.newBuilderForType().mergeFrom(body).build();
		} catch (InvalidProtocolBufferException e) {
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void addMessageCla(int cmd, Class msgCla) {
		try {
			if (msgCla == null)
				return;
			Method method = msgCla.getMethod("getDefaultInstance");
			MessageLite lite = (MessageLite) method.invoke(null);
			messageMap.put(cmd, lite);
		} catch (Throwable e) {
			// log.error(e);
			e.printStackTrace();
		}
	}

}
