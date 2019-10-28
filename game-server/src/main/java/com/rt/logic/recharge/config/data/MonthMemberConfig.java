package com.rt.logic.recharge.config.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.common.GameModel;
import com.rt.utils.KV;

public class MonthMemberConfig extends GameModel{
	
	public int type;
	public String awardGoods;
	public String awardCurrency;
	
	/** 奖励道具 */
	public List<KV<Integer, Integer>> itemList = new ArrayList<>();
	/** 奖励货币 */
	public Map<String, Integer> currencyMap = new HashMap<>();
	
	@Override
	public boolean setValue(String key, String value) {
		if (key.equals("awardGoods") && value.length() > 2) {
			String[] str = value.split("#");
			for (int i = 0; i < str.length; i++) {
				String[] item = str[i].split(":");
				KV<Integer, Integer> kv = new KV<Integer, Integer>(Integer.parseInt(item[0]),
						Integer.parseInt(item[1]));
				itemList.add(kv);
			}
			return true;
		}
		if (key.equals("awardCurrency") && value.length() > 2) {
			String[] str = value.split("#");
			for (int i = 0; i < str.length; i++) {
				String[] item = str[i].split(":");
				currencyMap.put(item[0], Integer.parseInt(item[1]));
			}
			return true;
		}
		return super.setValue(key, value);
	}
}
