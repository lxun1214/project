package com.rt.gloable;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.alibaba.fastjson.JSON;
import com.rt.cache.ConfigCache;
import com.rt.cache.npc.NpcEquipModel;
import com.rt.cache.npc.NpcGemGrooveInfo;
import com.rt.cache.npc.NpcPlayerModel;
import com.rt.code.ByteOutputStream;
import com.rt.db.domain.SystemEmailBean;
import com.rt.db.domain.SystemEmailBeanExample;
import com.rt.db.mapper.SystemEmailBeanMapper;
import com.rt.gm.GMRegister;
import com.rt.logic.arena.Arena;
import com.rt.logic.artifact.Artifact;
import com.rt.logic.bag.EquipmentColumn;
import com.rt.logic.bag.GemGroove;
import com.rt.logic.email.SystemEmail;
import com.rt.logic.item.Equipment;
import com.rt.logic.item.Item;
import com.rt.logic.item.ItemFactory;
import com.rt.logic.player.IPlayer;
import com.rt.logic.player.Player;
import com.rt.logic.skill.Skill;
import com.rt.pb.BasePack.BaseMessage;
import com.rt.pb.PbSs.GameServerStartRequest;
import com.rt.redis.RedisClient;
import com.rt.utils.AppFile;
import com.rt.utils.FastJsonUtils;
import com.rt.utils.RedisKeyUtils;

/**
 * 服务器初始化
 * 
 * @author xin.fengtao
 *
 */
public class ServerInit implements ServletContextListener {

