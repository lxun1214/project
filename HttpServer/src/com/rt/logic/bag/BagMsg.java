package com.rt.logic.bag;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.Response;
import com.rt.logic.item.Equipment;
import com.rt.logic.item.Item;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.DecomposeEquipmentResponse_20012;
import com.rt.pb.PbPlayer.GetBagResponse_20003;
import com.rt.pb.PbPlayer.PbBagChangeInfo;
import com.rt.pb.PbPlayer.PbItemInfo;
import com.rt.pb.PbPlayer.ReinforcedEquipResponse_20010;
import com.rt.pb.PbPlayer.UpgradeEquipResponse_20009;
import com.rt.pb.PbPlayer.WearEquipResponse_20008;

public class BagMsg {
	/**
	 * 返回背包数据
	 * 
	 * @param response
	 * @param itemUuidMap
	 */
	public static void sendBagMsg(Response response, Map<Long, Item> itemUuidMap) {
		GetBagResponse_20003.Builder builder = GetBagResponse_20003.newBuilder();
		List<PbItemInfo> list = new ArrayList<>();
		for (Map.Entry<Long, Item> entry : itemUuidMap.entrySet()) {
			Item item = entry.getValue();
			PbItemInfo.Builder itemBuilder = PbItemInfo.newBuilder();
			itemBuilder.setUuid(item.getUuid());
			itemBuilder.setItemId(item.getItemId());
			itemBuilder.setItemNum(item.getItemNum());

			Equipment equipment = item.getEquipment();
			if (equipment != null) {
				itemBuilder.setLevel(equipment.getLevel());
			}
			list.add(itemBuilder.build());
		}
		builder.addAllItems(list);

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GET_BAG);
		msg.setBody(builder);

		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 穿装备返回
	 * 
	 * @param itemChangeList
	 * @param fightPower
	 * @param response
	 */
	public static void sendWearEquipMsg(List<Item> itemChangeList, int fightPower, Response response) {
		WearEquipResponse_20008.Builder builder = WearEquipResponse_20008.newBuilder();
		builder.setFightPower(fightPower);
		builder.setBagChangeInfo(createBagChangeInfo(itemChangeList));

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.WEAR_EQUIPMENT);
		msg.setBody(builder);

		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 装备升级返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param response
	 */
	public static void sendUpgradeEquipMsg(IPlayer player, boolean isSuccess, Response response) {
		UpgradeEquipResponse_20009.Builder builder = UpgradeEquipResponse_20009.newBuilder();
		builder.setIsSuccess(isSuccess);
		if (isSuccess) {
			builder.setGold(player.getGold());
			builder.setFightPower(player.getFightPower());
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.UPGRADE_EQUIP);
		msg.setBody(builder);

		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 装备升阶返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param response
	 */
	public static void sendReinforcedEquipMsg(IPlayer player, boolean isSuccess, Response response) {
		ReinforcedEquipResponse_20010.Builder builder = ReinforcedEquipResponse_20010.newBuilder();
		builder.setIsSuccess(isSuccess);
		if (isSuccess) {
			builder.setReinforcedStone(player.getReinforcedEquipmentStone());
			builder.setFightPower(player.getFightPower());
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.REINFORCED_EQUIP);
		msg.setBody(builder);

		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 熔炼分解装备返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param response
	 */
	public static void sendDecomposeEquipMsg(List<Item> itemChangeList, int fenjieEquipmentStone, Response response) {
		DecomposeEquipmentResponse_20012.Builder builder = DecomposeEquipmentResponse_20012.newBuilder();
		builder.setFenjieEquipmentStone(fenjieEquipmentStone);
		builder.setBagChangeInfo(createBagChangeInfo(itemChangeList));
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.EQUIPMENT_DECOMPOSE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);
	}

	public static PbBagChangeInfo.Builder createBagChangeInfo(List<Item> list) {
		PbBagChangeInfo.Builder builder = PbBagChangeInfo.newBuilder();
		List<PbItemInfo> pbInfolist = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			Item item = list.get(i);
			PbItemInfo.Builder itemBuilder = PbItemInfo.newBuilder();
			itemBuilder.setUuid(item.getUuid());
			itemBuilder.setItemId(item.getItemId());
			itemBuilder.setItemNum(item.getItemNum());

			Equipment equipment = item.getEquipment();
			if (equipment != null) {
				itemBuilder.setLevel(equipment.getLevel());
			}
			pbInfolist.add(itemBuilder.build());
		}
		builder.addAllBagChangeItems(pbInfolist);
		return builder;

	}
}
