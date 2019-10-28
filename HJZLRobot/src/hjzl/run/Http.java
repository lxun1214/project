package hjzl.run;

import java.io.IOException;
import java.net.URI;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.drafts.Draft_17;
import org.java_websocket.handshake.ServerHandshake;

import hjzl.Robot;
import hjzl.common.Message;
import hjzl.common.Player;
import hjzl.db.domain.UserBean;
import hjzl.pb1.BasePack.BaseMessage;
import hjzl.pb1.PbPlayer.ChallengePartRequest_10028;
import hjzl.pb1.PbPlayer.ClearanceRequest_10004;
import hjzl.pb1.PbPlayer.CreatePlayerRequest_10002;
import hjzl.pb1.PbPlayer.EnterArenaRequest_10020;
import hjzl.pb1.PbPlayer.GemMountRequest_10014;
import hjzl.pb1.PbPlayer.GetBagRequest_10003;
import hjzl.pb1.PbPlayer.GetRankingsPowerRequest_10025;
import hjzl.pb1.PbPlayer.GetRankingsRequest_10024;
import hjzl.pb1.PbPlayer.GmRequest_100;
import hjzl.pb1.PbPlayer.LaunchChallengeRequest_10022;
import hjzl.pb1.PbPlayer.LoginRequest_10001;
import hjzl.pb1.PbPlayer.LoginResponse_20001;
import hjzl.pb1.PbPlayer.PartSettlementRequest_10029;
import hjzl.pb1.PbPlayer.PbPlayerInfo;
import hjzl.pb1.PbPlayer.PurchaseChallengeNumRequest_10021;
import hjzl.pb1.PbPlayer.RebirthRequest_10011;
import hjzl.pb1.PbPlayer.RefreshArenaRequest_10030;
import hjzl.utils.ByteOutputStream;
import hjzl.utils.DesUtils;

public class Http extends WebSocketClient {

