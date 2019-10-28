package com.rt.logic.bag;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
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
	public static void sendGemMountMsg(IPlayer player, boolean isSuccess,int itemId) {
		GemMountResponse_20014.Builder builder = GemMountResponse_20014.newBuilder();
		builder.setIsSuccess(isSuccess);
		if (isSuccess) {
			builder.setItemId(itemId);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GEM_MOUNT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(player.getPlayerId(),msg);
	}

	/**
	 * 宝石摘除
	 * 
	 * @param player
	 * @param isSuccess
	 * @param itemChangeList
	 * @param response
	 */
	public static void sendGemRemoveMsg(IPlayer player, boolean isSuccess,int columnLoc, int grooveLoc ) {
		GemRemoveResponse_20015.Builder builder = GemRemoveResponse_20015.newBuilder();
		builder.setIsSuccess(isSuccess);
		if(isSuccess){
			builder.setColumnLoc(columnLoc);
			builder.setGrooveLoc(grooveLoc);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GEM_REMOVE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(player.getPlayerId(),msg);

	}

	/**
	 * 合成背包中宝石
	 * 
	 * @param changeList
	 * @param response
	 */
	public static void sendGemComposeInBagMsg(long playerId,boolean isSuccess) {
		GemComposeInBagResponse_20016.Builder builder = GemComposeInBagResponse_20016.newBuilder();
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GEM_COMPOSE_IN_BAG);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId,msg);
	}

	/**
	 * 合成镶嵌在宝石槽中的宝石
	 * 
	 * @param player
	 * @param isSuccess
	 * @param changeList
	 * @param response
	 */
	public static void sendGemComposeInGrooveMsg(IPlayer player,boolean isSuccess,int columnLoc, int grooveLoc,int gemId) {
		GemComposeInGrooveResponse_20017.Builder builder = GemComposeInGrooveResponse_20017.newBuilder();
		builder.setIsSuccess(isSuccess);
		builder.setColumnLoc(columnLoc);
		builder.setGrooveLoc(grooveLoc);
		if(isSuccess){
			builder.setGemId(gemId);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GEM_COMPOSE_IN_GROOVE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(player.getPlayerId(),msg);
	}
}
