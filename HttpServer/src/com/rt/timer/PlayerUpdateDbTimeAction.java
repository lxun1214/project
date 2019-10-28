package com.rt.timer;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TimerTask;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;

import com.rt.cache.GameCache;
import com.rt.db.domain.PlayerBeanWithBLOBs;
import com.rt.db.mapper.PlayerBeanMapper;
import com.rt.gloable.DbManager;
import com.rt.logic.arena.Fight;
import com.rt.logic.player.IPlayer;

/**player定时存库*/
public class PlayerUpdateDbTimeAction extends TimerTask{
	Logger log = Logger.getLogger(PlayerUpdateDbTimeAction.class);
	/**心跳时间*/
	final int MINUTE3 = 1000 * 60 * 60 * 24;
	@Override
	public void run() {
		
		// TODO 优化为LRUMap
		
		long start = System.currentTimeMillis();
		long curTime = System.currentTimeMillis();
		Map<Long,IPlayer> playerMap = GameCache.playerMap;
		if(playerMap == null || playerMap.size() == 0){
			return;
		}
		Iterator<Entry<Long,IPlayer>> iter = playerMap.entrySet().iterator();
		SqlSession session = DbManager.getSession();
		List<IPlayer> removeList = new ArrayList<>();
		try {
			PlayerBeanMapper mapper = session.getMapper(PlayerBeanMapper.class);
			int count = 0;
			while (iter.hasNext()) {
				Entry<Long, IPlayer> entry = iter.next();
				IPlayer player = entry.getValue();
				if(!player.isSaveDb(curTime)){
					continue;
				}
				PlayerBeanWithBLOBs playerBean = player.initPlayerBean();
				//更新数据库
				mapper.updateByPrimaryKeySelective(playerBean);
				//更新redis
				player.addRedisMap();
				
				//超过3分钟没有收到消息在内存中移除
				if(GameCache.userUUIdMap.get(player.getUuid()).getLastOperateTime() + MINUTE3 < curTime){
					removeList.add(player);
				}
				count ++;
				if(count % 100 == 0){
					session.commit();
					for(int i = 0;i < removeList.size();i++){
						IPlayer p = removeList.get(i);
						GameCache.playerMap.remove(p.getPlayerId());
						GameCache.delUserPo(p.getUuid());
						//删除战斗状态
						Fight fight=GameCache.fightPlayerMap.remove(p.getPlayerId());
						if(fight!=null){
							GameCache.fightPlayerMap.remove(fight.getFightTargetDetailInfo().getOtherPlayerId());
						}
					}
					removeList.clear();
				}
			}
			if(count % 100 != 0){
				session.commit();
				for(int i = 0;i < removeList.size();i++){
					IPlayer p = removeList.get(i);
					GameCache.playerMap.remove(p.getPlayerId());
					GameCache.delUserPo(p.getUuid());
				}
				removeList.clear();
			}
			long end = System.currentTimeMillis();
			log.info("player定时存库完成。。。" + "\t" + count + "条数据，" + "\t 耗时：" + (end - start) + "毫秒");
			
		} catch (Exception e) {
			log.error("player定时存库发生异常");
			session.rollback();
			e.printStackTrace();
		}finally{
			session.close();
		}
	}
	
}
