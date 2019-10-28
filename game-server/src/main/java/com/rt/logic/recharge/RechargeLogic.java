package com.rt.logic.recharge;

import com.rt.cache.ConfigCache;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.CurrencyConst;
import com.rt.logic.player.IPlayer;
import com.rt.logic.recharge.config.data.PaymentBaseConfig;

public class RechargeLogic {

	private static RechargeLogic instance;

	public synchronized static RechargeLogic getInstance() {
		if (instance == null) {
			instance = new RechargeLogic();
		}
		return instance;
	}
	
	/**
	 * 付款回调
	 * @param player
	 */
	public void payCallback(IPlayer player,int payId){
		PaymentBaseConfig config = ConfigCache.paymentBaseConfigMap.get(payId);
		if(config == null){
			return;
		}
		if(payId == RechargeConst.MONTH_RECHARGE_ID){
			//月卡
			MonthCardInfo cardInfo = player.getMonthCardInfo();
			if(cardInfo == null){
				cardInfo = new MonthCardInfo();
				player.setMonthCardInfo(cardInfo);
			}
			player.getMonthCardInfo().monthCardInit(player);
		}else {
			//判断是否首充
			if(player.getVipExp() == 0 && player.getVipLevel() ==0){
				if(config.firstCurrencyMap.size()>0){
					for (String currencyType : config.firstCurrencyMap.keySet()) {
						int num = config.currencyMap.get(currencyType);
						if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
							player.addDelGold(num,CoinConst.GET_PAY);
						} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
							//钻石走充值钻石的方法
							player.addRechargeDiamond(num);
						} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
							player.addDelSportsMoney(num,CoinConst.GET_PAY);
						} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
							player.addDelUpgradeSkillsJade(num,CoinConst.GET_PAY);
						} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
							player.addDelStrengthenArtifactStone(num,CoinConst.GET_PAY);
						} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
							player.addDelReinforcedEquipmentStone(num,CoinConst.GET_PAY);
						}
					}
				}
			}
			
			// 奖励货币
			if (config.currencyMap.size() > 0) {
				for (String currencyType : config.currencyMap.keySet()) {
					int num = config.currencyMap.get(currencyType);
					if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
						player.addDelGold(num,CoinConst.GET_PAY);
					} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
						//钻石走充值钻石的方法
						player.addRechargeDiamond(num);
						//添加VIP经验
						player.addVipExp(num);
					} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
						player.addDelSportsMoney(num,CoinConst.GET_PAY);
					} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
						player.addDelUpgradeSkillsJade(num,CoinConst.GET_PAY);
					} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
						player.addDelStrengthenArtifactStone(num,CoinConst.GET_PAY);
					} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
						player.addDelReinforcedEquipmentStone(num,CoinConst.GET_PAY);
					}
				}
			}
		}
		
	}
	
	public static void main(String[] args) {
		System.out.println(System.currentTimeMillis());
	}
}
