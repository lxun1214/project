package com.rt.logic;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;

import com.rt.cache.ServerCache;
import com.rt.cache.ServerInfo;
import com.rt.common.ErrorCode;
import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.db.domain.UserBean;
import com.rt.db.domain.UserBeanExample;
import com.rt.db.mapper.UserBeanMapper;
import com.rt.gloable.DbManager;
import com.rt.pb.PbUser.GetServerListResponse_2003;
import com.rt.pb.PbUser.GetServerUrlRequest_1004;
import com.rt.pb.PbUser.GetServerUrlResponse_2004;
import com.rt.pb.PbUser.PbServerInfo;
import com.rt.pb.PbUser.UserLoginResponse_2002;
import com.rt.utils.AccountUtils;
import com.rt.utils.DesUtils;
import com.rt.utils.StringUtils;

/**
 * 登陆服务器处理用户逻辑类
 * 
 * @author xin.fengtao
 *
 */
public class UserLogic {

	private static UserLogic instance;

	public synchronized static UserLogic getInstance() {
		if (instance == null) {
			instance = new UserLogic();
		}
		return instance;
	}

	// /**
	// * 用户注册
	// *
	// * @param msg
	// * @param response
	// */
	// public void userRegist(Message msg, HttpServletResponse response) {
	// UserRegistRequest_1001 req = msg.getBody();
	// String accountName = req.getAccountName();
	// String passWord = req.getPassWord();
	// // 验证账号密码是否合法
	// if (!canRegist(accountName, passWord)) {
	// ResponseMsg.sendErrorMsg(ErrorCode.ACC_OR_PWD_ISWRONG, response);
	// return;
	// }
	// SqlSession session = DbManager.getSession();
	// try {
	// UserBeanMapper mapper = session.getMapper(UserBeanMapper.class);
	// UserBeanExample example = new UserBeanExample();
	// example.createCriteria().andAccountNameEqualTo(accountName);
	// List<UserBean> list = mapper.selectByExample(example);
	// msg = new Message();
	// // 存在相同账号
	// if (list != null && list.size() > 0) {
	// ResponseMsg.sendErrorMsg(ErrorCode.ACCOUNT_REPEAT, response);
	// return;
	// }
	//
	// //生成新用户并存库
	// UserBean bean = new UserBean();
	// long userId = IdFactory.createId();
	// bean.setUserId(userId);
	// bean.setAccountName(accountName);
	// bean.setCreateTime(new Date());
	// bean.setState(0);
	// bean.setPassWord(passWord);
	// mapper.insertSelective(bean);
	// session.commit();
	//
	// // 生成token
	// int randomKey = NumberUtils.getRandomNum1W();
	// String token = userId + "_" + System.currentTimeMillis() + "_" +
	// randomKey;
	// byte[] tokenBytes = token.getBytes();
	// EncryptUtils.encrypt(tokenBytes, 0, tokenBytes.length, randomKey);
	//
	// UserLoginResponse_2002.Builder builder =
	// UserLoginResponse_2002.newBuilder();
	// msg.setCmd(S2CMessageNum.USER_REGIST_LOGIN);
	// builder.setIsSuccess(true);
	// builder.setUserId(userId);
	// builder.setRandomKey(randomKey);
	// ByteString bs = ByteString.copyFrom(tokenBytes);
	// builder.setToken(bs);
	//
	// //服务器信息，推荐最后一个
	// PbServerInfo.Builder serverInfoBuilder = PbServerInfo.newBuilder();
	// ServerInfo serverInfo = ServerCache.getLastServer();
	// serverInfoBuilder.setServerId(serverInfo.getBean().getServerId());
	// serverInfoBuilder.setServerName(serverInfo.getBean().getServerName());
	// serverInfoBuilder.setOpenTime(serverInfo.getBean().getOpenTime());
	// serverInfoBuilder.setServerState(serverInfo.getServerState());
	//
	// builder.setPbServerInfo(serverInfoBuilder);
	//
	// msg.setBody(builder);
	// ResponseMsg.sendMsg(msg, response);
	// } catch (Exception e) {
	// System.out.println(e);
	// session.rollback();
	// e.printStackTrace();
	// } finally {
	// session.close();
	// }
	// }
	//
	// /**
	// * 验证注册账号密码是否合法
	// * @param accountName
	// * @param passWord
	// * @return
	// */
	// public boolean canRegist(String accountName,String passWord){
	// if (!StringUtils.checkStr(1, accountName)) {
	// return false;
	// }
	// if (!StringUtils.checkStr(2, passWord)) {
	// return false;
	// }
	// return true;
	// }

