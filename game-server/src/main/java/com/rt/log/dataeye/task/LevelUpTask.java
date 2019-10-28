package com.rt.log.dataeye.task;

import com.dataeye.sdk.client.DCAgent;
import com.dataeye.sdk.client.domain.DCLevelUp;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCUserInfo;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.LevelUpMode;
import com.rt.log.model.PlayerLogModel;

/**
 * 角色升级
 * @author Mr.Ma
 * version-2017
 *
 */
public class LevelUpTask   extends AbsLogTask{

	public LevelUpTask(DCAgent dcAgent, PlayerLogModel model, BaseLogModel t) {
		super(dcAgent, model, t);
	}

	@Override
	public void execute() {
		LevelUpMode lMode=(LevelUpMode) t;
		dcAgent.levelUp(DCUserInfo.newBuilder().setAccountId(model.getAccountId())// 账号ID，必填
						.setPlatform(model.getPlatform())// 平台
						.setChannel(model.getChannel())// 渠道
						.setGameRegion(model.getGameRegion()).setAccountType(model.getAccountType())// 账号类型
						.build(), 
                         DCLevelUp.newBuilder().startLevel(lMode.getStartLevel())//升级前等级
                         .endLevel(lMode.getEndLevel())//升级后等级
                         .build(),
						null);
	}

}
