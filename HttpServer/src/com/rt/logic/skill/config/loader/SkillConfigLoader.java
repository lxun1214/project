package com.rt.logic.skill.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.skill.config.data.SkillInfoConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class SkillConfigLoader extends AbsLoader {

	String path = "skill.xls";

	@Override
	public void load() {
		ConfigCache.skillConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<SkillInfoConfig> skillConfigList = new ArrayList<SkillInfoConfig>();
		GameModel.initModels(wb.getSheetAt(0), SkillInfoConfig.class, skillConfigList);
		for (SkillInfoConfig config : skillConfigList) {
			ConfigCache.skillConfigMap.put(config.tab, config);
		}
	}

}
