package com.rt.log.dataeye.task;

import com.dataeye.sdk.client.DCAgent;
import com.dataeye.sdk.client.domain.DCItem;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCUserInfo;
import com.rt.log.model.BaseLogModel;
import com.rt.log.model.ItemBuyModel;
import com.rt.log.model.PlayerLogModel;

/**
 * 购买道具
 * @author Mr.Ma
 * version-2017
 *
 */
public class ItemBuyTask  extends AbsLogTask{

	public ItemBuyTask(DCAgent dcAgent, PlayerLogModel model, BaseLogModel t) {
		super(dcAgent, model, t);
	}

	@Override
	public void execute() {
		ItemBuyModel iModel=(ItemBuyModel)t;
		dcAgent.itemBuy(DCUserInfo.newBuilder().setAccountId(model.getAccountId())// 账号ID，必填
						.setPlatform(model.getPlatform())// 平台
						.setChannel(model.getChannel())// 渠道
						.setGameRegion(model.getGameRegion()).setAccountType(model.getAccountType())// 账号类型
						.build(),
						DCItem.newBuilder().itemId(iModel.getItemId())//道具ID
						.itemType(iModel.getItemType())//道具类型
						.itemCnt(iModel.getItemCnt())//道具数量
						.coinNum(iModel.getCoinNum())//消耗的虚拟币数量
						.coinType(iModel.getCoinType())//虚拟币类型
						.build(),
						null);
		
	}

}
