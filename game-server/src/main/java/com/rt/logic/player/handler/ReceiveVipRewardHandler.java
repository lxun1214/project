package com.rt.logic.player.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ReceiveVipRewardRequest_10043;


/**
 * 领取VIP奖励
 * @author MaHaiDong
 * 2018年7月9日
 *
 */
public class ReceiveVipRewardHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		ReceiveVipRewardRequest_10043 req = msg.getBody();
		int viplvl = req.getVipLvl();
		player.receiveVipReward(viplvl);
	}

	@Override
	public Object initBodyClass() {
		return ReceiveVipRewardRequest_10043.class;
	}

}
