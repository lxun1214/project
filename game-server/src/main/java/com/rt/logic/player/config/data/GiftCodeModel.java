package com.rt.logic.player.config.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.utils.KV;

/**
 * 礼包激活码
 * @author MaHaiDong
 * 2018年7月24日
 *
 */
public class GiftCodeModel {

	private String code;
	
	/**0未使用  1已使用*/
	private int state;
	
	private int groupId;
	
	private long startTime;
	
	private long endTime;
	
	/** 奖励道具 */
	public Map<Integer, Integer> itemMap = new HashMap<>();

	public List<KV<Integer, Integer>> getItemList(){
		List<KV<Integer, Integer>> itemList = new ArrayList<>();
		for(Integer itemId:itemMap.keySet()){
			KV<Integer, Integer> kv = new KV<Integer, Integer>(itemId,itemMap.get(itemId));
			itemList.add(kv);
		}
		return itemList;
	}
	
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public long getStartTime() {
		return startTime;
	}

	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}

	public long getEndTime() {
		return endTime;
	}

	public void setEndTime(long endTime) {
		this.endTime = endTime;
	}

	public Map<Integer, Integer> getItemMap() {
		return itemMap;
	}

	public void setItemMap(Map<Integer, Integer> itemMap) {
		this.itemMap = itemMap;
	}

	
}
