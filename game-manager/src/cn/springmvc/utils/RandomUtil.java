package cn.springmvc.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class RandomUtil {

	public static String getKeyCode() {
		Date n = new Date();
		SimpleDateFormat outFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String currTime = outFormat.format(n);
		String[] key = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
				"T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
		Random random = new Random();

		String st = key[random.nextInt(key.length)] + key[random.nextInt(key.length)] + key[random.nextInt(key.length)]
				+ key[random.nextInt(key.length)] + key[random.nextInt(key.length)] + key[random.nextInt(key.length)];
		return currTime + st;
	}

	public static String getKeyQrCode() {
		String[] key = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
				"T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
				"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8",
				"9" };
		Random random = new Random();

		String st = key[random.nextInt(key.length)] + key[random.nextInt(key.length)] + key[random.nextInt(key.length)]
				+ key[random.nextInt(key.length)] + key[random.nextInt(key.length)] + key[random.nextInt(key.length)]
				+ key[random.nextInt(key.length)] + key[random.nextInt(key.length)] + key[random.nextInt(key.length)]
				+ key[random.nextInt(key.length)];

		return st;
	}

	public static void main(String[] args) {
		// long a=System.currentTimeMillis();
		// List<String> list=getKeyCode(30000);
		// long b=System.currentTimeMillis();
		// System.out.println(b-a);
		System.out.println(getKeyCode());
	}
}
