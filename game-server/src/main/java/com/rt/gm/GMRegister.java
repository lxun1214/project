package com.rt.gm;

import java.util.HashMap;
import java.util.Map;

import com.rt.gm.execute.Activation;
import com.rt.gm.execute.AddActivityInfo;
import com.rt.gm.execute.AddDiamondGm;
import com.rt.gm.execute.AddGoldGm;
import com.rt.gm.execute.AddItemGm;
import com.rt.gm.execute.AddPay;
import com.rt.gm.execute.AddRebirthNum;
import com.rt.gm.execute.AddReinforcedStone;
import com.rt.gm.execute.AddSkillJadeGm;
import com.rt.gm.execute.AddStrengthenStone;
import com.rt.gm.execute.AddVipLevel;

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
		//加神器石头
		GMMap.put("addStrengthenStone", new AddStrengthenStone());
		//加重生次数
		GMMap.put("addRebirthNum", new AddRebirthNum());
		//加装备升阶石
		GMMap.put("addReinforcedStone", new AddReinforcedStone());
		//加vip等级
		GMMap.put("addVipLevel", new AddVipLevel());
		//激活神器
		GMMap.put("activationArtifact", new Activation());
		//添加活动
		GMMap.put("addActivityInfo", new AddActivityInfo());
		//添加付款
		GMMap.put("addPay", new AddPay());
		
	}
}
