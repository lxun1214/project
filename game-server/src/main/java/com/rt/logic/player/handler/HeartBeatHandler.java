package com.rt.logic.player.handler;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.impl.IHandler;
import com.rt.pb.PbPlayer.HeartBeatRequest_10000;
import com.rt.pb.PbPlayer.HeartBeatResponse_20000;

/**
 * 心跳
 * @author Administrator
 *
 */
public class HeartBeatHandler  implements IHandler{

	@Override
	public void handler(Message msg) throws Throwable {
		HeartBeatResponse_20000.Builder builder=HeartBeatResponse_20000.newBuilder();
		Message sendMsg = new Message();
		sendMsg.setCmd(S2CMessageNum.HEARTBEAT);
		sendMsg.setBody(builder);
		ResponseMsg.sendMsg(msg.getSocket(), sendMsg);
	}

	@Override
	public Object initBodyClass() {
		return HeartBeatRequest_10000.class;
	}

}
