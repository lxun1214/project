package com.rt.logic.activity.config.loader;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.activity.config.data.ExtractInfoConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class ExtractInfoConfigLoader extends AbsLoader {
	public static List<Integer>extractTimesList = new ArrayList<>();
	public static Map<Integer, List<ExtractInfoConfig>> extractTimesObj = new HashMap<>();
	
	String path = "extractInfo.xls";
	
	@Override
	public void load() {
		ConfigCache.extractInfoConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<ExtractInfoConfig> list = new ArrayList<ExtractInfoConfig>();
		GameModel.initModels(wb.getSheetAt(0), ExtractInfoConfig.class, list);
		for (ExtractInfoConfig config : list) {
			if(config.extractTimes != 0)
			{
				List<ExtractInfoConfig> l = ExtractInfoConfigLoader.extractTimesObj.get(config.extractTimes);
				if(ExtractInfoConfigLoader.extractTimesList.indexOf(config.extractTimes) == -1)
				{
					l = new ArrayList<>(); 
					ExtractInfoConfigLoader.extractTimesList.add(config.extractTimes);
					l.add(config);
				}
				else
				{
					l.add(config);
				}
				 ExtractInfoConfigLoader.extractTimesObj.put(config.extractTimes, l);
			}else
				ConfigCache.extractInfoConfigMap.put(config.extractId, config);
		}
		
		Collections.sort(ExtractInfoConfigLoader.extractTimesList);
	}

}
