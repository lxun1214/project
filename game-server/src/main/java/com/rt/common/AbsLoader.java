package com.rt.common;

import com.rt.gloable.impl.ILoader;

public abstract class AbsLoader implements ILoader{
	
	@Override
	public void reLoad() {
		load();
	}
}
