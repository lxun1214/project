package cn.springmvc.service.user.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import cn.springmvc.controller.webutil.Constant;
import cn.springmvc.dao.userdao.AdminMapper;
import cn.springmvc.dao.userdao.SecurityCodeMapper;
import cn.springmvc.model.usermodel.Admin;
import cn.springmvc.model.usermodel.AdminExample;
import cn.springmvc.model.usermodel.SecurityCode;
import cn.springmvc.model.usermodel.SecurityCodeExample;
import cn.springmvc.service.user.LoginService;
import cn.springmvc.utils.MailUtil;
@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	AdminMapper adminMapper;
	@Autowired
	SecurityCodeMapper securityCodeMapper;
	
	@Override
	public Admin login(String loginName, String password) {
		AdminExample example=new AdminExample();
		example.createCriteria().andLoginNameEqualTo(loginName).andYianPasswordEqualTo(password);
		List<Admin> list=adminMapper.selectByExample(example);
		if(list!=null&&list.size()>0){
			return list.get(0);
		}
		return null;
	}

	@Override
	public int updateAdmin(Admin admin) {
		return adminMapper.updateByPrimaryKeySelective(admin);
	}

	@Override
	public List<Admin> loadAdminList(Admin admin) {
		AdminExample example=new AdminExample();
		if(admin.getLoginName().equals("admin")){
			example.createCriteria();
		}else{
			example.createCriteria().andLoginNameNotEqualTo("admin");//不查超级管理员的
		}
		
		PageHelper.startPage( admin.getPageNo() !=null ? admin.getPageNo() : 1,admin.getPageSize() !=null ? admin.getPageSize() : Constant.pageSize);
		return adminMapper.selectByExample(example);
	}

	@Override
	public int insertAdmin(Admin admin) {
		return adminMapper.insert(admin);
	}

	@Override
	public boolean checkLoginName(String name) {
		AdminExample example=new AdminExample();
		example.createCriteria().andLoginNameEqualTo(name);
		if(adminMapper.selectByExample(example).size()>0){
			return true;
		}
		return false;
	}

	@Override
	public boolean delUser(int adminId) {
		return adminMapper.deleteByPrimaryKey(adminId)>0?true:false;
	}

	@Override
	public Admin getAdminById(int adminId) {
		return adminMapper.selectByPrimaryKey(adminId);
	}

	@Override
	public void sendEmailCode(String email,String code) {
		SecurityCode sCode=null;
		SecurityCodeExample  example=new SecurityCodeExample();
		example.createCriteria().andEmailEqualTo(email);
		List<SecurityCode> list=securityCodeMapper.selectByExample(example);
		if(list!=null&&list.size()>0){
			sCode=list.get(0);
			sCode.setCreateTime(new Date());
			sCode.setSecurityCode(code);
			securityCodeMapper.updateByPrimaryKeySelective(sCode);
		}else{
			sCode=new SecurityCode();
			sCode.setCreateTime(new Date());
			sCode.setSecurityCode(code);
			sCode.setEmail(email);
			securityCodeMapper.insert(sCode);
		}
		MailUtil.sendCode(email, code);
	}

	@Override
	public boolean checkEmailCode(String email, String code) {
		SecurityCodeExample  example=new SecurityCodeExample();
		example.createCriteria().andEmailEqualTo(email).andSecurityCodeEqualTo(code);
		if(securityCodeMapper.countByExample(example)>0){
			return true;
		}
		return false;
	}

	@Override
	public void delEmailCode(String email) {
		SecurityCodeExample  example=new SecurityCodeExample();
		example.createCriteria().andEmailEqualTo(email);
		securityCodeMapper.deleteByExample(example);
	}

}
