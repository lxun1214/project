package com.rt.gloable.managerGM;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;

import com.rt.cache.GameCache;
import com.rt.db.domain.PlayerBeanWithBLOBs;
import com.rt.db.mapper.PlayerBeanMapper;
import com.rt.gloable.DbManager;
import com.rt.logic.arena.Fight;
import com.rt.logic.player.IPlayer;

/**
 * Servlet implementation class SaveDB
 */
@WebServlet("/saveDB")
public class SaveDB extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	Logger log = Logger.getLogger(SaveDB.class);
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveDB() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin","*");
		response.setHeader("Content-Type", "application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter _out = response.getWriter();
		Map<Long, IPlayer> playerMap = GameCache.playerMap;
		SqlSession session = DbManager.getSession();
		try {
			PlayerBeanMapper mapper = session.getMapper(PlayerBeanMapper.class);
			int count = 0;
			for (Map.Entry<Long, IPlayer> entry : playerMap.entrySet()) {
				IPlayer player = entry.getValue();
				
				PlayerBeanWithBLOBs playerBean = player.initPlayerBean();
				// 更新数据库
				mapper.updateByPrimaryKeySelective(playerBean);
				log.info(playerBean.getPlayerName() + "存库完成。。。。。。。。。");
				// 更新redis
				player.addRedisMap();
				
				if (!GameCache.playerWsMap.containsKey(player.getPlayerId())) {
					GameCache.playerUserIdMap.remove(player.getUserId());
					GameCache.playerMap.remove(player.getPlayerId());
					// 删除战斗状态
					Fight fight = GameCache.fightPlayerMap.remove(player.getPlayerId());
					if (fight != null) {
						GameCache.fightPlayerMap.remove(fight.getFightTargetDetailInfo().getOtherPlayerId());
					}
				}
				count++;
				if (count % 100 == 0) {
					session.commit();
				}
			}
			if (count % 100 != 0) {
				session.commit();
			}
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		_out.print("success");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
