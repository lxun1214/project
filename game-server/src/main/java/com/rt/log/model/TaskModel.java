package com.rt.log.model;

import com.dataeye.sdk.client.domain.TaskType;

public class TaskModel extends BaseLogModel {

	private String taskId;
	
	private TaskType taskType;
	
	private int duration;
	
	private String failReasion;
	
	
	public TaskModel(String taskId,TaskType taskType,int duration,String failReasion){
		this.taskId=taskId;
		this.taskType=taskType;
		this.duration=duration;
		this.failReasion=failReasion;
	}

	public String getFailReasion() {
		return failReasion;
	}

	public void setFailReasion(String failReasion) {
		this.failReasion = failReasion;
	}
	
	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public TaskType getTaskType() {
		return taskType;
	}

	public void setTaskType(TaskType taskType) {
		this.taskType = taskType;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}
	
}
