package cn.springmvc.controller.webutil;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.logicalcobwebs.proxool.ProxoolFacade;

public class InitSpringUtilListener  implements ServletContextListener{

	private Log log = LogFactory.getLog(InitSpringUtilListener.class);
	
	public InitSpringUtilListener() {}
	
	/**
	 * 销毁上下文
	 * @param evt servlet上下文事件对象
	 */
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		ProxoolFacade.shutdown();
	}

	/**
	 * 初始化上下文
	 * @param evt servlet上下文事件对象
	 */
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		log.info("开始初始化SpringUtil...");
		ServletContext ctx = arg0.getServletContext();
		SpringUtil.init(ctx);
		String webRootAbsPath = arg0.getServletContext().getRealPath("/");
		log.info("web root abs path="+webRootAbsPath);
		SpringUtil.setWebRootAbsPath(webRootAbsPath);
		log.info("SpringUtil初始化完成.");
	}

}
