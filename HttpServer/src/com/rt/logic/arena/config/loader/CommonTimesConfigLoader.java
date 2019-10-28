package com.rt.logic.arena.config.loader;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.arena.config.data.CommonTimesConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class CommonTimesConfigLoader extends AbsLoader {

	String path = "commonTimes.xls";

	// 策划把所有的购买配置都配到一个表里了，我想着分开解析，但有个类型，先按类型解析吧，要是不拖，在分开
	@Override
	public void load() {
		ConfigCache.commonTimesMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<CommonTimesConfig> commonTimesConfigList = new ArrayList<CommonTimesConfig>();
		GameModel.initModels(wb.getSheetAt(0), CommonTimesConfig.class, commonTimesConfigList);
		for (CommonTimesConfig config : commonTimesConfigList) {
			// 竞技场购买挑战次数类型
			if (config.type == 1) {
				ConfigCache.MAX_PURCHASE_NUM = config.num;
				if (ConfigCache.commonTimesMap.containsKey(config.type)) {
					ConfigCache.commonTimesMap.get(config.type).put(config.num, config);
					continue;
				}
				Map<Integer, CommonTimesConfig> map = new HashMap<>();
				map.put(config.num, config);
				ConfigCache.commonTimesMap.put(config.type, map);
				continue;
			}
			if (ConfigCache.commonTimesMap.containsKey(config.type)) {
				ConfigCache.commonTimesMap.get(config.type).put(config.id, config);
				continue;
			}
			Map<Integer, CommonTimesConfig> map = new HashMap<>();
			map.put(config.id, config);
			ConfigCache.commonTimesMap.put(config.type, map);
		}
	}

}
