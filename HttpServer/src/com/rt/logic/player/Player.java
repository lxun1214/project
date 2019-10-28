package com.rt.logic.player;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.rt.cache.ConfigCache;
import com.rt.db.domain.PlayerBeanWithBLOBs;
import com.rt.gloable.Response;
import com.rt.gloable.ServerInfo;
import com.rt.logic.arena.Arena;
import com.rt.logic.artifact.Artifact;
import com.rt.logic.bag.Bag;
import com.rt.logic.bag.EquipmentColumn;
import com.rt.logic.player.config.data.AttributesIncreaseConfig;
import com.rt.logic.player.config.data.ExpUpConfig;
import com.rt.logic.player.config.data.RebirthAwardConfig;
import com.rt.logic.points.config.PointInfoConfig;
import com.rt.logic.shop.Store;
import com.rt.logic.skill.Skill;
import com.rt.pb.PbPlayer.PbPlayerInfo;
import com.rt.redis.RedisClient;
import com.rt.utils.RedisKeyUtils;

public class Player implements IPlayer {

	/** 存库时间间隔 **/
	private static final int SAVE_DB_TIME = 300000;

	private long playerId;

	private long userId;

	private int headId;

	/** 职业id */
	private int jobId;

	private String uuid;

	private String accountName;

	private String playerName;

	private int gold;

	private int diamond;

	private int fightPower;

	/** 神器强化石 */
	private int strengthenArtifactStone;
	/** 技能玉 */
	private int upgradeSkillsJade;
	/** 装备升阶石 */
	private int reinforcedEquipmentStone;

	private int exp;

	private int level;

	private int vipLevel;

	private long lastSaveDbTime;

	private int serverId;

	/** 当前关卡 */
	private int pointsId;

	/** 历史最高关卡 */
	private int maxPointsId;

	/** 重生次数 */
	private int rebirthNum;

	// /** 属性 */
	// private PlayerAttr playerAttr;

	/** 背包 */
	private Bag bag;

	/** 技能 */
	private Skill skill;

	/** 装备栏 */
	private EquipmentColumn equipmentColumn;

	/** 商品购买次数信息 */
	private Store store;

	/** 竞技币 */
	private int sportsMoney;

	/** 神器信息 */
	private Artifact artifact;

	/** 竞技场信息 */
	private Arena arena;

	public static int getSaveDbTime() {
		return SAVE_DB_TIME;
	}

	public Player() {

	}

	@Override
	public void addDelGold(int num) {
		this.gold += num;
		if (gold < 0) {
			gold = 0;
		}
	}

	@Override
	public void addDelDiamond(int num) {
		this.diamond += num;
		if (diamond < 0) {
			diamond = 0;
		}
	}

	@Override
	public void addDelStrengthenArtifactStone(int num) {
		this.strengthenArtifactStone += num;
		if (strengthenArtifactStone < 0) {
			strengthenArtifactStone = 0;
		}
	}

	@Override
	public void addDelUpgradeSkillsJade(int num) {
		this.upgradeSkillsJade += num;
		if (upgradeSkillsJade < 0) {
			upgradeSkillsJade = 0;
		}
	}

	@Override
	public void addDelReinforcedEquipmentStone(int num) {
		this.reinforcedEquipmentStone += num;
		if (reinforcedEquipmentStone < 0) {
			reinforcedEquipmentStone = 0;
		}
	}

	@Override
	public void addExp(int num) {
		this.exp += num;
		ExpUpConfig config = ConfigCache.expUpConfigMap.get(level);
		int upExp = config.exp;
		while (this.exp >= upExp) {
			int nextLevel = level + 1;
			ExpUpConfig nextConfig = ConfigCache.expUpConfigMap.get(nextLevel);
			if (nextConfig == null) {
				this.exp = config.exp;
				break;
			}
			this.level = nextLevel;
			this.exp = exp - config.exp;
			config = nextConfig;
			// 战力增加
			this.updateFightPower(this.fightPower + getUpLevelPower());
		}
	}

	@Override
	public void addDelSportsMoney(int num) {
		this.sportsMoney += num;
		if (sportsMoney < 0) {
			sportsMoney = 0;
		}
	}

	private int getUpLevelPower() {
		List<AttributesIncreaseConfig> list = ConfigCache.attributesIncreaseConfigMap.get(jobId);
		if (list == null) {
			return 0;
		}
		for (int i = 0; i < list.size(); i++) {
			AttributesIncreaseConfig config = list.get(i);
			if (level >= config.lvMin && level <= config.lvMax) {
				return config.growScore;
			}
		}
		return 0;
	}

	@Override
	public void playerDie(Response response) {
		PointInfoConfig lastConfig = ConfigCache.pointConfigMap.get(pointsId - 1);
		if (lastConfig != null) {
			this.pointsId = lastConfig.pointId;
		}
		PlayerMsg.sendPlayerDieMsg(pointsId, response);
	}

