package com.rt.logic.shop.handler;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.BuyGoodsRequest_10013;

/**
 * 购买商品
 * 
 * @author MaHaiDong
 *
 */
public class BuyGoodsHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		BuyGoodsRequest_10013 req = msg.getBody();
		int seqId = req.getSeqId();
		int num = req.getNum();
		player.getStore().buyStoreGoods(player, seqId, num);
	}

	@Override
	public Object initBodyClass() {
		return BuyGoodsRequest_10013.class;
	}

}
