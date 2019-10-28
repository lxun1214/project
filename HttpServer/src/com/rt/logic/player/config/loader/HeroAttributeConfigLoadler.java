package com.rt.logic.player.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.player.config.data.HeroAttributeConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class HeroAttributeConfigLoadler extends AbsLoader{

	String path="heroAttribute.xls";
	
	@Override
	public void load() {
		ConfigCache.heroAttributeConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<HeroAttributeConfig> heroAttributeConfigList = new ArrayList<HeroAttributeConfig>();
		GameModel.initModels(wb.getSheetAt(0), HeroAttributeConfig.class, heroAttributeConfigList);
		for (HeroAttributeConfig config : heroAttributeConfigList) {
			ConfigCache.heroAttributeConfigMap.put(config.heroType, config);
		}
	}

}
