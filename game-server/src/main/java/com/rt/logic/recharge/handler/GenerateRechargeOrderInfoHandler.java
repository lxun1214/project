package com.rt.logic.recharge.handler;

import java.util.HashMap;
import java.util.Map;

import com.rt.cache.ConfigCache;
import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.gloable.ServerInfo;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.logic.recharge.RechargeMsg;
import com.rt.logic.recharge.config.data.PaymentBaseConfig;
import com.rt.pb.PbPlayer.GenerateRechargeOrderInfoRequest_10034;
import com.rt.utils.FastJsonUtils;
import com.rt.utils.HttpUtils;
import com.rt.utils.OrderUtil;

/**
 * 充值向服务器发送一条创建订单消息
 * @author MaHaiDong
 * 2018年4月25日
 *
 */
public class GenerateRechargeOrderInfoHandler implements IHandler {

	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;   
		}
		GenerateRechargeOrderInfoRequest_10034 req = msg.getBody();
		int mallId = req.getMallId();
		PaymentBaseConfig config = ConfigCache.paymentBaseConfigMap.get(mallId);
		if(config == null){
			RechargeMsg.sendGenerateRechargeOrderInfoMsg(player.getPlayerId(),false,null,null,mallId,null,0,null);
			return;
		}
		String accessToken = req.getAccessToken();
		//发送充值服务器获取预支付订单
		Map<String, String> map = new HashMap<>();
		map.put("mallId",String.valueOf(mallId));
		map.put("price",String.valueOf(config.price * 100));
		map.put("playerId", String.valueOf(msg.getPlayerId()));
		map.put("serverId", String.valueOf(ServerInfo.serverId));
		map.put("accessToken",accessToken);
		if(mallId<100){
			map.put("productName","充值钻石");
		}else{
			map.put("productName","购买月卡");
		}
		String result = HttpUtils.sendPost(FastJsonUtils.toJSONString(map).getBytes(), ServerInfo.rechargeServerCreateOrder);
		System.out.println("收到充值创建订单返回消息：" + result);
		@SuppressWarnings("unchecked")
		Map<String, String> resMap = FastJsonUtils.parseObject(result, Map.class);
		String code = resMap.get("code");
		if(code.equals("0")){
			RechargeMsg.sendGenerateRechargeOrderInfoMsg(player.getPlayerId(), true, resMap.get("appId"),
					resMap.get("orderNum"), mallId, map.get("productName"), config.price * 100, resMap.get("sign"));
		}else{
			RechargeMsg.sendGenerateRechargeOrderInfoMsg(player.getPlayerId(),false,null,null,mallId,null,0,null);
		}
	}

	@Override
	public Object initBodyClass() {
		return GenerateRechargeOrderInfoRequest_10034.class;
	}

}
