package com.rt.gm.execute;

import com.rt.gm.AbsGm;
import com.rt.logic.player.IPlayer;

public class Activation extends AbsGm{

	@Override
	public void executor(IPlayer player, String parameter) {
		int num = Integer.parseInt(parameter);
		player.getArtifact().gm(player, num);
		
	}
}
