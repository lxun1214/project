package com.rt.utils;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

public class ParamUtils {

	static Logger log = Logger.getLogger(ParamUtils.class);
	
	/**
	 * 获取所有参数，这里不需要再encode解码
	 * @param request
	 * @return
	 */
	public static Map<String, String> getParam(HttpServletRequest request) {
		Map<String, String> map = new HashMap<>();
		log.debug("REQUEST "+request.getParameterMap());
		@SuppressWarnings("rawtypes")
		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String paraName = (String) paramNames.nextElement();
			String[] paramValues = request.getParameterValues(paraName);
			// 只取参数只有一个值的
			if (paramValues.length == 1) {
				String paramValue = paramValues[0];
				if (paramValue.length() != 0) {
					map.put(paraName, paramValue);
				}
			}
		}
		return map;
	}
	
}
