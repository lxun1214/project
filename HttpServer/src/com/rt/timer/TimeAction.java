package com.rt.timer;

import java.util.Timer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import com.rt.log.LogManager;

/** 定时器 */
public class TimeAction implements ServletContextListener {

	Logger log = Logger.getLogger(TimeAction.class);

	private Timer timer = null;

	private static final long FIVE_MINUTES = 1000 * 60 * 5;

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		if (timer != null) {
			timer.cancel();
			arg0.getServletContext().log("定时器被销毁...");
		}
		LogManager.getInstance().shutDown();

//		System.out.println("-----------------------------");
//		long start = System.currentTimeMillis();
//		Map<Long, IPlayer> playerMap = GameCache.getPlayerMap();
//		Iterator<Entry<Long, IPlayer>> iter = playerMap.entrySet().iterator();
//		SqlSession session = DbManager.getSession();
//		try {
//			PlayerBeanMapper mapper = session.getMapper(PlayerBeanMapper.class);
//			int count = 0;
//			while (iter.hasNext()) {
//				Entry<Long, IPlayer> entry = iter.next();
//				IPlayer player = entry.getValue();
//				PlayerBeanWithBLOBs playerBean = new PlayerBeanWithBLOBs();
//				player.byteWrite(playerBean);
//
//				mapper.updateByPrimaryKeySelective(playerBean);
//				count++;
//				if (count % 100 == 0) {
//					session.commit();
//				}
//			}
//			if (count % 100 != 0) {
//				session.commit();
//			}
//			long end = System.currentTimeMillis();
//			log.info("玩家信息停服存库完成。。。" + "\t" + count + "条数据，" + "\t 耗时：" + (end - start) + "毫秒");
//
//			// 工会存库
//			System.out.println("-----------------------------------------");
//			GuildManager.getInstance().timeInsertGuild();
//			log.info("工会信息停服存库完成。。。");
//			
//			
//			//奖励信息
//			PropManager.getPropManager().timeInsertProp();
//			PropManager.getPropManager().timeInsertPropPlayer();
//			log.info("道具奖励停服存库完成。。。");
//		} catch (Exception e) {
//			session.rollback();
//		} finally {
//			session.close();
//		}
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// true:守护线程
		timer = new Timer(true);
		arg0.getServletContext().log("启动定时器完成...");

		timer.schedule(new PlayerUpdateDbTimeAction(), FIVE_MINUTES, FIVE_MINUTES);
		arg0.getServletContext().log("player定时存库任务添加完成...");
	}
}
