package com.rt.logic.email.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ReceiveEmailAwardRequest_10038;

/**
 * 领取邮件奖励
 * @author MaHaiDong
 * 2018年7月1日
 *
 */
public class ReceiveEmailAwardHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		ReceiveEmailAwardRequest_10038 req = msg.getBody();
		long emailId = req.getEmailId();
		player.getPlayerEmail().receiveEmailAward(player, emailId);
	}

	@Override
	public Object initBodyClass() {
		return ReceiveEmailAwardRequest_10038.class;
	}

}
