package com.rt.logic.skill;

import java.util.ArrayList;
import java.util.List;

import com.rt.cache.ConfigCache;
import com.rt.common.GameConst;
import com.rt.gloable.Response;
import com.rt.logic.player.IPlayer;
import com.rt.logic.skill.config.data.SkillInfoConfig;
import com.rt.pb.PbPlayer.PbSkillInfo;

public class Skill {

	/** 激活的技能列表 */
	List<Integer> skillList = new ArrayList<>();

	/** 技能栏 */
	// List<Integer> skillColumn = new ArrayList<>();

	int[] skillColumn = new int[7];

	public void changeColumnSkill(IPlayer player, int skillTab, int loc, Response response) {
		SkillInfoConfig config = ConfigCache.skillConfigMap.get(skillTab);
		if (skillTab <= 0) {
			SkillMsg.sendChangeColumSkillMsg(false, response);
			return;
		}
		if (config == null) {
			SkillMsg.sendChangeColumSkillMsg(false, response);
			return;
		}
		// 职业不符
		if (config.careerType != player.getJobId()) {
			SkillMsg.sendChangeColumSkillMsg(false, response);
			return;
		}
		for (int i = 0; i < skillColumn.length; i++) {
			int curTab = skillColumn[i];
			if (curTab > 0 && curTab == skillTab) {
				SkillMsg.sendChangeColumSkillMsg(false, response);
				return;
			}
		}
		// 如果升级过了但是激活的技能列表里没有，则不能替换
		if (config.level > 1 && !skillList.contains(skillTab)) {
			SkillMsg.sendChangeColumSkillMsg(false, response);
			return;
		}
		skillColumn[loc] = skillTab;
		SkillMsg.sendChangeColumSkillMsg(true, response);
	}

	/**
	 * 技能升级
	 * 
	 * @param skillTab
	 */
	public void upgradeSkill(IPlayer player, int skillTab, Response response) {
		SkillInfoConfig config = ConfigCache.skillConfigMap.get(skillTab);
		if (config == null) {
			SkillMsg.sendUpgradeSkillMsg(false, response);
			return;
		}
		// 技能玉是否足够
		if (player.getUpgradeSkillsJade() < config.upgrade_money) {
			SkillMsg.sendUpgradeSkillMsg(false, response);
			return;
		}
		// 重生次数是否足够
		if (player.getRebirthNum() < config.need_role_lzs) {
			SkillMsg.sendUpgradeSkillMsg(false, response);
			return;
		}
		// 等级是否足够
		if (player.getLevel() < config.need_role_lvl) {
			SkillMsg.sendUpgradeSkillMsg(false, response);
			return;
		}
		// 是否还有下一级技能
		if (config.level >= GameConst.MAX_SKILL_LIVE) {
			SkillMsg.sendUpgradeSkillMsg(false, response);
			return;
		}

		// 扣除技能玉
		player.addDelUpgradeSkillsJade(-config.upgrade_money);
		int nextSkillTab = skillTab + 1;
		if (skillList.contains(skillTab)) {
			skillList.remove(Integer.valueOf(skillTab));
		}
		skillList.add(nextSkillTab);
		//替换技能栏
		for(int i = 0;i < skillColumn.length;i++) {
			int tab = skillColumn[i];
			if(tab > 0 && tab == skillTab) {
				skillColumn[i] = nextSkillTab;
			}
		}
		SkillMsg.sendUpgradeSkillMsg(true, nextSkillTab, player.getUpgradeSkillsJade(), response);
	}
	
	public List<PbSkillInfo> showSkillColumnInfo() {
		List<PbSkillInfo> list = new ArrayList<>();
		for(int i = 0;i < skillColumn.length;i++) {
			int skillTab = skillColumn[i];
			if(skillTab > 0) {
				PbSkillInfo.Builder builder = PbSkillInfo.newBuilder();
				builder.setLoc(i);
				builder.setSkillTab(skillTab);
				list.add(builder.build());
			}
		}
		return list;
	}

	public List<Integer> getSkillList() {
		return skillList;
	}

	public void setSkillList(List<Integer> skillList) {
		this.skillList = skillList;
	}

	public int[] getSkillColumn() {
		return skillColumn;
	}

	public void setSkillColumn(int[] skillColumn) {
		this.skillColumn = skillColumn;
	}

}
