package com.rt.logic.user;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;

import com.rt.cache.ConfigCache;
import com.rt.cache.GameCache;
import com.rt.common.ErrorCode;
import com.rt.common.GameConst;
import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.UserPo;
import com.rt.db.domain.PlayerBeanExample;
import com.rt.db.domain.PlayerBeanWithBLOBs;
import com.rt.db.mapper.PlayerBeanMapper;
import com.rt.gloable.DbManager;
import com.rt.gloable.Response;
import com.rt.gloable.ServerInfo;
import com.rt.logic.arena.Arena;
import com.rt.logic.artifact.Artifact;
import com.rt.logic.bag.Bag;
import com.rt.logic.bag.EquipmentColumn;
import com.rt.logic.player.IPlayer;
import com.rt.logic.player.Player;
import com.rt.logic.player.config.data.HeroAttributeConfig;
import com.rt.logic.shop.Store;
import com.rt.logic.skill.Skill;
import com.rt.pb.PbPlayer.CreatePlayerRequest_10002;
import com.rt.pb.PbPlayer.LoginRequest_10001;
import com.rt.utils.DesUtils;
import com.rt.utils.FilterUtil;
import com.rt.utils.IdFactory;
import com.rt.utils.NumberUtils;
import com.rt.utils.StringUtils;

public class UserLogic {

	private static UserLogic instance;

	public synchronized static UserLogic getInstance() {
		if (instance == null) {
			instance = new UserLogic();
		}
		return instance;
	}

	/**
	 * 玩家登陆
	 * 
	 * @param msg
	 * @param response
	 * @throws UnsupportedEncodingException
	 */
	public void login(Message msg, HttpServletRequest request, Response response) throws UnsupportedEncodingException {
		LoginRequest_10001 req = msg.getBody();
		String encToken = req.getToken();
		long userId = req.getUserId();
		DesUtils des = new DesUtils(String.valueOf(userId));
		String token = des.decrypt(encToken);
		String[] tokenString = token.split("_");
		if (userId != Long.parseLong(tokenString[2])) {
			return;
		}
		long createTokenTime = Long.parseLong(tokenString[0]);
		int serverId = Integer.parseInt(tokenString[1]);
		if (!checkToken(createTokenTime, serverId, userId, response)) {
			return;
		}
		UserPo userPo = null;
		IPlayer player = null;

		// 账号还没下线
		if (GameCache.userPoMap.containsKey(userId)) {
			userPo = GameCache.userPoMap.get(userId);
			player = GameCache.playerMap.get(userPo.getPlayerId());
			GameCache.userUUIdMap.remove(userPo.getUUID());
		}
		if (userPo == null) {
			userPo = new UserPo();
			userPo.setUserId(userId);
			GameCache.userPoMap.put(userId, userPo);
		}

		if (player == null) {
			SqlSession session = DbManager.getSession();
			try {
				PlayerBeanMapper mapper = session.getMapper(PlayerBeanMapper.class);
				PlayerBeanExample example = new PlayerBeanExample();
				example.createCriteria().andUserIdEqualTo(userId).andServerIdEqualTo(serverId);

				PlayerBeanWithBLOBs playerBean = null;
				List<PlayerBeanWithBLOBs> list = mapper.selectByExampleWithBLOBs(example);
				session.commit();

				if (list != null && list.size() > 0) {
					playerBean = list.get(0);
					player = new Player();
					player.initPlayer(playerBean);
					GameCache.playerMap.put(player.getPlayerId(), player);
					userPo.setPlayerId(player.getPlayerId());
				}
			} catch (Exception e) {
				e.printStackTrace();
				session.rollback();
				return;
			} finally {
				session.close();
			}
		}
		String uuid = StringUtils.getUUID();
		if (player != null) {
			player.setUuid(uuid);
		}
		userPo.setUUID(uuid);
		userPo.setLastOperateTime(System.currentTimeMillis());
		GameCache.userUUIdMap.put(uuid, userPo);

		SendUserMsg.sendLoginMsg(uuid, player, response);

	}

	public boolean checkToken(long createTokenTime, int serverId, long userId, Response response) {
		// token过期了
		if (System.currentTimeMillis() - createTokenTime > GameConst.TOKEN_EXPIRED_TIME) {
			// ResponseMsg.sendErrorMsg(errorCode, response);
			return false;
		}
		if (serverId != ServerInfo.getServerId()) {
			// ResponseMsg.sendErrorMsg(errorCode, response);
			return false;
		}
		return true;
	}