	/**
	 * sdk登录
	 * @param sdkType
	 * @param sdkUserId
	 * @param ticket
	 * @param response
	 */
	public void sdkUserLogin(int sdkType, String sdkUId, String ticket, HttpServletResponse response) {
		//这个里根据sdkType执行验证逻辑
		// 是否已有账号，没有添加新记录
		String account = AccountUtils.createAccount(sdkType, sdkUId);
		SqlSession session = DbManager.getSession();
		try {
			UserBeanMapper mapper = session.getMapper(UserBeanMapper.class);
			UserBeanExample example = new UserBeanExample();
			example.createCriteria().andAccountNameEqualTo(account);
			List<UserBean> list = mapper.selectByExample(example);
			UserBean userBean = null;
			if (list == null || list.size() < 1) {// 添加新记录
				userBean = new UserBean();
				userBean.setAccountName(account);
				userBean.setPassword("0");
				userBean.setCreateTime(new Date());
				userBean.setState(0);
				mapper.insertSelective(userBean);
			} else {
				userBean = list.get(0);
				// 判断账号状态
				if (userBean.getState() != 0) {// 账号异常
					ResponseMsg.sendErrorMsg(ErrorCode.ACCOUNT_EXCEPTION, response);
					return;
				}
			}
			session.commit();

			// 获取推荐的服务器id
			Integer lastLoginServerId = userBean.getLastLoginServerId();
			ServerInfo serverInfo = null;
			if (lastLoginServerId == null) {// 如果是第一次登陆，取最后开服的服务器
				serverInfo = ServerCache.getLastServer();
			} else {// 不是第一次登陆，取上次登陆的服务器
				serverInfo = ServerCache.getServerInfoByServerId(lastLoginServerId);
				if(serverInfo == null){
					serverInfo = ServerCache.getLastServer();
				}
			}
			
			PbServerInfo.Builder serverInfoBuilder = PbServerInfo.newBuilder();

			serverInfoBuilder.setServerId(serverInfo.getBean().getServerId());
			serverInfoBuilder.setServerName(serverInfo.getBean().getServerName());
			serverInfoBuilder.setOpenTime(serverInfo.getBean().getOpenTime());
			serverInfoBuilder.setServerState(serverInfo.getServerState());
			UserLoginResponse_2002.Builder builder = UserLoginResponse_2002.newBuilder();

			builder.setIsSuccess(true);
			builder.setUserId(userBean.getUserId());
			builder.setServerInfo(serverInfoBuilder);

			Message msg = new Message();
			msg.setCmd(S2CMessageNum.USER_REGIST_LOGIN);
			msg.setBody(builder);
			ResponseMsg.sendMsg(msg, response);
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}

	}

