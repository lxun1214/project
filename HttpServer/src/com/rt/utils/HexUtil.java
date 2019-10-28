package com.rt.utils;


/**
 * 
 * @author MaHaiDong
 *
 */
public class HexUtil {

    final protected static char[] hexArray = "0123456789ABCDEF".toCharArray();
    
    private static final int FF = 255;

    
    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for ( int j = 0; j < bytes.length; j++ ) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }
    
    public static byte[] hexStringToBytes(String hexString) {
        if (hexString == null || hexString.equals("")) {
            return null;
        }
        hexString = hexString.toUpperCase();
        int length = hexString.length() / 2;
        char[] hexChars = hexString.toCharArray();
        byte[] d = new byte[length];
        for (int i = 0; i < length; i++) {
            int pos = i * 2;
            d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));
        }
        return d;
    }
    
    private static byte charToByte(char c) {  
        return (byte) "0123456789ABCDEF".indexOf(c);  
    } 
    
    public static long hexTolong(byte[] longs){
		long value = 0;
		for(byte b:longs){
			value = value <<8;
			value |= b&FF;
		}
		return value;
	}
    
    public static byte[] longTohex(long longs) {
		byte[] time = new byte[8];
		for(int i=7; i>=0;i--){
			time[i]=(byte) (longs & FF);
			longs = longs>>8;
		}
		return time;
	}
}
