package com.rt.logic.item.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.item.data.ItemDrawConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;


public class ItemDrawConfigLoader extends AbsLoader {

	String path = "itemDraw.xls";

	@Override
	public void load() {
		ConfigCache.ItemDrawConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<ItemDrawConfig> itemConfigList = new ArrayList<ItemDrawConfig>();
		GameModel.initModels(wb.getSheetAt(0), ItemDrawConfig.class, itemConfigList);
		for (ItemDrawConfig config : itemConfigList) {
			ConfigCache.ItemDrawConfigMap.put(config.itemId, config);
		}
	}

}
