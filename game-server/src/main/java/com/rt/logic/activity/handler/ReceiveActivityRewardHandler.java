package com.rt.logic.activity.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ReceiveActivityRewardRequest_10032;

/**
 * 领取活动奖励
 * @author MaHaiDong
 * 2018年4月25日
 *
 */
public class ReceiveActivityRewardHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		ReceiveActivityRewardRequest_10032 req = msg.getBody();
		int activityId = req.getActivityId();
		int activityIndex = req.getActivityIndex();
		player.getActivityInfo().receiveActivityReward(player, activityId, activityIndex);
	}

	@Override
	public Object initBodyClass() {
		return ReceiveActivityRewardRequest_10032.class;
	}

}
