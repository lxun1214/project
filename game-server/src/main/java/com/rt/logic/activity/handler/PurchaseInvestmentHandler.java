package com.rt.logic.activity.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.PurchaseInvestmentRequest_10046;

/**
 * 购买投资计划
 * @author MaHaiDong
 * 2018年8月9日
 *
 */
public class PurchaseInvestmentHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getActivityInfo().investment(player);
	}

	@Override
	public Object initBodyClass() {
		return PurchaseInvestmentRequest_10046.class;
	}

}
