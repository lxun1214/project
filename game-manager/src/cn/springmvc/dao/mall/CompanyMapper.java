package cn.springmvc.dao.mall;

import cn.springmvc.model.mall.Company;
import cn.springmvc.model.mall.CompanyExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CompanyMapper {
	
	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */
	int countByExample(CompanyExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */
	int deleteByExample(CompanyExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */
	int deleteByPrimaryKey(Integer id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */
	int insert(Company record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */
	int insertSelective(Company record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */List<Company> selectByExample(CompanyExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */
	Company selectByPrimaryKey(Integer id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */int updateByExampleSelective(@Param("record") Company record,@Param("example") CompanyExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */int updateByExample(@Param("record") Company record,@Param("example") CompanyExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */
	int updateByPrimaryKeySelective(Company record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table company
	 * @mbggenerated  Thu May 10 19:21:08 CST 2018
	 */
	int updateByPrimaryKey(Company record);

	public List<Company> listLimitCompay(@Param("record")Company company);
}