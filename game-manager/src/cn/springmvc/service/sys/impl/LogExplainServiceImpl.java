package cn.springmvc.service.sys.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import cn.springmvc.controller.webutil.Constant;
import cn.springmvc.dao.sys.LogExplainMapper;
import cn.springmvc.model.sys.LogExplain;
import cn.springmvc.service.sys.LogExplainService;

@Service
public class LogExplainServiceImpl implements LogExplainService {

	@Autowired
	LogExplainMapper logExplainMapper;

	
	@Override
	public List<LogExplain> listLimit(LogExplain logExplain) {
		List<LogExplain> list=null;
		try {
			PageHelper.startPage( logExplain.getPageNo() !=null ? logExplain.getPageNo() : 1,logExplain.getPageSize() !=null ? logExplain.getPageSize() : Constant.pageSize);
			list =  logExplainMapper.listLimit(logExplain);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e.getMessage());
		}
		return list;
	}

	@Override
	public void saveLogExplain(LogExplain logExplain) {
		logExplain.setCreateTime(new Date());
		logExplainMapper.insert(logExplain);
	}

}
