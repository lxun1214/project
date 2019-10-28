package com.rt.log.model;

public class CoinGainModel extends BaseLogModel {

	private String coinType;

	private int coinNum;

	private int totalCoin;

	private String type;

	public CoinGainModel(String coinType, int coinNum, int totalCoin, String type) {
		this.coinType = coinType;
		this.coinNum = coinNum;
		this.totalCoin = totalCoin;
		this.type = type;
	}

	public String getCoinType() {
		return coinType;
	}

	public void setCoinType(String coinType) {
		this.coinType = coinType;
	}

	public int getCoinNum() {
		return coinNum;
	}

	public void setCoinNum(int coinNum) {
		this.coinNum = coinNum;
	}

	public int getTotalCoin() {
		return totalCoin;
	}

	public void setTotalCoin(int totalCoin) {
		this.totalCoin = totalCoin;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
