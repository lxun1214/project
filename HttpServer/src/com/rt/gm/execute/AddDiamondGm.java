package com.rt.gm.execute;

import com.rt.gloable.Response;
import com.rt.gm.AbsGm;
import com.rt.logic.player.IPlayer;

public class AddDiamondGm extends AbsGm{

	@Override
	public void executor(IPlayer player, String parameter, Response response) {
		int num = Integer.parseInt(parameter);
		player.addDelDiamond(num);
	}

}
