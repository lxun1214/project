package com.rt.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 字符串相关工具类
 * @author xin.fengtao
 *
 */
public class StringUtils {

	/**
	 * 获得字符串长度 1个中文2个长度 1个英文1个长度
	 */
	public static int getStringLenth(String str) {
		int valueLength = 0;
		String chinese = "[\u0391-\uFFE5]";
		for (int i = 0; i < str.length(); i++) {
			/* 获取一个字符 */
			String temp = str.substring(i, i + 1);
			/* 判断是否为中文字符 */
			if (temp.matches(chinese)) {
				/* 中文字符长度为2 */
				valueLength += 2;
			} else {
				/* 其他字符长度为1 */
				valueLength += 1;
			}
		}
		return valueLength;
	}

	/**
	 * 账号密码是否合法 账号 12位，密码16位
	 * 
	 * @param type
	 *            1:账号 2：密码
	 * @param str
	 * @return
	 */
	public static boolean checkStr(int type, String str) {
		if (str == null || str.length() < 1) {
			return false;
		}
		if(checkSymbol(str)){
			return false;
		}
		int valueLength = getStringLenth(str);
		if (type == 1 && valueLength > 12) {
			return false;
		}
		if (type == 2 && valueLength > 12) {
			return false;
		}
		return true;
	}

	private static String regEx = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";

	/** 验证字符串中是否包含特殊字符， true:包含*/
	public static boolean checkSymbol(String str) {
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(str);
		return m.find();
	}

	
	
	
}
