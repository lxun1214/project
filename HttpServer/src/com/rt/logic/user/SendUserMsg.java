package com.rt.logic.user;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.Response;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.CreatePlayerResponse_20002;
import com.rt.pb.PbPlayer.LoginResponse_20001;

public class SendUserMsg {

	/** 登陆结果返回 */
	public static void sendLoginMsg(String uuid, IPlayer player, Response response) {
		LoginResponse_20001.Builder builder = LoginResponse_20001.newBuilder();
		builder.setUuid(uuid);
		if (player != null) {
			builder.setPlayerInfo(player.showPlayerInfo());
		}
		builder.setNowTime(System.currentTimeMillis());
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.LOGIN);
		msg.setBody(builder);

		ResponseMsg.sendMsg(msg, response);

	}

	/** 创建角色返回 */
	public static void sendCreatePlayerMsg(IPlayer player, Response response) {
		CreatePlayerResponse_20002.Builder builder = CreatePlayerResponse_20002.newBuilder();
		builder.setPlayerInfo(player.showPlayerInfo());

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.CREATE_PLAYER);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

}
