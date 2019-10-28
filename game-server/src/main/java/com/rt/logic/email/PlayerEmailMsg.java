package com.rt.logic.email;

import java.util.List;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.pb.PbPlayer.AllDelEmailResponse_20041;
import com.rt.pb.PbPlayer.PbPlayerEmailInfo;
import com.rt.pb.PbPlayer.PlayerEmailChangeInfoResponse_30008;
import com.rt.pb.PbPlayer.ReadEmailResponse_20037;
import com.rt.pb.PbPlayer.ReceiveEmailAwardChangeResponse_20039;

public class PlayerEmailMsg {

	
	
	/**
	 * 新增邮件推送
	 * @param playerId
	 * @param changeBuild
	 */
	public static void sendAddEmailChange(long playerId,PbPlayerEmailInfo.Builder changeBuild){
		PlayerEmailChangeInfoResponse_30008.Builder builder = PlayerEmailChangeInfoResponse_30008.newBuilder();
		builder.setPlayerEmailInfo(changeBuild);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ADD_EMAIL_CHANGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	/**
	 * 删除邮件/一键删除统一返回地方
	 * @param playerId
	 * @param list
	 */
	public static void sendDelEmailMsg(long playerId,List<Long> list){
		AllDelEmailResponse_20041.Builder builder = AllDelEmailResponse_20041.newBuilder();
		builder.addAllDelEmailIdList(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.DEL_ALL_EMAIL);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	
	/**
	 * 领取邮件奖励，一键领取返回
	 * @param playerId
	 * @param list
	 */
	public static void sendReceiveEmailAwardMsg(long playerId,List<Long> list){
		ReceiveEmailAwardChangeResponse_20039.Builder builder = ReceiveEmailAwardChangeResponse_20039.newBuilder();
		builder.addAllReceiveEmailIdList(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.RECEIVE_ALL_EMAIL);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	
	/**
	 * 读取邮件返回
	 * @param playerId
	 * @param emailId
	 */
	public static void sendReadEmailMsg(long playerId,long emailId){
		ReadEmailResponse_20037.Builder builder = ReadEmailResponse_20037.newBuilder();
		builder.setEmailId(emailId);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.READ_EMAIL);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
		
	}
	
}
