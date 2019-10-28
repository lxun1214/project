package com.rt.logic.arena.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.arena.config.data.RankingAwardConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class RankingAwardConfigLoader extends AbsLoader {

	String path = "rankingAward.xls";

	@Override
	public void load() {
		ConfigCache.rankAwardConfigList.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<RankingAwardConfig> rankingAwardConfigist = new ArrayList<RankingAwardConfig>();
		GameModel.initModels(wb.getSheetAt(0), RankingAwardConfig.class, rankingAwardConfigist);
		for (RankingAwardConfig config : rankingAwardConfigist) {
			String[] rankList = config.rankingId.split("#");
			config.starNum = Integer.parseInt(rankList[0]);
			config.endNum = Integer.parseInt(rankList[1]);
			ConfigCache.rankAwardConfigList.add(config);
		}
	}

}
