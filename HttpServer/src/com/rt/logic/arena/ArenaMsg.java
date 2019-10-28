package com.rt.logic.arena;

import java.util.List;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.Response;
import com.rt.pb.PbPlayer.EnterArenaResponse_20020;
import com.rt.pb.PbPlayer.FightSettlementResponse_20023;
import com.rt.pb.PbPlayer.GetRankingsPowerResponse_20025;
import com.rt.pb.PbPlayer.GetRankingsResponse_20024;
import com.rt.pb.PbPlayer.LaunchChallengeResponse_20022;
import com.rt.pb.PbPlayer.PbFightTargetDetailInfo;
import com.rt.pb.PbPlayer.PbFightTargetInfo;
import com.rt.pb.PbPlayer.PbRankingsPlayerInfo;
import com.rt.pb.PbPlayer.PurchaseChallengeNumResponse_20021;

public class ArenaMsg {

	/**
	 * 进入竞技场
	 * 
	 * @param list
	 * @param rankings
	 * @param response
	 */
	public static void sendEnterArenaMsg(List<PbFightTargetInfo> list, int rankings, Response response) {
		EnterArenaResponse_20020.Builder builder = EnterArenaResponse_20020.newBuilder();
		builder.setRankings(rankings);
		builder.addAllFightTargetInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ENTER_ARENA);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 购买竞技场挑战次数
	 * 
	 * @param isSuccess
	 * @param diamond
	 * @param response
	 */
	public static void sendPurchaseChallengeNumMsg(boolean isSuccess, int diamond, Response response) {
		PurchaseChallengeNumResponse_20021.Builder builder = PurchaseChallengeNumResponse_20021.newBuilder();
		builder.setIsSuccess(isSuccess);
		if (isSuccess) {
			builder.setDiamond(diamond);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.PURCHASE_CHALLENGE_NUM);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 发起战斗返回
	 * 
	 * @param fightTargetDetailInfo
	 * @param response
	 */
	public static void sendLaunchChallengeMsg(PbFightTargetDetailInfo.Builder fightTargetDetailInfo,
			Response response) {
		LaunchChallengeResponse_20022.Builder builder = LaunchChallengeResponse_20022.newBuilder();
		builder.setFightTargetDetailInfo(fightTargetDetailInfo);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.LAUNCH_CHALLENGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 战斗结算返回
	 * 
	 * @param isSuccess
	 * @param response
	 */
	public static void sendFightSettlementMsg(boolean isSuccess, Response response) {
		FightSettlementResponse_20023.Builder builder = FightSettlementResponse_20023.newBuilder();
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.FIGHT_SETTLEMENT);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 竞技获取排行榜返回
	 * @param list
	 * @param rankings
	 * @param response
	 */
	public static void sendGetRankingsMsg(List<PbRankingsPlayerInfo> list, int rankings, Response response) {
		GetRankingsResponse_20024.Builder builder = GetRankingsResponse_20024.newBuilder();
		builder.setRankings(rankings);
		builder.addAllRankingsInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GET_RANKINGS);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}
	
	
	/**
	 * 获取战力排行榜返回
	 * @param list
	 * @param rankings
	 * @param response
	 */
	public static void sendGetPowerRankingsMsg(List<PbRankingsPlayerInfo> list, int rankings, Response response) {
		GetRankingsPowerResponse_20025.Builder builder = GetRankingsPowerResponse_20025.newBuilder();
		builder.setRankings(rankings);
		builder.addAllRankingsInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GET_POWER_RANKINGS);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

}
