package com.rt.logic.user;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.WebSocket;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.CreatePlayerResponse_20002;
import com.rt.pb.PbPlayer.LoginResponse_20001;
import com.rt.pb.PbPlayer.PbPlayerInfo;

public class SendUserMsg {

	/** 登陆结果返回 */
	public static void sendLoginMsg(WebSocket socket, IPlayer player) {
		LoginResponse_20001.Builder builder = LoginResponse_20001.newBuilder();
		if (player != null) {
			PbPlayerInfo.Builder  pbuilder = player.showPlayerInfo();
			player.checkOffLineReward(pbuilder);
			builder.setPlayerInfo(pbuilder);
		}
		builder.setNowTime(System.currentTimeMillis());
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.LOGIN);
		msg.setBody(builder);

		ResponseMsg.sendMsg(socket, msg);
	}

	/** 创建角色返回 */
	public static void sendCreatePlayerMsg(IPlayer player) {
		CreatePlayerResponse_20002.Builder builder = CreatePlayerResponse_20002.newBuilder();
		PbPlayerInfo.Builder  pbuilder = player.showPlayerInfo();
		builder.setPlayerInfo(pbuilder);
		
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.CREATE_PLAYER);
		msg.setBody(builder);
		ResponseMsg.sendMsg(player.getPlayerId(), msg);
	}

}
