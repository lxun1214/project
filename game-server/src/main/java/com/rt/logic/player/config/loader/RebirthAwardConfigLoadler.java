package com.rt.logic.player.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.player.config.data.RebirthAwardConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class RebirthAwardConfigLoadler extends AbsLoader{

	String path="rebirthAward.xls";
	
	@Override
	public void load() {
		ConfigCache.rebirthAwardConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<RebirthAwardConfig> rebirthAwardConfigList = new ArrayList<RebirthAwardConfig>();
		GameModel.initModels(wb.getSheetAt(0), RebirthAwardConfig.class, rebirthAwardConfigList);
		for (RebirthAwardConfig config : rebirthAwardConfigList) {
			ConfigCache.rebirthAwardConfigMap.put(config.pointId, config);
		}
	}

}
