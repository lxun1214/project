package cn.springmvc.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class DateUtils {

	public static String getWeekOfDate(Date date) {
		String[] weekDaysName = { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int intWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
		return weekDaysName[intWeek];
	}

	// public static void main(String[] args) {
	// SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	// try {
	// System.out.println(getWeekOfDate(format.parse("2017-3-4")));
	// } catch (ParseException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }
	// }

	public static String getNowSevenDays(Map<String, Integer> map) {
		SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		Date date = new Date();
		map.put(sFormat.format(date), 0);
		for (int i = 1; i < 7; i++) {
			cal.add(Calendar.DAY_OF_MONTH, -1);
			date = cal.getTime();
			map.put(sFormat.format(date), 0);
		}
		return sFormat.format(date);
	}

	public static void main(String[] args) {
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		// Date date = new Date();
		// System.out.println(sdf.format(date));
		// System.out.println(sdf.format(getLastDate(date)));
		System.out.println(getNowSevenDays(new HashMap<>()));
	}

//	private static Date getLastDate(Date date) {
//		Calendar cal = Calendar.getInstance();
//		cal.setTime(date);
//		cal.add(Calendar.DAY_OF_MONTH, -1);
//		return cal.getTime();
//	}
}
