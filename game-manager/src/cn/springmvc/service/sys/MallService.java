package cn.springmvc.service.sys;

import java.util.List;

import cn.springmvc.model.mall.Company;
import cn.springmvc.model.mall.Mall;
import cn.springmvc.model.sys.Dictionary;


public interface MallService {

	public Dictionary getDictionaryById(int id);
	
	public List<Dictionary> list(int id);
	
	public void delete(int id);
	
	public void insert(Dictionary menu);
	
	public void update(Dictionary menu);
	
	
	public List<Company> listLimitCompay(Company company);
	
	public void saveCompany(Company company);
	
	public void updateCompany(Company company);
	
	public Company getCompanyById(int id);
	
	public void delCompanyById(int id);
	
	
    public List<Mall> listLimitMall(Mall mall);
	
	public void saveMall(Mall mall);
	
	public void updateMall(Mall mall);
	
	public Mall getMallById(int id);
	
	public void delMallById(int id);
	
	public int countMall();
	
	public int countCompany();
	
}
