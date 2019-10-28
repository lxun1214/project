package com.rt.gloable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.protobuf.GeneratedMessage;
import com.google.protobuf.MessageLite;
import com.rt.code.PBMessageToBytesEncode;
import com.rt.code.PBMessageToPBDecode;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.gloable.impl.IHandlerManager;
import com.rt.gloable.impl.IMessageManager;
import com.rt.handler.init.HandlerRegister;

/**
 * 全局对象
 * @author xin.fengtao
 */
public class GloableService {

	private static GloableService instance;
	
	Logger log = Logger.getLogger(GloableService.class);

	public synchronized static GloableService getInstance() {
		if (instance == null) {
			instance = new GloableService();
		}
		return instance;
	}
	/** 解码器 */
	private PBMessageToPBDecode pbMessageToPBDecode;
	/** 编码 */
	private PBMessageToBytesEncode pbMessageToBytesEncode;
	
	private IMessageManager<GeneratedMessage, MessageLite> pbMessageManager;
	
	private IHandlerManager handlerManager;
	

	public GloableService() {
		this.pbMessageToPBDecode = new PBMessageToPBDecode();
		this.pbMessageToBytesEncode = new PBMessageToBytesEncode();
		this.pbMessageManager = new PBMessageManager();
		this.handlerManager = new HandlerManager();
		HandlerRegister.init(this);
		pbMessageToPBDecode.setPbMessageManager(pbMessageManager);
	}
	/**处理消息*/
	public void action(HttpServletRequest request, HttpServletResponse response){
		try {
			Message msg = this.pbMessageToPBDecode.decode(request);
			IHandler handler = handlerManager.getHandler(msg.getCmd());
			if(handler == null){
				System.err.println("没有找到对应的handler" + "cmd" + msg.getCmd());
				return;
			}
			long start = System.currentTimeMillis();
			handler.handler(msg,response);
			long end = System.currentTimeMillis();
			log.info("cmd:" + msg.getCmd() + "," + "消息用时" + (end - start) + "毫秒");
			
		} catch (Exception e) {
			e.printStackTrace();
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}
	public PBMessageToBytesEncode getPbMessageToBytesEncode() {
		return pbMessageToBytesEncode;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public <T extends IMessageManager> T  getPbMessageManager() {
		return (T) pbMessageManager;
	}

	public IHandlerManager getHandlerManager() {
		return handlerManager;
	}

}
