package com.rt.logic.player.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.UseGiftCodeRequest_10045;

/**
 * 使用激活码
 * @author MaHaiDong
 * 2018年7月24日
 *
 */
public class UseGiftCodeHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		UseGiftCodeRequest_10045 req = msg.getBody();
		String code = req.getGiftCode();
		player.useGiftCode(code);
	}

	@Override
	public Object initBodyClass() {
		return UseGiftCodeRequest_10045.class;
	}

}
