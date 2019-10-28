package com.rt.logic.recharge.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ReceiveMonthCardRequest_10044;

/**
 * 领取月卡奖励
 * @author MaHaiDong
 * 2018年7月23日
 *
 */
public class ReceiveMonthCardHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;   
		}
		if(player.getMonthCardInfo() == null){
			return;
		}
		player.getMonthCardInfo().receiveMonthReward(player);
	}

	@Override
	public Object initBodyClass() {
		return ReceiveMonthCardRequest_10044.class;
	}

}
