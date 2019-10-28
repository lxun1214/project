package com.rt.logic.player.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.player.config.data.VipBaseConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class VipBaseConfigLoadler extends AbsLoader{

	String path="vipBase.xls";
	
	@Override
	public void load() {
		ConfigCache.vipBaseConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<VipBaseConfig> list = new ArrayList<VipBaseConfig>();
		GameModel.initModels(wb.getSheetAt(0), VipBaseConfig.class, list);
		for (VipBaseConfig config : list) {
			ConfigCache.vipBaseConfigMap.put(config.vipLvl, config);
		}
	}

}
