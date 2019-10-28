package com.rt.logic.player;

import java.util.List;

import com.rt.db.domain.PlayerBeanWithBLOBs;
import com.rt.logic.activity.DrawCardInfo;
import com.rt.logic.activity.PlayerActivityInfo;
import com.rt.logic.arena.Arena;
import com.rt.logic.artifact.Artifact;
import com.rt.logic.bag.Bag;
import com.rt.logic.bag.EquipmentColumn;
import com.rt.logic.email.PlayerEmail;
import com.rt.logic.part.PartInfo;
import com.rt.logic.recharge.MonthCardInfo;
import com.rt.logic.shop.Store;
import com.rt.logic.skill.Skill;
import com.rt.logic.task.PlayerTask;
import com.rt.pb.PbPlayer.PbOfflineRewardInfo;
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
	
	public void setSex(int sex);
	public int getSex();

	public String getUuid();

	public void setUuid(String uuid);

	public PbPlayerInfo.Builder showPlayerInfo();

	public int getGold();

	public void setGold(int gold);

	public void addDelGold(int num, String type);

	public void addDelDiamond(int num, String type);

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

	public void addDelSportsMoney(int num, String type);

	public Artifact getArtifact();

	public void setArtifact(Artifact artifact);

	public Arena getArena();

	public void setArena(Arena arena);

	public PlayerTask getTask();

	public void setTask(PlayerTask task);

	public PartInfo getPart();

	public void setPart(PartInfo part);

	public long getLastLoginTime();

	public void setLastLoginTime(long lastLoginTime);

	public void addRechargeDiamond(int num);

	public PlayerActivityInfo getActivityInfo();

	public void setActivityInfo(PlayerActivityInfo activityInfo);

	public int getGuideStep();

	public void setGuideStep(int guideStep);

	public PlayerEmail getPlayerEmail();

	public void setPlayerEmail(PlayerEmail playerEmail);

	public DrawCardInfo getDrawCardInfo();

	public void setDrawCardInfo(DrawCardInfo drawCardInfo);

	public int getVipExp();

	public void setVipExp(int vipExp);

	public List<Integer> getVipLvlList();

	public void setVipLvlList(List<Integer> vipLvlList);

	public MonthCardInfo getMonthCardInfo();

	public void setMonthCardInfo(MonthCardInfo monthCardInfo);
	
	public List<Integer> getUseGiftCodeGroupIdList();

	public void setUseGiftCodeGroupIdList(List<Integer> useGiftCodeGroupIdList);
	
	public int getHistoryMaxPointsId();

	public void setHistoryMaxPointsId(int historyMaxPointsId);
	
	public int getHistoryMaxLevel();
	
	public void setHistoryMaxLevel(int historyMaxLevel);
	
	
	/**
	 * 增加或扣除神器升级石
	 * 
	 * @param num
	 */
	public void addDelStrengthenArtifactStone(int num, String type);

	/**
	 * 增加或扣除技能玉
	 * 
	 * @param num
	 */
	public void addDelUpgradeSkillsJade(int num, String type);

	/**
	 * 增加或扣除装备升阶石
	 * 
	 * @param num
	 */
	public void addDelReinforcedEquipmentStone(int num, String type);

	/**
	 * 玩家死亡
	 * 
	 * @param response
	 */
	public void playerDie();

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
	public void rebirth();

	/**
	 * 更新redis
	 */
	public void addRedisMap();

	/**
	 * 更新战斗力
	 */
	public void updateFightPower(int fightPower);

	/**
	 * 升级VIP
	 * 
	 * @param num
	 */
	public void addVipExp(int num);

	public void receiveVipReward(int viplvl);
	
	/**
	 * 使用激活码
	 * @param code
	 */
    public void useGiftCode(String code);
    
    public PbOfflineRewardInfo.Builder checkOffLineReward(PbPlayerInfo.Builder pbuilder);

}
