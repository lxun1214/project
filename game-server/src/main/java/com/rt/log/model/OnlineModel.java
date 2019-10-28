package com.rt.log.model;

public class OnlineModel extends BaseLogModel {

	public OnlineModel(int loginTime) {
		this.loginTime = loginTime;
	}

	private int loginTime;

	public int getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(int loginTime) {
		this.loginTime = loginTime;
	}

}
