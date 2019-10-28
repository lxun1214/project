package com.rt.logic.artifact;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.pb.PbPlayer.ActivationArtifactResponse_20018;
import com.rt.pb.PbPlayer.ReinforcedArtifactResponse_20019;

public class ArtifactMsg {

	/**
	 * 升阶神器返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param fightPower
	 * @param response
	 */
	public static void sendReinforcedArtifactMsg(long playerId, boolean isSuccess,int itemId) {
		ReinforcedArtifactResponse_20019.Builder builder = ReinforcedArtifactResponse_20019.newBuilder();
		builder.setIsSuccess(isSuccess);
		if(isSuccess){
			builder.setItemId(itemId);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.REINFORCED_ARTIFACT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}

	/**
	 * 激活神器返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param fightPower
	 * @param response
	 */
	public static void sendActivationArtifactMsg(long playerId, boolean isSuccess,int itemId) {
		ActivationArtifactResponse_20018.Builder builder = ActivationArtifactResponse_20018.newBuilder();
		builder.setIsSuccess(isSuccess);
		if(isSuccess){
			builder.setItemId(itemId);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ACTIVATION_ARTIFACT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
}
