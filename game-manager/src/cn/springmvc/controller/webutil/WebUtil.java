package cn.springmvc.controller.webutil;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import cn.springmvc.model.usermodel.Admin;
import cn.springmvc.model.usermodel.UserWarp;


/**
 * session储存WebUtil
 * @author MaHaiDong
 *
 */
public class WebUtil {
	
	
	
	public static Admin getSessionAdmin() { 
		return ((UserWarp)getHttpServletRequest().getSession().getAttribute(Constant.SESSION_USER)).getAdmin();
	}
	
	
	public static void setSessionCompany(Admin admin) {
		((UserWarp)getHttpServletRequest().getSession().getAttribute(Constant.SESSION_USER)).setAdmin(admin);
	} 
	
	public static HttpServletRequest getHttpServletRequest() {
		return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	}
	
	public static String getIpAddr() {   
        String ipAddress = null;   
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        //ipAddress = this.getRequest().getRemoteAddr();   
        ipAddress = request.getHeader("x-forwarded-for");   
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {   
         ipAddress = request.getHeader("Proxy-Client-IP");   
        }   
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {   
            ipAddress = request.getHeader("WL-Proxy-Client-IP");   
        }   
		if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			if (ipAddress.equals("127.0.0.1")) {
				// 根据网卡取本机配置的IP
				InetAddress inet = null;
				try {
					inet = InetAddress.getLocalHost();
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
				ipAddress = inet.getHostAddress();
			}
		}  
		// 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
		if (ipAddress != null && ipAddress.length() > 15) { // "***.***.***.***".length() // = 15
			if (ipAddress.indexOf(",") > 0) {
				ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
			}
		} 
        return ipAddress;    
     } 
}
