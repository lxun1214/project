package com.rt.logic;

import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;

import com.rt.cache.ConfigCache;
import com.rt.cache.data.SdkInfo;
import com.rt.db.domain.RechagreOrder;
import com.rt.db.mapper.RechagreOrderMapper;
import com.rt.gloable.DbManager;
import com.rt.utils.RechargeHttpClient;
import com.rt.utils.SignUtils;

public class RechargeLogic {

	Logger log = Logger.getLogger(RechargeLogic.class);

	final String RETURN = "success";

	private static RechargeLogic instance;

	public static RechargeLogic getInstance() {
		if (instance == null) {
			instance = new RechargeLogic();
		}
		return instance;
	}

	
	public  void jlPayCallBack(Map<String, String> map, HttpServletResponse response) throws Exception {
		PrintWriter out = response.getWriter();
        if(!map.containsKey("sign")){
        	out.print("签名错误");
			return;
		}
		SdkInfo sdkInfo = ConfigCache.sdkMap.get(2);
		map.put("appKey", sdkInfo.getAppKey());
		// 这里处理验证签名
		String sign = SignUtils.jlCreateSign(map);
		if (!sign.equals(map.get("sign"))) {
			log.debug("签名不符，收到签名：" + map.get("sign") + ",自己签名：" + sign);
			out.print(RETURN);
			return;
		}
		
		String orderId = map.get("pay_id");
		// 判断订单是否已经处理
		if (getRechargeOrder(orderId) != null) {
			log.debug("重复回调订单，订单：" + orderId);
			out.print(RETURN);
			return;
		}
		
		// 发送游戏服处理，获取处理状态
        String playerId = map.get("username");
        String serverId = map.get("server_id");
        String payId = map.get("extra");
        if(!ConfigCache.serverMap.containsKey(serverId)){
        	log.debug("未找到服务器，ID" + serverId);
			out.print(RETURN);
			return;
		}
        Map<String, Object> gmMap = new HashMap<>();
        gmMap.put("payId", payId);
        gmMap.put("playerId", playerId);
        String result = RechargeHttpClient.submitPost(gmMap, ConfigCache.serverMap.get(serverId).getHttpUrl());
        int state = 0;
		if(!result.equals("success")){
			state = 1;
		}
		saveRechagreOrder(orderId, playerId, payId, map.get("money"), playerId, serverId, System.currentTimeMillis(), state);
		//给第三方返回
		out.print(RETURN);
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 手游迷充值回调
	 * 
	 * @param result
	 * @param response
	 * @throws Exception
	 */
	public  void symPayCallBack(Map<String, String> map, HttpServletResponse response) throws Exception {
		PrintWriter out = response.getWriter();
		SdkInfo sdkInfo = ConfigCache.sdkMap.get(1);
		map.put("appKey", sdkInfo.getAppKey());
		map.put("appId", sdkInfo.getAppId());
		// 这里处理验证签名
		String sign = SignUtils.symCreateSign(map);
		if (!sign.equals(map.get("sign"))) {
			log.debug("签名不符，收到签名：" + map.get("sign") + ",自己签名：" + sign);
			out.print(RETURN);
			return;
		}
		String orderId = map.get("orderid");
		// 判断订单是否已经处理
		if (getRechargeOrder(orderId) != null) {
			log.debug("重复回调订单，订单：" + orderId);
			out.print(RETURN);
			return;
		}
		
		// 发送游戏服处理，获取处理状态
        String playerId = map.get("roleid");
        String serverId = map.get("serverid");
        String payId = map.get("attach");
        if(!ConfigCache.serverMap.containsKey(serverId)){
        	log.debug("未找到服务器，ID" + serverId);
			out.print(RETURN);
			return;
		}
        Map<String, Object> gmMap = new HashMap<>();
        gmMap.put("payId", payId);
        gmMap.put("playerId", playerId);
        String result = RechargeHttpClient.submitPost(gmMap, ConfigCache.serverMap.get(serverId).getHttpUrl());
        int state = 0;
		if(!result.equals("success")){
			state = 1;
		}
		saveRechagreOrder(orderId, playerId, payId, map.get("money"), playerId, serverId, System.currentTimeMillis(), state);
		//给第三方返回
		out.print(RETURN);
	}

	public static void main(String[] args) {
		String jine = "0.01";
		double j = Double.parseDouble(jine);
		System.out.println(j);
		
	}
	/**
	 * 保存充值订单
	 * 
	 * @param map
	 *            第三方传来的参数
	 * @param state
	 *            游戏服务器返回的处理状态
	 */
	void saveRechagreOrder(String orderId,String userName,String productname,String amount,String roleid,String serverid,Long paytime, int state) {
		RechagreOrder order = new RechagreOrder();
		order.setOrderId(orderId);
		order.setUserName(userName);
		order.setProductName(productname);
		order.setAmount((int)(Double.parseDouble(amount) * 100));
		order.setRoleId(roleid);
		order.setServerId(serverid);
		order.setPaytime(paytime);
		order.setState(state);
		order.setCreateTime(new Date());
		SqlSession session = DbManager.getSession();
		try {
			RechagreOrderMapper mapper = session.getMapper(RechagreOrderMapper.class);
			mapper.insert(order);
			session.commit();
		} catch (Exception e) {
			e.printStackTrace();
			session.rollback();
		} finally {
			session.close();
		}

	}

	/**
	 * 获取充值订单
	 * 
	 * @param orderId
	 * @return
	 */
	RechagreOrder getRechargeOrder(String orderId) {
		SqlSession session = DbManager.getSession();
		try {
			RechagreOrderMapper mapper = session.getMapper(RechagreOrderMapper.class);
			RechagreOrder recharge = mapper.selectByPrimaryKey(orderId);
			return recharge;
		} catch (Exception e) {
			e.printStackTrace();
			session.rollback();
		} finally {
			session.close();
		}
		return null;

	}
}
