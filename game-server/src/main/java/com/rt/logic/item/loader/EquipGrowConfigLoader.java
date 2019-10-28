package com.rt.logic.item.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.item.data.EquipGrowConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;


public class EquipGrowConfigLoader extends AbsLoader {

	String path = "equipGrow.xls";

	@Override
	public void load() {
		ConfigCache.equipGrowConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<EquipGrowConfig> equipGrowConfigList = new ArrayList<EquipGrowConfig>();
		GameModel.initModels(wb.getSheetAt(0), EquipGrowConfig.class, equipGrowConfigList);
		for (EquipGrowConfig config : equipGrowConfigList) {
			ConfigCache.equipGrowConfigMap.put(config.level, config);
		}
	}

}
