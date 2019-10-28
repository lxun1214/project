package com.rt.log.dataeye;

import com.rt.log.dataeye.task.AbsLogTask;
import com.rt.log.dataeye.task.CoinGainTask;
import com.rt.log.dataeye.task.CoinLostTask;
import com.rt.log.dataeye.task.CompleteTask;
import com.rt.log.dataeye.task.FailTask;
import com.rt.log.dataeye.task.ItemBuyTask;
import com.rt.log.dataeye.task.ItemGetTask;
import com.rt.log.dataeye.task.ItemUseTask;
import com.rt.log.dataeye.task.LevelUpTask;
import com.rt.log.dataeye.task.OnlineTask;
import com.rt.log.dataeye.task.PayTask;
import com.rt.log.dataeye.task.PlayerRegTask;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.PlayerLogModel;

public class LogTaskFactory {

	/** 注册日志 */
	public static final int REG = 1;

	/** 在线日志(不发送) */
	public static final int ONLINE = 2;

	/** 任务成功 */
	public static final int TASK_COMPLETE = 3;

	/** 任务失败 (不发送) */
	public static final int TASK_FAIL = 4;

	/** 购买道具 */
	public static final int ITEM_BUY = 5;

	/** 获得物品 */
	public static final int ITEM_GET = 6;

	/** 消耗道具 */
	public static final int ITEM_USE = 7;

	/** 虚拟币获取 */
	public static final int COIN_GAIN = 8;

	/** 虚拟币消耗 */
	public static final int COIN_LOST = 9;

	/** 角色升级 */
	public static final int LEVEL_UP = 10;

	/** 真实消费统计 */
	public static final int PAY = 11;

	public static AbsLogTask createLogTask(int logType, PlayerLogModel model, BaseLogModel t) {
		switch (logType) {
		case REG:
			return new PlayerRegTask(HttpLogServer.dcAgent, model, t);
		case ONLINE:
			return new OnlineTask(HttpLogServer.dcAgent, model, t);
		case TASK_COMPLETE:
			return new CompleteTask(HttpLogServer.dcAgent, model, t);
		case TASK_FAIL:
			return new FailTask(HttpLogServer.dcAgent, model, t);
		case ITEM_BUY:
			return new ItemBuyTask(HttpLogServer.dcAgent, model, t);
		case ITEM_GET:
			return new ItemGetTask(HttpLogServer.dcAgent, model, t);
		case ITEM_USE:
			return new ItemUseTask(HttpLogServer.dcAgent, model, t);
		case COIN_GAIN:
			return new CoinGainTask(HttpLogServer.dcAgent, model, t);
		case COIN_LOST:
			return new CoinLostTask(HttpLogServer.dcAgent, model, t);
		case LEVEL_UP:
			return new LevelUpTask(HttpLogServer.dcAgent, model, t);
		case PAY:
			return new PayTask(HttpLogServer.dcAgent, model, t);
		default:
			return null;
		}
	}
}
