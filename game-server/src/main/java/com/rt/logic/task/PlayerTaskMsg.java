package com.rt.logic.task;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.pb.PbPlayer.PbTaskChangeInfo;
import com.rt.pb.PbPlayer.PlayerTaskChangeResponse_30003;
import com.rt.pb.PbPlayer.ReceiveTaskRewardResponse_20027;

public class PlayerTaskMsg {

	/**
	 * 任务变化返回
	 * @param playerId
	 * @param taskId
	 * @param completeNum
	 */
	public static void sendPlayerTaskChangeMsg(long playerId,Map<Integer,Integer> changeTaskMap){
		PlayerTaskChangeResponse_30003.Builder builder = PlayerTaskChangeResponse_30003.newBuilder();
		List<PbTaskChangeInfo> list = new ArrayList<>();
		for(Integer taskId:changeTaskMap.keySet()){
			PbTaskChangeInfo.Builder tBuilder = PbTaskChangeInfo.newBuilder();
			tBuilder.setTaskId(taskId);
			tBuilder.setCompleteNum(changeTaskMap.get(taskId));
			list.add(tBuilder.build());
		}
		builder.addAllChangeTaskInfos(list);
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.PLAYER_TASK_CHANGE);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
	/**
	 * 领取任务奖励返回
	 * @param playerId
	 * @param code
	 * @param taskId
	 */
	public static void sendReceiveTaskRewardMsg(long playerId,int code, int taskId){
		ReceiveTaskRewardResponse_20027.Builder builder = ReceiveTaskRewardResponse_20027.newBuilder();
		builder.setCode(code);
		if(code ==0 ){
			builder.setTaskId(taskId);
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.RECEIVE_TASK_REWARD);
		msg.setBody(builder);
		ResponseMsg.sendMsg(playerId, msg);
	}
	
}
