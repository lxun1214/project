package com.rt.logic.artifact.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.artifact.config.data.ArtifactConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class ArtifactConfigLoader extends AbsLoader {

	String path = "artifact.xls";

	@Override
	public void load() {
		ConfigCache.artifactMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<ArtifactConfig> artifactConfigList = new ArrayList<ArtifactConfig>();
		GameModel.initModels(wb.getSheetAt(0), ArtifactConfig.class, artifactConfigList);
		for (ArtifactConfig config : artifactConfigList) {
			ConfigCache.artifactMap.put(config.itemId, config);
		}
	}

}
