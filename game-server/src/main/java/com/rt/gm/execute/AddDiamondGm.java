package com.rt.gm.execute;

import com.rt.gm.AbsGm;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.IPlayer;

public class AddDiamondGm extends AbsGm{

	@Override
	public void executor(IPlayer player, String parameter) {
		int num = Integer.parseInt(parameter);
		player.addDelDiamond(num,CoinConst.GET_GM);
	}

}