	/** 创建角色 */
	public synchronized void createPlayer(Message msg, HttpServletRequest request, Response response) {

		CreatePlayerRequest_10002 req = msg.getBody();
		String playerName = req.getPlayerName().trim();
		// 是否含有特殊字符
		if (StringUtils.checkSymbol(playerName)) {
			ResponseMsg.sendErrorMsg(ErrorCode.NAME_HAVE_SYMBOL, response);
			return;
		}
		// 长度是否满足
		int length = StringUtils.getStringLenth(playerName);
		if (length > 12 || length < 4) {
			ResponseMsg.sendErrorMsg(ErrorCode.NAME_LENGTH_ERROR, response);
			return;
		}

		// 是否包含屏蔽字
		if (FilterUtil.isFilter(playerName)) {
			ResponseMsg.sendErrorMsg(ErrorCode.HAVE_FILTER_WORD, response);
			return;
		}

		long userId = msg.getUserId();
		int serverId = ServerInfo.getServerId();
		SqlSession session = DbManager.getSession();
		try {
			PlayerBeanMapper mapper = session.getMapper(PlayerBeanMapper.class);
			PlayerBeanExample example = new PlayerBeanExample();
			example.createCriteria().andUserIdEqualTo(userId).andServerIdEqualTo(serverId);

			List<PlayerBeanWithBLOBs> playerList = mapper.selectByExampleWithBLOBs(example);

			// 是否已经有角色了，已经有角色了不可以再创建
			if (playerList != null && playerList.size() > 0) {
				ResponseMsg.sendErrorMsg(ErrorCode.HAVE_PLAYER, response);
				return;
			}
			// 重名
			example = new PlayerBeanExample();
			example.createCriteria().andPlayerNameEqualTo(playerName);
			List<PlayerBeanWithBLOBs> playerList2 = mapper.selectByExampleWithBLOBs(example);
			if (playerList2 != null && playerList2.size() > 0) {
				ResponseMsg.sendErrorMsg(ErrorCode.NAME_REPEAT, response);
				return;
			}
			// 可以创建
			long playerId = Long.parseLong(String.valueOf(serverId) + IdFactory.createId());
			int jobId = req.getJobId();
			// 角色初始化
			IPlayer player = createPlayer(userId, playerId, jobId, playerName);

			PlayerBeanWithBLOBs playerBean = player.initPlayerBean();
			mapper.insertSelective(playerBean);
			session.commit();

			UserPo userPo = GameCache.userPoMap.get(userId);
			userPo.setPlayerId(playerId);
			player.setUuid(userPo.getUUID());
			GameCache.playerMap.put(player.getPlayerId(), player);

			SendUserMsg.sendCreatePlayerMsg(player, response);
		} catch (Exception e) {
			System.err.println(e);
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}

	public IPlayer createPlayer(long userId, long playerId, int jobId, String playerName) {
		IPlayer player = new Player();
		player.setUserId(userId);
		player.setPlayerId(playerId);
		player.setJobId(jobId);
		player.setHeadId(0);
		player.setPlayerName(playerName);
		player.setServerId(ServerInfo.getServerId());
		player.setGold(0);
		player.setDiamond(0);
		player.setExp(0);
		player.setLevel(1);
		player.setVipLevel(0);
		// 重生次数
		player.setRebirthNum(0);
		// 初始化关卡
		player.setPointsId(1);
		// 通过的最大关卡id
		player.setMaxPointsId(0);
		// 初始化神器强化石
		player.setStrengthenArtifactStone(0);
		// 初始化技能玉
		player.setUpgradeSkillsJade(0);
		// 初始化装备升阶石
		player.setReinforcedEquipmentStone(0);
		// 初始化战斗力
		HeroAttributeConfig config = ConfigCache.heroAttributeConfigMap.get(jobId);
		player.updateFightPower(config.initialScore);
		// //初始化角色属性
		// PlayerAttr playerAttr = new PlayerAttr();
		// HeroAttributeConfig config =
		// ConfigCache.heroAttributeConfigMap.get(jobId);
		// playerAttr.init(config);
		// player.setPlayerAttr(playerAttr);
		// 背包
		player.setBag(new Bag());
		// 技能
		player.setSkill(new Skill());
		// 装备栏
		EquipmentColumn ec = new EquipmentColumn();
		ec.initColumns();
		player.setEquipmentColumn(ec);
		// 商城购买商品次数信息
		player.setStore(new Store());
		// 竞技币
		player.setSportsMoney(0);
		// 神器
		player.setArtifact(new Artifact());
		// 竞技场信息
		player.setArena(new Arena());

		//创建player，初始化到redis
		player.addRedisMap();
		return player;
	}

	/** 随机名字 */
	public void getRandomName(Response response) {
		// // 1：中文名字 2：英文名字
		// int type = NumberUtils.getRandomNum(2, 1);
		// String randomName = null;
		// switch (type) {
		// case 1:
		// randomName = getName(ConfigCache.cSurNameList,
		// ConfigCache.cNameList);
		// break;
		// case 2:
		// randomName = getName(ConfigCache.wSurNameList,
		// ConfigCache.wNameList);
		// break;
		// default:
		// break;
		// }
		// if (randomName != null) {
		// SendUserMsg.sendRandomNameMsg(randomName, response);
		// }

	}

	public String getName(List<String> surList, List<String> nameList) {
		String surName = surList.get(NumberUtils.getRandomNum(surList.size() - 1, 0)).trim();
		String name = nameList.get(NumberUtils.getRandomNum(nameList.size() - 1, 0)).trim();
		StringBuilder builder = new StringBuilder();
		builder.append(surName).append(name);
		return builder.toString();
	}

}
