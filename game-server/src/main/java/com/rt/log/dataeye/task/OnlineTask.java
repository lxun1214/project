package com.rt.log.dataeye.task;

import com.dataeye.sdk.client.DCAgent;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCOnline;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCUserInfo;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.OnlineModel;
import com.rt.log.model.PlayerLogModel;

/**
 * 在线日志
 * @author Mr.Ma
 * version-2017
 *
 */
public class OnlineTask extends AbsLogTask {

	public OnlineTask(DCAgent dcAgent, PlayerLogModel model, BaseLogModel t) {
		super(dcAgent, model, t);

	}

	@Override
	public void execute() {
		OnlineModel oModel = (OnlineModel) t;
		int nowTime = (int) (System.currentTimeMillis() / 1000);
		dcAgent.online(
				DCUserInfo.newBuilder().setAccountId(model.getAccountId())// 账号ID，必填
						.setPlatform(model.getPlatform())// 平台
						.setChannel(model.getChannel())// 渠道
						.setGameRegion(model.getGameRegion()).setAccountType(model.getAccountType())// 账号类型
						.build(),
				DCOnline.newBuilder().setLoginTime(oModel.getLoginTime()).setOnlineTime(nowTime-oModel.getLoginTime())
						.setIsNewUser(false).build(),
				null);

	}

}
