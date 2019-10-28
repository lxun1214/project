package com.rt.gm.execute;

import com.rt.gloable.Response;
import com.rt.gm.AbsGm;
import com.rt.logic.player.IPlayer;

/**
 * 加技能玉
 */
public class AddSkillJadeGm extends AbsGm{

	@Override
	public void executor(IPlayer player, String parameter, Response response) {
		int num = Integer.parseInt(parameter);
		player.addDelUpgradeSkillsJade(num);
	}

}
