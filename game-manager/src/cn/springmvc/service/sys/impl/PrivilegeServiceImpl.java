package cn.springmvc.service.sys.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.springmvc.cache.ConfigCache;
import cn.springmvc.dao.sys.PrivilegeMapper;
import cn.springmvc.dao.sys.ResourceMapper;
import cn.springmvc.model.sys.Privilege;
import cn.springmvc.model.sys.Resource;
import cn.springmvc.model.sys.ResourceExample;
import cn.springmvc.service.sys.PrivilegeService;

@Service
public class PrivilegeServiceImpl implements PrivilegeService {
	@Autowired
	PrivilegeMapper privilegeMapper;
	@Autowired
	ResourceMapper resourceMapper;

	@Override
	public ArrayList<Privilege> findTopList() {
		ArrayList<Privilege> topList = privilegeMapper.getPrivileges();
		Collections.sort(topList,new Comparator<Privilege>(){
			@Override
			public int compare(Privilege o1, Privilege o2) {
				return o1.getOrder_da().compareTo(o2.getOrder_da());
			}
		});
		return topList;
	}

	
	@Override
	public boolean is_yn(int adminId, int privilegeId) {
		if(ConfigCache.resourceMap.containsKey(adminId)){
			if(ConfigCache.resourceMap.get(adminId).contains(privilegeId)){
				return true;
			}
		}
		return false;
	}

	
	@Override
	public List<Resource> list(int adminId) {
		ResourceExample example=new ResourceExample();
		example.createCriteria().andAdminIdEqualTo(adminId);
		return resourceMapper.selectByExample(example);
	}

	
	@Override
	public boolean updateResource(int adminId, String[] ids) {
		
		try {
			//删除以前权限
			ResourceExample example=new ResourceExample();
			example.createCriteria().andAdminIdEqualTo(adminId);
			resourceMapper.deleteByExample(example);
			
			//删除缓存
			ConfigCache.resourceMap.remove(adminId);
			
			Set<Integer> set=new HashSet<>();
			for(int i=0;i<ids.length;i++){
				set.add(Integer.parseInt(ids[i]));
				Resource resource=new Resource();
				resource.setAdminId(adminId);
				resource.setPrivilegeId(Integer.parseInt(ids[i]));
				resourceMapper.insert(resource);
			}
			ConfigCache.resourceMap.put(adminId,set);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<Resource> listAll() {
		ResourceExample example=new ResourceExample();
		example.createCriteria();
		return resourceMapper.selectByExample(example);
	}
}
