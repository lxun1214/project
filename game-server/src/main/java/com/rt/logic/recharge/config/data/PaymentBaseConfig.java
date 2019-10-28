package com.rt.logic.recharge.config.data;

import java.util.HashMap;
import java.util.Map;

import com.rt.common.GameModel;

public class PaymentBaseConfig extends GameModel{
	
	public int id;
	public int price;
	public String awardGoods;
	public String awardCurrency;
	
	/** 奖励货币 */
	public Map<String, Integer> currencyMap = new HashMap<>();
	
	/** 首次充值奖励货币 */
	public Map<String, Integer> firstCurrencyMap = new HashMap<>();
	
	@Override
	public boolean setValue(String key, String value) {
		if (key.equals("gold") && value.length() > 2) {
			String[] str = value.split("#");
			currencyMap.put(str[0], Integer.parseInt(str[1]));
			return true;
		}
		if (key.equals("payAward") && value.length() > 2) {
			String[] str = value.split("#");
			firstCurrencyMap.put(str[0], Integer.parseInt(str[1]));
			return true;
		}
		return super.setValue(key, value);
	}
}
