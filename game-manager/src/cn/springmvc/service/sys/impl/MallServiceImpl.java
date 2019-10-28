package cn.springmvc.service.sys.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import cn.springmvc.controller.webutil.Constant;
import cn.springmvc.dao.mall.CompanyMapper;
import cn.springmvc.dao.mall.MallMapper;
import cn.springmvc.dao.sys.DictionaryMapper;
import cn.springmvc.model.mall.Company;
import cn.springmvc.model.mall.CompanyExample;
import cn.springmvc.model.mall.Mall;
import cn.springmvc.model.mall.MallExample;
import cn.springmvc.model.sys.Dictionary;
import cn.springmvc.model.sys.DictionaryExample;
import cn.springmvc.service.sys.MallService;

@Service
public class MallServiceImpl implements MallService {

	@Autowired
	DictionaryMapper dictionaryMapper;
	@Autowired
	CompanyMapper companyMapper;
	@Autowired
	MallMapper mallMapper;

	@Override
	public Dictionary getDictionaryById(int id) {
		return dictionaryMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<Dictionary> list(int id) {
		DictionaryExample example = new DictionaryExample();
		example.createCriteria().andFidEqualTo(id);
		example.setOrderByClause(" order_id asc ");
		return dictionaryMapper.selectByExample(example);
	}

	@Override
	public void delete(int id) {
		dictionaryMapper.deleteByPrimaryKey(id);

	}

	@Override
	public void insert(Dictionary menu) {
		dictionaryMapper.insert(menu);
	}

	@Override
	public void update(Dictionary menu) {
		dictionaryMapper.updateByPrimaryKeySelective(menu);
	}

	@Override
	public void saveCompany(Company company) {
		companyMapper.insert(company);
	}

	@Override
	public void updateCompany(Company company) {
		Company h_Company = companyMapper.selectByPrimaryKey(company.getId());
		companyMapper.updateByPrimaryKeySelective(company);
		//判断是否修改了商户名称
		if(!h_Company.getCompanyName().equals(company.getCompanyName())){
			//修改对应商品的所有商家名称
			MallExample example = new MallExample();
			example.createCriteria().andCompanyIdEqualTo(company.getId());
			Mall mall = new Mall();
			mall.setCompanyName(company.getCompanyName());
			mallMapper.updateByExampleSelective(mall, example);
		}
	}

	@Override
	public void saveMall(Mall mall) {
		mallMapper.insert(mall);
	}

	@Override
	public void updateMall(Mall mall) {
		mallMapper.updateByPrimaryKeySelective(mall);
	}

	@Override
	public List<Company> listLimitCompay(Company company) {
		PageHelper.startPage(company.getPageNo() != null ? company.getPageNo() : 1,
				company.getPageSize() != null ? company.getPageSize() : Constant.pageSize);
		return companyMapper.listLimitCompay(company);
	}

	@Override
	public Company getCompanyById(int id) {
		return companyMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<Mall> listLimitMall(Mall mall) {
		PageHelper.startPage(mall.getPageNo() != null ? mall.getPageNo() : 1,
				mall.getPageSize() != null ? mall.getPageSize() : Constant.pageSize);
		return mallMapper.listLimitMall(mall);
	}

	@Override
	public Mall getMallById(int id) {
		return mallMapper.selectByPrimaryKey(id);
	}

	@Override
	public void delCompanyById(int id) {
		Company company = new Company();
		company.setId(id);
		company.setState(1);
		companyMapper.updateByPrimaryKeySelective(company);
		// 删除所有对应的商品
		MallExample example = new MallExample();
		example.createCriteria().andCompanyIdEqualTo(id);
		Mall mall = new Mall();
		mall.setState(1);
		mallMapper.updateByExampleSelective(mall, example);
	}

	@Override
	public void delMallById(int id) {
		Mall mall = new Mall();
		mall.setId(id);
		mall.setState(1);
		mallMapper.updateByPrimaryKeySelective(mall);
	}

	@Override
	public int countMall() {
		MallExample example = new MallExample();
		example.createCriteria().andStateEqualTo(0);
		return mallMapper.countByExample(example);
	}

	@Override
	public int countCompany() {
		CompanyExample example = new CompanyExample();
		example.createCriteria().andStateEqualTo(0);
		return companyMapper.countByExample(example);
	}

}
