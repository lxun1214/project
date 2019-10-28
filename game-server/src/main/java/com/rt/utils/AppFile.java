package com.rt.utils;

import java.io.File;

/**
 * @author jinmiao 应用程序文件目录
 */
public class AppFile {

	/** 路径 */
	public static String path;

	// /** 配置文件所在地 */
	// public static String config_dir =
	// "src"+File.separator+"main"+File.separator+"resources";
	//
	// /** 日志文件所在地 */
	// public static String log_dir =
	// "src"+File.separator+"main"+File.separator+"resources";

	/** 配置文件所在地 */
	public static String configUrl(String file) {
		return path + File.separator + file;
	}

	/** 获取db数据库配置 **/
	public static String dbUrl(String file) {
		return path + File.separator + file;
	}

	/** db数据库映射配置 **/
	public static String dbMapperUrl(String file) {
		return path + File.separator + "myBatis" + File.separator + file;
	}

	/** 日志文件所在地 */
	public static String logUrl(String file) {
		return path + File.separator + file;
	}

	/** 策划配置文件读取 */
	public static String excelUrl(String file) {
		return path + File.separator + "config" + File.separator + "excel" + File.separator + file;
	}
	
	/** log4j配置文件读取 */
	public static String log4jUrl(String file) {
		return "config" + File.separator + file;
	}
	
	/**redis配置文件地址*/
	public static String redisUrl(String file){
		return "config" + File.separator + file;
	}
	
	/** db数据库映射配置 **/
	public static String dbConfigUrl(String file) {
		return "config" + File.separator + file;
	}
	

}
