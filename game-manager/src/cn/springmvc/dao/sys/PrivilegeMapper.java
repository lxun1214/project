package cn.springmvc.dao.sys;

import java.util.ArrayList;

import cn.springmvc.model.sys.Privilege;

public interface PrivilegeMapper {
	
	/**
	 * 
	 * @Description: 获取权限资源树
	 * @return List<Privilege> 返回类型
	 * @since 2015年6月29日 下午1:35:25
	 */
	public ArrayList<Privilege> getPrivileges();
}
