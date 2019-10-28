package com.rt.logic;

import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;

import com.rt.cache.ServerCache;
import com.rt.cache.ServerInfo;
import com.rt.common.Message;
import com.rt.db.domain.ServerInfoBean;
import com.rt.db.mapper.ServerInfoBeanMapper;
import com.rt.gloable.DbManager;
import com.rt.pb.PbSs.GameServerStartRequest;

/**
 * 游戏服务器相关逻辑类
 * @author xin.fengtao
 *
 */
public class ServerLogic {
	
	private static ServerLogic instance;

	public synchronized static ServerLogic getInstance() {
		if (instance == null) {
			instance = new ServerLogic();
		}
		return instance;
	}
	
	/**游戏服务器向登陆服务器注册*/
	public void gameServerRegist(Message msg, HttpServletResponse response){
		
		GameServerStartRequest req = msg.getBody();
		int serverId = req.getServerId();
		
		ServerInfo serverInfo = ServerCache.getServerInfoMap().get(serverId);
		if(serverInfo == null){
			SqlSession session = DbManager.getSession();
			try {
				ServerInfoBeanMapper mapper = session.getMapper(ServerInfoBeanMapper.class);
				ServerInfoBean bean = mapper.selectByPrimaryKey(serverId);
				session.commit();
				if(bean == null){
					return;
				}
				serverInfo = ServerCache.addServer(bean);
				//1表示服务器状态正常
				serverInfo.setServerState(1);
				
			} catch (Exception e) {
				e.printStackTrace();
			}finally {
				session.close();
			}
		}else{
			serverInfo.setServerState(1);
		}
	}
	
	
	/**游戏服务器向登录服务器发送停服消息*/
	public void gameServerStop(Message msg, HttpServletResponse response){
		GameServerStartRequest req = msg.getBody();
		int serverId = req.getServerId();
		
		ServerInfo serverInfo = ServerCache.getServerInfoMap().get(serverId);
		if(serverInfo == null){
			SqlSession session = DbManager.getSession();
			try {
				ServerInfoBeanMapper mapper = session.getMapper(ServerInfoBeanMapper.class);
				ServerInfoBean bean = mapper.selectByPrimaryKey(serverId);
				session.commit();
				if(bean == null){
					return;
				}
				serverInfo = ServerCache.addServer(bean);
				//2标识停服
				serverInfo.setServerState(2);
				
			} catch (Exception e) {
				e.printStackTrace();
			}finally {
				session.close();
			}
		}else{
			serverInfo.setServerState(2);
		}
	}
	
}
