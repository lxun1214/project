package com.rt.logic.player;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.Response;
import com.rt.pb.PbPlayer.PlayerDieResponse_20005;
import com.rt.pb.PbPlayer.RebirthResponse_20011;

public class PlayerMsg {

	/**
	 * player死亡返回消息
	 * 
	 * @param lastId
	 * @param resposne
	 */
	public static void sendPlayerDieMsg(int lastId, Response response) {
		PlayerDieResponse_20005.Builder builder = PlayerDieResponse_20005.newBuilder();
		builder.setLastId(lastId);

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.PLAYER_DIE);
		msg.setBody(builder);

		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 重生
	 * @param player
	 * @param response
	 */
	public static void sendRebirthMsg(IPlayer player, Response response) {
		RebirthResponse_20011.Builder builder = RebirthResponse_20011.newBuilder();
		builder.setStrengthenArtifactStone(player.getStrengthenArtifactStone());
		builder.setUpgradeSkillsJade(player.getUpgradeSkillsJade());
		builder.setReinforcedEquipmentStone(player.getReinforcedEquipmentStone());
		builder.setFightPower(player.getFightPower());

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.REBIRTH);
		msg.setBody(builder);

		ResponseMsg.sendMsg(msg, response);
	}

}
