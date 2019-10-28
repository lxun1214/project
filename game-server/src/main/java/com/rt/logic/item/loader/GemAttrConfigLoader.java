package com.rt.logic.item.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.item.data.GemAttrConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;


public class GemAttrConfigLoader extends AbsLoader {

	String path = "gemAttr.xls";

	@Override
	public void load() {
		ConfigCache.gemAttrConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<GemAttrConfig> gemAttrConfigList = new ArrayList<GemAttrConfig>();
		GameModel.initModels(wb.getSheetAt(0), GemAttrConfig.class, gemAttrConfigList);
		for (GemAttrConfig config : gemAttrConfigList) {
			ConfigCache.gemAttrConfigMap.put(config.id, config);
		}
	}

}
