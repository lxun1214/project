package com.rt.logic.part.config.data;

import java.util.ArrayList;
import java.util.List;

import com.rt.common.GameModel;

public class PartInfoConfig extends GameModel{
	
	/**关卡ID*/
	public int partID;
	/**下一关ID*/
	public int nextPartID;
	/**副本类型（1.森林之王，2.黑夜永枯，3.冰封圣地,4.烈焰焚地，5.神秘之地）*/
	public int partType;
	/**装备战力（进入条件 初始装备+技能+神器+宝石战力）*/
	public int entryConditions;
	/**金币奖励*/
	public int gold;
	/**道具奖励(道具ID）*/
	public String item;
	/**技能玉*/
	public int upgradeSkillsJade;
	/**装备升阶石*/
	public int reinforcedEquipmentStone;
	/**奖励经验*/
	public int exp;
	
	public int randomNum;
	
	public List<Integer> itemIds = new ArrayList<>();
	
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
