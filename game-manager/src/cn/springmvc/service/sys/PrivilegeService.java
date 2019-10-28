package cn.springmvc.service.sys;

import java.util.ArrayList;
import java.util.List;

import cn.springmvc.model.sys.Privilege;
import cn.springmvc.model.sys.Resource;

public interface PrivilegeService {

	public ArrayList<Privilege> findTopList();
	
	boolean is_yn(int adminId,int privilegeId);
	
	public List<Resource> list(int adminId);
	
	public boolean updateResource(int adminId,String[] ids);
	
	public List<Resource> listAll();
	
}
