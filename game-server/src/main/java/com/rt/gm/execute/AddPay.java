package com.rt.gm.execute;

import com.rt.gm.AbsGm;
import com.rt.logic.player.IPlayer;
import com.rt.logic.recharge.RechargeLogic;

public class AddPay extends AbsGm{

	@Override
	public void executor(IPlayer player, String parameter) {
		int payId = Integer.parseInt(parameter);
		RechargeLogic.getInstance().payCallback(player, payId);
	}
}
