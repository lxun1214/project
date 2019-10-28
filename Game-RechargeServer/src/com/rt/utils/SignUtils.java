package com.rt.utils;

import java.util.Map;
import java.util.TreeMap;

import org.apache.log4j.Logger;



public class SignUtils {
	
	static Logger log = Logger.getLogger(SignUtils.class);
	
	public static String symCreateSign(Map<String, String> params) {
		String auth="";
		try {
			StringBuilder sb = new StringBuilder();
			sb.append("app_key=").append(params.get("appKey")).append("&");
			sb.append("app_id=").append(params.get("appId")).append("&");
			sb.append("orderid=").append(params.get("orderid")).append("&");
			sb.append("money=").append(params.get("money")).append("&");
			sb.append("pay_stat=").append(params.get("pay_stat")).append("&");
			sb.append("roleid=").append(params.get("roleid")).append("&");
			sb.append("serverid=").append(params.get("serverid")).append("&");
			sb.append("attach=").append(params.get("attach"));
			log.debug("手游迷  生成签名前字符串："+sb.toString());
		    auth = Md5Utils.md5(sb.toString());
			log.debug("手游迷   生成签名："+auth);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return auth;
	}
	
	
	public static String jlCreateSign(Map<String, String> params) {
		String auth="";
		try {
			StringBuilder sb = new StringBuilder();
			sb.append("cp_order=").append(params.get("cp_order")).append("&");
			sb.append("extra=").append(params.get("extra")).append("&");
			sb.append("game_id=").append(params.get("game_id")).append("&");
			sb.append("money=").append(params.get("money")).append("&");
			sb.append("pay_id=").append(params.get("pay_id")).append("&");
			sb.append("server_id=").append(params.get("server_id")).append("&");
			sb.append("time=").append(params.get("time")).append("&");
			sb.append("to_user=").append(params.get("to_user")).append("&");
			sb.append("user=").append(params.get("user")).append("&");
			sb.append("username=").append(params.get("username")).append("&");
			sb.append("key=").append(params.get("appKey"));
			log.debug("JL  生成签名前字符串："+sb.toString());
		    auth = Md5Utils.md5(sb.toString());
			log.debug("JL   生成签名："+auth);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return auth;
	}
	
	
	
	
	
//	appId=86e224f185bbcb536c9567c0fccc0eed
//	appKey=7002568415863fd467a2c3c72fe244ed7a3e5297
//	attach=15342388384913843
//	money=0.01
//	orderid=15342388384913843
//	pay_stat=success
//	roleid=893
//	serverid=1001
	
	public static void main(String[] args) {
//		String aString = "a=1&b=2&c=3&";
//		aString = aString.substring(0,aString.lastIndexOf("&"));
//		System.out.println(aString);
//		
//		String aaString="app_key=7002568415863fd467a2c3c72fe244ed7a3e5297&app_id=86e224f185bbcb536c9567c0fccc0eed&orderid=15342388384913843&money=0.01&pay_stat=success&roleid=893&serverid=1001&attach=15342388384913843";
//	   System.out.println(Md5Utils.md5(aaString));
		
		
		
		
		
		
		Map<String,String> map = new TreeMap<>();
		map.put("user_id", "");
		map.put("username", "");
		map.put("to_user", "");
		map.put("pay_id", "");
		map.put("money", "");
		map.put("game_id", "");
		map.put("server_id", "");
		map.put("cp_order", "");
		map.put("time", "");
		map.put("extra", "");
		
		
		for(String key:map.keySet()){
			System.out.println(key);
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
}
