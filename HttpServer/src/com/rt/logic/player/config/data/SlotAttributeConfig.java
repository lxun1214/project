package com.rt.logic.player.config.data;

import java.util.ArrayList;
import java.util.List;

import com.rt.common.GameModel;

public class SlotAttributeConfig extends GameModel{
	/**关卡id*/
	public int pointId;
	
	/**解锁的装备栏部位*/
	public List<Integer> equipCoordinateList = new ArrayList<>();
	
	/**宝石槽部位*/
	public List<List<Integer>> grooveList = new ArrayList<>();
	
	@Override
	public boolean setValue(String key, String value) {
		if (key.equals("equipCoordinate")) {
			String[] str = value.split("#");
			for (int i = 0; i < str.length; i++) {
				equipCoordinateList.add(Integer.parseInt(str[i]));
			}
			return true;
		}
		if(key.equals("jackNum")) {
			String[] str = value.split("#");
			for(int i = 0;i < str.length;i++) {
				String[] grooves = str[i].split(",");
				List<Integer> list = new ArrayList<>();
				for(int j = 0;j < grooves.length;j++) {
					list.add(Integer.parseInt(grooves[j]));
				}
				grooveList.add(list);
			}
			return true;
		}
		return super.setValue(key, value);
	}
}
