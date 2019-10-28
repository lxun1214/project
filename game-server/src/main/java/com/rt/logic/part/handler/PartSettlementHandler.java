package com.rt.logic.part.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.PartSettlementRequest_10029;

/**
 * 副本结算
 * @author Administrator
 *
 */
public class PartSettlementHandler  implements IHandler{

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		PartSettlementRequest_10029 req = msg.getBody();
		int partId = req.getPartId();
	    boolean isVictory = req.getIsVictory();
		player.getPart().partSettlement(player, partId,isVictory);
	}

	@Override
	public Object initBodyClass() {
		return PartSettlementRequest_10029.class;
	}

}
