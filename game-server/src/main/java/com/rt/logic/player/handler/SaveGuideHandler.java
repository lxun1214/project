package com.rt.logic.player.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.SaveGuideRequest_10036;

/**
 * 保存新手引导
 * @author MaHaiDong
 * 2018年6月22日
 *
 */
public class SaveGuideHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		SaveGuideRequest_10036 req = msg.getBody();
		int guideStep = req.getGuideStep();
		player.setGuideStep(guideStep);
	}

	@Override
	public Object initBodyClass() {
		return SaveGuideRequest_10036.class;
	}

}
