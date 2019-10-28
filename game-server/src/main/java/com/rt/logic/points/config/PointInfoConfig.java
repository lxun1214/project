package com.rt.logic.points.config;

import java.util.ArrayList;
import java.util.List;

import com.rt.common.GameModel;

public class PointInfoConfig extends GameModel{
	/**层数id*/
	public int pointId;
	/**地图类型（0普通关，1,BOSS关）*/
	public int maptype;
	/**关卡奖励（神器石头掉落）*/
	public int strengthenArtifactStone;
	/**金币*/
	public int gold;
	/**经验*/
	public int exp;
	
	public List<Integer> itemIds = new ArrayList<>();
	
	public int randomNum;
	
	/**离线获得奖励CD时间(秒)*/
	public int offlineRewardTime;
	
	@Override
	public boolean setValue(String key, String value) {
		if(key.equals("item")) {
			String[] str = value.split(":");
			String[] items = str[0].split("#");
			for(int i = 0;i < items.length;i++) {
				itemIds.add(Integer.parseInt(items[i]));
			}
			randomNum = Integer.parseInt(str[1]);
			return true;
		}
		return super.setValue(key, value);
	}
}
