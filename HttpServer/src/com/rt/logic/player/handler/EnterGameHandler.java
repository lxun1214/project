package com.rt.logic.player.handler;
//package com.guanghe.handler;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import com.guanghe.common.Message;
//import com.guanghe.gloable.impl.IHandler;
//import com.guanghe.logic.user.UserLogic;
//import com.guanghe.pb.PbPlayer.EnterGameRequest_10003;
//
///**
// * 进入游戏
// * @author xin.fengtao
// *
// */
//public class EnterGameHandler implements IHandler{
//
//	@Override
//	public void handler(Message msg, HttpServletRequest request, HttpServletResponse response) throws Throwable {
//		
//		UserLogic.getInstance().enterGame(msg, request, response);
//		
//	}
//
//	@Override
//	public Object initBodyClass() {
//		return EnterGameRequest_10003.class;
//	}
//
//}
