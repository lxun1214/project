package com.rt.timer;

import java.util.Map;
import java.util.TimerTask;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;

import com.rt.cache.GameCache;
import com.rt.db.domain.PlayerBeanWithBLOBs;
import com.rt.db.mapper.PlayerBeanMapper;
import com.rt.gloable.DbManager;
import com.rt.logic.arena.Fight;
import com.rt.logic.player.IPlayer;

/** player定时存库 */
public class PlayerUpdateDbTimeAction extends TimerTask {

	Logger log = Logger.getLogger(PlayerUpdateDbTimeAction.class);

	@Override
	public void run() {

		// TODO 优化为LRUMap

		long start = System.currentTimeMillis();
		long curTime = System.currentTimeMillis();
		Map<Long, IPlayer> playerMap = GameCache.playerMap;
		if (playerMap == null || playerMap.size() == 0) {
			return;
		}
		SqlSession session = DbManager.getSession();
		try {
			PlayerBeanMapper mapper = session.getMapper(PlayerBeanMapper.class);
			int count = 0;
			for (Map.Entry<Long, IPlayer> entry : playerMap.entrySet()) {
				IPlayer player = entry.getValue();
				if (!player.isSaveDb(curTime)) {
					continue;
				}
				player.setLastLoginTime(System.currentTimeMillis());
				PlayerBeanWithBLOBs playerBean = player.initPlayerBean();
				// 更新数据库
				mapper.updateByPrimaryKeySelective(playerBean);
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
			long end = System.currentTimeMillis();
			log.info("player定时存库完成。。。" + "\t" + count + "条数据，" + "\t 耗时：" + (end - start) + "毫秒");

		} catch (Exception e) {
			log.error("player定时存库发生异常");
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}

}
