package com.rt.logic.bag.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.OpenBoxRequest_10035;

/**
 * 开启箱子
 * @author MaHaiDong
 * 2018年6月11日
 *
 */
public class OpenBoxHandler  implements IHandler{

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		OpenBoxRequest_10035 req = msg.getBody();
		long uuid = req.getUuid();
		player.getBag().openBox(player, uuid);
	}

	@Override
	public Object initBodyClass() {
		return OpenBoxRequest_10035.class;
	}

}
