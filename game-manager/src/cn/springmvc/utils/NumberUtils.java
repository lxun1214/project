package cn.springmvc.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NumberUtils {
	/**
	 * 生成随机列表
	 * 
	 * @param min
	 * @param max
	 * @param len
	 * @return
	 */
	public static List<Integer> ream(int min, int max, int len) {
		List<Integer> li = new ArrayList<Integer>();
		int num = max - min;
		// 当数字范围小于规定长度则不需要随机数，直接全部返回。
		if (num < len) {
			for (int i = min; i < max; i++)
				li.add(i);
		} else {
			for (int i = 0; i < len; i++) {
				Random random = new Random();
				int n = random.nextInt(num);
				n += min;
				if (li.indexOf(n) == -1) {
					li.add(n);
				} else {
					i--;
				}
			}
		}
		return li;
	}

	/**
	 * 返回一个概率随机数
	 * 
	 * @param num1
	 *            概率分子
	 * @param num2
	 *            概率分母
	 * @return
	 */
	public static boolean ream(int num1, int num2) {
		Random random = new Random();
		int n = random.nextInt(num2);
		return n <= num1;
	}

	/**
	 * 在指定范围内产生随机数
	 */
	public static int randomNum(int a, int b) {
		return (int) Math.rint(Math.random() * (b - a) + a);
	}

	/** 生成6位随机验证码，可重复 */
	public static String createCode() {
		char[] chr = "0123456789".toCharArray();
		char[] chr1 = new char[6];
		Random r = new Random();
		int n = chr.length;
		boolean[] used = new boolean[n];
		int j = 0;
		while (true) {
			int index = r.nextInt(n);
			chr1[j] = chr[index];
			used[index] = true;
			j++;
			if (j >= 6)
				break;
		}
		String str = "";
		for (int i = 0; i < chr1.length; i++) {
			str += chr1[i];
		}
		return str;
	}
	
	public static void main(String[] args) {
		System.out.println(createCode());
	}
	

	/** 生成6位邀请码,可重复 */
	public static String createInviteCode() {
		char[] chr = "23456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
		char[] chr1 = new char[5];
		Random r = new Random();
		int n = chr.length;
		int j = 0;

		for (int i = 0; i < 5; i++) {
			int index = r.nextInt(n);
			chr1[j] = chr[index];
			j++;
			if (j >= 5)
				break;
		}
		String str = "";
		for (int i = 0; i < chr1.length; i++) {
			str += chr1[i];
		}
		return str;
	}

	
	/**
	 * 验证邮箱地址是否正确
	 * 
	 * @param email
	 * @return
	 */
	public static boolean checkEmai(String email) {
		boolean flag = false;
		try {
			String check = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)？\\.)+[a-zA-Z]{2,}$";
			Pattern regex = Pattern.compile(check);
			Matcher matcher = regex.matcher(email);
			flag = matcher.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	public static boolean isNum(String number) {
		boolean flag = false;
		try {
			Pattern p = Pattern.compile("^[0-9]{5}$");
			Matcher m = p.matcher(number);
			flag = m.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	public static String getUUID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	/** 随机生成摇奖号码,5 + 1 */
	public static int[] getLotteryNum() {
		int[] number = new int[6];

		Random random = new Random();
		int num;
		for (int i = 0; i < 5; i++) {
			num = random.nextInt(10);
			number[i] = num;
		}
		int endNum = (int) (Math.random() * 90) + 10;
		number[5] = endNum;

		return number;
	}

	/** 一元拍随机生成摇奖号码 */
	public static int[] getDollerErnieNum() {

		int[] number = new int[6];

		Random random = new Random();
		int num;
		for (int i = 0; i < 6; i++) {
			num = random.nextInt(10);
			number[i] = num;
		}
		return number;
	}

	/** 一元拍创建房间生成的后三位中奖号码 */
	public static int[] getDollerRandomErnieNum(int[] numbers) {

		int[] number = new int[6];
		Random random = new Random();

		number[0] = numbers[0];
		number[1] = numbers[1];
		number[2] = numbers[2];
		for (int i = 3; i < 6; i++) {
			int num = random.nextInt(10);
			number[i] = num;
		}
		return number;
	}

	/** 一元拍创建房间生成的前三位中奖号码 */
	public static int[] getOneOnThreeDollerErnieNum() {
		int[] number = new int[3];
		Random random = new Random();
		for (int i = 0; i < 3; i++) {
			int num = random.nextInt(10);
			number[i] = num;
		}
		return number;
	}
	
	/**
	 * 
	 * @return
	 */
	public static int[] stringToInts(String winNum)
	{
		int[] number = new int[3];
		number[0]=Integer.parseInt(winNum.split(",")[0]);
		number[1]=Integer.parseInt(winNum.split(",")[1]);
		number[2]=Integer.parseInt(winNum.split(",")[2]);
		return number;
	}

	/** 把小写转为大写 */
	public static String upperToLow(String str) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < str.length(); i++) {
			char c = str.charAt(i);
			if (Character.isUpperCase(c)) {
				sb.append(c);
			} else if (Character.isLowerCase(c)) {
				sb.append(Character.toUpperCase(c));
			} else {
				sb.append(c);
			}
		}
		return sb.toString();
	}
	
	
	public static String IntsToString(int[] numbers) {
		String str = "";
		for (int i = 0; i < numbers.length; i++) {
			str += numbers[i];
			if (i != numbers.length - 1) {
				str += ",";
			}
		}
		return str;
	}
	
	public static int getIntOnNum1ONum2(){
		Random random=new Random();
		return 1+random.nextInt(50);
	}
	
	public static List<Integer> get(int totalNum){
		List<Integer> list=new ArrayList<Integer>();
		for (int i = 0; i <=31; i++) {
    		int value = totalNum & (1<<i);
    		if(value > 0) {
    			list.add((i+1));
    			System.out.println("值："+value+",数组值："+(i+1)); 
    		}
		}
		return list;
	}
}
