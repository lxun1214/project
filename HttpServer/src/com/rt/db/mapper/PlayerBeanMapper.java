package com.rt.db.mapper;

import com.rt.db.domain.PlayerBean;
import com.rt.db.domain.PlayerBeanExample;
import com.rt.db.domain.PlayerBeanWithBLOBs;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PlayerBeanMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int countByExample(PlayerBeanExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int deleteByExample(PlayerBeanExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int deleteByPrimaryKey(Long playerId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int insert(PlayerBeanWithBLOBs record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int insertSelective(PlayerBeanWithBLOBs record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	List<PlayerBeanWithBLOBs> selectByExampleWithBLOBs(PlayerBeanExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	List<PlayerBean> selectByExample(PlayerBeanExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	PlayerBeanWithBLOBs selectByPrimaryKey(Long playerId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int updateByExampleSelective(@Param("record") PlayerBeanWithBLOBs record,
			@Param("example") PlayerBeanExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int updateByExampleWithBLOBs(@Param("record") PlayerBeanWithBLOBs record,
			@Param("example") PlayerBeanExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int updateByExample(@Param("record") PlayerBean record, @Param("example") PlayerBeanExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int updateByPrimaryKeySelective(PlayerBeanWithBLOBs record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int updateByPrimaryKeyWithBLOBs(PlayerBeanWithBLOBs record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table player
	 * @mbggenerated  Wed Apr 04 11:00:16 CST 2018
	 */
	int updateByPrimaryKey(PlayerBean record);
}