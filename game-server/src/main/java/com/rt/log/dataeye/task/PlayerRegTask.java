package com.rt.log.dataeye.task;

import com.dataeye.sdk.client.DCAgent;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCUserInfo;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.PlayerLogModel;

/**
 * 注册
 * @author Mr.Ma
 * version-2017
 *
 */
public class PlayerRegTask extends AbsLogTask {


	public PlayerRegTask(DCAgent dcAgent, PlayerLogModel model,BaseLogModel t) {
		super(dcAgent, model,t);
	}
	@Override
	public void execute() {
		dcAgent.reg(
				DCUserInfo.newBuilder()
				        .setAccountId(model.getAccountId())// 账号ID，必填
						.setPlatform(model.getPlatform())// 平台
						.setChannel(model.getChannel())// 渠道
						.setGameRegion(model.getGameRegion())
						.setAccountType(model.getAccountType())// 账号类型，暂时默认自身注册用户
						.build(),
				(int) (System.currentTimeMillis() / 1000));
	}

}
