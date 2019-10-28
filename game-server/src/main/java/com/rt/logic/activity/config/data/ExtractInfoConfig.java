package com.rt.logic.activity.config.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.common.GameModel;
import com.rt.utils.KV;

public class ExtractInfoConfig extends GameModel {

	public int extractId;
	public int interval;
	public String awardGoods;
	public String awardCurrency;
	public int  weight;
	public int extractTimes;
	public int minCount;
	public int maxCount;
	public int offCount;
	
	
	public String award_type = null;//null物品
//	/** 奖励道具 */
	public List<KV<Integer, Integer>> itemList = new ArrayList<>();
//	/** 奖励货币 */
	public Map<String, Integer> currencyMap = new HashMap<>();
	
	@Override
	public boolean setValue(String key, String value) {
//		if (key.equals("awardGoods") && value.length() > 2) {
//			String[] str = value.split("#");
//			for (int i = 0; i < str.length; i++) {
//				String[] item = str[i].split(":");
//				KV<Integer, Integer> kv = new KV<Integer, Integer>(0,0);
//				itemList.add(kv);
//			}
//			return true;
//		}
//		ifeaward_type == 1)
//		{
//			KV<Integer, Integer> kv = new KV<Integer, Integer>(0,0);
//			itemList.add(kv);
//			return true;
//		}
		if (key.equals("awardCurrency") && value.length() > 2) {
			String[] str = value.split("#");
			for (int i = 0; i < 1; i++) {
				String[] item = str[i].split(":");
				award_type = item[0];
				//currencyMap.put(item[0], Integer.parseInt(item[1]));
			}
			return true;
		}
		if(key.equals("awardGoods")) {
			KV<Integer, Integer> kv = new KV<Integer, Integer>(0,0);
			itemList.add(kv);
			return true;
		}
		return super.setValue(key,value);
	}
	
	public void randomAward()
	{
		int d;
		int c;
		if(award_type == null)
		{
			if(offCount == 0)
				itemList.get(0).setKV(minCount, 1);
			else
			{
				c = (maxCount-minCount)/offCount + 1;
				c = (int)Math.floor(Math.random()*c);
				d = minCount + offCount * c;
				itemList.get(0).setKV(d, 1);
			}
		}else
		{
			currencyMap.clear();
			c = (maxCount-minCount)/offCount + 1;
			c = (int)Math.floor(Math.random()*c);
			d = minCount + offCount * c;
			currencyMap.put(award_type, d);
		}
	}
}
