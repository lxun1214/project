package com.rt.logic.player;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.pb.PbPlayer.PbBaseItemInfo;
import com.rt.pb.PbPlayer.PlayerCurrencyChangeResponse_30005;
import com.rt.pb.PbPlayer.PlayerDieResponse_20005;
import com.rt.pb.PbPlayer.PlayerFightPowerChangeResponse_30004;
import com.rt.pb.PbPlayer.PlayerVipLevelChangeResponse_30009;
import com.rt.pb.PbPlayer.RankingRewardChangeResponse_30001;
import com.rt.pb.PbPlayer.RebirthResponse_20011;
import com.rt.pb.PbPlayer.ReceiveVipRewardResponse_20043;
import com.rt.pb.PbPlayer.UseGiftCodeResponse_20045;

public class PlayerMsg {
	
	
	
	/**
	 * 使用激活码返回
	 * @param playerId
	 * @param code
	 * @param itemMap
	 */
	public static void sendUseGiftCodeMsg(long playerId,int code,Map<Integer, Integer> itemMap){
		UseGiftCodeResponse_20045.Builder builder = UseGiftCodeResponse_20045.newBuilder();
		builder.setCode(code);
		if(code == 0){
			List<PbBaseItemInfo> itemList = new ArrayList<>();
			for (Integer itemId : itemMap.keySet()) {
				PbBaseItemInfo.Builder itemBuild = PbBaseItemInfo.newBuilder();
				itemBuild.setItemId(itemId);
				itemBuild.setItemNum(itemMap.get(itemId));
				itemList.add(itemBuild.build());
			}
			builder.addAllItemList(itemList);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.USE_GIFT_CODE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId,msg);
		
	}
	

	/**
	 * player死亡返回消息
	 * 
	 * @param lastId
	 * @param resposne
	 */
	public static void sendPlayerDieMsg(long playerId,int lastId) {
		PlayerDieResponse_20005.Builder builder = PlayerDieResponse_20005.newBuilder();
		builder.setLastId(lastId);

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.PLAYER_DIE);
		msg.setBody(builder);

		ResponseMsg.sendMsg(playerId,msg);
	}

	/**
	 * 重生
	 * @param player
	 * @param response
	 */
	public static void sendRebirthMsg(IPlayer player,boolean isSuccess) {
		RebirthResponse_20011.Builder builder = RebirthResponse_20011.newBuilder();
		builder.setIsSuccess(isSuccess);
		if(isSuccess){
			builder.setPlayerInfo(player.showPlayerInfo());
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.REBIRTH);
		msg.setBody(builder);
		ResponseMsg.sendMsg(player.getPlayerId(),msg);
	}

	/***
	 * 通知用户可以领取竞技场排行奖励
	 * @param playerId
	 */
	public static void sendRankingRewardChange(long playerId){
		RankingRewardChangeResponse_30001.Builder builder=RankingRewardChangeResponse_30001.newBuilder();
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.RANKING_REWARD_CHANGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId,msg);
	}
	
	
	/**
	 * 货币变化返回
	 * @param playerId
	 * @param currencyType
	 * @param nun
	 */
	public static void sendCurrencyChangeMsg(long playerId,String currencyType,int nun){
		PlayerCurrencyChangeResponse_30005.Builder builder=PlayerCurrencyChangeResponse_30005.newBuilder();
		builder.setCurrencyType(currencyType);
		builder.setChangeNum(nun);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.CURRENCY_CHANGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId,msg);
	}
	
	
	/**
	 * 战力变化推送
	 * @param playerId
	 * @param fightPower
	 */
	public static void sendFightPowerChangeMsg(long playerId,int fightPower){
		PlayerFightPowerChangeResponse_30004.Builder builder=PlayerFightPowerChangeResponse_30004.newBuilder();
		builder.setFightPower(fightPower);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.FIGHT_POWER_CHANGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId,msg);
	}
	
	
	/**
	 * vip变化推送
	 * @param playerId
	 * @param vipLevel
	 */
	public static void sendVipChangeMsg(long playerId,int vipLevel,int vipExp){
		PlayerVipLevelChangeResponse_30009.Builder builder = PlayerVipLevelChangeResponse_30009.newBuilder();
		builder.setVipLevel(vipLevel);
		builder.setVipExp(vipExp);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.VIP_LEVEL_CHANGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId,msg);
	}
	
	
	/**
	 * 领取vip奖励返回
	 * @param playerId
	 * @param vipLevel
	 * @param isSuccess
	 */
	public static void sendReceiveVipRewardMsg(long playerId,int vipLevel,boolean isSuccess){
		ReceiveVipRewardResponse_20043.Builder builder = ReceiveVipRewardResponse_20043.newBuilder();
		builder.setVipLvl(vipLevel);
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.RECEIVE_VIP_REWARD);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId,msg);
	}
}
