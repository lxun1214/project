package com.rt.timer;

import java.util.Iterator;
import java.util.Set;
import java.util.TimerTask;

import com.rt.cache.GameCache;
import com.rt.logic.player.PlayerMsg;
import com.rt.redis.RedisClient;
import com.rt.utils.RedisKeyUtils;

/**
 * 排行榜相关定时器
 *
 */
public class RankListTimeTask extends TimerTask {

	@Override
	public void run() {
		String setKey = RedisKeyUtils.getArenaSetKey();
		// 取出昨天的竞技排行所有人(目前策划定的前99999)
		Set<String> sets = RedisClient.zangeByScore(setKey, 0, 99998);
		String mapKey = RedisKeyUtils.RANKING_SPORT_REWARD_KEY;
		// 清除上次排名奖励数据
		RedisClient.delJedis(mapKey);
		// 名次
		int rankingNum = 1;
		Iterator<String> it = sets.iterator();
		while (it.hasNext()) {
			String playerId = it.next();
			RedisClient.hSetValue(mapKey, playerId, String.valueOf(rankingNum));
			rankingNum++;
			// 判断是否是机器人
			if (GameCache.rankingRobotSets.contains(playerId)) {
				continue;
			}
			// 检查是否在线，如果在线,推送消息
			if(GameCache.playerWsMap.containsKey(Long.parseLong(playerId))){
				PlayerMsg.sendRankingRewardChange(Long.parseLong(playerId));
			}
		}

	}

}
