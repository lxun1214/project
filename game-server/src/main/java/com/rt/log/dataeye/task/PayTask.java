package com.rt.log.dataeye.task;

import com.dataeye.sdk.client.DCAgent;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCPay;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCUserInfo;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.PayModel;
import com.rt.log.model.PlayerLogModel;

/**
 * 真实消费
 * 
 * @author Mr.Ma version-2017
 *
 */
public class PayTask extends AbsLogTask {

	public PayTask(DCAgent dcAgent, PlayerLogModel model, BaseLogModel t) {
		super(dcAgent, model, t);

	}
	@Override
	public void execute() {
		PayModel oModel = (PayModel) t;
		dcAgent.pay(DCUserInfo.newBuilder().setAccountId(model.getAccountId())// 账号ID，必填
				 .build(),
				 DCPay.newBuilder().setCurrencyAmountDouble(oModel.getCurrencyAmountDouble()).setCurrencyType("cny")
				.setIapid("购买钻石")
				.setPayTime(oModel.getPayTime())
				.setPayType(oModel.getPayType())
				.build()
				,null);
	}

}
