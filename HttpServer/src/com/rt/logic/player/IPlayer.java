package com.rt.logic.player;

import com.rt.db.domain.PlayerBeanWithBLOBs;
import com.rt.gloable.Response;
import com.rt.logic.arena.Arena;
import com.rt.logic.artifact.Artifact;
import com.rt.logic.bag.Bag;
import com.rt.logic.bag.EquipmentColumn;
import com.rt.logic.shop.Store;
import com.rt.logic.skill.Skill;
import com.rt.pb.PbPlayer.PbPlayerInfo;

public interface IPlayer {

	public long getPlayerId();

	public void setPlayerId(long playerId);

	public long getUserId();

	public void setUserId(long userId);

	public String getAccountName();

	public void setAccountName(String accountName);

	public String getPlayerName();

	public int getJobId();

	public void setJobId(int jobId);

	public void setPlayerName(String playerName);

	public String getUuid();

	public void setUuid(String uuid);

	public PbPlayerInfo.Builder showPlayerInfo();

	public int getGold();

	public void setGold(int gold);

	public void addDelGold(int num);

	public void addDelDiamond(int num);

	public int getDiamond();

	public void setDiamond(int diamond);

	public long getLastSaveDbTime();

	public void setLastSaveDbTime(long lastSaveDbTime);

	public boolean isSaveDb(long curmill);

	public void initPlayer(PlayerBeanWithBLOBs playerBean);

	public PlayerBeanWithBLOBs initPlayerBean();

	public int getHeadId();

	public void setHeadId(int headId);

	public int getExp();

	public void setExp(int exp);

	public int getLevel();

	public void setLevel(int level);

	public int getVipLevel();

	public void setVipLevel(int vipLevel);

	public int getServerId();

	public void setServerId(int serverId);

	public Bag getBag();

	public void setBag(Bag bag);

	public int getPointsId();

	public void setPointsId(int pointsId);

	public int getStrengthenArtifactStone();

	public void setStrengthenArtifactStone(int strengthenArtifactStone);

	public int getUpgradeSkillsJade();

	public void setUpgradeSkillsJade(int upgradeSkillsJade);

	public int getReinforcedEquipmentStone();

	public void setReinforcedEquipmentStone(int reinforcedEquipmentStone);

	public int getRebirthNum();

	public void setRebirthNum(int rebirthNum);

	public Skill getSkill();

	public void setSkill(Skill skill);

	public int getFightPower();

	public void setFightPower(int fightPower);

	public int getMaxPointsId();

	public void setMaxPointsId(int maxPointsId);

	public Store getStore();

	public void setStore(Store store);

	public int getSportsMoney();

	public void setSportsMoney(int sportsMoney);

	public void addDelSportsMoney(int num);

	public Artifact getArtifact();

	public void setArtifact(Artifact artifact);

	public Arena getArena();

	public void setArena(Arena arena);

	/**
	 * 增加或扣除神器升级石
	 * 
	 * @param num
	 */
	public void addDelStrengthenArtifactStone(int num);

	/**
	 * 增加或扣除技能玉
	 * 
	 * @param num
	 */
	public void addDelUpgradeSkillsJade(int num);

	/**
	 * 增加或扣除装备升阶石
	 * 
	 * @param num
	 */
	public void addDelReinforcedEquipmentStone(int num);

	/**
	 * 玩家死亡
	 * 
	 * @param response
	 */
	public void playerDie(Response response);

	/**
	 * 加经验
	 * 
	 * @param num
	 */
	public void addExp(int num);

	public EquipmentColumn getEquipmentColumn();

	public void setEquipmentColumn(EquipmentColumn equipmentColumn);

	/**
	 * 重生
	 */
	public void rebirth(Response response);
	
	/**
	 * 更新redis
	 */
	public void addRedisMap();
	
	/**
	 * 更新战斗力
	 */
	public void updateFightPower(int fightPower);
}
