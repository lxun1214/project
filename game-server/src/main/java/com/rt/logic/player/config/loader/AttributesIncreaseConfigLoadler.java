package com.rt.logic.player.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.player.config.data.AttributesIncreaseConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class AttributesIncreaseConfigLoadler extends AbsLoader {

	String path = "attributesIncrease.xls";

	@Override
	public void load() {
		ConfigCache.attributesIncreaseConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<AttributesIncreaseConfig> attributesIncreaseConfigList = new ArrayList<AttributesIncreaseConfig>();
		GameModel.initModels(wb.getSheetAt(0), AttributesIncreaseConfig.class, attributesIncreaseConfigList);
		for (AttributesIncreaseConfig config : attributesIncreaseConfigList) {
			if (ConfigCache.attributesIncreaseConfigMap.containsKey(config.heroType)) {
				ConfigCache.attributesIncreaseConfigMap.get(config.heroType).add(config);
				continue;
			}
			List<AttributesIncreaseConfig> list = new ArrayList<>();
			list.add(config);
			ConfigCache.attributesIncreaseConfigMap.put(config.heroType, list);
		}
	}

}
