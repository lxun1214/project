package com.rt.logic.player;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.rt.cache.ConfigCache;
import com.rt.cache.GameCache;
import com.rt.common.ErrorCode;
import com.rt.common.ResponseMsg;
import com.rt.db.domain.PlayerBeanWithBLOBs;
import com.rt.log.dataeye.HttpLogServer;
import com.rt.log.dataeye.LogTaskFactory;
import com.rt.log.model.CoinGainModel;
import com.rt.log.model.LevelUpMode;
import com.rt.logic.activity.ActivityConst;
import com.rt.logic.activity.DrawCardInfo;
import com.rt.logic.activity.PlayerActivityInfo;
import com.rt.logic.arena.Arena;
import com.rt.logic.artifact.Artifact;
import com.rt.logic.bag.Bag;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.EquipmentColumn;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.email.PlayerEmail;
import com.rt.logic.part.PartInfo;
import com.rt.logic.player.config.data.AttributesIncreaseConfig;
import com.rt.logic.player.config.data.ExpUpConfig;
import com.rt.logic.player.config.data.GiftCodeModel;
import com.rt.logic.player.config.data.RebirthAwardConfig;
import com.rt.logic.player.config.data.VipBaseConfig;
import com.rt.logic.points.config.PointInfoConfig;
import com.rt.logic.recharge.MonthCardInfo;
import com.rt.logic.shop.Store;
import com.rt.logic.skill.Skill;
import com.rt.logic.task.PlayerTask;
import com.rt.logic.task.TaskConst;
import com.rt.pb.PbPlayer.PbMonthCardInfo;
import com.rt.pb.PbPlayer.PbOfflineRewardInfo;
import com.rt.pb.PbPlayer.PbPlayerInfo;
import com.rt.redis.RedisClient;
import com.rt.utils.FastJsonUtils;
import com.rt.utils.RedisKeyUtils;

public class Player implements IPlayer {

	/** 存库时间间隔 **/
	private static final int SAVE_DB_TIME = 30000;

	private long playerId;

	private long userId;

	private int headId;

	/** 职业id */
	private int jobId;

	private String uuid;

	private String accountName;

	private String playerName;

	private int sex;
	
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

	/** 最高关卡 */
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

	private PlayerTask task;

	private PartInfo part;

	private long lastLoginTime;

	private PlayerActivityInfo activityInfo;

	/** 引导 */
	private int guideStep;

	/** 邮件 */
	private PlayerEmail playerEmail;

	/** 抽卡信息 */
	private DrawCardInfo drawCardInfo;

	/** vip经验 */
	private int vipExp;

	/** 已领取vip等级奖励信息 */
	private List<Integer> vipLvlList = new ArrayList<>();

	/** 月卡 */
	private MonthCardInfo monthCardInfo;
	
	/**已使用激活码组ID集合*/
	private List<Integer> useGiftCodeGroupIdList = new ArrayList<>();

	/**历史最高关卡*/
	private int historyMaxPointsId;
	
	/**历史最高等级*/
	private int historyMaxLevel;

	public static int getSaveDbTime() {
		return SAVE_DB_TIME;
	}

	public Player() {

	}

