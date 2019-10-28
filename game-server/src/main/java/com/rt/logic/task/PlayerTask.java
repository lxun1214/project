package com.rt.logic.task;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.cache.ConfigCache;
import com.rt.cache.GameCache;
import com.rt.common.ErrorCode;
import com.rt.common.ResponseMsg;
import com.rt.log.LogUtils;
import com.rt.log.dataeye.HttpLogServer;
import com.rt.log.dataeye.LogTaskFactory;
import com.rt.log.model.TaskModel;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.item.Item;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.CurrencyConst;
import com.rt.logic.player.IPlayer;
import com.rt.logic.task.config.data.TaskConfig;
import com.rt.pb.PbPlayer.PbPlayerTaskInfo;
import com.rt.pb.PbPlayer.PbTaskInfo;
import com.rt.utils.TimeUtils;

/**
 * 用户任务信息
 * 
 * @author Administrator
 *
 */
public class PlayerTask {

	/** 主线 key:taskId */
	Map<Integer, Task> threadTaskMap = new HashMap<>();

	/** 每日 key:taskId */
	Map<Integer, Task> dayTaskMap = new HashMap<>();

	/** 成就 key:taskId */
	Map<Integer, Task> achieveTaskMap = new HashMap<>();

	/** 日常任务的最后达成时间 */
	int lastDay;

