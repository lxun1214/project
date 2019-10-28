package com.rt.gloable;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.jdom.Element;

import com.rt.cache.ConfigCache;
import com.rt.cache.data.SdkInfo;
import com.rt.utils.TemplateUtils;
import com.rt.utils.XmlUtil;

/**
 * 服务器初始化
 * 
 * @author xin.fengtao
 *
 */
public class ServerListener implements ServletContextListener {
	Logger log = Logger.getLogger(ServerListener.class);

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {

	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		String path = arg0.getServletContext().getRealPath("/");
		// log4j
		PropertyConfigurator.configure(path + "config/log4j.properties");
		// 初始化mybatis
		DbManager.init();
		// 初始化服务器列表
		// doStartLoadServerGroup(path + "config/serverGroup.config" );
		//初始化sdk信息
		loadSdk(path + "config/sdk.xml");
	}

	
	
//	
//	public void doStartLoadServerGroup(String path){
//
//		//文件加载
//		System.out.println(path);
//		File file = new File(path);
//		try {
//			InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF-8");
//			BufferedReader br = new BufferedReader(isr);
//			
//			String lineStr;  
//            while ((lineStr = br.readLine()) != null) {  
//            	System.out.println(lineStr);
//            	if(lineStr.equals("")){
//            		continue;
//            	}
//                String[] arr = lineStr.split("#");
//                String id = arr[0];
//                String address = arr[1];
//                
//                GameServer server = new GameServer(id, address);
//                ConfigCache.serverMap.put(id, server);
//            }  
//            isr.close();
//			br.close();
//		} catch (FileNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
//	
	
	
	
	/**
	 * 读取配置文件
	 */
	public  void loadSdk(String patch){
		File file = new File(patch);
		String result = readFile(file);
		log.debug(result);
		try {
			Element element = XmlUtil.doXMLParse(result);
			@SuppressWarnings("unchecked")
			List<Element> children = element.getChildren();
			for(Element child:children){
				String name = child.getName();
				if(name.equals("sdkInfo")){
					SdkInfo info = new SdkInfo();
					@SuppressWarnings("unchecked")
					List<Element> sdkList = child.getChildren();
					for(Element sdk:sdkList){
						String sdkName = sdk.getName();
						String val = sdk.getText();
						val = val.trim();
						String setName = TemplateUtils.getMethodName(sdkName);
						Method setMethod;
						if(sdkName.equals("sdkType")){
							 setMethod = info.getClass().getMethod(setName,new Class[] { int.class });
							 setMethod.invoke(info, new Object[] {Integer.parseInt(val)});
						}else{
							setMethod = info.getClass().getMethod(setName,new Class[] { String.class });
							setMethod.invoke(info, new Object[] {val});
						}
					}
					ConfigCache.sdkMap.put(info.getSdkType(), info);
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	String readFile(File file) {
		BufferedReader reader = null;
		StringBuilder builder = new StringBuilder();
		try {
			 InputStream targetStream = new FileInputStream(file);
			reader = new BufferedReader(new InputStreamReader(targetStream,Charset.forName("UTF-8")));
			String tempString = null;
			// 一次读入一行，直到读入null为文件结束
			while ((tempString = reader.readLine()) != null) {
				builder.append(tempString);
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e1) {
				}
			}
		}
		return builder.toString();
	}

}
