package com.rt.logic.arena;

import com.rt.logic.player.Player;
import com.rt.pb.PbPlayer.PbFightTargetDetailInfo;

public class Fight {

	/** 挑战者id */
	private long playerId;

	/** 挑战者当前排名 */
	private int rankings;

	/** 被挑战者所有信息 */
	private PbFightTargetDetailInfo.Builder fightTargetDetailInfo = PbFightTargetDetailInfo.newBuilder();

	/**
	 * 初始化
	 * 
	 * @param playerId
	 * @param rankings
	 * @param otherPlayerInfo
	 * @param otherRankings
	 */
	public void initOtherPlayerInfo(long playerId, int rankings, Player otherPlayerInfo, int otherRankings) {
		this.playerId = playerId;
		this.rankings = rankings;
		this.fightTargetDetailInfo.setOtherPlayerId(otherPlayerInfo.getPlayerId());
		this.fightTargetDetailInfo.setOtherPlayerName(otherPlayerInfo.getPlayerName());
		this.fightTargetDetailInfo.setLevel(otherPlayerInfo.getLevel());
		this.fightTargetDetailInfo.setOtherJobId(otherPlayerInfo.getJobId());
		this.fightTargetDetailInfo.setOtherHeadId(otherPlayerInfo.getHeadId());
		this.fightTargetDetailInfo.setOtherFightPower(otherPlayerInfo.getFightPower());
		this.fightTargetDetailInfo.setOtherRankings(otherRankings);
		this.fightTargetDetailInfo.addAllSkillTabs(otherPlayerInfo.getSkill().getSkillList());
		this.fightTargetDetailInfo.addAllSkillColumn(otherPlayerInfo.getSkill().showSkillColumnInfo());
		this.fightTargetDetailInfo.addAllColumns(otherPlayerInfo.getEquipmentColumn().showEquipColumn());
		this.fightTargetDetailInfo.addAllArtifactInfos(otherPlayerInfo.getArtifact().getItemIdList());
	}

	public int getRankings() {
		return rankings;
	}

	public void setRankings(int rankings) {
		this.rankings = rankings;
	}

	public PbFightTargetDetailInfo.Builder getFightTargetDetailInfo() {
		return fightTargetDetailInfo;
	}

	public void setFightTargetDetailInfo(PbFightTargetDetailInfo.Builder fightTargetDetailInfo) {
		this.fightTargetDetailInfo = fightTargetDetailInfo;
	}

	public long getPlayerId() {
		return playerId;
	}

	public void setPlayerId(long playerId) {
		this.playerId = playerId;
	}
}
