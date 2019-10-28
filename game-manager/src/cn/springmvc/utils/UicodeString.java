package cn.springmvc.utils;

public class UicodeString {
	public static String toUtf8String(String str){
		StringBuffer strB = new StringBuffer();
		for(int i = 0;i<str.length();i++){
			char c = str.charAt(i);
			if(c>=0 && c<=255){
				strB.append(c);
			}else{
				byte[] b;
				try{
					b = Character.toString(c).getBytes("utf-8");
				}catch(Exception e){
					e.printStackTrace();
					b= new byte[0];
				}
				for(int j = 0;j<b.length;j++){
					int k = b[j];
					if(k<0){
						k+=256;
						strB.append("%"+Integer.toHexString(k).toUpperCase());
					}
				}
			}
		}
		return strB.toString();
	}
}
