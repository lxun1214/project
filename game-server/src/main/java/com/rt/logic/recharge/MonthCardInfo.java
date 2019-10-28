package com.rt.logic.recharge;

import java.util.Date;

import com.rt.cache.ConfigCache;
import com.rt.common.ErrorCode;
import com.rt.common.ResponseMsg;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.CurrencyConst;
import com.rt.logic.player.IPlayer;
import com.rt.logic.recharge.config.data.MonthMemberConfig;
import com.rt.pb.PbPlayer.PbMonthCardInfo;
import com.rt.utils.TimeUtils;

/**
 * 月卡信息
 * 
 * @author MaHaiDong 2018年7月23日
 *
 */
public class MonthCardInfo {

	/** 月卡到期时间 */
	private long cardEndTime;

	/** 奖励领取天数，一年当中第几天 */
	private int receiveDay;

	public void receiveMonthReward(IPlayer player) {
		int days = TimeUtils.differentDaysByMillisecond(System.currentTimeMillis(), cardEndTime);
		if (days <= 0) {
			//说明到期了
			ResponseMsg.sendErrorMsg(player.getPlayerId(), ErrorCode.MONTH_CARD_NOT_INFO);
			return;
		}
		if (TimeUtils.getToday() == this.receiveDay) {
			ResponseMsg.sendErrorMsg(player.getPlayerId(), ErrorCode.MONTH_CARD_NOT_REWARD);
			return;
		}
		this.receiveDay = TimeUtils.getToday();
		MonthMemberConfig config = ConfigCache.monthCardConfigMap.get(RechargeConst.MONTH_DAY_REWARD_TYPE);
		// 添加奖励
		if (config.itemList.size() > 0) {
			BagMsg.sendItemChangeMsg(player.getPlayerId(),
					player.getBag().addItem(config.itemList, ItemConst.ITEM_GET_ACTIVITY));
		}
		// 货币
		if (config.currencyMap.size() > 0) {
			for (String currencyType : config.currencyMap.keySet()) {
				int num = config.currencyMap.get(currencyType);
				if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
					player.addDelGold(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
					player.addDelDiamond(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
					player.addDelSportsMoney(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
					player.addDelUpgradeSkillsJade(num, CoinConst.GET_ACTIVITY);
				}else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
					player.addDelStrengthenArtifactStone(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
					player.addDelReinforcedEquipmentStone(num,CoinConst.GET_ACTIVITY);
				}
			}

		}
		RechargeMsg.sendReceiveMonthRewardMsg(player.getPlayerId(), 0);
	}
	
	/**
	 * 初始化月卡
	 * 
	 * @param player
	 */
	public void monthCardInit(IPlayer player) {
		int days = TimeUtils.differentDaysByMillisecond(System.currentTimeMillis(), cardEndTime);
		if (days > 0) {
			// 没到期不能买
			return;
		}
		this.cardEndTime = TimeUtils.getPostponeMonth(new Date(), 30);

		MonthMemberConfig config = ConfigCache.monthCardConfigMap.get(RechargeConst.MONTH_FIRST_REWARD_TYPE);
		// 添加奖励
		if (config.itemList.size() > 0) {
			BagMsg.sendItemChangeMsg(player.getPlayerId(),
					player.getBag().addItem(config.itemList, ItemConst.ITEM_GET_ACTIVITY));
		}
		// 货币
		if (config.currencyMap.size() > 0) {
			for (String currencyType : config.currencyMap.keySet()) {
				int num = config.currencyMap.get(currencyType);
				if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
					player.addDelGold(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
					player.addDelDiamond(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
					player.addDelSportsMoney(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
					player.addDelUpgradeSkillsJade(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
					player.addDelStrengthenArtifactStone(num,CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
					player.addDelReinforcedEquipmentStone(num,CoinConst.GET_ACTIVITY);
				}
			}

		}
		// 给客户端推送月卡变化
		RechargeMsg.sendMonthChangeMsg(player.getPlayerId(), this.createPbMonthCardInfo());
	}

	public PbMonthCardInfo.Builder createPbMonthCardInfo() {
		int days = TimeUtils.differentDaysByMillisecond(System.currentTimeMillis(), cardEndTime);
		if (days <= 0) {
			// 过期
			return null;
		}
		PbMonthCardInfo.Builder builder = PbMonthCardInfo.newBuilder();
		builder.setCardEndDay(days);
		if (TimeUtils.getToday() == this.receiveDay) {
			builder.setIsReceive(true);
		} else {
			builder.setIsReceive(false);
		}
		return builder;
	}

	public long getCardEndTime() {
		return cardEndTime;
	}

	public void setCardEndTime(long cardEndTime) {
		this.cardEndTime = cardEndTime;
	}

	public int getReceiveDay() {
		return receiveDay;
	}

	public void setReceiveDay(int receiveDay) {
		this.receiveDay = receiveDay;
	}

}
