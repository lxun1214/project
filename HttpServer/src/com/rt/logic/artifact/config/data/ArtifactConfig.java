package com.rt.logic.artifact.config.data;

import com.rt.common.GameModel;

public class ArtifactConfig extends GameModel {

	public int itemId;
	/** 下一阶id */
	public int nextId;
	/** 神器品阶 */
	public int artifactQuality;
	/**组id*/
	public int groupId;
	/** 获取途径（1.关卡，2.重生,3.VIP） */
	public int access;
	/** 获取条件（关卡-关卡数，重生-重生数，VIP-VIP等级 */
	public int btainConditions;
	/** 初始战力 */
	public int initialScore;
	/** 消耗神器石 */
	public int strengthenArtifactStone;

}
