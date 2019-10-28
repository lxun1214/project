package com.rt.common;

import java.util.ArrayList;
import java.util.List;

import com.rt.gloable.impl.IConfigLoader;
import com.rt.gloable.impl.ILoader;

/**
 * 配置加载
 * 
 * @author xin.fengtao
 *
 */
public abstract class ConfigLoader implements IConfigLoader {

	private List<ILoader> loadList = new ArrayList<ILoader>();

	public abstract void load();

	protected void loadConfig(ILoader loader) {
		loadList.add(loader);
	}

	@Override
	public void reLoad() {
		for (ILoader loader : loadList) {
			loader.load();
		}
	}

	@Override
	public void startLoad() {
		load();
		for (ILoader loader : loadList) {
			loader.load();
		}
	}

}
