package com.rt.logic.activity.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.PurchaseFortuneCatRequest_10033;

/**
 * 买入招财猫
 * @author MaHaiDong
 * 2018年4月25日
 *
 */
public class PurchaseFortuneCatHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		PurchaseFortuneCatRequest_10033 req = msg.getBody();
		int activityId = req.getActivityId();
		int activityIndex = req.getActivityIndex();
		player.getActivityInfo().monitorActivityFortuenCat(player, activityId, activityIndex);
	}

	@Override
	public Object initBodyClass() {
		return PurchaseFortuneCatRequest_10033.class;
	}

}
