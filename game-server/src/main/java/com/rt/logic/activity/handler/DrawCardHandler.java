package com.rt.logic.activity.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.DrawCardRequest_10042;


/**
 * 抽卡
 * @author MaHaiDong
 * 2018年7月5日
 *
 */
public class DrawCardHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		DrawCardRequest_10042 req = msg.getBody();
		int drawType = req.getDrawType();
		player.getDrawCardInfo().drawCard(player, drawType);
	}

	@Override
	public Object initBodyClass() {
		return DrawCardRequest_10042.class;
	}

}
