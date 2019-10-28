package com.rt.logic.activity.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.activity.config.data.OperationActivityConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class OperationActivityConfigLoader extends AbsLoader {

	String path = "operationActivity.xls";

	@Override
	public void load() {
		ConfigCache.operationActivityConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<OperationActivityConfig> list = new ArrayList<OperationActivityConfig>();
		GameModel.initModels(wb.getSheetAt(0), OperationActivityConfig.class, list);
		for (OperationActivityConfig config : list) {
			ConfigCache.operationActivityConfigMap.put(config.activityId, config);
		}
	}

}
