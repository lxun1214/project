package com.rt.cache.data;

public class SdkInfo {

	private int sdkType;
	
	private String gameId;
	
	private String appId;
	
	private String appKey;
	
	private String appSecret;
	
	private String accessToken;

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

	public String getAppSecret() {
		return appSecret;
	}

	public void setAppSecret(String appSecret) {
		this.appSecret = appSecret;
	}


	public int getSdkType() {
		return sdkType;
	}

	public void setSdkType(int sdkType) {
		this.sdkType = sdkType;
	}

	public String getGameId() {
		return gameId;
	}

	public void setGameId(String gameId) {
		this.gameId = gameId;
	}
	
}
