package com.rt.gloable;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.rt.code.ByteOutputStream;
import com.rt.gm.GMRegister;
import com.rt.pb.BasePack.BaseMessage;
import com.rt.pb.PbSs.GameServerStartRequest;
import com.rt.redis.RedisClient;
import com.rt.utils.AppFile;

/**
 * 服务器初始化
 * 
 * @author xin.fengtao
 *
 */
public class ServerInit implements ServletContextListener {
	
	Logger log = Logger.getLogger(ServerInit.class);
	

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		GloableService.getInstance().shutDown();
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		String path = arg0.getServletContext().getRealPath("/");
		AppFile.path = path;
		try {
			// log4j
			PropertyConfigurator.configure(path + "config/log4j.properties");
			// 初始化redis客户端
			RedisClient.initialPool(path);
			// 初始化mybatis
			DbManager.init();
			// 加载服务器信息配置
			loadServerConfig(path);
			//加载excel
			new ExcelConfigLoader().startLoad();
			
			//GM
			GMRegister.init();
			
			//日志
//			LogManager.getInstance().init();
			//向登陆服务器注册
			sendToLoginServer();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/** 加载服务器配置 */
	public void loadServerConfig(String path) {
		// 生成文件对象
		File f = new File(path + "/config/serverConfig.properties");
		// 生成文件输入流
		FileInputStream in = null;
		try {
			in = new FileInputStream(f);
			/**加载配置文件内容，以后可能参数会多，直接加载一次，用key取就行*/
			Properties p =new Properties();
			p.load(in);
			ServerInfo.setServerId(Integer.parseInt(p.getProperty("serverId")));
			ServerInfo.setLoginServerUrl(p.getProperty("loginServerUrl"));
			ServerInfo.setLog_server_appId(p.getProperty("log_server_appId"));
			ServerInfo.setLog_server_name(p.getProperty("log_server_name"));
			ServerInfo.setLog_server_file(p.getProperty("log_server_file"));
			ServerInfo.setLog_server_logFileNum(Integer.parseInt(p.getProperty("log_server_logFileNum")));
			ServerInfo.setLog_server_dataFileNum(Integer.parseInt(p.getProperty("log_server_dataFileNum")));
			ServerInfo.setOpen_code_box_url(p.getProperty("payServerCheckCodeUrl"));
			ServerInfo.setOpen_cdk_code_box_url(p.getProperty("payServerCheckCDKCodeUrl"));
			ServerInfo.setLog_usernae(p.getProperty("log_username"));
			ServerInfo.setLog_password(p.getProperty("log_password"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 服务器启动向登陆服务器发送消息
	 * 
	 * @throws IOException
	 */
	public void sendToLoginServer() throws IOException {
		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder.setCmd(101);
		GameServerStartRequest.Builder builder = GameServerStartRequest.newBuilder();
		builder.setServerId(ServerInfo.getServerId());

		baseBuilder.setBody(builder.build().toByteString());

		ByteOutputStream bos = new ByteOutputStream();

		byte[] body = baseBuilder.build().toByteArray();

		bos.writeBytes(body);
		
		URL url = null;
		HttpURLConnection httpConnection = null;
		String address = ServerInfo.getLoginServerUrl();
		url = new URL(address);
		httpConnection = (HttpURLConnection) url.openConnection();
		httpConnection.setRequestMethod("POST"); // POST方式提交数据
		httpConnection.setDoOutput(true);
		OutputStream out = null;
		out = httpConnection.getOutputStream();

		// 发送请求包
		out.write(bos.toByteArray());
		out.flush();
		out.close();
		int responseCode = httpConnection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			ServerInfo.setServerState(1);
		} else {
			log.error("游戏服务器向登陆服务器注册失败" + "\t" + "serverId:" + ServerInfo.getServerId());
		}
	}
}
