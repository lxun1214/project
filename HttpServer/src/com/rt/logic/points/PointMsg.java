package com.rt.logic.points;

import java.util.ArrayList;
import java.util.List;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.Response;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.Column;
import com.rt.logic.item.Item;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ClearanceResponse_20004;
import com.rt.pb.PbPlayer.PbGemGrooveInfo;
import com.rt.pb.PbPlayer.PbGemGrooveInfos;

public class PointMsg {

	/**
	 * 过关信息返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param gold
	 * @param addStrengthenArtifactStone
	 *            奖励的神器升级石数量
	 * @param addUpgradeSkillsJade
	 *            奖励的技能玉数量
	 * @param addReinforcedEquipmentStone
	 *            奖励的装备升阶数量
	 * @param changeItemList
	 *            背包内发生变化的道具列表
	 * @param equipCoordinateList
	 *            解锁技能的装备栏部位集合
	 * @param gemGrooveList
	 *            解锁的宝石槽部位集合，与装备栏部位对应
	 */
	public static void sendClearanceMsg(Response response, IPlayer player, boolean isSuccess, int oldLevel,
			int oldPower, int addGold, List<Item> changeItemList, List<Integer> equipCoordinateList,
			List<List<Integer>> gemGrooveList) {
		ClearanceResponse_20004.Builder builder = ClearanceResponse_20004.newBuilder();
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.CLEARANCE);

		builder.setIsSuccess(isSuccess);
		if (!isSuccess) {
			msg.setBody(builder);
			ResponseMsg.sendMsg(msg, response);
			return;
		}
		builder.setNextId(player.getPointsId());
		builder.setExp(player.getExp());
		if (player.getLevel() > oldLevel) {
			builder.setLevel(player.getLevel());
		}
		if (player.getFightPower() > oldPower) {
			builder.setFightPower(player.getFightPower());
		}
		if (addGold > 0) {
			builder.setGold(player.getGold());
		}
		if (changeItemList != null && changeItemList.size() > 0) {
			builder.setBagChangeInfo(BagMsg.createBagChangeInfo(changeItemList));
		}
		// 宝石槽部分
		//栏位
		builder.addAllUnlockColumns(equipCoordinateList);
		//宝石槽
		List<PbGemGrooveInfos> unlockGemGrooveList = new ArrayList<>();
		for (int i = 0; i < gemGrooveList.size(); i++) {
			//解锁的对应栏位的宝石槽位置列表
			List<Integer> list = gemGrooveList.get(i);
			//装备栏位
			Column column = player.getEquipmentColumn().getColumns()[equipCoordinateList.get(i)];
			PbGemGrooveInfos.Builder gemGrooveInfosBuilder = PbGemGrooveInfos.newBuilder();
			//单个宝石槽信息列表
			List<PbGemGrooveInfo> gemGrooveInfoList = new ArrayList<>();
			for(int j = 0;j < list.size();j++) {
				//宝石槽位置
				int GrooveLoc = list.get(j);
				//宝石槽信息
				PbGemGrooveInfo.Builder gemGrooveInfoBuilder = column.getGrooves()[GrooveLoc].showGemGrooveInfo();
				gemGrooveInfoList.add(gemGrooveInfoBuilder.build());
			}
			gemGrooveInfosBuilder.addAllGemGrooves(gemGrooveInfoList);
			unlockGemGrooveList.add(gemGrooveInfosBuilder.build());
		}
		builder.addAllUnlockGemGrooves(unlockGemGrooveList);
		
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}
}
