package cn.springmvc.service.sys;

import java.util.List;

import cn.springmvc.model.sys.LogExplain;

public interface LogExplainService {

	public List<LogExplain> listLimit(LogExplain logExplain);
	
	public void saveLogExplain(LogExplain logExplain);
	
}
