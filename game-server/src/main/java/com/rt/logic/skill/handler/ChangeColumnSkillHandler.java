package com.rt.logic.skill.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ChangeColumnSkillRequest_10007;

/**
 * 替换技能栏里的技能
 * 
 * @author Administrator
 *
 */
public class ChangeColumnSkillHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		ChangeColumnSkillRequest_10007 req = msg.getBody();
		int skillTab = req.getSkillTab();
		int loc = req.getLoc();
		player.getSkill().changeColumnSkill(player, skillTab, loc);
	}

	@Override
	public Object initBodyClass() {
		return ChangeColumnSkillRequest_10007.class;
	}

}
