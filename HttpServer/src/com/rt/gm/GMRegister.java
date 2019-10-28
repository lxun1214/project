package com.rt.gm;

import java.util.HashMap;
import java.util.Map;

import com.rt.gm.execute.AddDiamondGm;
import com.rt.gm.execute.AddItemGm;
import com.rt.gm.execute.AddSkillJadeGm;
import com.rt.gm.execute.AddGoldGm;

public class GMRegister {
	
	public static Map<String,AbsGm> GMMap = new HashMap<>();
	
	public static void init(){
		//加金币
		GMMap.put("addGold", new AddGoldGm());
		//加钻石
		GMMap.put("addDiamond", new AddDiamondGm());
		//加道具
		GMMap.put("addItem", new AddItemGm());
		//加技能玉
		GMMap.put("addSkillJade", new AddSkillJadeGm());
	}
}
