package com.rt.common;

import java.nio.ByteBuffer;

import com.rt.cache.GameCache;
import com.rt.code.PBMessageToBytesEncode;
import com.rt.gloable.WebSocket;
import com.rt.pb.BasePack.ErrorMessage_10;

/**
 * 向客户端消息返回
 * 
 * @author xin.fengtao
 *
 */
public class ResponseMsg {

	public static void sendMsg(long playerId, Message msg) {
		System.out.println("返回消息："+msg.getCmd());
		ByteBuffer buffer = PBMessageToBytesEncode.encode(msg);
		if(GameCache.playerWsMap.containsKey(playerId)){
			GameCache.playerWsMap.get(playerId).sendMsg(buffer);
		}
	}

	public static void sendMsg(WebSocket socket, Message msg) {
		ByteBuffer buffer = PBMessageToBytesEncode.encode(msg);
		socket.sendMsg(buffer);
	}

	public static void sendErrorMsg(long playerId, int errorCode) {
		ErrorMessage_10.Builder builder = ErrorMessage_10.newBuilder();
		builder.setErrorCode(errorCode);

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ERROR_MSG);
		msg.setBody(builder);
		ByteBuffer buffer = PBMessageToBytesEncode.encode(msg);
		System.out.println("返回消息："+msg.getCmd());
		GameCache.playerWsMap.get(playerId).sendMsg(buffer);
	}

	public static void sendErrorMsg(WebSocket socket, int errorCode) {
		ErrorMessage_10.Builder builder = ErrorMessage_10.newBuilder();
		builder.setErrorCode(errorCode);

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ERROR_MSG);
		msg.setBody(builder);
		ByteBuffer buffer = PBMessageToBytesEncode.encode(msg);
		System.out.println("返回消息："+msg.getCmd());
		socket.sendMsg(buffer);
	}

}
