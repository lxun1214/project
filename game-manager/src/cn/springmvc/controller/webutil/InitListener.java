package cn.springmvc.controller.webutil;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.code.kaptcha.util.Config;

import cn.springmvc.cache.ConfigCache;
import cn.springmvc.cache.ServerCache;
import cn.springmvc.entry.Server;
import cn.springmvc.model.sys.Privilege;
import cn.springmvc.model.sys.Resource;
import cn.springmvc.redis.RedisClient;
import cn.springmvc.service.sys.PrivilegeService;
import redis.clients.jedis.JedisPoolConfig;


/**
 * 初始化资源
 * @author MaHaiDong
 *
 */
public class InitListener implements ServletContextListener{

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		
		ApplicationContext ac = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());
		
		System.out.println("=====================================================>开始初始化资源数据");
		PrivilegeService privilegeService = (PrivilegeService) ac.getBean("privilegeServiceImpl");
		ArrayList<Privilege> topPrivilegeList = privilegeService.findTopList();
		sce.getServletContext().setAttribute("topPrivilegeList", topPrivilegeList);// 菜单资源
		
		//权限资源
		List<Resource> resourceList=privilegeService.listAll();
		for(Resource r:resourceList){
			if(ConfigCache.resourceMap.containsKey(r.getAdminId())){
				ConfigCache.resourceMap.get(r.getAdminId()).add(r.getPrivilegeId());
				continue;
			}
			Set<Integer> set=new HashSet<>();
			set.add(r.getPrivilegeId());
			ConfigCache.resourceMap.put(r.getAdminId(), set);
		}
		String path = sce.getServletContext().getRealPath("/");
		doStartLoad(path+"/config/gameServerUrl.config");
		
		try {
			loadRedis(path);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.out.println("======================================================>初始化资源数据成功");
	}

	
	public void loadRedis(String path)throws Exception{
		// 生成文件对象
		File f = new File(path + "/config/redis.properties");
		// 生成文件输入流
		FileInputStream in = null;
		in = new FileInputStream(f);
		Properties p = new Properties();
		p.load(in);
		
		List<Server> servers = ServerCache.getServerList(); 
		for(Server s:servers){
			int maxTotal = Integer.parseInt(p.getProperty("maxTotal_"+s.getServerId()));
			int maxIdel = Integer.parseInt(p.getProperty("maxIdle_"+s.getServerId()));
			int minIdel = Integer.parseInt(p.getProperty("minIdle_"+s.getServerId()));
			int maxWaitMillis = Integer.parseInt(p.getProperty("MaxWaitMillis_"+s.getServerId()));
			String host = p.getProperty("host_"+s.getServerId());
			int port = Integer.parseInt(p.getProperty("port_"+s.getServerId()));
	        String pwd = p.getProperty("pwd_"+s.getServerId());
			RedisClient client = new RedisClient();
			client.initialPool(maxTotal, maxIdel, minIdel, maxWaitMillis, host, port, pwd);
			ConfigCache.redisMap.put(s.getServerId(), client);
		}
		
		
	}
	
	public void doStartLoad(String path){

		System.out.println(path);
		File file = new File(path);
		try {
			InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			String lineStr;  
            while ((lineStr = br.readLine()) != null) {  
                String[] arr = lineStr.split("#");
                String id = arr[0];
                String name = arr[1];
                String url = arr[2];
                String ljdbc = arr[3];
                Server server = new Server(id,name,url,ljdbc);
                ServerCache.addServer(server);
            }  
            isr.close();
			br.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
