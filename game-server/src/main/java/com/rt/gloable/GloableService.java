package com.rt.gloable;

import java.nio.ByteBuffer;

import org.apache.log4j.Logger;

import com.google.protobuf.GeneratedMessage;
import com.google.protobuf.MessageLite;
import com.rt.cache.GameCache;
import com.rt.code.PBMessageToBytesEncode;
import com.rt.code.PBMessageToPBDecode;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.gloable.impl.IHandlerManager;
import com.rt.gloable.impl.IMessageManager;
import com.rt.handler.init.HandlerRegister;

/**
 * 全局对象
 * 
 * @author xin.fengtao
 */
public class GloableService {

	Logger log = Logger.getLogger(GloableService.class);

	private static GloableService instance;

	public static GloableService getInstance() {
		if (instance == null) {
			synchronized (GloableService.class) {
				if(instance == null) {
					instance = new GloableService();
				}
			}
		}
		return instance;
	}

	/** 解码器 */
	private PBMessageToPBDecode pbMessageToPBDecode;
	/** 编码 */
	private PBMessageToBytesEncode pbMessageToBytesEncode;

	private IMessageManager<GeneratedMessage, MessageLite> pbMessageManager;

	private IHandlerManager handlerManager;

//	private ExecutorTask executorTask;

	// private Map<String, Object> dbServiceMap = new HashMap<>();

	public GloableService() {
		this.pbMessageToPBDecode = new PBMessageToPBDecode();
		this.pbMessageToBytesEncode = new PBMessageToBytesEncode();
		this.pbMessageManager = new PBMessageManager();
		this.handlerManager = new HandlerManager();
//		this.executorTask = new ExecutorTask();
		HandlerRegister.init(this);
		pbMessageToPBDecode.setPbMessageManager(pbMessageManager);
	}

	/** 处理消息 */
	public void action(ByteBuffer buffer, WebSocket socket) {
		System.out.println(Thread.currentThread().getName());
		try {
			Message msg = this.pbMessageToPBDecode.decode(buffer);
			int cmd = msg.getCmd();
			IHandler handler = handlerManager.getHandler(cmd);
			if (handler == null) {
				log.error("没有找到对应的handler" + "cmd" + cmd);
				return;
			}
			msg.setSocket(socket);
			socket.setLastOperateTime(System.currentTimeMillis());
			if(socket.getPlayerId()!=0&&GameCache.playerMap.containsKey(socket.getPlayerId())){
				GameCache.playerMap.get(socket.getPlayerId()).setLastLoginTime(System.currentTimeMillis());
			}
			long start = System.currentTimeMillis();
			// Task task = new Task(handler, msg, msg.getUserId());
			// executorTask.execute(task);
			handler.handler(msg);
			System.out.println("消息：" + msg.getCmd() + "\t" + "耗时：" + (System.currentTimeMillis() - start) + "毫秒");

		} catch (Throwable e) {
			log.info(e.getMessage());
			e.printStackTrace();
		}
	}

//	public void shutDown() {
//		executorTask.shutDown();
//	}

	public PBMessageToBytesEncode getPbMessageToBytesEncode() {
		return pbMessageToBytesEncode;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public <T extends IMessageManager> T getPbMessageManager() {
		return (T) pbMessageManager;
	}

	public IHandlerManager getHandlerManager() {
		return handlerManager;
	}

}
