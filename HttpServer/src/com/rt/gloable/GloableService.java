package com.rt.gloable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.protobuf.GeneratedMessage;
import com.google.protobuf.MessageLite;
import com.rt.cache.GameCache;
import com.rt.code.PBMessageToBytesEncode;
import com.rt.code.PBMessageToPBDecode;
import com.rt.common.C2SMessageNum;
import com.rt.common.ErrorCode;
import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.UserPo;
import com.rt.core.thread.ExecutorTask;
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

	private ExecutorTask executorTask;

	// private Map<String, Object> dbServiceMap = new HashMap<>();

	public GloableService() {
		this.pbMessageToPBDecode = new PBMessageToPBDecode();
		this.pbMessageToBytesEncode = new PBMessageToBytesEncode();
		this.pbMessageManager = new PBMessageManager();
		this.handlerManager = new HandlerManager();
		this.executorTask = new ExecutorTask();
		HandlerRegister.init(this);
		pbMessageToPBDecode.setPbMessageManager(pbMessageManager);
	}

	/** 处理消息 */
	public void action(HttpServletRequest request, HttpServletResponse response) {
		System.out.println(Thread.currentThread().getName());
		Response response_ = Response.newResponse(response);
		try {
			Message msg = this.pbMessageToPBDecode.decode(request);
			int cmd = msg.getCmd();
			IHandler handler = handlerManager.getHandler(cmd);
			if (handler == null) {
				log.error("没有找到对应的handler" + "cmd" + cmd);
				return;
			}
			String UUID = msg.getUUID();
			if (cmd != C2SMessageNum.LOGIN) {
				if (!userIsFail(msg, UUID)) {
					ResponseMsg.sendErrorMsg(ErrorCode.UUID_ERROR, response_);
					return;
				}
			}
			if (UUID != null) {
				response_.setUUID(msg.getUUID());
			}
			long start = System.currentTimeMillis();
//			Task task = new Task(handler, msg, request, response_, msg.getUserId());
//			executorTask.execute(task);
			handler.handler(msg, request, response_);
			System.out.println("消息：" + msg.getCmd() + "\t" + "耗时：" + (System.currentTimeMillis() - start) + "毫秒");

		} catch (Throwable e) {
			log.info(e.getMessage());
			e.printStackTrace();
		}
	}

	public boolean userIsFail(Message msg, String uuid) {
		if (!GameCache.userUUIdMap.containsKey(uuid)) {
			return false;
		}
		UserPo userPo = GameCache.userUUIdMap.get(uuid);
		msg.setUserId(userPo.getUserId());
		if (userPo.getPlayerId() != 0) {
			msg.setPlayerId(userPo.getPlayerId());
		}
		userPo.setLastOperateTime(System.currentTimeMillis());
		return true;
	}

	public void shutDown() {
		executorTask.shutDown();
	}

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
