package com.rt.logic.player.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.player.config.data.WordShield;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;
import com.rt.utils.FilterUtil;

public class WordshieldConfigLoadler extends AbsLoader{

	String path="wordshield.xls";
	
	@Override
	public void load() {
//		ConfigCache.swearWordsSet.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<WordShield> wordShieldConfigList = new ArrayList<WordShield>();
		GameModel.initModels(wb.getSheetAt(0), WordShield.class, wordShieldConfigList);
		for (WordShield config : wordShieldConfigList) {
			if(config.swearWords.equals("")){
				continue;
			}
			FilterUtil.unicodeTrie.addKeyword(config.swearWords);
//			ConfigCache.swearWordsSet.add(config.swearWords);
		}
	}

}
