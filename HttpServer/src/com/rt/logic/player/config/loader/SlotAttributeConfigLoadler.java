package com.rt.logic.player.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.player.config.data.SlotAttributeConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class SlotAttributeConfigLoadler extends AbsLoader{

	String path="slotAttribute.xls";
	
	@Override
	public void load() {
		ConfigCache.slotAttributeConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<SlotAttributeConfig> slotAttributeConfigList = new ArrayList<SlotAttributeConfig>();
		GameModel.initModels(wb.getSheetAt(0), SlotAttributeConfig.class, slotAttributeConfigList);
		for (SlotAttributeConfig config : slotAttributeConfigList) {
			ConfigCache.slotAttributeConfigMap.put(config.pointId, config);
		}
	}

}
