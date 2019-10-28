package com.rt.logic.item.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.item.data.ItemConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;


public class ItemConfigLoader extends AbsLoader {

	String path = "item.xls";

	@Override
	public void load() {
		ConfigCache.itemConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<ItemConfig> itemConfigList = new ArrayList<ItemConfig>();
		GameModel.initModels(wb.getSheetAt(0), ItemConfig.class, itemConfigList);
		for (ItemConfig config : itemConfigList) {
			ConfigCache.itemConfigMap.put(config.itemId, config);
		}
	}

}
