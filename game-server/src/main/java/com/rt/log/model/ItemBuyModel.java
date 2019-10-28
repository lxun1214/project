package com.rt.log.model;

public class ItemBuyModel extends BaseLogModel {

	private  String itemId;
	
	private String itemType;
	
	private int itemCnt;
	
	private int coinNum;
	
	private String coinType;
	
	private String reason;
	

	public ItemBuyModel(String itemId,String itemType,int itemCnt,int coinNum,String coinType,String reason){
		this.itemId=itemId;
		this.itemType=itemType;
		this.itemCnt=itemCnt;
		this.coinNum=coinNum;
		this.coinType=coinType;
		this.reason=reason;
	}
	

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
	
	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	
	public int getItemCnt() {
		return itemCnt;
	}

	public void setItemCnt(int itemCnt) {
		this.itemCnt = itemCnt;
	}

	public int getCoinNum() {
		return coinNum;
	}

	public void setCoinNum(int coinNum) {
		this.coinNum = coinNum;
	}

	public String getCoinType() {
		return coinType;
	}

	public void setCoinType(String coinType) {
		this.coinType = coinType;
	}


	public String getItemType() {
		return itemType;
	}

	public void setItemType(String itemType) {
		this.itemType = itemType;
	}
}
