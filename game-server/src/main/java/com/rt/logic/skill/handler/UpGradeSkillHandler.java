package com.rt.logic.skill.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.UpgradeSkillRequest_10006;

/**
 * 技能升级
 */
public class UpGradeSkillHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		UpgradeSkillRequest_10006 req = msg.getBody();
		int skillTab = req.getSkillTab();
		player.getSkill().upgradeSkill(player, skillTab);
	}

	@Override
	public Object initBodyClass() {
		return UpgradeSkillRequest_10006.class;
	}

}
