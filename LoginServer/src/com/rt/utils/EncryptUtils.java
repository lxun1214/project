package com.rt.utils;

import java.io.UnsupportedEncodingException;

/**
 * 加密解密
 * @author xin.fengtao
 *
 */
public class EncryptUtils {

	public static int nextEncKey(int uSeed) {
		return uSeed * 215013 + 2521011;
	}

	public static final short bitMask1 = 0xee;
	public static final byte bitMask2 = 0x11;

	public static void encrypt(byte[] Des, int nSrcStartIdx, int nLen, int ulEncKey) {
		for (int i = nSrcStartIdx; i < Math.min(Des.length, nSrcStartIdx + nLen); ++i) {
			int nDesIdx = nSrcStartIdx + i - nSrcStartIdx;
			if (nDesIdx >= Des.length)
				return;
			Des[nDesIdx] = (byte) (((Des[i] & bitMask1) >>> 1) | ((Des[i] & bitMask2) << 3));
			Des[nDesIdx] ^= (byte) ulEncKey;
		}
	}

	public static void decrypt(byte[] Des, int nDesStartIdx, int nLen, int ulEncKey) {
		for (int i = nDesStartIdx; i < Math.min(Des.length, nDesStartIdx + nLen); ++i) {
			Des[i] = (byte) (Des[i] ^ (byte) ulEncKey);
			Des[i] = (byte) (((Des[i] << 1) & bitMask1) | ((Des[i] >>> 3) & bitMask2));
		}
	}

	public static void main(String[] args) throws UnsupportedEncodingException {
		String str = "123456";
//		byte[] b = new byte[] { 0, 1, -122, -95, 10, 2, 49, 49 };
		byte[] b = str.getBytes();
		int writeSeed = 111;
		encrypt(b, 0, b.length, writeSeed);
		System.out.println();
		decrypt(b, 0, b.length, writeSeed);
		System.out.println(new String(b,"UTF-8"));

	}
}
