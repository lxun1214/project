package cn.springmvc.controller.webutil;

import javax.servlet.ServletContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 * Spring加载容器
 * @author MaHaiDong
 *
 */
public class SpringUtil {
	
	private static Log log = LogFactory.getLog(SpringUtil.class);
	
	private static ApplicationContext context;
	static String webRootAbsPath;

	public SpringUtil() {
		// TODO Auto-generated constructor stub
	}
	
	public static ApplicationContext getApplicationContext() {
		return context;
	}
	
	public static void init(ServletContext sc) {
		log.info("加载上下文");
		context = WebApplicationContextUtils.getRequiredWebApplicationContext(sc);
	}
	
	public static void init(String... configLocations) {
		log.info("加载配置");
		context = new ClassPathXmlApplicationContext(configLocations);
	}
	
	public static Object getBean(String beanName) {
		return context.getBean(beanName);
	}
	
	public static void setWebRootAbsPath(String webRootAbsPath) {
		SpringUtil.webRootAbsPath = webRootAbsPath;
	}
	
	public static String getWebRootAbsPath() {
		return webRootAbsPath;
	}
	
}