	@Override
	public void rebirth(Response response) {
		RebirthAwardConfig config = ConfigCache.rebirthAwardConfigMap.get(this.pointsId);
		if (config == null) {
			return;
		}
		// 神器升级石
		addDelStrengthenArtifactStone(config.strengthenArtifactStone);
		// 技能玉
		addDelUpgradeSkillsJade(config.upgradeSkillsJade);
		// 装备升阶石
		addDelReinforcedEquipmentStone(config.reinforcedEquipmentStone);
		this.level = 1;
		this.exp = 0;
		this.pointsId = 1;
		this.gold = 0;
		// 背包中装备重置到1级
		this.bag.initEquipLevel();
		// 装备栏所有装备重置到1级
		this.equipmentColumn.initEquipLevel(this);
		// 重生次数+1
		this.rebirthNum++;

		PlayerMsg.sendRebirthMsg(this, response);

	}

	/** 检测定时存库 **/
	public boolean isSaveDb(long curTime) {
		if (this.lastSaveDbTime == 0)
			this.lastSaveDbTime = curTime + SAVE_DB_TIME;
		if (curTime < this.lastSaveDbTime)
			return false;
		this.lastSaveDbTime = curTime + SAVE_DB_TIME;
		return true;
	}

	public void initPlayer(PlayerBeanWithBLOBs playerBean) {
		this.playerId = playerBean.getPlayerId();
		this.userId = playerBean.getUserId();
		this.headId = playerBean.getHeadId();
		this.jobId = playerBean.getJobId();
		this.playerName = playerBean.getPlayerName();
		this.gold = playerBean.getGold();
		this.diamond = playerBean.getDiamond();
		this.exp = playerBean.getExp();
		this.level = playerBean.getLevel();
		this.vipLevel = playerBean.getVipLevel();
		this.fightPower = playerBean.getFightPower();
		this.pointsId = playerBean.getPointsId();
		this.maxPointsId = playerBean.getMaxPointsId();
		this.strengthenArtifactStone = playerBean.getStrengthenArtifactStone();
		this.upgradeSkillsJade = playerBean.getUpgradeSkillsJade();
		this.reinforcedEquipmentStone = playerBean.getReinforcedEquipmentStone();
		this.rebirthNum = playerBean.getRebirthNum();
		// this.playerAttr = JSON.parseObject(playerBean.getPlayerAttr(),
		// PlayerAttr.class);
		this.bag = JSON.parseObject(playerBean.getBag(), Bag.class);
		bag.initItemMap();
		this.skill = JSON.parseObject(playerBean.getSkill(), Skill.class);
		this.equipmentColumn = JSON.parseObject(playerBean.getEquipmentColumn(), EquipmentColumn.class);
		this.store = JSON.parseObject(playerBean.getStoreInfo(), Store.class);
		this.sportsMoney = playerBean.getSportsMoney();
		this.artifact = JSON.parseObject(playerBean.getArtifact(), Artifact.class);
		this.arena = JSON.parseObject(playerBean.getArena(), Arena.class);
	}

	public PlayerBeanWithBLOBs initPlayerBean() {
		PlayerBeanWithBLOBs playerBean = new PlayerBeanWithBLOBs();
		playerBean.setPlayerId(this.playerId);
		playerBean.setUserId(this.userId);
		playerBean.setServerId(this.serverId);
		playerBean.setHeadId(this.headId);
		playerBean.setJobId(this.jobId);
		playerBean.setPlayerName(this.playerName);
		playerBean.setGold(this.gold);
		playerBean.setDiamond(this.diamond);
		playerBean.setExp(this.exp);
		playerBean.setLevel(this.level);
		playerBean.setVipLevel(this.vipLevel);
		playerBean.setFightPower(this.fightPower);
		playerBean.setPointsId(this.pointsId);
		playerBean.setMaxPointsId(this.maxPointsId);
		playerBean.setRebirthNum(this.rebirthNum);
		playerBean.setStrengthenArtifactStone(this.strengthenArtifactStone);
		playerBean.setUpgradeSkillsJade(this.upgradeSkillsJade);
		playerBean.setReinforcedEquipmentStone(this.reinforcedEquipmentStone);
		// playerBean.setPlayerAttr(JSON.toJSONString(playerAttr));
		playerBean.setBag(JSON.toJSONString(this.bag));
		playerBean.setSkill(JSON.toJSONString(this.skill));
		playerBean.setEquipmentColumn(JSON.toJSONString(this.equipmentColumn));
		playerBean.setStoreInfo(JSON.toJSONString(this.store));
		playerBean.setSportsMoney(this.sportsMoney);
		playerBean.setArtifact(JSON.toJSONString(this.artifact));
		playerBean.setArena(JSON.toJSONString(this.arena));
		return playerBean;
	}

