package com.rt.code.impl;

import java.nio.ByteBuffer;

import com.rt.common.Message;

public interface IDecode {
	
	public Message decode(ByteBuffer buffer) throws Exception;
	
}
