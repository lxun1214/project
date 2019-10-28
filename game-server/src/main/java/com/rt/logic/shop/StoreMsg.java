package com.rt.logic.shop;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.BuyGoodsResponse_20013;
import com.rt.pb.PbPlayer.RefreshStorePurchaseInfoResponse_30007;

public class StoreMsg {

	/**
	 * 替换技能栏技能返回
	 * 
	 * @param isSuccess
	 * @param response
	 */
	public static void buyGoodsMsg(long playerId, boolean isSuccess,int reqId) {
		BuyGoodsResponse_20013.Builder builder = BuyGoodsResponse_20013.newBuilder();
		builder.setIsSuccess(isSuccess);
		builder.setSeqId(reqId);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.BUY_SHOP_GOODS);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	/**
	 * 0点推送商城限购次数刷新
	 * @param player
	 */
	public static void refreshStorePurchaseInfoMsg(IPlayer player) {
		RefreshStorePurchaseInfoResponse_30007.Builder builder = RefreshStorePurchaseInfoResponse_30007.newBuilder();
		builder.addAllStoreInfos(player.getStore().showStoreInfos());
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.REFRESH_STORE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(player.getPlayerId(), msg);
	}
}
