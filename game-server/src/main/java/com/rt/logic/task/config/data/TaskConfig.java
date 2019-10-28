package com.rt.logic.task.config.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.common.GameModel;
import com.rt.utils.KV;

public class TaskConfig extends GameModel{
	
	/**任务编号*/
	public int taskId;
	/**任务类型(1=主线 2=日常 3=成就 )*/
	public int taskType;
	/**前置任务id*/
	public int lastTaskId;
	/**后置任务id*/
	public int preTaskId;
	/**任务接取条件重生次数*/
	public int roleTriggerLvl;
	/**任务完成事件类型*/
	public int taskWin;
	/**完成系数*/
	public int taskTime;
	/**奖励物品（itemId:数量）*/
	public int awardGoods;
	/**奖励货币（货币类型:货币数量）*/
	public int awardCurrency;
	
	/**奖励物品*/
	public List<KV<Integer, Integer>> awardGoodsList = new ArrayList<>();
	
	/**奖励货币key:货币类型  value:数量*/
	public Map<String,Integer> awardCurrencyMap = new HashMap<>();

	@Override
	public boolean setValue(String key, String value) {
		if (key.equals("awardGoods")) {
			if(value == null || value.equals("")){
				return true;
			}
			String[] str = value.split("#");
			for (int i = 0; i < str.length; i++) {
				String itemStr= str[i];
				KV<Integer, Integer> kv = new KV<Integer, Integer>(Integer.parseInt(itemStr.split(":")[0]), Integer.parseInt(itemStr.split(":")[1]));
				awardGoodsList.add(kv);
			}
			return true;
		}
		if(key.equals("awardCurrency")) {
			if(value == null || value.equals("")){
				return true;
			}
			String[] str = value.split("#");
			for (int i = 0; i < str.length; i++) {
				String currencyStr= str[i];
				awardCurrencyMap.put(currencyStr.split(":")[0], Integer.parseInt(currencyStr.split(":")[1]));
			}
			return true;
		}
		return super.setValue(key, value);
	}
	
	public static void main(String[] args) {
		String string="";
		String[] str = string.split("#");
		System.err.println(str.length);
	}
}
