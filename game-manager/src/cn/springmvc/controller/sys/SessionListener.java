package cn.springmvc.controller.sys;

import java.util.Enumeration;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import cn.springmvc.controller.webutil.Constant;

public class SessionListener implements HttpSessionListener {

	@Override
	public void sessionCreated(HttpSessionEvent httpSessionEvent) {
		//String sessionName = (String)httpSessionEvent.getSession().getAttribute(Constant.SESSION_USER);
		//System.out.println("创建==========="+sessionName);
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
		Enumeration<String> sessionListNames = httpSessionEvent.getSession().getAttributeNames();
		while (sessionListNames.hasMoreElements()) {
			String key = sessionListNames.nextElement();
			if(key.equals(Constant.SESSION_USER)){
				httpSessionEvent.getSession().removeAttribute(key);
				//System.out.println("销毁==========="+key);
			}
		}
		
//		String sessionName = (String)httpSessionEvent.getSession().getAttribute(Constant.SESSION_USER);
	}
}
