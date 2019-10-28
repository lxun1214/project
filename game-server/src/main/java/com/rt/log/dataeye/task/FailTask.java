package com.rt.log.dataeye.task;

import com.dataeye.sdk.client.DCAgent;
import com.dataeye.sdk.client.domain.DCTask;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCUserInfo;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.PlayerLogModel;
import com.rt.log.model.TaskModel;

/**
 * 任务失败（只有闯关，成就没有任务失败）
 * @author Mr.Ma
 * version-2017
 *
 */
public class FailTask  extends AbsLogTask{

	public FailTask(DCAgent dcAgent, PlayerLogModel model, BaseLogModel t) {
		super(dcAgent, model, t);
	}

	@Override
	public void execute() {
		TaskModel tModel=(TaskModel) t;
		dcAgent.taskFail(DCUserInfo.newBuilder()
				        .setAccountId(model.getAccountId())// 账号ID，必填
						.setPlatform(model.getPlatform())// 平台
						.setChannel(model.getChannel())// 渠道
						.setGameRegion(model.getGameRegion())
						.setAccountType(model.getAccountType())// 账号类型，暂时默认自身注册用户
						.build(),
						DCTask.newBuilder().taskId(tModel.getTaskId())//任务ID
						.taskType(tModel.getTaskType())//任务类型
						.duration(tModel.getDuration())//任务耗时
						.failReason(tModel.getFailReasion())//失败原因
						.build()
						, null);
		
	}

}