	@Override
	public void addDelGold(int num, String type) {
		this.gold += num;
		if (gold < 0) {
			gold = 0;
		}
		PlayerMsg.sendCurrencyChangeMsg(this.playerId, CurrencyConst.STORE_GOLD, this.gold);
		if (num > 0) {
			// 发送获取虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_GAIN, GameCache.logModelMap.get(playerId),
					new CoinGainModel("金币", num, gold, type));
		} else {
			// 发送消耗虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_LOST, GameCache.logModelMap.get(playerId),
					new CoinGainModel("金币", -num, gold, type));
		}
	}

	@Override
	public void addDelDiamond(int num, String type) {
		this.diamond += num;
		if (diamond < 0) {
			diamond = 0;
		}
		PlayerMsg.sendCurrencyChangeMsg(this.playerId, CurrencyConst.STORE_DIAMOND, this.diamond);
		if (num < 0) {
			// 监听成就，负数转正数
			this.task.monitorTask(playerId, TaskConst.C_SPEND_DIAMOND, -num, TaskConst.TYPE_CUMULATIVE);
			// 监听活动，负数转正数
			this.activityInfo.monitorActivity(this.playerId, ActivityConst.ACTIVITY_CONSUMPTION, -num);
			// 发送消耗虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_LOST, GameCache.logModelMap.get(playerId),
					new CoinGainModel("钻石", -num, diamond, type));
		} else {
			// 监听成就
			this.task.monitorTask(playerId, TaskConst.C_COLLECT_DIAMOND, this.diamond, TaskConst.TYPE_REPLACE);
			this.task.monitorTask(playerId, TaskConst.C_GET_DIAMOND, this.diamond, TaskConst.TYPE_REPLACE);
			// 发送获取虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_GAIN, GameCache.logModelMap.get(playerId),
					new CoinGainModel("钻石", num, diamond, type));

		}
	}

	/**
	 * 充值添加钻石
	 */
	public void addRechargeDiamond(int num) {
		addDelDiamond(num, CoinConst.GET_PAY);
		// 监听活动
		this.activityInfo.monitorActivity(this.playerId, ActivityConst.ACTIVITY_FIRST_PAY, 1);
	}

	@Override
	public void addDelStrengthenArtifactStone(int num, String type) {
		this.strengthenArtifactStone += num;
		if (strengthenArtifactStone < 0) {
			strengthenArtifactStone = 0;
		}
		PlayerMsg.sendCurrencyChangeMsg(this.playerId, CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE,
				this.strengthenArtifactStone);
		if (num > 0) {
			// 发送获取虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_GAIN, GameCache.logModelMap.get(playerId),
					new CoinGainModel("神器强化石", num, strengthenArtifactStone, type));
		} else {
			// 发送消耗虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_LOST, GameCache.logModelMap.get(playerId),
					new CoinGainModel("神器强化石", -num, strengthenArtifactStone, type));
		}
	}

	@Override
	public void addDelUpgradeSkillsJade(int num, String type) {
		this.upgradeSkillsJade += num;
		if (upgradeSkillsJade < 0) {
			upgradeSkillsJade = 0;
		}
		PlayerMsg.sendCurrencyChangeMsg(this.playerId, CurrencyConst.STORE_UPGRADE_SKILLS_JADE, this.upgradeSkillsJade);
		if (num > 0) {
			// 发送获取虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_GAIN, GameCache.logModelMap.get(playerId),
					new CoinGainModel("技能玉", num, upgradeSkillsJade, type));
		} else {
			// 发送消耗虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_LOST, GameCache.logModelMap.get(playerId),
					new CoinGainModel("技能玉 ", -num, upgradeSkillsJade, type));
		}
	}

	@Override
	public void addDelReinforcedEquipmentStone(int num, String type) {
		this.reinforcedEquipmentStone += num;
		if (reinforcedEquipmentStone < 0) {
			reinforcedEquipmentStone = 0;
		}
		PlayerMsg.sendCurrencyChangeMsg(this.playerId, CurrencyConst.STORE_RES, this.reinforcedEquipmentStone);
		if (num > 0) {
			// 发送获取虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_GAIN, GameCache.logModelMap.get(playerId),
					new CoinGainModel("装备升阶石", num, reinforcedEquipmentStone, type));
		} else {
			// 发送消耗虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_LOST, GameCache.logModelMap.get(playerId),
					new CoinGainModel("装备升阶石", -num, reinforcedEquipmentStone, type));
		}
	}

	/**
	 * 领取vip奖励
	 */
	public void receiveVipReward(int viplvl) {
		if (this.vipLvlList.contains(viplvl)) {
			PlayerMsg.sendReceiveVipRewardMsg(this.playerId, viplvl, false);
			return;
		}
		if (this.vipLevel < viplvl) {
			PlayerMsg.sendReceiveVipRewardMsg(this.playerId, viplvl, false);
			return;
		}

		VipBaseConfig config = ConfigCache.vipBaseConfigMap.get(viplvl);
		if (config == null) {
			return;
		}
		this.vipLvlList.add(viplvl);
		// 添加奖励
		if (config.itemList.size() > 0) {
			BagMsg.sendItemChangeMsg(this.playerId, this.bag.addItem(config.itemList, ItemConst.ITEM_GET_ACTIVITY));
		}
		// 货币
		if (config.currencyMap.size() > 0) {
			for (String currencyType : config.currencyMap.keySet()) {
				int num = config.currencyMap.get(currencyType);
				if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
					this.addDelGold(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
					this.addDelDiamond(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
					this.addDelSportsMoney(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
					this.addDelUpgradeSkillsJade(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
					this.addDelReinforcedEquipmentStone(num, CoinConst.GET_ACTIVITY);
				} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
					this.addDelStrengthenArtifactStone(num, CoinConst.GET_ACTIVITY);
				}
			}

		}
		PlayerMsg.sendReceiveVipRewardMsg(this.playerId, viplvl, true);
	}

	@Override
	public void addVipExp(int num) {
		if (num < 0) {
			return;
		}
		this.vipExp += num;
		
		String rankingsSetKey = RedisKeyUtils.getRechargeSetKey();
		RedisClient.zadd(rankingsSetKey, this.vipExp, String.valueOf(this.playerId));
		
		for (VipBaseConfig config : ConfigCache.vipBaseConfigMap.values()) {
			if (this.vipExp >= config.payGold) {
				this.vipLevel = config.vipLvl;
			}
		}
		PlayerMsg.sendVipChangeMsg(this.playerId, this.vipLevel, this.vipExp);
	}

	@Override
	public void addExp(int num) {
		ExpUpConfig config = ConfigCache.expUpConfigMap.get(level);
		if (config == null) {
			return;
		}
		this.exp += num;
		int upExp = config.exp;
		int fightPower = 0;
		while (this.exp >= upExp) {
			this.exp = exp - upExp;
			this.level = level + 1;
			// 发送角色升级日志
			HttpLogServer.sendLog(LogTaskFactory.LEVEL_UP, GameCache.logModelMap.get(playerId),
					new LevelUpMode(this.level - 1, this.level));
			String rankingsSetKey = RedisKeyUtils.getRebirthSetKey();
			RedisClient.zadd(rankingsSetKey, this.rebirthNum*1000+this.level, String.valueOf(this.playerId));
			fightPower += getUpLevelPower();
			ExpUpConfig nextConfig = ConfigCache.expUpConfigMap.get(this.level);
			if (nextConfig == null) {
				break;
			}
			config = nextConfig;
			upExp = config.exp;
		}
		if (fightPower > 0) {
			// 战力增加
			this.updateFightPower(this.fightPower + fightPower);
		}
		if(this.historyMaxLevel < this.level){
			this.historyMaxLevel = this.level;
		}
	}

	@Override
	public void addDelSportsMoney(int num, String type) {
		this.sportsMoney += num;
		if (sportsMoney < 0) {
			sportsMoney = 0;
		}
		PlayerMsg.sendCurrencyChangeMsg(this.playerId, CurrencyConst.STORE_SPORTS_MONEY, this.sportsMoney);
		if (num > 0) {
			// 发送获取虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_GAIN, GameCache.logModelMap.get(playerId),
					new CoinGainModel("竞技币", num, sportsMoney, type));
		} else {
			// 发送消耗虚拟币日志
			HttpLogServer.sendLog(LogTaskFactory.COIN_LOST, GameCache.logModelMap.get(playerId),
					new CoinGainModel("竞技币", -num, sportsMoney, type));
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
	public void playerDie() {
		PointInfoConfig lastConfig = ConfigCache.pointConfigMap.get(pointsId - 1);
		if (lastConfig != null) {
			this.pointsId = lastConfig.pointId;
		}
		PlayerMsg.sendPlayerDieMsg(this.playerId, pointsId);
	}

	@Override
	public void rebirth() {
		if(this.pointsId < 10){
			PlayerMsg.sendRebirthMsg(this, false);
			return;
		}
		RebirthAwardConfig config = ConfigCache.rebirthAwardConfigMap.get(this.pointsId);
		if (config == null) {
			PlayerMsg.sendRebirthMsg(this, false);
			return;
		}
		// 增加神器升级石
		addDelStrengthenArtifactStone(config.strengthenArtifactStone, CoinConst.GET_REBIRTH);
		//  增加技能玉
		addDelUpgradeSkillsJade(config.upgradeSkillsJade, CoinConst.GET_REBIRTH);
		//  增加装备升阶石
		addDelReinforcedEquipmentStone(config.reinforcedEquipmentStone, CoinConst.GET_REBIRTH);
		//等级初始为1级
		this.level = 1;
		//经验0
		this.exp = 0;
		//关卡1层
		this.pointsId = 1;
		this.maxPointsId = 1;
		//金币重置为0
		this.addDelGold(-this.gold, CoinConst.CONSUME_REBIRTH);
		// 背包中装备重置到1级
		this.bag.initEquipLevel();
		// 装备栏所有装备重置到1级
		this.equipmentColumn.initEquipLevel(this);
		// 重生次数+1
		this.rebirthNum++;

		String rankingsSetKey = RedisKeyUtils.getRebirthSetKey();
		RedisClient.zadd(rankingsSetKey, this.rebirthNum*1000+this.level, String.valueOf(this.playerId));
		
		PlayerMsg.sendRebirthMsg(this, true);
		// 监听主线任务
		this.task.monitorTask(playerId, TaskConst.Z_REBIRTHNUM, 1, TaskConst.TYPE_CUMULATIVE);
		// 监听成就
		this.task.monitorTask(playerId, TaskConst.C_REBIRTHNUM, 1, TaskConst.TYPE_CUMULATIVE);
		// 监听活动
		this.activityInfo.monitorActivity(this.playerId, ActivityConst.ACTIVITY_INVESTMENT, this.rebirthNum);
	}

	/** 检测定时存库 **/
	public boolean isSaveDb(long curTime) {
		if (this.lastSaveDbTime == 0) {
			this.lastSaveDbTime = curTime + SAVE_DB_TIME;
		}
		if (curTime < this.lastSaveDbTime) {
			return false;
		}
		this.lastSaveDbTime = curTime + SAVE_DB_TIME;
		return true;
	}

	@SuppressWarnings("unchecked")
	public void initPlayer(PlayerBeanWithBLOBs playerBean) {
		this.playerId = playerBean.getPlayerId();
		this.userId = playerBean.getUserId();
		this.serverId = playerBean.getServerId();
		this.headId = playerBean.getHeadId();
		this.jobId = playerBean.getJobId();
		this.playerName = playerBean.getPlayerName();
		this.sex = playerBean.getSex();
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
		bag.initItemMap(this);
		this.skill = JSON.parseObject(playerBean.getSkill(), Skill.class);
		this.equipmentColumn = JSON.parseObject(playerBean.getEquipmentColumn(), EquipmentColumn.class);
		this.store = JSON.parseObject(playerBean.getStoreInfo(), Store.class);
		this.sportsMoney = playerBean.getSportsMoney();
		this.artifact = JSON.parseObject(playerBean.getArtifact(), Artifact.class);
		this.arena = JSON.parseObject(playerBean.getArena(), Arena.class);
		this.task = JSON.parseObject(playerBean.getPlayerTask(), PlayerTask.class);
		this.part = JSON.parseObject(playerBean.getPartInfo(), PartInfo.class);
		this.lastLoginTime = playerBean.getLastLoginTime();
		this.activityInfo = JSON.parseObject(playerBean.getActivityInfo(), PlayerActivityInfo.class);
		this.guideStep = playerBean.getGuideStep();
		this.playerEmail = JSON.parseObject(playerBean.getPlayerEmail(), PlayerEmail.class);
		if (this.playerEmail == null) {
			this.playerEmail = new PlayerEmail();
		}
		this.drawCardInfo = JSON.parseObject(playerBean.getDrawCardInfo(), DrawCardInfo.class);
		if (this.drawCardInfo == null) {
			this.drawCardInfo = new DrawCardInfo();
		}
		if (playerBean.getVipExp() != null) {
			this.vipExp = playerBean.getVipExp();
		} else {
			this.vipExp = 0;
		}
		if (playerBean.getVipReceiveLev() != null) {
			this.vipLvlList = JSON.parseObject(playerBean.getVipReceiveLev(), List.class);
		}
		if(playerBean.getMonthCardInfo()!=null){
			this.monthCardInfo =  JSON.parseObject(playerBean.getMonthCardInfo(), MonthCardInfo.class);
		}
		if(playerBean.getUseGiftcodeList()!=null){
			this.useGiftCodeGroupIdList = JSON.parseObject(playerBean.getUseGiftcodeList(), List.class);
		}
		if(playerBean.getHistoryMaxPointsid()!=null && playerBean.getHistoryMaxPointsid() >= this.pointsId){
		     this.historyMaxPointsId = playerBean.getHistoryMaxPointsid();	
		}else{
			this.historyMaxPointsId = this.pointsId;
		}
		if(playerBean.getHistoryMaxLevel()!=null && playerBean.getHistoryMaxLevel()>= this.level){
			this.historyMaxLevel = playerBean.getHistoryMaxLevel();
		}else{
			this.historyMaxLevel = this.level;
		}
	}

	public PlayerBeanWithBLOBs initPlayerBean() {
		PlayerBeanWithBLOBs playerBean = new PlayerBeanWithBLOBs();
		playerBean.setPlayerId(this.playerId);
		playerBean.setUserId(this.userId);
		playerBean.setServerId(this.serverId);
		playerBean.setHeadId(this.headId);
		playerBean.setJobId(this.jobId);
		playerBean.setPlayerName(this.playerName);
		playerBean.setSex(this.sex);
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
		playerBean.setPlayerTask(JSON.toJSONString(this.task));
		playerBean.setPartInfo(JSON.toJSONString(this.part));
		playerBean.setLastLoginTime(this.lastLoginTime);
		playerBean.setActivityInfo(JSON.toJSONString(this.activityInfo));
		playerBean.setGuideStep(this.guideStep);
		playerBean.setPlayerEmail(JSON.toJSONString(this.playerEmail));
		playerBean.setDrawCardInfo(JSON.toJSONString(this.drawCardInfo));
		playerBean.setVipExp(this.vipExp);
		playerBean.setVipReceiveLev(JSON.toJSONString(this.vipLvlList));
		playerBean.setMonthCardInfo(JSON.toJSONString(this.monthCardInfo));
		playerBean.setUseGiftcodeList(JSON.toJSONString(this.useGiftCodeGroupIdList));
		playerBean.setHistoryMaxPointsid(this.historyMaxPointsId);
		playerBean.setHistoryMaxLevel(this.historyMaxLevel);
		return playerBean;
	}

	public PbPlayerInfo.Builder showPlayerInfo() {
		PbPlayerInfo.Builder builder = PbPlayerInfo.newBuilder();
		builder.setPlayerId(String.valueOf(this.playerId));
		builder.setHeadId(this.headId);
		builder.setJobId(this.jobId);
		builder.setPlayerName(this.playerName);
		builder.setSex(this.sex);
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
		builder.setPlayerTaskInfos(this.task.showTask());
		builder.addAllPartChallengNumInfos(this.part.showPartChallengNumInfos());
		builder.setRefreshPurchaseCount(this.arena.getRefreshPurchaseCount());
		builder.addAllActivityInfos(this.activityInfo.showActivityInfo());
		builder.setGuideStep(this.guideStep);
		builder.addAllEmailInfos(this.playerEmail.showPbPlayerEmailInfo(this));
		builder.setDrawCardInfo(this.drawCardInfo.createPbDrawCardInfo());
		builder.setVipExp(this.vipExp);
		builder.addAllVipLvlList(this.vipLvlList);
		if(this.monthCardInfo!=null){
			//月卡
			PbMonthCardInfo.Builder monthBuilder = monthCardInfo.createPbMonthCardInfo();
			if(monthBuilder!=null){
				builder.setMonthCardInfo(monthBuilder);
			}
		}
//		builder.setInfo(this.playerAttrInfo.createAttrInfo());
		builder.setPurchaseInvestment(this.activityInfo.getPurchaseInvestment());
		builder.setHistoryMaxLevel(this.historyMaxLevel);
		builder.setHistoryMaxPointsId(this.historyMaxPointsId);
		
		if(this.vipExp == 0 && this.vipLevel == 0){
			builder.setIsRecharge(false);
		}else{
			builder.setIsRecharge(true);
		}
		
		return builder;
	}

	public PbOfflineRewardInfo.Builder checkOffLineReward(PbPlayerInfo.Builder pbuilder) {
		// 判断在线奖励
		PointInfoConfig config = ConfigCache.pointConfigMap.get(this.maxPointsId);
		if (config != null) {
			int offlineTime = (int) ((System.currentTimeMillis() - lastLoginTime) / 1000);
			int time = offlineTime / config.offlineRewardTime;
			if (time > 0) {
				this.lastLoginTime = System.currentTimeMillis();
				int gold = config.gold * time;
				int exp = config.exp * time;
				// 奖励加成
				// 金币
				gold += gold * this.artifact.getRebirthMaterialIncome() / (double) 100;
				gold += gold * this.artifact.getOffHook() / (double) 100;
				// 经验
				exp += exp * this.artifact.getRebirthMaterialIncome() / (double) 100;
				exp += exp * this.artifact.getOffHook() / (double) 100;

				this.gold += gold;
				this.addExp(exp);
				PbOfflineRewardInfo.Builder builder = PbOfflineRewardInfo.newBuilder();
				builder.setOfflineTime(offlineTime);
				builder.setExp(exp);
				builder.setGold(gold);
				// TODO 沒有月卡，这里的月卡加成暂时写0
				builder.setAmplitude(0);
				pbuilder.setOfflineRewardInfo(builder);
				return builder;
			}

		}
		return null;
	}

	/**
	 * redis根据playerId存一份用户信息 timer里调用
	 * 
	 * @param player
	 */
	public void addRedisMap() {
		// 存一份map
		String rankingsMapKey = RedisKeyUtils.getArenaMapKey();
		RedisClient.hSetValue(rankingsMapKey, String.valueOf(this.playerId), JSON.toJSONString(this));
	}

	/**
	 * 更新战力
	 */
	public void updateFightPower(int fightPower) {
		this.fightPower = fightPower;
		// 监听战力变化,存一份Set有序集合
		String rankingsSetKey = RedisKeyUtils.getPowerSetKey();
		RedisClient.zadd(rankingsSetKey, fightPower, String.valueOf(this.playerId));
		PlayerMsg.sendFightPowerChangeMsg(playerId, fightPower);
	}
	
	
	/**
	 * 使用激活码
	 */
	public void useGiftCode(String code){
		String codeKey = RedisKeyUtils.getGiftCodeKey(code);
		String value = RedisClient.getValue(codeKey);
		if(value == null){
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.GIFT_CODE_NULL);
			return;
		}
		GiftCodeModel model = FastJsonUtils.parseObject(value, GiftCodeModel.class);
		if(model == null){
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.GIFT_CODE_NULL);
			return;
		}
		if(this.useGiftCodeGroupIdList.contains(model.getGroupId())){
			//同组激活码只能使用一次
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.GIFT_CODE_GROUP_ERROR);
			return;
		}
		if(model.getState() !=0){
			//激活码已使用过
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.GIFT_CODE_STATE_ERROR);
			return;
		}
		
		if(System.currentTimeMillis() < model.getStartTime() || System.currentTimeMillis() > model.getEndTime()){
			//激活码已过期
			ResponseMsg.sendErrorMsg(playerId, ErrorCode.GIFT_CODE_TIME_ERROR);
			return;
		}
		//更新激活码
		model.setState(1);
		value = FastJsonUtils.toJSONString(model);
		RedisClient.setValue(codeKey, value);
		//存一份已使用过的map
		RedisClient.hSetValue(RedisKeyUtils.USE_GIFT_CODE_KEY, code, value);
		this.useGiftCodeGroupIdList.add(model.getGroupId());
		
		//添加道具，推送
		BagMsg.sendItemChangeMsg(this.playerId,
				this.bag.addItem(model.getItemList(), ItemConst.ITEM_GET_USE_GIFT_CODE));
		//返回
		PlayerMsg.sendUseGiftCodeMsg(playerId, 0, model.getItemMap());
		
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

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
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

	public PlayerTask getTask() {
		return task;
	}

	public void setTask(PlayerTask task) {
		this.task = task;
	}

	public PartInfo getPart() {
		return part;
	}

	public void setPart(PartInfo part) {
		this.part = part;
	}

	public long getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(long lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	public PlayerActivityInfo getActivityInfo() {
		return activityInfo;
	}

	public void setActivityInfo(PlayerActivityInfo activityInfo) {
		this.activityInfo = activityInfo;
	}

	public int getGuideStep() {
		return guideStep;
	}

	public void setGuideStep(int guideStep) {
		this.guideStep = guideStep;
	}

	public PlayerEmail getPlayerEmail() {
		return playerEmail;
	}

	public void setPlayerEmail(PlayerEmail playerEmail) {
		this.playerEmail = playerEmail;
	}

	public DrawCardInfo getDrawCardInfo() {
		return drawCardInfo;
	}

	public void setDrawCardInfo(DrawCardInfo drawCardInfo) {
		this.drawCardInfo = drawCardInfo;
	}

	public int getVipExp() {
		return vipExp;
	}

	public void setVipExp(int vipExp) {
		this.vipExp = vipExp;
	}

	public List<Integer> getVipLvlList() {
		return vipLvlList;
	}

	public void setVipLvlList(List<Integer> vipLvlList) {
		this.vipLvlList = vipLvlList;
	}

	public MonthCardInfo getMonthCardInfo() {
		return monthCardInfo;
	}

	public void setMonthCardInfo(MonthCardInfo monthCardInfo) {
		this.monthCardInfo = monthCardInfo;
	}
	
	public List<Integer> getUseGiftCodeGroupIdList() {
		return useGiftCodeGroupIdList;
	}

	public void setUseGiftCodeGroupIdList(List<Integer> useGiftCodeGroupIdList) {
		this.useGiftCodeGroupIdList = useGiftCodeGroupIdList;
	}
	
	public int getHistoryMaxPointsId() {
		return historyMaxPointsId;
	}

	public void setHistoryMaxPointsId(int historyMaxPointsId) {
		this.historyMaxPointsId = historyMaxPointsId;
	}

	public int getHistoryMaxLevel() {
		return historyMaxLevel;
	}

	public void setHistoryMaxLevel(int historyMaxLevel) {
		this.historyMaxLevel = historyMaxLevel;
	}
}
