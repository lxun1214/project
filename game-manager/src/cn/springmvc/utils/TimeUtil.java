package cn.springmvc.utils;



import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class TimeUtil {

	/**
	 *                             _ooOoo_
	 *                            o8888888o
	 *                            88" . "88
	 *                            (| -_- |)
	 *                            O\  =  /O
	 *                         ____/`---'\____
	 *                       .'  \\|     |//  `.
	 *                      /  \\|||  :  |||//  \
	 *                     /  _||||| -:- |||||-  \
	 *                     |   | \\\  -  /// |   |
	 *                     | \_|  ''\---/''  |   |
	 *                     \  .-\__  `-`  ___/-. /
	 *                   ___`. .'  /--.--\  `. . __
	 *                ."" '<  `.___\_<|>_/___.'  >'"".
	 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
	 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
	 *          ======`-.____`-.___\_____/___.-`____.-'======
	 *                             `=---='
	 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	 *                     佛祖保佑        永无BUG
	 *            佛曰:
	 *                   写字楼里写字间，写字间里程序员；
	 *                   程序人员写程序，又拿程序换酒钱。
	 *                   酒醒只在网上坐，酒醉还来网下眠；
	 *                   酒醉酒醒日复日，网上网下年复年。
	 *                   但愿老死电脑间，不愿鞠躬老板前；
	 *                   奔驰宝马贵者趣，公交自行程序员。
	 *                   别人笑我忒疯癫，我笑自己命太贱；
	 *                   不见满街漂亮妹，哪个归得程序员？
	*/
	
	
	/** 获取刷新时间*/
	public static long getTime(int addDay,int hour,int minute,int second){
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DAY_OF_YEAR, addDay);
		cal.set(Calendar.HOUR_OF_DAY , hour);
		cal.set(Calendar.MINUTE , minute);
		cal.set(Calendar.SECOND , second);
		return cal.getTimeInMillis();
	}
	
	
	public static int getDayOfWeek(){
		Calendar cal = Calendar.getInstance();
		int day = cal.get(Calendar.DAY_OF_WEEK);
		if(day == 1){
			return 7;
		}
		return day - 1;
	}
	
	public static long getTime(String timeStr){
		SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" );  
		try {
			Date date = sdf.parse(timeStr);
			return date.getTime();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			return 0;
		}
		           
		 
	}
	
	public static String getTimeStr(long time){
		SimpleDateFormat sdf =   new SimpleDateFormat("yyyy-MM-dd HH:mm:ss" );  
		String tiemStr = sdf.format(time);
		return tiemStr;
		           
		 
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
	 * 获取小时
	 * @return
	 */
	public static int getToDayH(int to_h){
		Calendar c = Calendar.getInstance();
		c.add(Calendar.HOUR_OF_DAY, to_h);
		int hh = c.get(Calendar.HOUR_OF_DAY);
		return hh;
	}
	public static void main(String[] args) {
		//Calendar cal = Calendar.getInstance();
		
		System.out.println(getToDayH(15));
		//System.out.println(getTimeStr((time +1000 * 3600 * 24 * 30)));

	}
}
