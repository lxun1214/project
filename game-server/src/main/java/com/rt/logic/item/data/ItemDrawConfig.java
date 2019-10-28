package com.rt.logic.item.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.common.GameModel;
import com.rt.utils.KV;
import com.rt.utils.NumberUtils;

public class ItemDrawConfig  extends GameModel{

	public int itemId;
	
	public int access;
	
	public String awardGoods;
	
	public String awardCurrency;
	
	public  List<KV<Integer, Integer>> itemList = new ArrayList<>();
	
	public  List<Map<String,String>> currencyList = new ArrayList<>();
	
	public List<Map<String,String>> getAwardCurrency(){
		if(this.access == 0){
			return currencyList;
		}
		List<Map<String,String>> list = new ArrayList<>();
		if(currencyList.size()<1){
			return list;
		}
		list.add(currencyList.get(NumberUtils.getRandomNum(currencyList.size()-1, 0)));
		return list;
	}
	
	public List<KV<Integer, Integer>> getAwardItem(){
		if(this.access == 0){
			return itemList;
		}
		List<KV<Integer, Integer>> list = new ArrayList<>();
		if(itemList.size()<1){
			return list;
		}
		list.add(itemList.get(NumberUtils.getRandomNum(itemList.size()-1, 0)));
		return list;
	}
	
	@Override
	public boolean setValue(String key, String value) {
		if(key.equals("awardGoods")) {
			if(this.itemId == 10011){
				System.out.println("");
			}
			if(value ==null || value.equals("")){
                return true;				
			}
			String[] str = value.split("#");
			for(int i=0;i<str.length;i++){
				String string = str[i];
				itemList.add(new KV<Integer, Integer>(Integer.parseInt(string.split(":")[0]), Integer.parseInt(string.split(":")[1])));
			}
			return true;
		}
		if(key.equals("awardCurrency")) {
			if(value ==null || value.equals("")){
                return true;				
			}
			String[] str = value.split("#");
			for(int i=0;i<str.length;i++){
				String string = str[i];
				Map<String,String> map = new HashMap<>();
				map.put("currency", string.split(":")[0]);
				map.put("value", string.split(":")[1]);
				currencyList.add(map);
			}
			return true;
		}
		return super.setValue(key, value);
	}
}
