package com.rt.log.dataeye.task;

import com.dataeye.sdk.client.DCAgent;
import com.dataeye.sdk.client.domain.DCItem;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCUserInfo;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.ItemBuyModel;
import com.rt.log.model.PlayerLogModel;

/**
 * 物品/道具消耗
 * @author Mr.Ma
 * version-2017
 *
 */
public class ItemUseTask  extends AbsLogTask{

	public ItemUseTask(DCAgent dcAgent, PlayerLogModel model, BaseLogModel t) {
		super(dcAgent, model, t);
	}

	@Override
	public void execute() {
		ItemBuyModel iModel=(ItemBuyModel)t;
		dcAgent.itemUse(DCUserInfo.newBuilder().setAccountId(model.getAccountId())// 账号ID，必填
						.setPlatform(model.getPlatform())// 平台
						.setChannel(model.getChannel())// 渠道
						.setGameRegion(model.getGameRegion()).setAccountType(model.getAccountType())// 账号类型
						.build(),
						DCItem.newBuilder().itemId(iModel.getItemId())//道具ID
						.itemType(iModel.getItemType())//道具类型
						.itemCnt(iModel.getItemCnt())//道具数量
						.reason(iModel.getReason())
						.build(),
						null);
	}

}
