package com.rt.gm.execute;

import com.rt.gm.AbsGm;
import com.rt.logic.player.IPlayer;

public class AddVipLevel extends AbsGm{

	@Override
	public void executor(IPlayer player, String parameter) {
		int num = Integer.parseInt(parameter);
		player.addVipExp(num);
		
	}
}
