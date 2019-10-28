package cn.springmvc.interceptor;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import cn.springmvc.model.usermodel.UserWarp;

/**
 * 登录拦截器
 * @author MaHaiDong
 *
 */
public class LoginInterceptor extends HandlerInterceptorAdapter{
	
	private static final String authcode = "0526f736f879060562af49f9e7173a4f";
	
	private List<String> allowUrls = new ArrayList<String>();
	
	 public List<String> getAllowUrls() {
		return allowUrls;
	}

	public void setAllowUrls(List<String> allowUrls) {
		this.allowUrls = allowUrls;
	}

	@Override public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) 
			                                                                                  throws Exception {
		if(request.getSession().getAttribute("userWarp")==null){
			if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){
				response.setHeader("sessionstatus", "timeout");// 在响应头设置session状态
				return false;
			}
		}
		 HttpSession session = request.getSession(true);  
		 UserWarp userWap = (UserWarp)session.getAttribute("userWarp");
		 String paramAuthcode = request.getParameter("authcode");
		 
		 if (userWap == null || !StringUtils.hasLength(userWap.toString())) {  
			 if (!(StringUtils.hasText(paramAuthcode) && authcode.equals(paramAuthcode))) {
				 response.sendRedirect( request.getContextPath()+"/login.jsp");  
				 return false;
			 }
	      }  
	     return true;  
	 }
	
	 @Override public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception e)
			                                                                                                 throws Exception {
		 
	 }

	
	 @Override public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView m)  
			                                                                                                 throws Exception {
		// TODO Auto-generated method stub
	}
}
