package com.rt.logic.activity;

import java.util.List;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.pb.PbPlayer.DrawCardResponse_20042;
import com.rt.pb.PbPlayer.PlayerActivityInfoChangeResponse_30006;
import com.rt.pb.PbPlayer.PurchaseFortuneCatResponse_20033;
import com.rt.pb.PbPlayer.PurchaseInvestmentResponse_20046;
import com.rt.pb.PbPlayer.ReceiveActivityRewardResponse_20032;

public class ActivityMsg {
	
	
	
	
	/**
	 * 抽卡返回
	 * @param playerId
	 * @param isSuccess
	 * @param drawCardNum
	 * @param list
	 */
	public static void sendDrawCardMsg(long playerId, boolean isSuccess,int drawCardNum,List<Integer> list){
		DrawCardResponse_20042.Builder builder = DrawCardResponse_20042.newBuilder();
		builder.setIsSuccess(isSuccess);
		builder.setDrawCardNum(drawCardNum);
		builder.addAllExtractIdList(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.DRAW_CARD);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	/**
	 * 买入招财猫返回
	 * @param playerId
	 * @param isSuccess
	 */
	public static void sendPurchaseFortuneCat(long playerId, boolean isSuccess){
		PurchaseFortuneCatResponse_20033.Builder builder =PurchaseFortuneCatResponse_20033.newBuilder();
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.PURCHASE_FORTUNE_CAT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	public static void sendPurchaseInvestment(long playerId, int code){
		PurchaseInvestmentResponse_20046.Builder builder = PurchaseInvestmentResponse_20046.newBuilder();
		builder.setCode(code);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.PURCHASE_INVESTMENT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	
	/**
	 * 领取活动返回
	 * @param playerId
	 * @param isSuccess
	 * @param activityId
	 * @param activityIndex
	 */
	public static void sendReceiveActivityReward(long playerId, boolean isSuccess, int activityId, int activityIndex){
		ReceiveActivityRewardResponse_20032.Builder builder = ReceiveActivityRewardResponse_20032.newBuilder();
		builder.setIsSuccess(isSuccess);
		if(isSuccess){
			builder.setActivityId(activityId);
			builder.setActivityIndex(activityIndex);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.RECEIVE_ACTIVITY_REWARD);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	

	/**
	 * 活动完成推送
	 * 
	 * @param playerId
	 * @param activityId
	 * @param activityIndex
	 * @param diamond
	 */
	public static void sendActivityInfoChangeMsg(long playerId, int activityId, int activityIndex, int diamond) {
		PlayerActivityInfoChangeResponse_30006.Builder builder = PlayerActivityInfoChangeResponse_30006.newBuilder();
		builder.setActivityId(activityId);
		builder.setActivityIndex(activityIndex);
		if (diamond > 0) {
			builder.setDiamond(diamond);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ACTIVITY_INFO_CHANGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}

}
