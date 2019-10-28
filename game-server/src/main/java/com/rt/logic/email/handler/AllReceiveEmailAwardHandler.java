package com.rt.logic.email.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.AllReceiveEmailAwardRequest_10039;

/**
 * 一键领取邮件奖励
 * @author MaHaiDong
 * 2018年7月1日
 *
 */
public class AllReceiveEmailAwardHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		player.getPlayerEmail().allReceiveEmailAward(player);
	}

	@Override
	public Object initBodyClass() {
		return AllReceiveEmailAwardRequest_10039.class;
	}

}
