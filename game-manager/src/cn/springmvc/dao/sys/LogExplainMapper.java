package cn.springmvc.dao.sys;

import cn.springmvc.model.sys.LogExplain;
import cn.springmvc.model.sys.LogExplainExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface LogExplainMapper {
	
	
	List<LogExplain> listLimit(@Param("record")LogExplain logExplain);
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    int countByExample(LogExplainExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    int deleteByExample(LogExplainExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    int insert(LogExplain record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    int insertSelective(LogExplain record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    List<LogExplain> selectByExample(LogExplainExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    LogExplain selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    int updateByExampleSelective(@Param("record") LogExplain record, @Param("example") LogExplainExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    int updateByExample(@Param("record") LogExplain record, @Param("example") LogExplainExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    int updateByPrimaryKeySelective(LogExplain record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table log_explain
     *
     * @mbggenerated Tue Dec 20 17:36:07 CST 2016
     */
    int updateByPrimaryKey(LogExplain record);
}