	/**
	 * 领取任务奖励
	 * 
	 * @param taskId
	 */
	public void receiveTaskReward(IPlayer player, int taskId) {
		TaskConfig config = ConfigCache.taskConfigMap.get(taskId);
		if (config == null) {
			return;
		}
		long playerId = player.getPlayerId();
		Task task = null;
		if (config.taskType == 1) {
			// 主线
			task = threadTaskMap.get(taskId);
		} else if (config.taskType == 2) {
			checkDayTask();
			// 日常
			task = dayTaskMap.get(taskId);
		} else if (config.taskType == 3) {
			// 成就
			task = achieveTaskMap.get(taskId);
		}
		if (task == null || !task.isComplete()) {
			// 任务没达成
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.TASK_NOT_REACH);
			return;
		}
		if (task.isReceive()) {
			// 已经领取过奖励
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.TASK_NOT_REWARD);
			return;
		}
		// 检查前置任务是否领取过
		if (config.lastTaskId != 0) {
			Task lastTask = null;
			if (config.taskType == 1) {
				// 主线
				lastTask = threadTaskMap.get(config.lastTaskId);
			} else if (config.taskType == 2) {
				// 日常
				lastTask = dayTaskMap.get(config.lastTaskId);
			} else if (config.taskType == 3) {
				// 成就
				lastTask = achieveTaskMap.get(config.lastTaskId);
			}
			if (lastTask == null || !lastTask.isComplete() || !lastTask.isReceive()) {
				// 前置任务还没领，不能领取
				ResponseMsg.sendErrorMsg(playerId, ErrorCode.TASK_NOT_FRONT_REWARD);
				return;
			}
		}
		task.setReceive(true);
		// 返回
		PlayerTaskMsg.sendReceiveTaskRewardMsg(playerId, 0, taskId);
		// 奖励道具
		if (config.awardGoodsList.size() > 0) {
			List<Item> changeItemList = player.getBag().addItem(config.awardGoodsList,ItemConst.ITEM_GET_TASK);
			BagMsg.sendItemChangeMsg(playerId, changeItemList);
		}
		// 奖励货币
		if (config.awardCurrencyMap.size() > 0) {
			for (String currencyType : config.awardCurrencyMap.keySet()) {
				int num = config.awardCurrencyMap.get(currencyType);
				if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
					player.addDelGold(num,CoinConst.GET_TASK);
				} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
					player.addDelDiamond(num,CoinConst.GET_TASK);
				} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
					player.addDelSportsMoney(num,CoinConst.GET_TASK);
				} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
					player.addDelUpgradeSkillsJade(num,CoinConst.GET_TASK);
				} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
					player.addDelStrengthenArtifactStone(num,CoinConst.GET_TASK);
				} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
					player.addDelReinforcedEquipmentStone(num,CoinConst.GET_TASK);
				}
			}
		}

	}

	/**
	 * 监听任务
	 * 
	 * @param taskWin
	 *            任务完成事件类型
	 * @param taskTimeNum
	 *            当前系数
	 * @param replaceType
	 *            系数累计类型 1
	 */
	public void monitorTask(long playerId, int taskWin, int taskTimeNum, int replaceType) {
		IPlayer player = GameCache.playerMap.get(playerId);
		if (player == null) {
			return;
		}
		List<TaskConfig> list = ConfigCache.groupTaskConfigMap.get(taskWin);
		if (list == null) {
			return;
		}
		Map<Integer,Integer> changeTaskMap = new HashMap<>();
		for (int i = 0; i < list.size(); i++) {
			TaskConfig config = list.get(i);
			if (player.getRebirthNum() < config.roleTriggerLvl) {
				continue;
			}
			Task task = null;
			if (config.taskType == 1) {
				// 主线
				task = threadTaskMap.get(config.taskId);
				threadTaskMap.put(config.taskId, updateTask(playerId, config, task, taskTimeNum, replaceType,changeTaskMap));
			} else if (config.taskType == 2) {
				checkDayTask();
				// 每日
				task = dayTaskMap.get(config.taskId);
				dayTaskMap.put(config.taskId, updateTask(playerId, config, task, taskTimeNum, replaceType,changeTaskMap));
			} else if (config.taskType == 3) {
				// 成就
				task = achieveTaskMap.get(config.taskId);
				achieveTaskMap.put(config.taskId, updateTask(playerId, config, task, taskTimeNum, replaceType,changeTaskMap));
			}

		}
		if(changeTaskMap.size()>0){
			// 给客户端推送任务变化消息
			PlayerTaskMsg.sendPlayerTaskChangeMsg(playerId, changeTaskMap);
		}
	}

	public Task updateTask(long playerId, TaskConfig config, Task task, int taskTimeNum, int replaceType,Map<Integer,Integer> changeTaskMap) {
		if (task == null) {
			task = new Task();
			task.setTaskId(config.taskId);
		}
		if (task.isComplete()) {
			return task;
		}
		if (replaceType == TaskConst.TYPE_CUMULATIVE) {
			// 累加
			task.addCompleteNum(taskTimeNum);
		} else {
			// 替换
			if (task.getCompleteNum() < taskTimeNum) {
				task.setCompleteNum(taskTimeNum);
			}
		}
		// 判断是否完成
		if (task.getCompleteNum() >= config.taskTime) {
			task.setComplete(true);
			// 发送任务完成日志
			HttpLogServer.sendLog(LogTaskFactory.TASK_COMPLETE, GameCache.logModelMap.get(playerId),
					new TaskModel(String.valueOf(task.getTaskId()), LogUtils.getTaskType(1), 0, null));
		}
		changeTaskMap.put(config.taskId, task.getCompleteNum());
		return task;
	}

	/** 检测日常任务 */
	public void checkDayTask() {
		if (lastDay != TimeUtils.getToday()) {
			dayTaskMap.clear();
			lastDay = TimeUtils.getToday();
		}
	}

	public PbPlayerTaskInfo.Builder showTask() {
		checkDayTask();
		PbPlayerTaskInfo.Builder builder = PbPlayerTaskInfo.newBuilder();
		List<PbTaskInfo> threadTaskInfos = new ArrayList<>();
		for (Integer taskId : threadTaskMap.keySet()) {
			Task task = threadTaskMap.get(taskId);
			PbTaskInfo.Builder builderTask = PbTaskInfo.newBuilder();
			builderTask.setTaskId(taskId);
			builderTask.setCompleteNum(task.getCompleteNum());
			builderTask.setIsReceive(task.isReceive());
			threadTaskInfos.add(builderTask.build());
		}

		List<PbTaskInfo> dayTaskInfos = new ArrayList<>();
		for (Integer taskId : dayTaskMap.keySet()) {
			Task task = dayTaskMap.get(taskId);
			PbTaskInfo.Builder builderTask = PbTaskInfo.newBuilder();
			builderTask.setTaskId(taskId);
			builderTask.setCompleteNum(task.getCompleteNum());
			builderTask.setIsReceive(task.isReceive());
			dayTaskInfos.add(builderTask.build());
		}
		List<PbTaskInfo> achieveTaskInfos = new ArrayList<>();
		for (Integer taskId : achieveTaskMap.keySet()) {
			Task task = achieveTaskMap.get(taskId);
			PbTaskInfo.Builder builderTask = PbTaskInfo.newBuilder();
			builderTask.setTaskId(taskId);
			builderTask.setCompleteNum(task.getCompleteNum());
			builderTask.setIsReceive(task.isReceive());
			achieveTaskInfos.add(builderTask.build());
		}
		builder.addAllThreadTaskInfos(threadTaskInfos);
		builder.addAllDayTaskInfos(dayTaskInfos);
		builder.addAllAchieveTaskInfos(achieveTaskInfos);
		return builder;
	}

	public Map<Integer, Task> getThreadTaskMap() {
		return threadTaskMap;
	}

	public void setThreadTaskMap(Map<Integer, Task> threadTaskMap) {
		this.threadTaskMap = threadTaskMap;
	}

	public Map<Integer, Task> getDayTaskMap() {
		return dayTaskMap;
	}

	public void setDayTaskMap(Map<Integer, Task> dayTaskMap) {
		this.dayTaskMap = dayTaskMap;
	}

	public Map<Integer, Task> getAchieveTaskMap() {
		return achieveTaskMap;
	}

	public void setAchieveTaskMap(Map<Integer, Task> achieveTaskMap) {
		this.achieveTaskMap = achieveTaskMap;
	}

	public int getLastDay() {
		return lastDay;
	}

	public void setLastDay(int lastDay) {
		this.lastDay = lastDay;
	}

}
