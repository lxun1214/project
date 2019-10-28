package com.rt.logic.bag;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.logic.item.Equipment;
import com.rt.logic.item.Item;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.DecomposeEquipmentResponse_20012;
import com.rt.pb.PbPlayer.GetBagResponse_20003;
import com.rt.pb.PbPlayer.ItemChangeResponse_30002;
import com.rt.pb.PbPlayer.OpenBoxResponse_20035;
import com.rt.pb.PbPlayer.PbBagChangeInfo;
import com.rt.pb.PbPlayer.PbItemInfo;
import com.rt.pb.PbPlayer.ReinforcedEquipResponse_20010;
import com.rt.pb.PbPlayer.TakeOffEquipResponse_20031;
import com.rt.pb.PbPlayer.UpgradeEquipResponse_20009;
import com.rt.pb.PbPlayer.WearEquipResponse_20008;

public class BagMsg {
	/**
	 * 返回背包数据
	 * 
	 * @param response
	 * @param itemUuidMap
	 */
	public static void sendBagMsg(long playerId, Map<Long, Item> itemUuidMap) {
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

		ResponseMsg.sendMsg(playerId, msg);
	}

	/**
	 * 穿装备返回
	 * 
	 * @param itemChangeList
	 * @param fightPower
	 * @param response
	 */
	public static void sendWearEquipMsg(long playerId, List<Item> itemChangeList,int loc) {
		WearEquipResponse_20008.Builder builder = WearEquipResponse_20008.newBuilder();
		builder.setBagChangeInfo(createBagChangeInfo(itemChangeList));
		builder.setLoc(loc);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.WEAR_EQUIPMENT);
		msg.setBody(builder);

		ResponseMsg.sendMsg(playerId, msg);
	}

	/**
	 * 装备升级返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param response
	 */
	public static void sendUpgradeEquipMsg(IPlayer player, boolean isSuccess) {
		UpgradeEquipResponse_20009.Builder builder = UpgradeEquipResponse_20009.newBuilder();
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.UPGRADE_EQUIP);
		msg.setBody(builder);

		ResponseMsg.sendMsg(player.getPlayerId(), msg);
	}

	/**
	 * 装备升阶返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param response
	 */
	public static void sendReinforcedEquipMsg(IPlayer player, boolean isSuccess) {
		ReinforcedEquipResponse_20010.Builder builder = ReinforcedEquipResponse_20010.newBuilder();
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.REINFORCED_EQUIP);
		msg.setBody(builder);

		ResponseMsg.sendMsg(player.getPlayerId(), msg);
	}

	/**
	 * 熔炼分解装备返回
	 * 
	 * @param player
	 * @param isSuccess
	 * @param response
	 */
	public static void sendDecomposeEquipMsg(long playerId, boolean isSuccess) {
		DecomposeEquipmentResponse_20012.Builder builder = DecomposeEquipmentResponse_20012.newBuilder();
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.EQUIPMENT_DECOMPOSE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	/**
	 * 开启箱子返回
	 * @param playerId
	 * @param isSuccess
	 */
	public static void sendOpenBoxMsg(long playerId, boolean isSuccess){
		OpenBoxResponse_20035.Builder builder = OpenBoxResponse_20035.newBuilder();
		builder.setIsSuccess(isSuccess);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.OPEN_BOX);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
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
	
	
	/**
	 * 背包变化返回
	 * @param playerId
	 * @param changeList
	 */
	public static void sendItemChangeMsg(long playerId, List<Item> changeList) {
		if(changeList==null){
			return;
		}
		ItemChangeResponse_30002.Builder builder = ItemChangeResponse_30002.newBuilder();
		builder.setBagChangeInfo(createBagChangeInfo(changeList));
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.ITEM_CHANGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	
	/**
	 * 穿装备返回
	 * @param playerId
	 * @param isSuccess
	 */
	public static void sendTakeOffEquipMsg(long playerId, boolean isSuccess,int loc) {
		TakeOffEquipResponse_20031.Builder builder = TakeOffEquipResponse_20031.newBuilder();
		builder.setIsSuccess(isSuccess);
		if(isSuccess){
			builder.setLoc(loc);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.TAKE_OFF_EQUIP);
		msg.setBody(builder);

		ResponseMsg.sendMsg(playerId, msg);
	}
}
