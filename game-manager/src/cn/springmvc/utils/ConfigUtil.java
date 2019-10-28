package cn.springmvc.utils;

import java.util.ResourceBundle;


/**
 * 获取配置文件内容    
 * @author MaHaiDong
 *
 */
public final class ConfigUtil {
    
	
	private static ResourceBundle valueBundle;
	
	
	static{
		try {
			valueBundle = ResourceBundle.getBundle("conf/config");
		} catch (Exception e) {
		   e.printStackTrace();
		}
	}
	
	public static String getValue(String key){
		return valueBundle.getString(key);
	}
	
	
	public static void main(String[] args) {
		System.out.println(getValue("send_notice"));
	}
}
