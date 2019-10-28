package cn.springmvc.controller.login;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.springmvc.controller.webutil.WebUtil;
import cn.springmvc.model.usermodel.Admin;
import cn.springmvc.service.user.LoginService;
/**
 * 个人中心
 * @author MaHaiDong
 *
 */
@Controller
@RequestMapping(value = "/sellersys/centred")
public class PersonCentredController {
	
	@Autowired
	LoginService loginService;

	/**
	 * @Description: TODO 加载修改密码页面
	 * @since 2015年6月15日 上午9:58:18
	 */
	@RequestMapping(value = "/loadUpdatePass")
	public String loadUpdatePass(HttpServletRequest request) {
		return "users/modifypass";
	}

	
	/**
	 * @Description: TODO 更新 密码
	 * @since 2015年6月15日 上午9:59:27
	 */
	@RequestMapping(value = "/updatePassWorld")
	public @ResponseBody String updatePassWorld(HttpServletRequest request,@RequestParam("oldPass") String oldPass,@RequestParam("password") String password) {
		Admin admin = WebUtil.getSessionAdmin();
		if(admin==null){
			return "ren";
		}
		if(!admin.getYianPassword().equals(oldPass)){
			return "opn";
		}
		loginService.delEmailCode(admin.getEmail());
		admin.setYianPassword(password);
		return loginService.updateAdmin(admin)>0?"success":"error";
	}

}
