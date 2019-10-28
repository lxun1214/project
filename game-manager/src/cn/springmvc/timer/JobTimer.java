package cn.springmvc.timer;

import java.util.Map;

import org.apache.log4j.Logger;

import cn.springmvc.cache.ConfigCache;
import cn.springmvc.cache.ServerCache;
import cn.springmvc.controller.webutil.SpringUtil;
import cn.springmvc.entry.Server;
import cn.springmvc.model.game.GameCodeKey;
import cn.springmvc.redis.RedisClient;
import cn.springmvc.service.sys.GameService;
import cn.springmvc.utils.RedisKeyUtils;

/**
 * 定时器
 * @author MaHaiDong
 * 2018年6月6日
 *
 */
public class JobTimer {
	
	GameService gameService;
	
    private final static Logger log = Logger.getLogger(JobTimer.class);

    public void work() {
    	log.debug("开始执行定时器......................................................");
    	if(gameService ==null){
    		gameService = (GameService) SpringUtil.getBean("gameService");
    	}
    	for(Server server:ServerCache.getServerList()){
    		RedisClient client = ConfigCache.redisMap.get(server.getServerId());
    		Map<String, String> map = client.getMapByKey(RedisKeyUtils.USE_GIFT_CODE_KEY);
    		System.out.println(map);
    		if(map == null){
    			continue;
    		}
    		for(String code:map.keySet()){
    			GameCodeKey codeKey = new GameCodeKey();
    			codeKey.setCode(code);
    			codeKey.setState(1);
    			gameService.updateCodeKey(codeKey);
    		}
    	}
    }

}
