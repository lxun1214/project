package cn.springmvc.entry;

import java.util.HashMap;
import java.util.Map;


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
