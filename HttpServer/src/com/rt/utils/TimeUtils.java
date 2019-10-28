package com.rt.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class TimeUtils {

	/**
	 * 获取当前年份和当前年份的第几周，组成字符串返回
	 * 
	 * @return String
	 * @exception @since
	 *                1.1.0
	 */
	public static String getNowYearOnWeek() {
		Calendar cal = Calendar.getInstance();
		int day_of_week = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if (day_of_week == 0) {
			cal.add(Calendar.DATE, -1);
		}
		int year = cal.get(Calendar.YEAR);
		int week = cal.get(Calendar.WEEK_OF_YEAR);
		StringBuilder sb = new StringBuilder();
		sb.append(year).append("_").append(week).append("_");
		return sb.toString();
	}

	/**
	 * 获取本周星期几 （java的是周日到周六，这里取得是周一到周日）
	 * 
	 * @return
	 */
	public static int getNowWeek() {
		Calendar calendar = Calendar.getInstance();
		int day_of_week = calendar.get(Calendar.DAY_OF_WEEK) - 1;
		if (day_of_week == 0) {
			day_of_week = 7;
		}
		return day_of_week;
	}

	/**
	 * 一年当中第几周 (周一到周日算一周)
	 * 
	 * @return
	 */
	public static int getToWeek() {
		Calendar cal = Calendar.getInstance();
		int day_of_week = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if (day_of_week == 0) {
			cal.add(Calendar.DATE, -1);
		}
		int week = cal.get(Calendar.WEEK_OF_YEAR);
		return week;
	}

	/**
	 * 抽奖用到的重置时间
	 * 
	 * @return
	 */
	public static int getLuckResetTime(int hour) {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.HOUR, -hour);
		int day_of_week = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if (day_of_week == 0) {
			cal.add(Calendar.DATE, -1);
		}
		int week = cal.get(Calendar.WEEK_OF_YEAR);
		return week;
	}

	/**
	 * 一年当中第几天
	 * 
	 * @return
	 */
	public static int getToday() {
		Calendar calendar = Calendar.getInstance();
		return calendar.get(Calendar.DAY_OF_YEAR);
	}

	/**
	 * 在几个时间段中获取当前时间属于哪个时间段
	 * 
	 * @param hhList
	 * @return
	 */
	public static int getNowH(List<Integer> hhList) {
		if (hhList.size() == 1) {
			return hhList.get(0);
		}
		int returnH = -1;
		Calendar c = Calendar.getInstance();
		int hh = c.get(Calendar.HOUR_OF_DAY);
		for (int i = 0; i < hhList.size(); i++) {
			int h = hhList.get(i);
			if (i < hhList.size() - 1) {
				if (h <= hh && hh < hhList.get(i + 1)) {
					returnH = h;
					break;
				}
			}
		}
		if (returnH == -1) {
			returnH = hhList.get(hhList.size() - 1);
		}
		return returnH;
	}

	/**
	 * 获取当前第几月
	 * 
	 * @return
	 */
	public static int getNowMonth() {
		Calendar calendar = Calendar.getInstance();
		return calendar.get(Calendar.MONTH);
	}

	/**
	 * 获取当月中的第几天
	 * 
	 * @return
	 */
	public static int getNowMonthOfDay() {
		Calendar calendar = Calendar.getInstance();
		return calendar.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 判断当前是否是月末
	 * 
	 * @return
	 */
	public static boolean isLastDayOfMonth() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DATE, (calendar.get(Calendar.DATE) + 1));
		if (calendar.get(Calendar.DAY_OF_MONTH) == 1) {
			return true;
		}
		return false;
	}

	/**
	 * 获取当前年份
	 * 
	 * @return
	 */
	public static int getNowYear() {
		Calendar calendar = Calendar.getInstance();
		return calendar.get(Calendar.YEAR);
	}

	/**
	 * 获取当前日期，延迟多少天后的时间戳
	 * 
	 * @param day
	 * @return
	 */
	public static int getDelayDayTime(int day) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, day + 1);
		try {
			long time = format.parse(format.format(cal.getTime())).getTime();
			return (int) (time / 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * 检测是否可以领取排行榜奖励
	 * 
	 * @param regTime
	 * @return
	 */
	public static boolean checkRankListReward(long regTime) {
		long updateRankListTime = 0L;
		// 算出上次排行榜更新的时间
		Calendar cal = Calendar.getInstance();
		int nowWeek = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if (nowWeek == 0) {
			nowWeek = 7;
		}
		if (nowWeek > 1) {
			cal.add(Calendar.DATE, -(nowWeek - 1));
		} else {
			// 说明今天是周一
			// 如果今天是周一凌晨5点之前，上次更新排行榜的时间就是上周一五点，如果是之后，那么时间就是这周一凌晨5点
			if (cal.get(Calendar.HOUR_OF_DAY) <= 5) {
				cal.add(Calendar.DATE, -7);
			}
		}
		cal.set(Calendar.HOUR_OF_DAY, 5);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		updateRankListTime = cal.getTime().getTime();
		return updateRankListTime > regTime;
	}

	/**
	 * 判断当前时间是否在某个时间段内
	 * 
	 * @param nowTime
	 * @param beginTime
	 * @param endTime
	 * @return
	 */
	public static boolean belongCalendar(String beginStr, String endStr) {
		try {
			SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date beginTime = sFormat.parse(beginStr), endTime = sFormat.parse(endStr);
			Calendar date = Calendar.getInstance();
			date.setTime(new Date());
			Calendar begin = Calendar.getInstance();
			begin.setTime(beginTime);

			Calendar end = Calendar.getInstance();
			end.setTime(endTime);

			if (date.after(begin) && date.before(end)) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public static void main(String[] args) {
		System.out.println(getToday());

	}
}
