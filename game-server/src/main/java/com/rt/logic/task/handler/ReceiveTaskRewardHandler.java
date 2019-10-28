package com.rt.logic.task.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ReceiveTaskRewardRequest_10027;

/**
 * 领取任务奖励
 * @author MaHaiDong
 *
 */
public class ReceiveTaskRewardHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		ReceiveTaskRewardRequest_10027 req = msg.getBody();
		int taskId = req.getTaskId();
		player.getTask().receiveTaskReward(player, taskId);
	}

	@Override
	public Object initBodyClass() {
		return ReceiveTaskRewardRequest_10027.class;
	}

}
