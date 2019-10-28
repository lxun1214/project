package com.rt.utils;

import java.util.Random;

public class NumberUtils {
	
	/**获得1--10000范围内的随机数*/
	public static int getRandomNum1W(){
		Random rand = new Random();
		int randNum = rand.nextInt(10001);
		return randNum;
	}
	
	/**获得范围内的随机数*/
	public static int getRandomNum(int max,int min){
		Random rand = new Random();
		int randNum = rand.nextInt(max - min + 1) + min;
		return randNum;
	}
	
	public static void main(String[] args) {
		for(int i = 0; i < 100;i ++){
			System.out.println(getRandomNum(5, 0));
		}
	}
	
}
