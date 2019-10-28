package com.rt.logic.points.config;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class PointInfoConfigLoadler extends AbsLoader{

	String path="pointInfo.xls";
	
	@Override
	public void load() {
		ConfigCache.pointConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<PointInfoConfig> pointInfoConfigList = new ArrayList<PointInfoConfig>();
		GameModel.initModels(wb.getSheetAt(0), PointInfoConfig.class, pointInfoConfigList);
		for (PointInfoConfig config : pointInfoConfigList) {
			ConfigCache.pointConfigMap.put(config.pointId, config);
		}
	}

}
