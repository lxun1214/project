package com.rt.logic.skill;

import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.Response;
import com.rt.pb.PbPlayer.ChangeColumnSkillResponse_20007;
import com.rt.pb.PbPlayer.UpgradeSkillResponse_20006;

public class SkillMsg {

	/**
	 * 技能升级返回  失败
	 * @param isSuccess
	 */
	public static void sendUpgradeSkillMsg(boolean isSuccess,Response response) {
		UpgradeSkillResponse_20006.Builder builder = UpgradeSkillResponse_20006.newBuilder();
		builder.setIsSuccess(isSuccess);
		
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.UPGRADE_SKILL);
		msg.setBody(builder);
		
		ResponseMsg.sendMsg(msg, response);
	}

	/**
	 * 技能升级返回
	 * @param isSuccess
	 * @param afterSkillTab		升级后的技能
	 * @param upgradeSkillsJade	剩余技能玉
	 */
	public static void sendUpgradeSkillMsg(boolean isSuccess, int nextSkillTab, int upgradeSkillsJade,Response response) {
		UpgradeSkillResponse_20006.Builder builder = UpgradeSkillResponse_20006.newBuilder();
		builder.setIsSuccess(isSuccess);
		builder.setNextSkillTab(nextSkillTab);
		builder.setUpgradeSkillsJade(upgradeSkillsJade);
		
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.UPGRADE_SKILL);
		msg.setBody(builder);
		
		ResponseMsg.sendMsg(msg, response);
	}
	
	/**
	 * 替换技能栏技能返回
	 * @param isSuccess
	 * @param response
	 */
	public static void sendChangeColumSkillMsg(boolean isSuccess,Response response) {
		ChangeColumnSkillResponse_20007.Builder builder = ChangeColumnSkillResponse_20007.newBuilder();
		builder.setIsSuccess(isSuccess);
		
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.CHANGE_COLUMN_SKILL);
		msg.setBody(builder);
		
		ResponseMsg.sendMsg(msg, response);
	}
}