	public PbPlayerInfo.Builder showPlayerInfo() {
		PbPlayerInfo.Builder builder = PbPlayerInfo.newBuilder();
		builder.setPlayerId(this.playerId);
		builder.setHeadId(this.headId);
		builder.setJobId(this.jobId);
		builder.setPlayerName(this.playerName);
		builder.setGold(this.gold);
		builder.setDiamond(this.diamond);
		builder.setExp(this.exp);
		builder.setLevel(this.level);
		builder.setVipLevel(this.vipLevel);
		builder.setFightPower(this.fightPower);
		builder.setPoints(this.pointsId);
		builder.setStrengthenArtifactStone(this.strengthenArtifactStone);
		builder.setUpgradeSkillsJade(this.upgradeSkillsJade);
		builder.setReinforcedEquipmentStone(this.reinforcedEquipmentStone);
		// builder.setPlayerAttrInfo(playerAttr.showAttrInfo());
		builder.setRebirthNum(this.rebirthNum);
		builder.addAllSkillTabs(this.skill.getSkillList());
		builder.addAllSkillColumn(this.skill.showSkillColumnInfo());
		builder.addAllColumns(equipmentColumn.showEquipColumn());
		builder.addAllStoreInfos(store.showStoreInfos());
		builder.setSportsMoney(this.sportsMoney);
		builder.addAllArtifactInfos(this.artifact.getItemIdList());
		builder.setChallengeNum(this.arena.showFightNum());
		builder.setChallengeCount(this.arena.getPurchaseCount());
		return builder;
	}

	/**
	 * redis根据playerId存一份用户信息 timer里调用
	 * 
	 * @param player
	 */
	public void addRedisMap() {
		// 存一份map
		String rankingsMapKey = RedisKeyUtils.getArenaMapKey(ServerInfo.getServerId());
		RedisClient.hSetValue(rankingsMapKey, String.valueOf(this.playerId), JSON.toJSONString(this));
	}

	/**
	 * 更新战力
	 */
	public void updateFightPower(int fightPower) {
		this.fightPower = fightPower;
		// 监听战力变化,存一份Set有序集合
		String rankingsSetKey = RedisKeyUtils.getPowerSetKey(ServerInfo.getServerId());
		RedisClient.zadd(rankingsSetKey, fightPower, String.valueOf(this.playerId));
	}

	public long getPlayerId() {
		return playerId;
	}

	public void setPlayerId(long playerId) {
		this.playerId = playerId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getPlayerName() {
		return playerName;
	}

	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public int getGold() {
		return gold;
	}

	public void setGold(int gold) {
		this.gold = gold;
	}

	public int getDiamond() {
		return diamond;
	}

	public void setDiamond(int diamond) {
		this.diamond = diamond;
	}

	public long getLastSaveDbTime() {
		return lastSaveDbTime;
	}

	public int getJobId() {
		return jobId;
	}

	public void setJobId(int jobId) {
		this.jobId = jobId;
	}

	public void setLastSaveDbTime(long lastSaveDbTime) {
		this.lastSaveDbTime = lastSaveDbTime;
	}

	public int getHeadId() {
		return headId;
	}

	public void setHeadId(int headId) {
		this.headId = headId;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getVipLevel() {
		return vipLevel;
	}

	public void setVipLevel(int vipLevel) {
		this.vipLevel = vipLevel;
	}

	public int getServerId() {
		return serverId;
	}

	public void setServerId(int serverId) {
		this.serverId = serverId;
	}

	@Override
	public Bag getBag() {
		return this.bag;
	}

	@Override
	public void setBag(Bag bag) {
		this.bag = bag;
	}

	@Override
	public int getPointsId() {
		return this.pointsId;
	}

	@Override
	public void setPointsId(int pointsId) {
		this.pointsId = pointsId;
	}

	public int getStrengthenArtifactStone() {
		return strengthenArtifactStone;
	}

	public void setStrengthenArtifactStone(int strengthenArtifactStone) {
		this.strengthenArtifactStone = strengthenArtifactStone;
	}

	public int getUpgradeSkillsJade() {
		return upgradeSkillsJade;
	}

	public void setUpgradeSkillsJade(int upgradeSkillsJade) {
		this.upgradeSkillsJade = upgradeSkillsJade;
	}

	public int getReinforcedEquipmentStone() {
		return reinforcedEquipmentStone;
	}

	public void setReinforcedEquipmentStone(int reinforcedEquipmentStone) {
		this.reinforcedEquipmentStone = reinforcedEquipmentStone;
	}

	public int getRebirthNum() {
		return rebirthNum;
	}

	public void setRebirthNum(int rebirthNum) {
		this.rebirthNum = rebirthNum;
	}

	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}

	public int getExp() {
		return exp;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

	public int getFightPower() {
		return fightPower;
	}

	public void setFightPower(int fightPower) {
		this.fightPower = fightPower;
	}

	public EquipmentColumn getEquipmentColumn() {
		return equipmentColumn;
	}

	public void setEquipmentColumn(EquipmentColumn equipmentColumn) {
		this.equipmentColumn = equipmentColumn;
	}

	public int getMaxPointsId() {
		return maxPointsId;
	}

	public void setMaxPointsId(int maxPointsId) {
		this.maxPointsId = maxPointsId;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	public int getSportsMoney() {
		return sportsMoney;
	}

	public void setSportsMoney(int sportsMoney) {
		this.sportsMoney = sportsMoney;
	}

	public Artifact getArtifact() {
		return artifact;
	}

	public void setArtifact(Artifact artifact) {
		this.artifact = artifact;
	}

	public Arena getArena() {
		return arena;
	}

	public void setArena(Arena arena) {
		this.arena = arena;
	}
}
