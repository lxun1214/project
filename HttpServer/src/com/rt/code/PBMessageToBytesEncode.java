package com.rt.code;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import com.google.protobuf.MessageLite;
import com.rt.common.Message;
import com.rt.pb.BasePack.BaseMessage;

/**
 * 编码
 * @author xin.fengtao
 *
 */
public class PBMessageToBytesEncode {

	public static void encode(ByteArrayOutputStream bos, Message msg){

		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();

		baseBuilder.setCmd(msg.getCmd());
		MessageLite.Builder bodyBuilder = msg.getBody();
		baseBuilder.setBody(bodyBuilder.build().toByteString());

		byte[] bytes = baseBuilder.build().toByteArray();
		try {
			bos.write(bytes);
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			bytes = null;
			msg = null;
		}
	}
}
