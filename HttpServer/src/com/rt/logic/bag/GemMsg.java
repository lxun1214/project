package com.rt.logic.bag;

import java.util.List;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.Response;
import com.rt.logic.item.Item;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.GemComposeInBagResponse_20016;
import com.rt.pb.PbPlayer.GemComposeInGrooveResponse_20017;
import com.rt.pb.PbPlayer.GemMountResponse_20014;
import com.rt.pb.PbPlayer.GemRemoveResponse_20015;

public class GemMsg {
	
	/**
	 * 宝石镶嵌返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param itemChangeList
	 * @param response
	 */
	public static void sendGemMountMsg(IPlayer player, boolean isSuccess, List<Item> itemChangeList,
			Response response) {
		GemMountResponse_20014.Builder builder = GemMountResponse_20014.newBuilder();
		builder.setIsSuccess(isSuccess);
		if (isSuccess) {
			builder.setFightPower(player.getFightPower());
			builder.setBagChangeInfo(BagMsg.createBagChangeInfo(itemChangeList));
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GEM_MOUNT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 宝石摘除
	 * 
	 * @param player
	 * @param isSuccess
	 * @param itemChangeList
	 * @param response
	 */
	public static void sendGemRemoveMsg(IPlayer player, boolean isSuccess, List<Item> itemChangeList,
			Response response) {
		GemRemoveResponse_20015.Builder builder = GemRemoveResponse_20015.newBuilder();
		builder.setIsSuccess(isSuccess);
		if (isSuccess) {
			builder.setFightPower(player.getFightPower());
			builder.setBagChangeInfo(BagMsg.createBagChangeInfo(itemChangeList));
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GEM_MOUNT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);

	}

	/**
	 * 合成背包中宝石
	 * 
	 * @param changeList
	 * @param response
	 */
	public static void sendGemComposeInBagMsg(List<Item> changeList, Response response) {
		GemComposeInBagResponse_20016.Builder builder = GemComposeInBagResponse_20016.newBuilder();
		builder.setBagChangeInfo(BagMsg.createBagChangeInfo(changeList));

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GEM_MOUNT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 合成镶嵌在宝石槽中的宝石
	 * 
	 * @param player
	 * @param isSuccess
	 * @param changeList
	 * @param response
	 */
	public static void sendGemComposeInGrooveMsg(IPlayer player, List<Item> changeList, Response response) {
		GemComposeInGrooveResponse_20017.Builder builder = GemComposeInGrooveResponse_20017.newBuilder();
		builder.setFightPower(player.getFightPower());
		builder.setBagChangeInfo(BagMsg.createBagChangeInfo(changeList));
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GEM_MOUNT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}
}
