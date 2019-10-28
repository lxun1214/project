package com.rt.log.dataeye.task;

import com.dataeye.sdk.client.DCAgent;
import com.dataeye.sdk.client.domain.DCCoin;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCUserInfo;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.CoinGainModel;
import com.rt.log.model.PlayerLogModel;

/**
 * 虚拟币消耗
 * @author Mr.Ma
 * version-2017
 *
 */
public class CoinLostTask extends AbsLogTask{

	public CoinLostTask(DCAgent dcAgent, PlayerLogModel model, BaseLogModel t) {
		super(dcAgent, model, t);
	}

	@Override
	public void execute() {
		CoinGainModel cModel=(CoinGainModel) t;
		dcAgent.coinLost(DCUserInfo.newBuilder().setAccountId(model.getAccountId())// 账号ID，必填
				.setPlatform(model.getPlatform())// 平台
				.setChannel(model.getChannel())// 渠道
				.setGameRegion(model.getGameRegion()).setAccountType(model.getAccountType())// 账号类型，暂时默认自身注册用户
				.build(), 
				DCCoin.newBuilder().coinType(cModel.getCoinType())//虚拟币类型
				.coinNum(cModel.getCoinNum())//获得数量
				.totalCoin(cModel.getTotalCoin())//剩余数量
				.type(cModel.getType())//虚拟币获得途径
				.build()
				, null);
		
	}

}
