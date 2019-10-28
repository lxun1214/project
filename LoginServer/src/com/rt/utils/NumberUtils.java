package com.rt.utils;

public class NumberUtils {
	
	/**获得1--10000范围内的随机数*/
	public static int getRandomNum1W(){
		return (int) (Math.random() * 9999 + 1);
	}
	
	/**获得范围内的随机数*/
	public static int getRandomNum(int max,int min){
		return (int) (Math.random() * (max - min) + min);
	}
	
}
