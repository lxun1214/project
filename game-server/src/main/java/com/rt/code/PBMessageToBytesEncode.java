package com.rt.code;

import java.nio.ByteBuffer;

import com.google.protobuf.MessageLite;
import com.rt.common.Message;
import com.rt.pb.BasePack.BaseMessage;

/**
 * 编码
 * @author xin.fengtao
 *
 */
public class PBMessageToBytesEncode {

	public static ByteBuffer encode(Message msg){

		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			
			baseBuilder.setCmd(msg.getCmd());
			MessageLite.Builder bodyBuilder = msg.getBody();
			baseBuilder.setBody(bodyBuilder.build().toByteString());
			byte[] bytes = baseBuilder.build().toByteArray();
//			ByteBuffer buffer = ByteBuffer.allocate(bytes.length);
//			buffer.put(bytes).flip();
			ByteBuffer buffer = ByteBuffer.wrap(bytes);
			System.out.println(buffer);
			return buffer;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}finally{
			msg = null;
		}
	}
}
