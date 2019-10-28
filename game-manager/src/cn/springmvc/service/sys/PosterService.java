package cn.springmvc.service.sys;

import java.util.List;

import cn.springmvc.model.po.SevenDataPO;
import cn.springmvc.model.poster.PosterInfor;
import cn.springmvc.model.poster.WxpayFlowingWater;

public interface PosterService {

	public List<PosterInfor> listPoster(PosterInfor infor);
	
	public void delPosterInfo(long id);
	
	public void updatePosterInfo(PosterInfor infor);
	
	
	public List<WxpayFlowingWater> listWater(WxpayFlowingWater water);
	
	public List<SevenDataPO> listSevenDataPO(String minDate);
}
