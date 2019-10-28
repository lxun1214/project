package cn.springmvc.controller.user;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.springmvc.controller.webutil.WebUtil;
import cn.springmvc.model.sys.LogExplain;
import cn.springmvc.model.usermodel.Admin;
import cn.springmvc.service.sys.LogExplainService;
import cn.springmvc.service.sys.PrivilegeService;
import cn.springmvc.service.user.LoginService;
import cn.springmvc.utils.NumberUtils;
import cn.springmvc.utils.ResultPage;

@Controller
@RequestMapping(value = "/sellersys/users")
public class UserInfoController {

	@Autowired
	LoginService loginService;
	@Autowired
	PrivilegeService privilegeService;
	@Autowired
	LogExplainService logExplainService;
	
	/**
	 * 查看自己用户信息
	 * 
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/toUserInfo")
	public String toUserInfo(ModelMap map) {
		Admin admin = WebUtil.getSessionAdmin();
		admin.getLogExplain().setExplainContent("查看自己信息");
		logExplainService.saveLogExplain(admin.getLogExplain());
		map.put("user", admin);
		return "users/userInfo";
	}

	/**
	 * 用户操作跳转
	 * @param modelMap
	 * @return
	 */
	@RequestMapping(value = "/toUserList")
	public String toUserList(ModelMap modelMap) {
		Admin admin = WebUtil.getSessionAdmin();
		if(admin==null){
			return null;
		}
		admin.getLogExplain().setExplainContent("查看管理员列表");
		logExplainService.saveLogExplain(admin.getLogExplain());
		return "users/listuser";
	}
	
	
	/**
	 * 用户列表
	 * @return
	 */
	@RequestMapping(value="/listUser") 
	public @ResponseBody ResultPage<Admin> listUser(@RequestBody Admin admin) {
		Admin admin_=WebUtil.getSessionAdmin();
		admin_.setPageNo(admin.getPageNo());
		admin_.setPageSize(admin.getPageSize());
		return new ResultPage<Admin>(loginService.loadAdminList(admin_));
	}
	
	/**
	 * 跳转添加用户页面
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/toAddUser")
	public String toAddUser(ModelMap map) {
		return "users/addUser";
	}
	
	
	/**
	 * 添加用户
	 * @param request
	 * @param admin
	 * @return
	 */
	@RequestMapping(value = "/insertUser")
	@ResponseBody
	public String insertUser(HttpServletRequest request,Admin admin) {
		/**检测账号是否被占用*/
		if(loginService.checkLoginName(admin.getLoginName())){
			return "ly";
		}
		admin.setCreateTime(new Date());
		admin.setState(0);
		//admin.setLastLoginTime(new Date());
		//日志
		Admin adminTwo = WebUtil.getSessionAdmin();
		adminTwo.getLogExplain().setExplainContent("添加管理员，管理员账号："+admin.getLoginName());
		logExplainService.saveLogExplain(adminTwo.getLogExplain());
		
		return loginService.insertAdmin(admin)>0?"success":"error";
	}
	
