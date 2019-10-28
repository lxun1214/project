package com.rt.logic.item;

import com.rt.pb.PbPlayer.PbItemInfo;

public class Item {

	/** 道具唯一id */
	long uuid;

	/** 道具id */
	int itemId;

	/** 道具数量 */
	int itemNum;

	Equipment equipment;
	
	
	public PbItemInfo.Builder showItemInfo() {
		PbItemInfo.Builder itemBuilder = PbItemInfo.newBuilder();
		itemBuilder.setUuid(uuid);
		itemBuilder.setItemId(itemId);
		itemBuilder.setItemNum(itemNum);

		if (equipment != null) {
			itemBuilder.setLevel(equipment.getLevel());
		}
		return itemBuilder;
	}
	
	public void init(int itemId,int itemNum) {
		this.itemId = itemId;
		this.itemNum = itemNum;
	}

	public long getUuid() {
		return uuid;
	}

	public void setUuid(long uuid) {
		this.uuid = uuid;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public int getItemNum() {
		return itemNum;
	}

	public void setItemNum(int itemNum) {
		this.itemNum = itemNum;
	}

	public Equipment getEquipment() {
		return equipment;
	}

	public void setEquipment(Equipment equipment) {
		this.equipment = equipment;
	}

}
