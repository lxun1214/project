package com.rt.log.model;

import com.dataeye.sdk.proto.DCServerSync.DCMessage.AccountType;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.PlatformType;

public class PlayerLogModel {

	private String accountId;// playerId

	private PlatformType platform; // 平台类型（安卓/IOS）

	private AccountType accountType;// 账号类型

	private String gameRegion;// 区服

	private String channel;// 渠道
	
	
	public PlayerLogModel(String accountId){
		this.accountId=accountId;
	}

	public PlayerLogModel(String accountId, PlatformType platform, AccountType accountType, String gameRegion,
			String channel) {
		this.accountId = accountId;
		this.platform = platform;
		this.accountType = accountType;
		this.gameRegion = gameRegion;
		this.channel = channel;
	}
	
	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public PlatformType getPlatform() {
		return platform;
	}

	public void setPlatform(PlatformType platform) {
		this.platform = platform;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public String getGameRegion() {
		return gameRegion;
	}

	public void setGameRegion(String gameRegion) {
		this.gameRegion = gameRegion;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}


}
