package com.rt.common;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import com.rt.code.PBMessageToBytesEncode;
import com.rt.gloable.Response;
import com.rt.pb.BasePack.ErrorMessage_10;

/**
 * 向客户端消息返回
 * @author xin.fengtao
 *
 */
public class ResponseMsg{

	public static void sendMsg(Message msg, Response response){
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		PBMessageToBytesEncode.encode(bos, msg);
		OutputStream out = null;
		try {
			out = response.getResponse().getOutputStream();
			out.write(bos.toByteArray());
			out.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				if(out != null){
					out.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	public static void sendErrorMsg(int errorCode,Response response){
		ErrorMessage_10.Builder builder = ErrorMessage_10.newBuilder();
		builder.setErrorCode(errorCode);
		
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ERROR_MSG);
		msg.setBody(builder);
		sendMsg(msg, response);
	}
	
}
