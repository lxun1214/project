package com.rt.logic.part.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.part.config.data.PartInfoConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class PartInfoConfigLoadler extends AbsLoader{

	String path="partInfo.xls";
	
	@Override
	public void load() {
		ConfigCache.partInfoConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<PartInfoConfig> partConfigList = new ArrayList<PartInfoConfig>();
		GameModel.initModels(wb.getSheetAt(0), PartInfoConfig.class, partConfigList);
		for (PartInfoConfig config : partConfigList) {
			ConfigCache.partInfoConfigMap.put(config.partID, config);
			if(ConfigCache.partInfoTypeSets.contains(config.partType)){
				continue;
			}
			ConfigCache.partInfoTypeSets.add(config.partType);
		}
	}
}