	/**
	 * 用户登陆
	 * 
	 * @param msg
	 * @param response
	 */
	public void userLogin(String accountName, String password, HttpServletResponse response) {
		// 验证账号是否符合规定
		if (!StringUtils.checkStr(1, accountName)) {
			return;
		}
		// 验证密码是否符合规定
		if (!StringUtils.checkStr(2, password)) {
			return;
		}
		// 是否已有账号，没有添加新记录
		SqlSession session = DbManager.getSession();
		try {
			UserBeanMapper mapper = session.getMapper(UserBeanMapper.class);
			UserBeanExample example = new UserBeanExample();
			example.createCriteria().andAccountNameEqualTo(accountName);
			List<UserBean> list = mapper.selectByExample(example);
			UserBean userBean = null;
			if (list == null || list.size() < 1) {// 添加新记录
				userBean = new UserBean();
				userBean.setAccountName(accountName);
				userBean.setPassword(password);
				userBean.setCreateTime(new Date());
				userBean.setState(0);
				mapper.insertSelective(userBean);
			} else {
				userBean = list.get(0);
				// 判断账号状态
				if (userBean.getState() != 0) {// 账号异常
					ResponseMsg.sendErrorMsg(ErrorCode.ACCOUNT_EXCEPTION, response);
					return;
				}
			}
			session.commit();

			// 获取推荐的服务器id
			Integer lastLoginServerId = userBean.getLastLoginServerId();
			ServerInfo serverInfo = null;
			if (lastLoginServerId == null) {// 如果是第一次登陆，取最后开服的服务器
				serverInfo = ServerCache.getLastServer();
			} else {// 不是第一次登陆，取上次登陆的服务器
				serverInfo = ServerCache.getServerInfoByServerId(lastLoginServerId);
			}
			PbServerInfo.Builder serverInfoBuilder = PbServerInfo.newBuilder();

			serverInfoBuilder.setServerId(serverInfo.getBean().getServerId());
			serverInfoBuilder.setServerName(serverInfo.getBean().getServerName());
			serverInfoBuilder.setOpenTime(serverInfo.getBean().getOpenTime());
			serverInfoBuilder.setServerState(serverInfo.getServerState());
			UserLoginResponse_2002.Builder builder = UserLoginResponse_2002.newBuilder();

			builder.setIsSuccess(true);
			builder.setUserId(userBean.getUserId());
			builder.setServerInfo(serverInfoBuilder);

			Message msg = new Message();
			msg.setCmd(S2CMessageNum.USER_REGIST_LOGIN);
			msg.setBody(builder);
			ResponseMsg.sendMsg(msg, response);
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}

	/** 获取服务器列表 */
	public void getServerList(HttpServletResponse response) {
		GetServerListResponse_2003.Builder builder = GetServerListResponse_2003.newBuilder();
		List<PbServerInfo> list = new ArrayList<>();

		List<ServerInfo> serverInfoList = ServerCache.getServerInfoList();
		for (int i = 0; i < serverInfoList.size(); i++) {
			ServerInfo serverInfo = serverInfoList.get(i);
			PbServerInfo.Builder serverInfoBuilder = PbServerInfo.newBuilder();

			serverInfoBuilder.setServerId(serverInfo.getBean().getServerId());
			serverInfoBuilder.setServerName(serverInfo.getBean().getServerName());
			serverInfoBuilder.setOpenTime(serverInfo.getBean().getOpenTime());
			serverInfoBuilder.setServerState(serverInfo.getServerState());

			list.add(serverInfoBuilder.build());
		}
		builder.addAllPbServerInfoList(list);

		Message msg = new Message();
		msg.setCmd(S2CMessageNum.GET_SERVER_LIST);
		msg.setBody(builder);

		ResponseMsg.sendMsg(msg, response);
	}

	/** 获取服务器地址 */
	public void getServerUrl(Message msg, HttpServletResponse response) {
		GetServerUrlRequest_1004 req = msg.getBody();
		int serverId = req.getServerId();
		long userId = req.getUserId();
		ServerInfo serverInfo = ServerCache.getServerInfoMap().get(serverId);
		// 状态不为1表示游戏服务器没有正常运行
		// if (serverInfo.getServerState() != 1) {
		// ResponseMsg.sendErrorMsg(ErrorCode.SERVER_NOT_OPEN, response);
		// return;
		// }
		String serverIp = serverInfo.getBean().getServerIp();
		int serverPort = serverInfo.getBean().getServerPort();
		String serverAddress = serverInfo.getBean().getServerAddress();

		// 生成token
		String token = createToken(userId, serverId);
		GetServerUrlResponse_2004.Builder builder = GetServerUrlResponse_2004.newBuilder();
		builder.setServerIp(serverIp);
		builder.setServerPort(serverPort);
		builder.setServerAddress(serverAddress);
		builder.setToken(token);

		msg = new Message();
		msg.setCmd(S2CMessageNum.GET_SERVER_URL);
		msg.setBody(builder);
		ResponseMsg.sendMsg(msg, response);

		// 记录本次登陆的服务器id
		UserBean userBean = new UserBean();
		userBean.setUserId(userId);
		userBean.setLastLoginServerId(serverId);

		SqlSession session = DbManager.getSession();
		try {
			UserBeanMapper mapper = session.getMapper(UserBeanMapper.class);
			mapper.updateByPrimaryKeySelective(userBean);
			session.commit();

		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}

	/**
	 * 生成token
	 * 
	 * @return
	 */
	public static String createToken(long userId, int serverId) {
		StringBuilder sb = new StringBuilder();

		String token = sb.append(System.currentTimeMillis()).append("_").append(serverId).append("_").append(userId)
				.toString();
		DesUtils des = new DesUtils(String.valueOf(userId));
		return des.encrypt(token);
	}
}
