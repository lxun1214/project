package cn.springmvc.controller.login;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.springmvc.model.usermodel.UserWarp;

/**
 * 跳转登录页面，首页
 * @author MaHaiDong
 *
 */
@Controller
@RequestMapping(value="/")
public class LoginController {
    
	/**
	 * 跳转首页
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/index") public ModelAndView index(HttpServletRequest request) {
		return new ModelAndView("index", "userWarp", ((UserWarp)request.getSession().getAttribute("userWarp")));
	}
	
	/**
	 * 返回登录界面
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/login") public String logOut(HttpServletRequest request) {
		request.getSession().removeAttribute("userWarp");
		return "login";
	}
	
	
	@RequestMapping(value="/toSwitchData") public ModelAndView toSwitchData(HttpServletRequest request) {
		
		return new ModelAndView("index", "userWarp", ((UserWarp)request.getSession().getAttribute("userWarp")));
	}
	
}
