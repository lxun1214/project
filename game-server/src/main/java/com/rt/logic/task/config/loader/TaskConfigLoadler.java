package com.rt.logic.task.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.task.config.data.TaskConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class TaskConfigLoadler extends AbsLoader {

	String path = "task.xls";

	@Override
	public void load() {
		ConfigCache.taskConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<TaskConfig> taskConfigList = new ArrayList<TaskConfig>();
		GameModel.initModels(wb.getSheetAt(0), TaskConfig.class, taskConfigList);
		for (TaskConfig config : taskConfigList) {
			ConfigCache.taskConfigMap.put(config.taskId, config);
			if(ConfigCache.groupTaskConfigMap.containsKey(config.taskWin)){
				ConfigCache.groupTaskConfigMap.get(config.taskWin).add(config);
				continue;
			}
			List<TaskConfig> list = new ArrayList<>();
			list.add(config);
			ConfigCache.groupTaskConfigMap.put(config.taskWin, list);
		}
	}

}
