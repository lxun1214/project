package com.rt.utils;

import java.util.Calendar;

/**
 * id生成器
 * @author xin.fengtao
 * 
 */
public class IdFactory 
{
	
//	/**服务器id**/
//	private static int sid;
	
	/**上次创建消息id时间**/
	private static long lastCreateIdTime = 0;
	/**消息id自增**/
	private static long msgIdAuto= 0;
	
	
	
	/** 计算秒偏移量时的起始时间   2018年的1月1日12:00:00*/
	public static long timeBegin = 0;
	
	static
	{
		Calendar calender = Calendar.getInstance();
		calender.set(Calendar.YEAR, 2018);
		calender.set(Calendar.MONTH, Calendar.JANUARY);
		calender.set(Calendar.DAY_OF_YEAR, 1);
		calender.set(Calendar.HOUR_OF_DAY, 12);
		calender.set(Calendar.MINUTE, 0);
		calender.set(Calendar.SECOND, 0);
		timeBegin = calender.getTimeInMillis();
	}
	
	/** 得到当前时间，秒为单位 */
	public static int currentTimeSecond()
	{

		return (int) ((System.currentTimeMillis() - timeBegin) / 1000);
	}
	
	
	
	/**生成消息id
	 * @return
	 */
	public synchronized static long createId()
	{
		int second = currentTimeSecond();
		if (second == lastCreateIdTime)
		{
			msgIdAuto++;
			long seedMax = (1 << 20);// 每秒支持?个id的生成
			if (msgIdAuto > seedMax)
			{
				msgIdAuto = 0;
			}
		}
		else
		{
			lastCreateIdTime= second;
			msgIdAuto = 0;
		}
		return (second*1L<<20)+msgIdAuto;
	}
	
//	
//	/**生成消息id
//	 * 每秒生成16384个id
//	 *  sid 64个服务器
//	 * @return
//	 */
//	public synchronized static long creteaWithServerId()
//	{
//		int second = currentTimeSecond();
//		if (second == lastCreateIdTime)
//		{
//			msgIdAuto++;
//			long seedMax = (1 << 20);
//			if (msgIdAuto > seedMax)
//			{
//				msgIdAuto = 0;
//			}
//		}
//		else
//		{
//			lastCreateIdTime= second;
//			msgIdAuto = 0;
//		}
//		return (second*1L<<20)+msgIdAuto<<6+sid;
//	}
	
	

	public static void main(String[] args) {
//		long id = createId(1);
//		System.out.println(Long.toBinaryString(55));
//		System.out.println(Long.toBinaryString(id));
//		System.out.println(Long.toBinaryString((id>>>20)&0x1f));
//		System.out.println(getSqlNumId(id));
//		
//		long b = (id>>29)&0xff;
//		System.out.println(b);
		
//		long id= creteaMsgId(false);
//		System.out.println(Long.toBinaryString(0x01));
//		System.out.println(Long.toBinaryString(id>>23));
//		System.out.println(Long.toBinaryString((id>>23)&0x01));
//		System.out.println(isGroupMsg(id));
		
		System.out.println(createId());
		System.out.println(createId());
		System.out.println(1 << 20);
	}


	public static void setSid(int sid) {
//		IdFactory.sid = sid;
	}

}
