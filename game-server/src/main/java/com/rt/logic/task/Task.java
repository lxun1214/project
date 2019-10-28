package com.rt.logic.task;

public class Task {

	/**任务ID*/
	private int taskId;
	/**已完成系数*/
	private int completeNum;
	/**是否达成*/
	private boolean isComplete = false;
	/**是否已领取*/
	private boolean isReceive = false;
	
	
	public void addCompleteNum(int num){
		this.completeNum+=num;
	}
	
	public boolean isComplete() {
		return isComplete;
	}
	public void setComplete(boolean isComplete) {
		this.isComplete = isComplete;
	}
	public boolean isReceive() {
		return isReceive;
	}
	public void setReceive(boolean isReceive) {
		this.isReceive = isReceive;
	}
	public int getTaskId() {
		return taskId;
	}
	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}
	public int getCompleteNum() {
		return completeNum;
	}
	public void setCompleteNum(int completeNum) {
		this.completeNum = completeNum;
	}
}