	Logger log = Logger.getLogger(ServerInit.class);

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// GloableService.getInstance().shutDown();
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		String path = arg0.getServletContext().getRealPath("/");
		AppFile.path = path;
		try {
			// log4j
			PropertyConfigurator.configure(path + "config/log4j.properties");
			// 初始化redis客户端
			RedisClient.initialPool(path);
			// 初始化mybatis
			DbManager.init();
			// 加载服务器信息配置
			loadServerConfig(path);
			// 加载excel
			new ExcelConfigLoader().startLoad();

			// GM
			//GMRegister.init();

			// 日志
			// LogManager.getInstance().init();
			// 向登陆服务器注册
			sendToLoginServer();

			// 启动加载所有系统邮件
			loadSystemEmail();

			try {
				// 向充值服务器注册
				sendToRechargeServer();
			} catch (Exception e) {
			}

			// 加载npc
			loadNpc();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 加载NPC
	 */
	public void loadNpc(){
		String key = RedisKeyUtils.getArenaSetKey();
		Long total = RedisClient.srard(key);
		if (total == null || total.intValue() < 1000) {
			System.out.println(total + " ----加载NPC");
			String rankingsSetKey = RedisKeyUtils.getArenaSetKey();
			String rankingsMapKey = RedisKeyUtils.getArenaMapKey();
			int count = 0;
			String powerSetKey = RedisKeyUtils.getPowerSetKey();
			
			String rebitySetKey = RedisKeyUtils.getRebirthSetKey();
			
			String rechargeRank = RedisKeyUtils.getRechargeSetKey();
			for(NpcPlayerModel model: ConfigCache.npcPlayerModelMap.values()){
				//存redis
				RedisClient.zadd(rankingsSetKey, Integer.parseInt(model.rankings), String.valueOf(model.playerId));
				IPlayer player = createPlayer(model);
				RedisClient.hSetValue(rankingsMapKey, String.valueOf(model.playerId), JSON.toJSONString(player));
				count++;
				System.out.println(model.playerName + "加载完毕，已加载"+ count);
				
				RedisClient.zadd(powerSetKey, Integer.parseInt(model.fghtPower), String.valueOf(model.playerId));
				
				RedisClient.zadd(rebitySetKey, Integer.parseInt(model.rebirthNum)*1000+Integer.parseInt(model.level), String.valueOf(model.playerId));
				
				RedisClient.zadd(rechargeRank, Integer.parseInt(model.vipExp), String.valueOf(model.playerId));
			}
		}
	}

	public IPlayer createPlayer(NpcPlayerModel model) {
		IPlayer player = new Player();
		player.setUserId(-1);
		player.setPlayerId(Long.parseLong(String.valueOf(model.playerId)));
		player.setJobId(Integer.parseInt(model.jobId));
		player.setHeadId(Integer.parseInt(model.headId));
		player.setPlayerName(model.playerName);
		player.setSex(Integer.parseInt(model.sex));
		player.setRebirthNum(Integer.parseInt(model.rebirthNum));
		player.setLevel(Integer.parseInt(model.level));
		player.addVipExp(Integer.parseInt(model.vipExp));
		player.setFightPower(Integer.parseInt(model.fghtPower));

		// 技能
		player.setSkill(new Skill());
		if (model.skillTabs != null && !model.skillTabs.equals("")) {
			String[] skills = model.skillTabs.split("#");
			for (int i = 0; i < skills.length; i++) {
				player.getSkill().getSkillList().add(Integer.parseInt(skills[i]));
			}
		}

		if (model.skillColumn != null && !model.skillColumn.equals("")) {
			String[] skills = model.skillColumn.split("#");
			int[] skillColumn = new int[7];
			for (int i = 0; i < skills.length; i++) {
				skillColumn[i] = Integer.parseInt(skills[i]);
			}
			player.getSkill().setSkillColumn(skillColumn);
		}

		// 装备栏
		EquipmentColumn ec = new EquipmentColumn();
		ec.initColumns();
		player.setEquipmentColumn(ec);

		if (model.equipColumnInfo != null && !model.equipColumnInfo.equals("")) {
			String[] equipColumnInfos = model.equipColumnInfo.split("#");
			for (int i = 0; i < equipColumnInfos.length; i++) {
				
				NpcEquipModel eqModel = ConfigCache.npcEquipModelMap.get(Integer.parseInt(equipColumnInfos[i]));
				Item item = ItemFactory.createItem(Integer.parseInt(eqModel.itemId), 1);
				Equipment equip = item.getEquipment();
				equip.setLevel(Integer.parseInt(eqModel.level));
				player.getEquipmentColumn().getColumns()[Integer.parseInt(eqModel.loc)-1].setItem(item);
				
				//宝石槽
				if(eqModel.grooveInfo!=null&&!eqModel.grooveInfo.equals("")){
					String[] grooveInfo = eqModel.grooveInfo.split("#");
					for (int j = 0; j < grooveInfo.length; j++) {
						NpcGemGrooveInfo gemModel = ConfigCache.npcGemGrooveInfoMap.get(Integer.parseInt(grooveInfo[j])); 
						GemGroove gem = new GemGroove();
						gem.setGemId(Integer.parseInt(gemModel.gemId));
						gem.setLoc(Integer.parseInt(gemModel.gemLoc));
						player.getEquipmentColumn().getColumns()[Integer.parseInt(eqModel.loc)-1].getGrooves()[Integer.parseInt(gemModel.gemLoc)] = gem;
					}
				}
			}
		}

		// 神器
		player.setArtifact(new Artifact());
		
		if (model.artifactInfos != null && !model.artifactInfos.equals("")) {
			String[] artifactInfos = model.artifactInfos.split("#");
			for (int i = 0; i < artifactInfos.length; i++) {
				player.getArtifact().getItemIdList().add(Integer.parseInt(artifactInfos[i]));
			}
		}
		
		// 竞技场信息
		player.setArena(new Arena());

		return player;
	}

	/**
	 * 加载所有系统邮件
	 */
	public void loadSystemEmail() {
		SqlSession session = DbManager.getSession();
		try {
			SystemEmailBeanMapper mapper = session.getMapper(SystemEmailBeanMapper.class);
			SystemEmailBeanExample example = new SystemEmailBeanExample();
			example.createCriteria();
			List<SystemEmailBean> list = mapper.selectByExample(example);
			for (int i = 0; i < list.size(); i++) {
				SystemEmailBean bean = list.get(i);
				SystemEmail semail = FastJsonUtils.parseObject(bean.getEmailValue(), SystemEmail.class);
				if(semail == null){
					continue;
				}
				if (semail.getEndTime().getTime() < System.currentTimeMillis()) {
					continue;
				}
				if (semail.getStartTime().getTime() > System.currentTimeMillis()) {
					continue;
				}
				ConfigCache.systemEmailMap.put(semail.getEmailId(), semail);
			}
		} catch (Exception e) {
			log.error("邮件加载异常");
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}

	}

	/** 加载服务器配置 */
	public void loadServerConfig(String path) {
		// 生成文件对象
		File f = new File(path + "/config/serverConfig.properties");
		// 生成文件输入流
		FileInputStream in = null;
		try {
			in = new FileInputStream(f);
			/** 加载配置文件内容，以后可能参数会多，直接加载一次，用key取就行 */
			Properties p = new Properties();
			p.load(in);
			ServerInfo.serverId = Integer.parseInt(p.getProperty("serverId"));
			ServerInfo.loginServerUrl = p.getProperty("loginServerUrl");
			String openTiem = p.getProperty("openTime");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			try {
				ServerInfo.openTime = format.parse(openTiem);
			} catch (ParseException e) {
				e.printStackTrace();
			}

			ServerInfo.baseDir = p.getProperty("baseDir");
			ServerInfo.logFileNum = Integer.parseInt(p.getProperty("logFileNum"));
			ServerInfo.dataFileNum = Integer.parseInt(p.getProperty("dataFileNum"));
			ServerInfo.dataEyeAppId = p.getProperty("dataEyeAppId");

			ServerInfo.rechargeServerUrl = p.getProperty("rechargeServerUrl");
			ServerInfo.rechargeNotifyUrl = p.getProperty("rechargeNotifyUrl");
			ServerInfo.rechargeServerCreateOrder = p.getProperty("rechargeServerCreateOrder");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 服务器启动向登陆服务器发送消息
	 * 
	 * @throws IOException
	 */
	public void sendToLoginServer() throws IOException {
		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder.setCmd(101);
		GameServerStartRequest.Builder builder = GameServerStartRequest.newBuilder();
		builder.setServerId(ServerInfo.serverId);

		baseBuilder.setBody(builder.build().toByteString());

		ByteOutputStream bos = new ByteOutputStream();

		byte[] body = baseBuilder.build().toByteArray();

		bos.writeBytes(body);

		URL url = null;
		HttpURLConnection httpConnection = null;
		String address = ServerInfo.loginServerUrl;
		url = new URL(address);
		httpConnection = (HttpURLConnection) url.openConnection();
		httpConnection.setRequestMethod("POST"); // POST方式提交数据
		httpConnection.setDoOutput(true);
		OutputStream out = null;
		out = httpConnection.getOutputStream();

		// 发送请求包
		out.write(bos.toByteArray());
		out.flush();
		out.close();
		int responseCode = httpConnection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			ServerInfo.serverState = 1;
		} else {
			log.error("游戏服务器向登陆服务器注册失败" + "\t" + "serverId:" + ServerInfo.serverId);
		}
	}

	public void sendToRechargeServer() throws IOException {
		Map<String, String> map = new HashMap<>();
		map.put("serverId", String.valueOf(ServerInfo.serverId));
		map.put("httpUrl", ServerInfo.rechargeNotifyUrl);
		URL url = null;
		HttpURLConnection httpConnection = null;
		String address = ServerInfo.rechargeServerUrl;
		url = new URL(address);
		httpConnection = (HttpURLConnection) url.openConnection();
		httpConnection.setRequestMethod("POST"); // POST方式提交数据
		httpConnection.setDoOutput(true);
		OutputStream out = null;
		out = httpConnection.getOutputStream();
		// 发送请求包
		out.write(FastJsonUtils.toJSONString(map).getBytes());
		out.flush();
		out.close();
		int responseCode = httpConnection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			log.debug("充值服务器注册成功");
		} else {
			log.error("游戏服务器向充值服务器注册失败" + "\t" + "serverId:" + ServerInfo.serverId);
		}
	}
}
