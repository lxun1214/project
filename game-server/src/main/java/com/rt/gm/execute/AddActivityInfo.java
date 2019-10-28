package com.rt.gm.execute;

import com.rt.gm.AbsGm;
import com.rt.logic.player.IPlayer;

public class AddActivityInfo extends AbsGm{

	@Override
	public void executor(IPlayer player, String parameter) {
		int id = Integer.parseInt(parameter.split("#")[0]);
		int num = Integer.parseInt(parameter.split("#")[1]);
		// 监听活动，负数转正数
		player.getActivityInfo().monitorActivity(player.getPlayerId(),id, num);
	}
}
