package com.rt.logic.activity.config.loader;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.activity.config.data.OperationActivityDetailConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class OperationActivityDetailConfigLoader extends AbsLoader {

	String path = "operationActivityDetail.xls";

	@Override
	public void load() {
		ConfigCache.operationActivityDetailConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<OperationActivityDetailConfig> list = new ArrayList<OperationActivityDetailConfig>();
		GameModel.initModels(wb.getSheetAt(0), OperationActivityDetailConfig.class, list);
		for (OperationActivityDetailConfig config : list) {
			if(ConfigCache.operationActivityDetailConfigMap.containsKey(config.activityId)){
				ConfigCache.operationActivityDetailConfigMap.get(config.activityId).put(config.seatIndex, config);
				continue;
			}
			Map<Integer, OperationActivityDetailConfig> map = new HashMap<>();
			map.put(config.seatIndex, config);
			ConfigCache.operationActivityDetailConfigMap.put(config.activityId, map);
		}
	}

}