	/**
	 * 删除用户
	 * @param request
	 * @param adminId
	 * @return
	 */
	@RequestMapping(value = "/delUser")
	@ResponseBody
	public String delUser(HttpServletRequest request,int adminId) {
		Admin admin = WebUtil.getSessionAdmin();
		if(admin==null){
			return null;
		}
		admin.getLogExplain().setExplainContent("删除管理员，管理员ID:"+adminId);
		logExplainService.saveLogExplain(admin.getLogExplain());
		return loginService.delUser(adminId)?"success":"error";
	}
	
	
	/**
	 * 管理员重置密码跳转
	 * @param modelMap
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/loadUpdateUserPwd/{id}")
	public String loadUpdatePass(ModelMap modelMap, @PathVariable("id") int id) {
		modelMap.put("userId",id);
		return "users/modifypwd";
	}
	
	
	/**
	 * 管理员重置密码
	 * @param request
	 * @param adminId
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/updatePwd")
	public @ResponseBody String updatePassWorld(HttpServletRequest request,@RequestParam("adminId") int adminId,@RequestParam("password") String password) {
		Admin admin=loginService.getAdminById(adminId);
		if(admin==null){
			return "error";
		}
		admin.setYianPassword(password);
		
		Admin adminTwo = WebUtil.getSessionAdmin();
		if(adminTwo==null){
			return null;
		}
		adminTwo.getLogExplain().setExplainContent("重置了其他管理员密码，被重置管理员ID："+adminId);
		logExplainService.saveLogExplain(adminTwo.getLogExplain());
		
		return loginService.updateAdmin(admin)>0?"success":"error";
	}
	
	
	/**
	 * 管理员编辑用户信息跳转 
	 * @param modelMap
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/loadUpdateUserInfo/{id}")
	public String loadUpdateUserInfo(ModelMap modelMap, @PathVariable("id") int id) {
		Admin admin=loginService.getAdminById(id);
		modelMap.put("admin",admin);
		return "users/modifyuserInfo";
	}

	/**
	 * 管理员编辑用户信息
	 * @param request
	 * @param admin
	 * @return
	 */
	@RequestMapping(value = "/updateUserInfo")
	public @ResponseBody String updateUserInfo(HttpServletRequest request,Admin admin) {
		Admin adminTwo = WebUtil.getSessionAdmin();
		if(adminTwo==null){
			return null;
		}
		adminTwo.getLogExplain().setExplainContent("修改了其他管理员信息，被修改管理员ID："+admin.getId());
		logExplainService.saveLogExplain(adminTwo.getLogExplain());
		return loginService.updateAdmin(admin)>0?"success":"error";
	}
	
	
	/**
	 * 管理员配置权限跳转
	 * @param modelMap
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/loadUpdateUserJurisdiction/{id}")
	public String loadUpdateUserJurisdiction(ModelMap modelMap, @PathVariable("id") int id) {
		modelMap.put("adminId",id);
		return "users/modifyJurisdiction";
	}
	
	/**
	 * 管理员配置权限
	 * @param request
	 * @param adminId
	 * @param resourceIds
	 * @return
	 */
	@RequestMapping(value = "/updateUserJurisdiction")
	public @ResponseBody String updateUserJurisdiction(HttpServletRequest request,@RequestParam("adminId") int adminId,@RequestParam("resourceIds")String resourceIds) {
		String[] ids=resourceIds.split("#");
		
		Admin adminTwo = WebUtil.getSessionAdmin();
		if(adminTwo==null){
			return null;
		}
		adminTwo.getLogExplain().setExplainContent("修改了其他管理员权限，被修改管理员ID："+adminId);
		logExplainService.saveLogExplain(adminTwo.getLogExplain());
		
		return privilegeService.updateResource(adminId, ids)?"success":"error";
	}
	
	

	
	
	
	
	/**
	 * 操作日志跳转
	 * @param modelMap
	 * @return
	 */
	@RequestMapping(value = "/toLogExplainList")
	public String toLogExplainList(ModelMap modelMap) {
		return "users/logExplainList";
	}
	
	/**
	 * 操作日志列表
	 * @return
	 */
	@RequestMapping(value="/listLogExplain") 
	public @ResponseBody ResultPage<LogExplain> listLogExplain(@RequestBody LogExplain logExplain) {
		return new ResultPage<LogExplain>(logExplainService.listLimit(logExplain));
	}
	
	
	
	/**发送邮件验证码*/
	@RequestMapping(value = "/sendEmailCode")
	public @ResponseBody String sendEmailCode(HttpServletRequest request) {
		Admin adminTwo = WebUtil.getSessionAdmin();
		if(adminTwo==null){
			return null;
		}
		adminTwo.getLogExplain().setExplainContent("管理员:"+adminTwo.getName()+"请求了发送邮箱验证码");
		logExplainService.saveLogExplain(adminTwo.getLogExplain());
		loginService.sendEmailCode(adminTwo.getEmail(), NumberUtils.createCode());
		return "success";
	}
	
	/**
	 * 验证登录 密码
	 * @param request
	 * @param pass
	 * @return
	 */
	@RequestMapping(value = "/checkPass")
	@ResponseBody
	public String checkPass(HttpServletRequest request,String pass) {
		Admin admin = WebUtil.getSessionAdmin();
		if(admin==null){
			return "error";
		}
		if(admin.getYianPassword().equals(pass)){
			return "success";
		}
		return "error";
	}
	
}
