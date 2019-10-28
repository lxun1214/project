package com.rt.logic.item.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.item.data.EquipConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;


public class EquipConfigLoader extends AbsLoader {

	String path = "equip.xls";

	@Override
	public void load() {
		ConfigCache.equipConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<EquipConfig> equipConfigList = new ArrayList<EquipConfig>();
		GameModel.initModels(wb.getSheetAt(0), EquipConfig.class, equipConfigList);
		for (EquipConfig config : equipConfigList) {
			ConfigCache.equipConfigMap.put(config.itemId, config);
		}
	}

}
