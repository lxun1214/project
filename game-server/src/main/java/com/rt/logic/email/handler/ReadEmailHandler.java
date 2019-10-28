package com.rt.logic.email.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.ReadEmailRequest_10037;

/**
 * 读取邮件
 * @author MaHaiDong
 * 2018年7月1日
 *
 */
public class ReadEmailHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		ReadEmailRequest_10037 req = msg.getBody();
		long emailId = req.getEmailId();
		player.getPlayerEmail().readEmail(player, emailId);
	}

	@Override
	public Object initBodyClass() {
		return ReadEmailRequest_10037.class;
	}

}
