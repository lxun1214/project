package com.rt.logic.shop.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.shop.config.data.StoreConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class StoreConfigLoadler extends AbsLoader {

	String path = "store.xls";

	@Override
	public void load() {
		ConfigCache.storeMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<StoreConfig> storeConfigList = new ArrayList<StoreConfig>();
		GameModel.initModels(wb.getSheetAt(0), StoreConfig.class, storeConfigList);
		for (StoreConfig config : storeConfigList) {
			ConfigCache.storeMap.put(config.seqId, config);
		}
	}

}
