package com.rt.gloable;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.jdom.Element;

import com.rt.cache.ServerCache;
import com.rt.cache.date.SdkInfo;
import com.rt.db.domain.ServerInfoBean;
import com.rt.db.domain.ServerInfoBeanExample;
import com.rt.db.mapper.ServerInfoBeanMapper;
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
		// 初始化redis客户端
		// RedisClient.initialPool(path);
		
		// 初始化mybatis
		DbManager.init();
		//初始化公告信息
		log.info("mybatis 初始化完成");
		// 初始化服务器列表
		initServerList();
		//初始化sdk信息
		loadSdk(path + "config/sdk.xml");
		
		
	}

	public void initServerList() {
		SqlSession session = DbManager.getSession();
		ServerInfoBeanMapper mapper = session.getMapper(ServerInfoBeanMapper.class);
		List<ServerInfoBean> serverList = new ArrayList<>();
		ServerInfoBeanExample example = new ServerInfoBeanExample();
		serverList = mapper.selectByExample(example);
		session.commit();
		for (int i = 0; i < serverList.size(); i++) {
			ServerInfoBean bean = serverList.get(i);
			ServerCache.addServer(bean);
		}
		session.close();
	}
	
	
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
					ServerCache.sdkMap.put(info.getSdkType(), info);
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
