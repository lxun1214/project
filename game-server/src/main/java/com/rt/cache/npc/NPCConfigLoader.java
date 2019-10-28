package com.rt.cache.npc;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class NPCConfigLoader extends AbsLoader {

	String path = "npcInfo.xls";

	@Override
	public void load() {
		
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		
		
		List<NpcPlayerModel> list1 = new ArrayList<NpcPlayerModel>();
		GameModel.initModels(wb.getSheetAt(0), NpcPlayerModel.class, list1);
		for (NpcPlayerModel config : list1) {
			ConfigCache.npcPlayerModelMap.put(config.playerId, config);
		}
		
		List<NpcEquipModel> list2 = new ArrayList<NpcEquipModel>();
		GameModel.initModels(wb.getSheetAt(1), NpcEquipModel.class, list2);
		for (NpcEquipModel config : list2) {
			ConfigCache.npcEquipModelMap.put(config.id, config);
		}
		
		
		List<NpcGemGrooveInfo> list3 = new ArrayList<NpcGemGrooveInfo>();
		GameModel.initModels(wb.getSheetAt(2), NpcGemGrooveInfo.class, list3);
		for (NpcGemGrooveInfo config : list3) {
			ConfigCache.npcGemGrooveInfoMap.put(config.id, config);
		}
	}

}
