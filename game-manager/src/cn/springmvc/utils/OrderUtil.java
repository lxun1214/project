package cn.springmvc.utils;

import java.text.SimpleDateFormat;
import java.util.Date;


public class OrderUtil {

	static Date today = new Date();
	static int orderIndex = 0;

	@SuppressWarnings("deprecation")
	private static String getIndex() {

		Date n = new Date();
		SimpleDateFormat outFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String currTime = outFormat.format(n);

		if (orderIndex > 0) {
			if (n.getYear() == today.getYear() && n.getMonth() == today.getMonth() && n.getDay() == today.getDay()) {
				orderIndex += 1;
			} else {
				today = n;
				orderIndex = 1;
			}
		} else {
			today = n;
			orderIndex = 1;
		}
		if (orderIndex > 999999) {
			orderIndex = 1;
		}
		String indexString = String.format("%s%06d", currTime, orderIndex);
		return indexString;
	}

	/**
	 * 生成订单号
	 * 
	 * @param preFixString
	 * @return
	 */
	public static String GetOrderNumber(String preFixString) {
		String orderNumberString = preFixString + getIndex();
		return orderNumberString;
	}

	/**
	 * 获取时间戳
	 * @return
	 */
	public static String GetTimestamp() {
		return Long.toString(new Date().getTime() / 1000);
	}

	public static void main(String[] args) {
		System.out.println(GetOrderNumber(""));
	}
	
}