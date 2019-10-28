package com.rt.logic.activity;

/**
 * 玩家已完成活动信息
 * @author MaHaiDong
 * 2018年4月24日
 *
 */
public class ActivityInfo {

	
	private int activityId;
	
	private int seatIndex;
	
	private boolean isReward = false;
	
	/**获得钻石，只有招财猫才有*/
	private int diamond;
	

	public int getDiamond() {
		return diamond;
	}

	public void setDiamond(int diamond) {
		this.diamond = diamond;
	}

	public int getActivityId() {
		return activityId;
	}

	public void setActivityId(int activityId) {
		this.activityId = activityId;
	}

	public int getSeatIndex() {
		return seatIndex;
	}

	public void setSeatIndex(int seatIndex) {
		this.seatIndex = seatIndex;
	}

	public boolean isReward() {
		return isReward;
	}

	public void setReward(boolean isReward) {
		this.isReward = isReward;
	}

}
