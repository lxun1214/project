package com.rt.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

public class SignUtils {
	
	public static String getAuthInfo(Map<String, String> params, String key) {
		String auth = null;
		try {
			List<String> list = new ArrayList<String>();
			StringBuilder sb = new StringBuilder();

			Collection<String> keySet = params.keySet();
			for (String str : keySet) {
				if ("sing".equals(str)) continue;
				if (StringUtils.isNotBlank(params.get(str)))
					list.add(str);
			}
			Collections.sort(list);
			for (String str : list) {
				sb.append(str).append("=").append(params.get(str)).append("&");
			}
			sb.append("key=").append(key);
			System.out.println(sb.toString());
			auth =Md5Utils.md5(sb.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		return auth;
	}
	
	public static void main(String[] args) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("siteId", "0001");
		params.put("token", "bc79e6bff4ab04a1c1e1247430b05031");
		System.out.println(getAuthInfo(params,"AGDL8025G0B8057JHG8L"));
	}
}
