package com.rt.code;

import java.nio.ByteBuffer;

import org.apache.log4j.Logger;

import com.google.protobuf.GeneratedMessage;
import com.google.protobuf.MessageLite;
import com.rt.code.impl.IDecode;
import com.rt.common.Message;
import com.rt.gloable.impl.IMessageManager;
import com.rt.pb.BasePack.BaseMessage;

/**
 * 解码
 * 
 * @author xin.fengtao
 */
public class PBMessageToPBDecode implements IDecode {

	public static Logger log = Logger.getLogger(PBMessageToPBDecode.class);

	private IMessageManager<GeneratedMessage, MessageLite> pbMessageManager;

	public void setPbMessageManager(IMessageManager<GeneratedMessage, MessageLite> pbMessageManager) {
		this.pbMessageManager = pbMessageManager;
	}

	public Message decode(ByteBuffer buffer) throws Exception {
		Message msg = new Message();

		byte[] bytes = new byte[buffer.limit()];
		buffer.get(bytes);
		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder = baseBuilder.mergeFrom(bytes);
		int cmd = baseBuilder.getCmd();
		// if (baseBuilder.hasUuid()) {
		// String UUID = baseBuilder.getUuid();
		// msg.setUUID(UUID);
		// }
		byte[] body = baseBuilder.getBody().toByteArray();
		msg.setCmd(cmd);
		MessageLite lite = pbMessageManager.getMessage(msg.getCmd());
		if (lite != null) {
			MessageLite.Builder builder = lite.newBuilderForType();
			builder = builder.mergeFrom(body);
			msg.setBody(builder.build());
			builder = null;
			lite = null;
		} else {
			log.info("没有获得对应的消息体cmd:" + msg.getCmd());
		}
		buffer.clear();
		body = null;
		return msg;
	}
}
