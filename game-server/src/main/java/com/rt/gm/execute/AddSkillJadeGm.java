package com.rt.gm.execute;

import com.rt.gm.AbsGm;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.IPlayer;

/**
 * 加技能玉
 */
public class AddSkillJadeGm extends AbsGm{

	@Override
	public void executor(IPlayer player, String parameter) {
		int num = Integer.parseInt(parameter);
		player.addDelUpgradeSkillsJade(num,CoinConst.GET_GM);
	}

}
