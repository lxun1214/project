package cn.springmvc.service.user;

import java.util.List;

import cn.springmvc.model.usermodel.Admin;

public interface LoginService {
    
	public Admin login(String loginName,String password);
	
	public int updateAdmin(Admin admin);
	
	public List<Admin> loadAdminList(Admin admin);
	
	public int insertAdmin(Admin admin);
	
	public boolean checkLoginName(String name);
	
	public boolean delUser(int adminId);
	
	public Admin getAdminById(int adminId);
	
	public void sendEmailCode(String email,String code);
	
	public boolean checkEmailCode(String email,String code);
	
	public void delEmailCode(String email);
	
}
