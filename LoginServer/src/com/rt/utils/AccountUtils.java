package com.rt.utils;

public class AccountUtils {

	static final  String SDK_TYPE = "account";
	
	/**
	 * 根据渠道类型，生成唯一账号
	 * @param sdkType
	 * @param sdkUserId
	 * @return
	 */
	public static String createAccount(int sdkType,String sdkUserId){
		StringBuilder builder = new StringBuilder();
		builder.append(sdkType).append(SDK_TYPE).append(sdkUserId);
		return builder.toString();
	}
}
