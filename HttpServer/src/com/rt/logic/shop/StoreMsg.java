package com.rt.logic.shop;

import java.util.List;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.Response;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.item.Item;
import com.rt.pb.PbPlayer.BuyGoodsResponse_20013;

public class StoreMsg {

	/**
	 * 替换技能栏技能返回
	 * 
	 * @param isSuccess
	 * @param response
	 */
	public static void buyGoodsMsg(boolean isSuccess, List<Item> itemChangeList, Response response) {
		BuyGoodsResponse_20013.Builder builder = BuyGoodsResponse_20013.newBuilder();
		builder.setIsSuccess(isSuccess);
		if (isSuccess) {
			builder.setBagChangeInfo(BagMsg.createBagChangeInfo(itemChangeList));
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.BUY_SHOP_GOODS);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}
}
