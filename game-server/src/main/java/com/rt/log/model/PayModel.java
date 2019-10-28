package com.rt.log.model;

public class PayModel extends BaseLogModel {

	/** 付费金额 */
	private double currencyAmountDouble;

	/** 付费方式 */
	private String payType;

	/** 付费时间 */
	private int payTime;

	public PayModel(double currencyAmountDouble, String payType, int payTime) {
		this.currencyAmountDouble = currencyAmountDouble;
		this.payType = payType;
		this.payTime = payTime;
	}

	public int getPayTime() {
		return payTime;
	}

	public void setPayTime(int payTime) {
		this.payTime = payTime;
	}

	public double getCurrencyAmountDouble() {
		return currencyAmountDouble;
	}

	public void setCurrencyAmountDouble(double currencyAmountDouble) {
		this.currencyAmountDouble = currencyAmountDouble;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

}
