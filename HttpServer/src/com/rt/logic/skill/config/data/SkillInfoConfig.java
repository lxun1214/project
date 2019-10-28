package com.rt.logic.skill.config.data;

import com.rt.common.GameModel;

public class SkillInfoConfig extends GameModel{
	
	/**序列*/
	public int tab;
	/**次级技能ID*/
	public int secondarySkill_id;
	/**技能等级*/
	public int level;
	/**职业（1.剑士，2格斗家，3枪手，4怪物）*/
	public int careerType;
	/**升级需要技能玉数量*/
	public int upgrade_money;
	/**升级所需玩家等级*/
	public int need_role_lvl;
	/**升级所需玩家重生次数*/
	public int need_role_lzs;
}
