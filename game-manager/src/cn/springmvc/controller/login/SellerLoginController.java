package cn.springmvc.controller.login;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.springmvc.controller.webutil.WebUtil;
import cn.springmvc.model.sys.LogExplain;
import cn.springmvc.model.usermodel.Admin;
import cn.springmvc.model.usermodel.UserWarp;
import cn.springmvc.service.sys.LogExplainService;
import cn.springmvc.service.sys.MallService;
import cn.springmvc.service.user.LoginService;

/**
 * 用户登录，退出
 * 
 * @author MaHaiDong
 *
 */
@Controller
@RequestMapping("/sellersys")
public class SellerLoginController {

	@Autowired
	private LoginService loginService;
	@Autowired
	private LogExplainService logExplainService;
	@Autowired
	MallService mallService;

	/**
	 * 加载登陆界面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getIntologinPage")
	public String getIntologinPage() {
		return "login";
	}

	/**
	 * 登录
	 * 
	 * @param request
	 * @param keyWord
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/login")
	public @ResponseBody String login(HttpServletRequest request, @RequestParam("keyWord") String keyWord,
			@RequestParam("password") String password) {
		String state = "fail";
		try {
			if (StringUtils.hasLength(keyWord) && StringUtils.hasLength(password)) {
				Admin admin = loginService.login(keyWord, password);
				if (admin == null) {
					state = "error";
				} else if (admin.getState() == 1) {// 用户被封
					state = "nop";
				} else {
					admin.setLastLoginIp_(admin.getLastLoginIp());
					if (admin.getLastLoginTime() != null) {
						admin.setLastLoginTime_(admin.getLastLoginTime());
					} else {
						admin.setFirst_login(100);
					}
					;
					LogExplain logExplain = new LogExplain();
					logExplain.setAdminId(admin.getId());
					logExplain.setAdminName(admin.getName());
					logExplain.setExplainContent("登录后台,登录ip地址:"+request.getRemoteAddr());
					admin.setLogExplain(logExplain);

					/** 标识一个状态。可查看所有渠道数据 */

					UserWarp userWarp = new UserWarp();
					userWarp.setAdmin(admin);
					request.getSession().setAttribute("userWarp", userWarp);
					state = "success";
					admin.setLastLoginIp(request.getRemoteAddr());
					admin.setLastLoginTime(new Date());
					loginService.updateAdmin(admin);
					logExplainService.saveLogExplain(admin.getLogExplain());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return state;
	}

	/**
	 * 用户退出 删除session
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/logOut")
	public String logOut(HttpServletRequest request) {
		Admin admin = WebUtil.getSessionAdmin();
		admin.getLogExplain().setExplainContent("退出系统");
		logExplainService.saveLogExplain(admin.getLogExplain());

		request.getSession().removeAttribute("userWarp");
		return "login";
	}

	/**
	 * @Description: TODO 跳转至首页第一版
	 * @since 2015年6月25日 上午10:39:51
	 */
	@RequestMapping(value = "/toIndex")
	public String toIndex(HttpServletRequest request) {
		UserWarp userWarp = (UserWarp) request.getSession().getAttribute("userWarp");
		if (userWarp == null) {
			return "index";
		}
		return "users/main";
	}

}
