package com.rt.logic.activity.config.data;

import com.rt.common.GameModel;

public class OperationActivityConfig extends GameModel {

	public int activityId;
	/** 活动类型（1.首充，2. 连续登陆.3.层数奖励，4.月卡，5.投资计划 6消费获礼，7限时抽卡，8招财猫，9双倍掉落） */
	public int activityType;
	/** 活动类型（0，单次；1，循环） */
	public int activityTime;
    /**开始时间(0:服务器开服时间,非0:)*/
	public String beginTime;
    /**结束时间*/
	public String overTime;
	/** 开服之后第几天开启(只针对beginTime为0的情况)*/
	public int beginTime1;
	/**开服之后第几天结束*/
	public int overTime1;
	/** 是否开启:0:不开启，1:开启  0则是达到开启时间才开放*/
	public int isOpen;

}
