package com.rt.code;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;

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

	@Override
	public Message decode(HttpServletRequest request) throws Exception {

		Message msg = new Message();

		InputStream in = request.getInputStream();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int len = 0;
		byte[] b = new byte[1024];
		while ((len = in.read(b, 0, b.length)) != -1) {
			baos.write(b, 0, len);
		}
		byte[] buffer = baos.toByteArray();

		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder = baseBuilder.mergeFrom(buffer);
		int cmd = baseBuilder.getCmd();
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
			log.error("没有获得对应的消息体cmd:" + msg.getCmd());
		}
		baos = null;
		buffer = null;
		body = null;

		return msg;
	}
}
