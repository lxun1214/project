package com.rt.utils;

public class TemplateUtils {

	

	/**
	 * 封装get字段，首字符大写
	 * 
	 * @param fildeName
	 * @return
	 */
	public static String getMethodName(String filed) {
		StringBuilder builder = new StringBuilder("set");
		String[] fileds = filed.split("_");
		for (int i = 0; i < fileds.length; i++) {
			String fildeName = fileds[i];
			byte[] items = fildeName.getBytes();
			items[0] = (byte) ((char) items[0] - 'a' + 'A');
			builder.append(new String(items));
		}
		return builder.toString();
	}

}
