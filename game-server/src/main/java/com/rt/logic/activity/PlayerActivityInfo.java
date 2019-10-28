package com.rt.logic.activity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.cache.ConfigCache;
import com.rt.common.ErrorCode;
import com.rt.common.ResponseMsg;
import com.rt.gloable.ServerInfo;
import com.rt.logic.activity.config.data.OperationActivityConfig;
import com.rt.logic.activity.config.data.OperationActivityDetailConfig;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.CurrencyConst;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.PbActivityInfo;
import com.rt.pb.PbPlayer.PbCompletedActivityInfo;
import com.rt.utils.TimeUtils;

/**
 * 用户活动信息
 * 
 * @author MaHaiDong 2018年4月25日
 *
 */
public class PlayerActivityInfo {

	/** 活动 */
	private Map<Integer, Map<Integer, ActivityInfo>> activityMap = new HashMap<>();

	/** 累计消费的钻石 */
	int consumptionDiamond;

	/** 最后登录第几天 */
	int lastLoginDay;
	
	/**是否已购买投资（投资计划活动）0未购买  1已购买*/
	int purchaseInvestment;
	
	
	/**
	 * 购买投资激活
	 * @param player
	 */
	public void investment(IPlayer player) {
		if(purchaseInvestment>0){
			ResponseMsg.sendErrorMsg(player.getPlayerId(), ErrorCode.PURCHASE_INVESTMENT_ERROR);
			return;
		}
		if(player.getDiamond() < ActivityConst.INVESTMENT_DIAMOND){
			return;
		}
		//扣除钻石
		player.addDelDiamond(-ActivityConst.INVESTMENT_DIAMOND,CoinConst.CONSUME_ACTIVITY);
		this.purchaseInvestment = 1;
		//返回成功消息
		ActivityMsg.sendPurchaseInvestment(player.getPlayerId(),0);
		
	}
	
	
	
