package cn.springmvc.utils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class TimeUtils {

	
	/**
	 * 获取延后30天
	 * @return
	 */
	public static List<String> listPostpone30Day(){
		SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar date = Calendar.getInstance();
		List<String> list = new ArrayList<>();
		for(int i=0;i<30;i++){
			date.add(Calendar.DATE, +1);
			list.add(sFormat.format(date.getTime()));
		}
		return list;
	}
}
