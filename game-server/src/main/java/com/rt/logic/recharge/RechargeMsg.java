package com.rt.logic.recharge;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.pb.PbPlayer.GenerateRechargeOrderInfoResponse_20034;
import com.rt.pb.PbPlayer.MonthCardChangeResponse_30010;
import com.rt.pb.PbPlayer.PbMonthCardInfo;
import com.rt.pb.PbPlayer.ReceiveMonthCardResponse_20044;

public class RechargeMsg {
	
	/**
	 * 领取月卡奖励返回
	 * @param playerId
	 * @param code
	 */
	public static void sendReceiveMonthRewardMsg(long playerId,int code){
		ReceiveMonthCardResponse_20044.Builder builder = ReceiveMonthCardResponse_20044.newBuilder();
		builder.setCode(code);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.RECIEVE_MONTH_REARD);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	/**
	 * 购买月卡返回
	 * @param playerId
	 * @param monthBuilder
	 */
	public static void sendMonthChangeMsg(long playerId,PbMonthCardInfo.Builder monthBuilder){
		MonthCardChangeResponse_30010.Builder builder = MonthCardChangeResponse_30010.newBuilder();
		builder.setMonthCardInfo(monthBuilder);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.MONTH_CARD_CHANGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	
	
	
	

	/**
	 * 给客户端返回创建支付订单信息
	 * @param playerId
	 * @param orderId
	 */
	public static void sendGenerateRechargeOrderInfoMsg(long playerId,boolean isSuccess,String appId,String orderNum,int mallId,String productName,int fee,String sign){
		GenerateRechargeOrderInfoResponse_20034.Builder builder =GenerateRechargeOrderInfoResponse_20034.newBuilder();
		builder.setIsSuccess(isSuccess);
		if(isSuccess){
			builder.setAppId(appId);
			builder.setOrderNum(orderNum);
			builder.setMallId(mallId);
			builder.setProductName(productName);
			builder.setFee(fee);
			builder.setSign(sign);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GENERATE_RECHARGE_ORDER_INFO);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
}
