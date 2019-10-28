package cn.springmvc.dao.other;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import cn.springmvc.model.po.HomeDataPO;
import cn.springmvc.model.po.SevenDataPO;

public interface OtherMapper {
	
    public HomeDataPO getHomeDataPo(@Param("date")String date);
	
	public List<SevenDataPO> listSevenDataPO(@Param("minDate")String minDate);
	
	public Integer maxMallChangePriceId(@Param("orderChannel")int orderChannel);

}