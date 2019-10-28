package com.rt.logic.arena;

import java.util.List;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.pb.PbPlayer.EnterArenaResponse_20020;
import com.rt.pb.PbPlayer.FightSettlementResponse_20023;
import com.rt.pb.PbPlayer.GetRankingsLevelResponse_40001;
import com.rt.pb.PbPlayer.GetRankingsMoneyResponse_40002;
import com.rt.pb.PbPlayer.GetRankingsPowerResponse_20025;
import com.rt.pb.PbPlayer.GetRankingsResponse_20024;
import com.rt.pb.PbPlayer.LaunchChallengeResponse_20022;
import com.rt.pb.PbPlayer.PbFightTargetDetailInfo;
import com.rt.pb.PbPlayer.PbFightTargetInfo;
import com.rt.pb.PbPlayer.PbRankingsPlayerInfo;
import com.rt.pb.PbPlayer.PurchaseChallengeNumResponse_20021;
import com.rt.pb.PbPlayer.ReceiveArenaRewardResponse_20026;
import com.rt.pb.PbPlayer.RefreshArenaResponse_20030;

public class ArenaMsg {

	/**
	 * 进入竞技场
	 * 
	 * @param list
	 * @param rankings
	 * @param response
	 */
	public static void sendEnterArenaMsg(long playerId, List<PbFightTargetInfo> list, int rankings) {
		EnterArenaResponse_20020.Builder builder = EnterArenaResponse_20020.newBuilder();
		builder.setRankings(rankings);
		builder.addAllFightTargetInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ENTER_ARENA);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}

	/**
	 * 购买竞技场挑战次数
	 * 
	 * @param isSuccess
	 * @param diamond
	 * @param response
	 */
	public static void sendPurchaseChallengeNumMsg(long playerId, boolean isSuccess) {
		PurchaseChallengeNumResponse_20021.Builder builder = PurchaseChallengeNumResponse_20021.newBuilder();
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.PURCHASE_CHALLENGE_NUM);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}

	/**
	 * 发起战斗返回
	 * 
	 * @param fightTargetDetailInfo
	 * @param response
	 */
	public static void sendLaunchChallengeMsg(long playerId, PbFightTargetDetailInfo.Builder fightTargetDetailInfo) {
		LaunchChallengeResponse_20022.Builder builder = LaunchChallengeResponse_20022.newBuilder();
		builder.setFightTargetDetailInfo(fightTargetDetailInfo);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.LAUNCH_CHALLENGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}

	/**
	 * 战斗结算返回
	 * 
	 * @param isSuccess
	 * @param response
	 */
	public static void sendFightSettlementMsg(long playerId, boolean isSuccess) {
		FightSettlementResponse_20023.Builder builder = FightSettlementResponse_20023.newBuilder();
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.FIGHT_SETTLEMENT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}

	/**
	 * 竞技获取排行榜返回
	 * 
	 * @param list
	 * @param rankings
	 * @param response
	 */
	public static void sendGetRankingsMsg(long playerId, List<PbRankingsPlayerInfo> list, int rankings) {
		GetRankingsResponse_20024.Builder builder = GetRankingsResponse_20024.newBuilder();
		builder.setRankings(rankings);
		builder.addAllRankingsInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GET_RANKINGS);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}

	/**
	 * 获取战力排行榜返回
	 * 
	 * @param list
	 * @param rankings
	 * @param response
	 */
	public static void sendGetPowerRankingsMsg(long playerId, List<PbRankingsPlayerInfo> list, int rankings) {
		GetRankingsPowerResponse_20025.Builder builder = GetRankingsPowerResponse_20025.newBuilder();
		builder.setRankings(rankings);
		builder.addAllRankingsInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GET_POWER_RANKINGS);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}

	/**
	 * 领取竞技场排行奖励返回
	 * @param playerId
	 * @param code
	 * @param goled
	 * @param sportsMoney
	 */
	public static void sendReceiveArenaRewardMsg(long playerId, int code) {
		ReceiveArenaRewardResponse_20026.Builder builder = ReceiveArenaRewardResponse_20026.newBuilder();
		builder.setCode(code);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.RECEIVE_ARENA_REWARD);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	/**
	 * 竞技场刷新挑战者
	 * @param playerId
	 * @param list
	 */
	public static void sendRefreshArenaMsg(long playerId, List<PbFightTargetInfo> list) {
		RefreshArenaResponse_20030.Builder builder = RefreshArenaResponse_20030.newBuilder();
		builder.addAllFightTargetInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.REFRESH_ARENA);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	
	/**
	 * 获取等级排行榜返回
	 * 
	 * @param list
	 * @param rankings
	 * @param response
	 */
	public static void sendGetLVLRankingsMsg(long playerId, List<PbRankingsPlayerInfo> list, int rankings) {
		GetRankingsLevelResponse_40001.Builder builder = GetRankingsLevelResponse_40001.newBuilder();
		builder.setRankings(rankings);
		builder.addAllRankingsInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.LEVEL_RANK_BACK);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	/**
	 * 获取充值排行榜返回
	 * 
	 * @param list
	 * @param rankings
	 * @param response
	 */
	public static void sendGetMoneyRankingsMsg(long playerId, List<PbRankingsPlayerInfo> list, int rankings) {
		GetRankingsMoneyResponse_40002.Builder builder = GetRankingsMoneyResponse_40002.newBuilder();
		builder.setRankings(rankings);
		builder.addAllRankingsInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.MONEY_RANK_BACK);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
}
