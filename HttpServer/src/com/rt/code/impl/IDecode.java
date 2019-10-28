package com.rt.code.impl;

import javax.servlet.http.HttpServletRequest;

import com.rt.common.Message;

public interface IDecode {
	
	public Message decode(HttpServletRequest request) throws Exception;
	
}
