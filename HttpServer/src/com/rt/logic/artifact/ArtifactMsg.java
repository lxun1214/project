package com.rt.logic.artifact;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.Response;
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
	public static void sendReinforcedArtifactMsg(boolean isSuccess, int fightPower, Response response) {
		ReinforcedArtifactResponse_20019.Builder builder = ReinforcedArtifactResponse_20019.newBuilder();
		builder.setIsSuccess(isSuccess);
		if (isSuccess) {
			builder.setFightPower(fightPower);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.REINFORCED_ARTIFACT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 激活神器返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param fightPower
	 * @param response
	 */
	public static void sendActivationArtifactMsg(boolean isSuccess, int fightPower, Response response) {
		ActivationArtifactResponse_20018.Builder builder = ActivationArtifactResponse_20018.newBuilder();
		builder.setIsSuccess(isSuccess);
		if (isSuccess) {
			builder.setFightPower(fightPower);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ACTIVATION_ARTIFACT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}
}
