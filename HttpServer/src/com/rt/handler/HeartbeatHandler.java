//package com.rt.handler;
//
//import javax.servlet.http.HttpServletRequest;
//
//import com.rt.common.Message;
//import com.rt.common.ResponseMsg;
//import com.rt.gloable.Response;
//import com.rt.gloable.impl.IHandler;
//import com.rt.pb.PbPlayer.HeartBeatResponse_20000;
//import com.rt.pb.PbPlayer.HeartbeatRequest_10000;
//
//public class HeartbeatHandler implements IHandler{
//
//	@Override
//	public void handler(Message msg, HttpServletRequest request, Response response) throws Throwable {
//		
//		HeartBeatResponse_20000.Builder builder = HeartBeatResponse_20000.newBuilder();
//		Message message = new Message();
//		message.setCmd(20000);
//		message.setBody(builder);
//		ResponseMsg.sendMsg(message, response);
//	}
//
//	@Override
//	public Object initBodyClass() {
//		return HeartbeatRequest_10000.class;
//	}
//
//}
