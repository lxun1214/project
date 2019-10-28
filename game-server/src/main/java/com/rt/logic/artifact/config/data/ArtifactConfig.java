package com.rt.logic.artifact.config.data;

import com.rt.common.GameModel;

public class ArtifactConfig extends GameModel {

	public int itemId;
	/** 下一阶id */
	public int nextId;
	/** 神器品阶 */
	public int artifactQuality;
	/**神器类型*/
	public int artifactType;
	/** 获取途径（1.关卡，2.重生,3.VIP） */
	public int access;
	/** 获取条件（关卡-关卡数，重生-重生数，VIP-VIP等级 */
	public int btainConditions;
	/** 初始战力 */
	public int initialScore;
	/** 消耗神器石 */
	public int strengthenArtifactStone;
	
	/**重生材料收益*/
	public int rebirthMaterialIncome;
	/**获取金币量增加(百分比)*/
	public int goldIncreased;
	/**人物获得经验值增加*/
	public int experienceGained;
	/**离线挂机获取量*/
	public int offHook;
	/**装备强化消耗减少*/
	public int reduceConsumption;

}
