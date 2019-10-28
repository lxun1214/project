package com.rt.logic.activity.config.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.common.GameModel;
import com.rt.utils.KV;

public class OperationActivityDetailConfig extends GameModel {

	public int activityId;
	/** 下标 */
	public int seatIndex;
	/** 奖品（物品:数量 0无奖励 1是功能活动） */
	public String awardGoods;
	/** 货币奖励（货币类型:数量） */
	public String awardCurrency;
	/** 参数1 */
	public int part1;
	/** 参数2 */
	public int part2;
	/** 参数3 */
	public int part3;
	/** 参数4 */
	public int part4;

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