	/**
	 * 初始化客户端信息
	 * 
	 * @param ub
	 */
	public Http(URI serverURI, UserBean ub) {
		super(serverURI, new Draft_17());
		this.ub = ub;
		message = new Message();
		player = new Player();
		connect();
		while (!getReadyState().equals(READYSTATE.OPEN)) {
			try {
				Thread.sleep(1);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		Robot.threadCount = Robot.threadCount + 1;
		System.out.println("已连接");
		socketRun();
	}

	private static final Logger log = Logger.getLogger(Http.class);

	UserBean ub;

	Message message;

	String token;

	int serverId = 1002;

	PbPlayerInfo pbPlayInfo;

	Player player;

	private long otherPlayerId;

	public boolean isLogin = false;
	
   /////////////////////////////////////////////////////////////////////////////////////

	public void socketRun() {
		try {
			// 登录游戏服务器
			LoginHttpServer();
			while (true) {
				// 判断链接是否登錄成功
				if (isLogin) {
					break;
				}
				Thread.sleep(1000);
			}
			if (message.getCmd() < 1000) {
				log.debug("登录游戏服务器失败，返回消息号：" + message.getCmd());
			}
			if (pbPlayInfo == null || pbPlayInfo.getPlayerId() == 0) {
				createPlayName();
				Thread.sleep(2000);
			}
			
			while (true) {
				// 获取背包列表
				huoqu_beibao();
				Thread.sleep(2000);
				// 过关
				guoguan();
				Thread.sleep(2000);
				// 重生
				chongsheng();
				Thread.sleep(2000);

				// 进入竞技场
				huoqujingjic();
				Thread.sleep(2000);

				// 刷新竞技场
				shuaxin_jingji_chang();
				Thread.sleep(2000);

				// 购买竞技场挑战次数
				goumai_jingjichang();
				Thread.sleep(2000);

				// 挑战
				tiaozhan();
				Thread.sleep(2000);

				// 请求竞技排行榜
				qingqiu_jingji_paihangbang();
				Thread.sleep(2000);

				// 请求战力排行榜
				qingqiu_zhanli_paihangbang();
				Thread.sleep(2000);

				// 请求GM
				sendGM("addGold", "10");
				Thread.sleep(2000);

				// 请求GM
				sendGM("addDiamond", "10");
				Thread.sleep(2000);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 请求竞技场排行榜
	 */
	public void qingqiu_zhanli_paihangbang() {
		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10025);
			GetRankingsPowerRequest_10025.Builder builder = GetRankingsPowerRequest_10025.newBuilder();
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 请求竞技场排行榜
	 */
	public void qingqiu_jingji_paihangbang() {
		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10024);
			GetRankingsRequest_10024.Builder builder = GetRankingsRequest_10024.newBuilder();
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 竞技场发起挑战
	 */
	public void tiaozhan() {
		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10022);
			LaunchChallengeRequest_10022.Builder builder = LaunchChallengeRequest_10022.newBuilder();
			builder.setOtherPlayerId(otherPlayerId);
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 购买竞技场挑战次数
	 */
	public void goumai_jingjichang() {
		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10021);
			PurchaseChallengeNumRequest_10021.Builder builder = PurchaseChallengeNumRequest_10021.newBuilder();
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 重生
	 */
	public void chongsheng() {
		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10011);
			RebirthRequest_10011.Builder builder = RebirthRequest_10011.newBuilder();
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 获取背包列表
	 */
	public void huoqu_beibao() {
		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10003);
			GetBagRequest_10003.Builder builder = GetBagRequest_10003.newBuilder();
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 宝石镶嵌
	 * 
	 * @param columnLoc
	 * @param grooveLoc
	 * @param uuid
	 */
	public void baoshi_xiangqian(int columnLoc, int grooveLoc, long uuid) {
		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder.setCmd(10014);
		GemMountRequest_10014.Builder builder = GemMountRequest_10014.newBuilder();
		builder.setColumnLoc(columnLoc);
		builder.setGrooveLoc(grooveLoc);
		builder.setUuid(uuid);
		baseBuilder.setBody(builder.build().toByteString());
		send(baseBuilder);
		System.out.println("-----");
	}

	/**
	 * 刷新竞技场三位挑战者
	 */
	public void shuaxin_jingji_chang() {
		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10030);

			RefreshArenaRequest_10030.Builder builder = RefreshArenaRequest_10030.newBuilder();
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 过关
	 */
	public void guoguan() {
		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10004);
			ClearanceRequest_10004.Builder builder = ClearanceRequest_10004.newBuilder();
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取竞技场
	 */
	public void huoqujingjic() {
		try {
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10020);
			EnterArenaRequest_10020.Builder builder = EnterArenaRequest_10020.newBuilder();
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 副本结算
	 * 
	 * @throws Exception
	 */
	public void fuben_jiesuan() throws Exception {
		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder.setCmd(10029);

		PartSettlementRequest_10029.Builder builder = PartSettlementRequest_10029.newBuilder();
		builder.setPartId(2101);

		List<PartSettlementRequest_10029> list = new ArrayList<>();
		list.add(builder.build());
		baseBuilder.setBody(builder.build().toByteString());
		send(baseBuilder);
	}

	/**
	 * 进入副本
	 * 
	 * @throws Exception
	 */
	public void jinru_fuben() throws Exception {
		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder.setCmd(10028);
		ChallengePartRequest_10028.Builder builder = ChallengePartRequest_10028.newBuilder();
		builder.setPartId(2101);
		List<ChallengePartRequest_10028> list = new ArrayList<>();
		list.add(builder.build());
		baseBuilder.setBody(builder.build().toByteString());
		send(baseBuilder);
	}

	/**
	 * 发送GM
	 * 
	 * @param command
	 * @param parameter
	 * @throws Exception
	 */
	public void sendGM(String command, String parameter) throws Exception {
		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder.setCmd(100);
		GmRequest_100.Builder builder = GmRequest_100.newBuilder();
		builder.setCommand(command);
		builder.setParameter(parameter);
		baseBuilder.setBody(builder.build().toByteString());
		send(baseBuilder);
	}

	// // 创建角色
	public void createPlayName() throws Exception {
		System.out.println("账号：" + ub.getUserId() + "开始创建角色");
		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder.setCmd(10002);

		CreatePlayerRequest_10002.Builder builder = CreatePlayerRequest_10002.newBuilder();
		builder.setPlayerName(this.ub.getUserId() + "");
		builder.setJobId(1);
		baseBuilder.setBody(builder.build().toByteString());
		send(baseBuilder);
	}

	// 登录游戏服务器
	public void LoginHttpServer() {
		String token = System.currentTimeMillis() + "_" + serverId + "_" + ub.getUserId();
		try {
			System.out.println("账号：" + ub.getUserId() + "登录游戏服务器");
			BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
			baseBuilder.setCmd(10001);

			LoginRequest_10001.Builder builder = LoginRequest_10001.newBuilder();
			builder.setUserId(ub.getUserId());
			builder.setServerId(serverId);
			DesUtils des = new DesUtils(String.valueOf(ub.getUserId()));
			this.token = des.encrypt(token);
			builder.setToken(this.token);
			baseBuilder.setBody(builder.build().toByteString());
			send(baseBuilder);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void send(BaseMessage.Builder baseBuilder) {
	//	System.out.println("发送请求：" + baseBuilder.getCmd());
		ByteOutputStream bos = new ByteOutputStream();
		byte[] body = baseBuilder.build().toByteArray();
		try {
			bos.writeBytes(body);
		} catch (IOException e) {
			e.printStackTrace();
		}
		send(bos.toByteArray());
	}

	@Override
	public void onOpen(ServerHandshake arg0) {
		System.out.println("打开链接");
	}

	@Override
	public void onMessage(String arg0) {
	//	System.out.println("收到消息" + arg0);
	}

	@Override
	public void onError(Exception arg0) {
		arg0.printStackTrace();
		System.out.println("发生错误已关闭");
	}

	@Override
	public void onClose(int arg0, String arg1, boolean arg2) {
		System.out.println("链接已关闭");
	}

	@Override
	public void onMessage(ByteBuffer bytes) {

		try {
			byte[] buffer = bytes.array();
			// 解析消息号
			BaseMessage.Builder baseBuilder_ = BaseMessage.newBuilder();
			baseBuilder_ = baseBuilder_.mergeFrom(buffer);
		//	System.out.println("收到消息：" + baseBuilder_.getCmd());
			if (baseBuilder_.getCmd() == 20001) {
				isLogin = true;
				Robot.loginCount = Robot.loginCount + 1;
				LoginResponse_20001.Builder bu1 = LoginResponse_20001.newBuilder();
				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
				pbPlayInfo = bu1.getPlayerInfo();
			//	System.out.println(bu1.getPlayerInfo().getPlayerName());

				List<LoginResponse_20001> list = new ArrayList<>();
				list.add(bu1.build());
				//System.out.println(list);
			}

//			if (baseBuilder_.getCmd() == 20028) {
//				ChallengePartResponse_20028.Builder bu1 = ChallengePartResponse_20028.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<ChallengePartResponse_20028> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20029) {
//				PartSettlementResponse_20029.Builder bu1 = PartSettlementResponse_20029.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20003) {
//				GetBagResponse_20003.Builder bu1 = GetBagResponse_20003.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20004) {
//				ClearanceResponse_20004.Builder bu1 = ClearanceResponse_20004.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20011) {
//				RebirthResponse_20011.Builder bu1 = RebirthResponse_20011.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20020) {
//				EnterArenaResponse_20020.Builder bu1 = EnterArenaResponse_20020.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20030) {
//				RefreshArenaResponse_20030.Builder bu1 = RefreshArenaResponse_20030.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				otherPlayerId = bu1.getFightTargetInfos(0).getOtherPlayerId();
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20021) {
//				PurchaseChallengeNumResponse_20021.Builder bu1 = PurchaseChallengeNumResponse_20021.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20022) {
//				LaunchChallengeResponse_20022.Builder bu1 = LaunchChallengeResponse_20022.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20024) {
//				GetRankingsResponse_20024.Builder bu1 = GetRankingsResponse_20024.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}
//
//			if (baseBuilder_.getCmd() == 20025) {
//				GetRankingsPowerResponse_20025.Builder bu1 = GetRankingsPowerResponse_20025.newBuilder();
//				bu1 = bu1.mergeFrom(baseBuilder_.getBody().toByteArray());
//				List<Object> list = new ArrayList<>();
//				list.add(bu1.build());
//				System.out.println(list);
//			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
