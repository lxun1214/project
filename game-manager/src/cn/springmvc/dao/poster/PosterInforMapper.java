package cn.springmvc.dao.poster;

import cn.springmvc.model.poster.PosterInfor;
import cn.springmvc.model.poster.PosterInforExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PosterInforMapper {
	
	public List<PosterInfor> listPoster(@Param("record")PosterInfor infor);
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int countByExample(PosterInforExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int deleteByExample(PosterInforExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int deleteByPrimaryKey(Long inforId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int insert(PosterInfor record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int insertSelective(PosterInfor record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    List<PosterInfor> selectByExampleWithBLOBs(PosterInforExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    List<PosterInfor> selectByExample(PosterInforExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    PosterInfor selectByPrimaryKey(Long inforId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int updateByExampleSelective(@Param("record") PosterInfor record, @Param("example") PosterInforExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int updateByExampleWithBLOBs(@Param("record") PosterInfor record, @Param("example") PosterInforExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int updateByExample(@Param("record") PosterInfor record, @Param("example") PosterInforExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int updateByPrimaryKeySelective(PosterInfor record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int updateByPrimaryKeyWithBLOBs(PosterInfor record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table poster_infor
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    int updateByPrimaryKey(PosterInfor record);
}