	/**
	 * 领取活动奖励
	 * @param player
	 * @param activityId
	 * @param activityIndex
	 */
	public void receiveActivityReward(IPlayer player,int activityId,int activityIndex){
		if(!activityMap.containsKey(activityId)){
			ActivityMsg.sendReceiveActivityReward(player.getPlayerId(), false, activityId, activityIndex);
			return;
		}
		ActivityInfo info = activityMap.get(activityId).get(activityIndex);
		if(info==null){
			ActivityMsg.sendReceiveActivityReward(player.getPlayerId(), false, activityId, activityIndex);
			return;
		}
		if(info.isReward()){
			ActivityMsg.sendReceiveActivityReward(player.getPlayerId(), false, activityId, activityIndex);
			return;
		}
		//添加奖励
		OperationActivityDetailConfig oadcConfig = ConfigCache.operationActivityDetailConfigMap.get(activityId)
				.get(activityIndex);
		if(oadcConfig==null){
			return;
		}
		info.setReward(true);
		//TODO 暂时去掉了招财猫的活动  2018-07-04
//		if(activityId == ActivityConst.ACTIVITY_FORTUNE_CAT){
//			//招财猫奖励单独处理
//			player.addDelDiamond(info.getDiamond(),CoinConst.GET_ACTIVITY);
//			ActivityMsg.sendReceiveActivityReward(player.getPlayerId(), true, activityId, activityIndex);
//			return;
//		}
		//道具
		if(oadcConfig.itemList.size()>0){
			BagMsg.sendItemChangeMsg(player.getPlayerId(), player.getBag().addItem(oadcConfig.itemList,ItemConst.ITEM_GET_ACTIVITY));
		}
		//货币
		if(oadcConfig.currencyMap.size()>0){
			for(String currencyType:oadcConfig.currencyMap.keySet()){
				int num = oadcConfig.currencyMap.get(currencyType);
				if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
					player.addDelGold(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
					player.addDelDiamond(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
					player.addDelSportsMoney(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
					player.addDelUpgradeSkillsJade(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
					player.addDelStrengthenArtifactStone(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
					player.addDelReinforcedEquipmentStone(num,CoinConst.GET_ACTIVITY);
				}
			}
			
		}
		ActivityMsg.sendReceiveActivityReward(player.getPlayerId(), true, activityId, activityIndex);
		
	}

	/**
	 * 监听活动
	 * 
	 * @param activityId
	 *            aram param
	 */
	public void monitorActivity(long playerId,int activityId, int param) {
		OperationActivityConfig oaConfig = ConfigCache.operationActivityConfigMap.get(activityId);
		if (oaConfig == null) {
			return;
		}
		if (oaConfig.isOpen == 0) {
			// 活动没有开启，不处理
			return;
		}
		// 验证活动是否在有效期
		if (oaConfig.beginTime.equals("0")) {
			if (!TimeUtils.checkTimeSection(ServerInfo.openTime, oaConfig.beginTime1, oaConfig.overTime1)) {
				return;
			}
		} else {
			if (!TimeUtils.checkTimeCompare(oaConfig.beginTime, oaConfig.overTime)) {
				return;
			}
		}
		// 活动的参数/奖励配置
		Map<Integer, OperationActivityDetailConfig> oadcMap = ConfigCache.operationActivityDetailConfigMap
				.get(oaConfig.activityId);
		// 招财猫活动单独监听
		if (activityId == ActivityConst.ACTIVITY_FIRST_PAY) {
			if (activityMap.containsKey(activityId)) {
				return;
			}
			Map<Integer, ActivityInfo> map = new HashMap<>();
			map.put(1, createActivityInfo(playerId,activityId, 1));
			activityMap.put(activityId, map);
		} else if (activityId == ActivityConst.ACTIVITY_CONTINUITY_LOGIN) {
			// 连续登录
			if (TimeUtils.getToday() == this.lastLoginDay) {
				return;
			}
			this.lastLoginDay = TimeUtils.getToday();
			Map<Integer, ActivityInfo> map = getActivityMap(activityId);
			if (map.size() >= oadcMap.size()) {
				if (oaConfig.activityTime != 1) {
					// 如果不是循环活动
					return;
				}
				map.clear();
			}
			addActivityMap(playerId,activityId, map);
		} else if (activityId == ActivityConst.ACTIVITY_LAYER) {
			checkActivity(playerId,activityId, param);
		} else if (activityId == ActivityConst.ACTIVITY_INVESTMENT) {
			if(this.purchaseInvestment == 0){
				return;
			}
			checkActivity(playerId,activityId, param);
		} else if (activityId == ActivityConst.ACTIVITY_CONSUMPTION) {
			this.consumptionDiamond += param;
			checkActivity(playerId,activityId, this.consumptionDiamond);
		}
	}

	/**
	 * 招财猫买入
	 * @param activityId
	 * @param index
	 * @return
	 */
	public void monitorActivityFortuenCat(IPlayer player,int activityId, int index) {
		Map<Integer, ActivityInfo> map = getActivityMap(activityId);
		if (map.containsKey(index)) {
			// 如果已参与过这个活动，不能再次参加
			return;
		}
		OperationActivityDetailConfig oadcConfig = ConfigCache.operationActivityDetailConfigMap.get(activityId)
				.get(index);
		if(oadcConfig==null){
			return;
		}
		int diamond = Integer.parseInt(oadcConfig.awardCurrency.split(":")[1]);
		if(player.getDiamond()<diamond){
			return;
		}
		//扣除钻石
		player.addDelDiamond(-diamond,CoinConst.CONSUME_ACTIVITY);
		map.put(index, createActivityInfo(player.getPlayerId(),activityId, index));
		this.activityMap.put(activityId, map);
		//返回成功消息
		ActivityMsg.sendPurchaseFortuneCat(player.getPlayerId(), true);
	}

	/**
	 * 参数判断，追加多个方法
	 * 
	 * @param activityId
	 * @param param
	 */
	void checkActivity(long playerId,int activityId, int param) {
		Map<Integer, ActivityInfo> map = getActivityMap(activityId);
		for (Integer seatIndex : ConfigCache.operationActivityDetailConfigMap.get(activityId).keySet()) {
			if (map.containsKey(seatIndex)) {
				continue;
			}
			OperationActivityDetailConfig oadcConfig = ConfigCache.operationActivityDetailConfigMap.get(activityId)
					.get(seatIndex);
			if (param >= oadcConfig.part1) {
				map.put(seatIndex, createActivityInfo(playerId,activityId, seatIndex));
				this.activityMap.put(activityId, map);
			}
		}
	}

	/**
	 * 只追加一个方法
	 * 
	 * @param activityId
	 * @param map
	 */
	void addActivityMap(long playerId,int activityId, Map<Integer, ActivityInfo> map) {
		for (Integer seatIndex : ConfigCache.operationActivityDetailConfigMap.get(activityId).keySet()) {
			if (map.containsKey(seatIndex)) {
				continue;
			}
			map.put(seatIndex, createActivityInfo(playerId,activityId, seatIndex));
			this.activityMap.put(activityId, map);
			break;
		}

	}

	ActivityInfo createActivityInfo(long playerId,int activityId, int seatIndex) {
		ActivityInfo aInfo = new ActivityInfo();
		aInfo.setActivityId(activityId);
		aInfo.setSeatIndex(seatIndex);
		////TODO 暂时去掉了招财猫的活动  2018-07-04
//		if (activityId == ActivityConst.ACTIVITY_FORTUNE_CAT) {
//			// 如果是招财猫活动，根据seatIndex随出要奖励的钻石
//			OperationActivityDetailConfig oadcConfig = ConfigCache.operationActivityDetailConfigMap.get(activityId)
//					.get(seatIndex);
//			aInfo.setDiamond(NumberUtils.getRandomNum(oadcConfig.part2, oadcConfig.part1));
//		}
		//这里给客户端推送一条活动完成的消息
		if(activityId != ActivityConst.ACTIVITY_CONTINUITY_LOGIN){
			ActivityMsg.sendActivityInfoChangeMsg(playerId, activityId, seatIndex, aInfo.getDiamond());
		}
		return aInfo;
	}

	Map<Integer, ActivityInfo> getActivityMap(int activityId) {
		Map<Integer, ActivityInfo> map = this.activityMap.get(activityId);
		if (map == null) {
			map = new HashMap<>();
		}
		return map;
	}
	
	public List<PbActivityInfo> showActivityInfo(){
		List<PbActivityInfo> list = new ArrayList<>();
		for(Integer activityId:activityMap.keySet()){
			PbActivityInfo.Builder builder = PbActivityInfo.newBuilder();
			builder.setActivityId(activityId);
			List<PbCompletedActivityInfo> caList = new ArrayList<>();
			for(Integer index:activityMap.get(activityId).keySet()){
				ActivityInfo info = activityMap.get(activityId).get(index);
				PbCompletedActivityInfo.Builder caBuilder = PbCompletedActivityInfo.newBuilder();
				caBuilder.setActivityIndex(index);
				caBuilder.setIsReward(info.isReward());
				if(info.isReward()&&info.getDiamond()>0){
					caBuilder.setDiamond(info.getDiamond());
				}
				caList.add(caBuilder.build());
			}
			builder.addAllCompletedActivityInfos(caList);
			list.add(builder.build());
		}
		return list;
	}

	public Map<Integer, Map<Integer, ActivityInfo>> getActivityMap() {
		return activityMap;
	}

	public void setActivityMap(Map<Integer, Map<Integer, ActivityInfo>> activityMap) {
		this.activityMap = activityMap;
	}

	public int getConsumptionDiamond() {
		return consumptionDiamond;
	}

	public void setConsumptionDiamond(int consumptionDiamond) {
		this.consumptionDiamond = consumptionDiamond;
	}

	public int getLastLoginDay() {
		return lastLoginDay;
	}

	public void setLastLoginDay(int lastLoginDay) {
		this.lastLoginDay = lastLoginDay;
	}
	
	public int getPurchaseInvestment() {
		return purchaseInvestment;
	}
	public void setPurchaseInvestment(int purchaseInvestment) {
		this.purchaseInvestment = purchaseInvestment;
	}


}
