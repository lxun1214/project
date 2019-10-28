package com.rt.logic.part;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.pb.PbPlayer.ChallengePartResponse_20028;
import com.rt.pb.PbPlayer.PartSettlementResponse_20029;

public class PartInfoMsg {

	/**
	 * 请求进入副本返回
	 * @param playerId
	 * @param isSuccess
	 * @param partId
	 * @param partChallengNum
	 */
	public static void sendChallengePartMsg(long playerId,boolean isSuccess,int partId,int partChallengNum){
		ChallengePartResponse_20028.Builder builder=ChallengePartResponse_20028.newBuilder();
		builder.setIsSuccess(isSuccess);
		if(isSuccess){
			builder.setPartChallengNum(partChallengNum);
			builder.setPartId(partId);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.CHALLENGE_PART);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	
	/**
	 * 副本结算返回
	 * @param playerId
	 * @param isSuccess
	 * @param partId
	 * @param exp
	 * @param level
	 */
	public static void sendPartSettlementMsg(long playerId,boolean isSuccess,int partId,int exp,int level){
		PartSettlementResponse_20029.Builder builder=PartSettlementResponse_20029.newBuilder();
		builder.setIsSuccess(isSuccess);
		builder.setPartId(partId);
		if(isSuccess){
		    builder.setExp(exp);
		    builder.setLevel(level);
		
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.PART_SETTLEMENT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
}
