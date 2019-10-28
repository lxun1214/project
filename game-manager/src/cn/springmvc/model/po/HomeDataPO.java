package cn.springmvc.model.po;

import java.util.Map;

public class HomeDataPO {
	
	private int dayOrderCount;
	
	private int orderNum;
	
	public int getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(int orderNum) {
		this.orderNum = orderNum;
	}
	
	private Map<String,Integer> map;
	
	
	public Map<String, Integer> getMap() {
		return map;
	}

	public void setMap(Map<String, Integer> map) {
		this.map = map;
	}

	public int getDayOrderCount() {
		return dayOrderCount;
	}

	public void setDayOrderCount(int dayOrderCount) {
		this.dayOrderCount = dayOrderCount;
	}

	
}
