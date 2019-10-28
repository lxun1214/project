package com.rt.timer;

import java.util.TimerTask;

import com.rt.cache.GameCache;
import com.rt.logic.player.IPlayer;
import com.rt.logic.shop.StoreMsg;


/**
 * 商城定时器
 * @author MaHaiDong
 * 2018年5月30日
 *
 */
public class StoreTimeTask extends TimerTask {

	@Override
	public void run() {
		  System.out.println("开始推送刷新商城次数信息------------------------------------------------------");
        for(Long playerId:GameCache.playerWsMap.keySet()){
        	IPlayer player = GameCache.playerMap.get(playerId);
        	if(player!=null){
        		StoreMsg.refreshStorePurchaseInfoMsg(player);
        	}
        }
        System.out.println("刷新商城次数信息推送完毕*************************************");
      
	}

}
