package cn.springmvc.service.sys.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import cn.springmvc.controller.webutil.Constant;
import cn.springmvc.dao.other.OtherMapper;
import cn.springmvc.dao.poster.PosterInforMapper;
import cn.springmvc.dao.poster.WxpayFlowingWaterMapper;
import cn.springmvc.model.po.SevenDataPO;
import cn.springmvc.model.poster.PosterInfor;
import cn.springmvc.model.poster.WxpayFlowingWater;
import cn.springmvc.model.poster.WxpayFlowingWaterExample;
import cn.springmvc.service.sys.PosterService;

@Service
public class PosterServiceImpl implements PosterService{

	@Autowired
	PosterInforMapper posterInforMapper;
	@Autowired
	WxpayFlowingWaterMapper wxpayFlowingWaterMapper;
	@Autowired
	OtherMapper otherMapper;
	
	@Override
	public List<PosterInfor> listPoster(PosterInfor infor) {
		PageHelper.startPage(infor.getPageNo() != null ? infor.getPageNo() : 1,
				infor.getPageSize() != null ? infor.getPageSize() : Constant.pageSize);
		return posterInforMapper.listPoster(infor);
	}

	@Override
	public void delPosterInfo(long id) {
		posterInforMapper.deleteByPrimaryKey(id);
	}

	@Override
	public void updatePosterInfo(PosterInfor infor) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<WxpayFlowingWater> listWater(WxpayFlowingWater water) {
		WxpayFlowingWaterExample example = new WxpayFlowingWaterExample();
		if(water.getOutTradeNo()!=null&&!water.getOutTradeNo().equals("")){
			example.createCriteria().andOutTradeNoEqualTo(water.getOutTradeNo()).andTradeStatusEqualTo(3);
		}else{
			example.createCriteria().andTradeStatusEqualTo(3);
		}
		PageHelper.startPage(water.getPageNo() != null ? water.getPageNo() : 1,
				water.getPageSize() != null ? water.getPageSize() : Constant.pageSize);
		return wxpayFlowingWaterMapper.selectByExample(example);
	}

	@Override
	public List<SevenDataPO> listSevenDataPO(String minDate) {
		return otherMapper.listSevenDataPO(minDate);
	}

	
	
}
