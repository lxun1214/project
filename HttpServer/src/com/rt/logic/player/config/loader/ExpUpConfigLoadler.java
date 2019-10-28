package com.rt.logic.player.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.player.config.data.ExpUpConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class ExpUpConfigLoadler extends AbsLoader{

	String path="expUp.xls";
	
	@Override
	public void load() {
		ConfigCache.expUpConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<ExpUpConfig> expUpConfigList = new ArrayList<ExpUpConfig>();
		GameModel.initModels(wb.getSheetAt(0), ExpUpConfig.class, expUpConfigList);
		for (ExpUpConfig config : expUpConfigList) {
			ConfigCache.expUpConfigMap.put(config.heroLevel, config);
		}
	}

}
