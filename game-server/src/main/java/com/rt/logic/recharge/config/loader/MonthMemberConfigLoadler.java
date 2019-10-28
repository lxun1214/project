package com.rt.logic.recharge.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.recharge.config.data.MonthMemberConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class MonthMemberConfigLoadler extends AbsLoader{

	String path="monthMember.xls";
	
	@Override
	public void load() {
		ConfigCache.monthCardConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<MonthMemberConfig> list = new ArrayList<MonthMemberConfig>();
		GameModel.initModels(wb.getSheetAt(0), MonthMemberConfig.class, list);
		for (MonthMemberConfig config : list) {
			ConfigCache.monthCardConfigMap.put(config.type, config);
		}
	}

}
