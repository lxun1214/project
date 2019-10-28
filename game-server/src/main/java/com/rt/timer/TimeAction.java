package com.rt.timer;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import com.rt.common.GameConst;

/** 定时器 */
public class TimeAction implements ServletContextListener {

	Logger log = Logger.getLogger(TimeAction.class);

	private Timer timer = null;

	private static final long FIVE_MINUTES = 1000 * 60 * 5;

	// 时间间隔(一天)
	private static final long PERIOD_DAY = 24 * 60 * 60 * 1000;

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		if (timer != null) {
			timer.cancel();
			arg0.getServletContext().log("定时器被销毁...");
		}
		// LogManager.getInstance().shutDown();

		// System.out.println("-----------------------------");
		// long start = System.currentTimeMillis();
		// Map<Long, IPlayer> playerMap = GameCache.getPlayerMap();
		// Iterator<Entry<Long, IPlayer>> iter =
		// playerMap.entrySet().iterator();
		// SqlSession session = DbManager.getSession();
		// try {
		// PlayerBeanMapper mapper = session.getMapper(PlayerBeanMapper.class);
		// int count = 0;
		// while (iter.hasNext()) {
		// Entry<Long, IPlayer> entry = iter.next();
		// IPlayer player = entry.getValue();
		// PlayerBeanWithBLOBs playerBean = new PlayerBeanWithBLOBs();
		// player.byteWrite(playerBean);
		//
		// mapper.updateByPrimaryKeySelective(playerBean);
		// count++;
		// if (count % 100 == 0) {
		// session.commit();
		// }
		// }
		// if (count % 100 != 0) {
		// session.commit();
		// }
		// long end = System.currentTimeMillis();
		// log.info("玩家信息停服存库完成。。。" + "\t" + count + "条数据，" + "\t 耗时：" + (end -
		// start) +
		// "毫秒");
		//
		// // 工会存库
		// System.out.println("-----------------------------------------");
		// GuildManager.getInstance().timeInsertGuild();
		// log.info("工会信息停服存库完成。。。");
		//
		//
		// //奖励信息
		// PropManager.getPropManager().timeInsertProp();
		// PropManager.getPropManager().timeInsertPropPlayer();
		// log.info("道具奖励停服存库完成。。。");
		// } catch (Exception e) {
		// session.rollback();
		// } finally {
		// session.close();
		// }
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// true:守护线程
		timer = new Timer(true);
		arg0.getServletContext().log("启动定时器完成...");

		timer.schedule(new PlayerUpdateDbTimeAction(), FIVE_MINUTES, FIVE_MINUTES);
		timer.schedule(new HeartBeatTimerTask(), GameConst.HERAT_BEAT_TIME, GameConst.HERAT_BEAT_TIME);
		timer.schedule(new RankListTimeTask(),getDate(), PERIOD_DAY);
		//商城，0点推送刷新购买次数，先注释掉，等测完放开
		//timer.schedule(new StoreTimeTask(),getDate(), PERIOD_DAY);
		//这个是测试用的，5分钟推一次
		timer.schedule(new StoreTimeTask(),new Date(), 1000 * 60 * 5);
		
		arg0.getServletContext().log("player定时存库任务添加完成...");
	}

	public Date getDate() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.HOUR_OF_DAY, 0); // 凌晨0点
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		Date date = calendar.getTime(); // 第一次执行定时任务的时间
		// 如果第一次执行定时任务的时间 小于当前的时间
		// 此时要在 第一次执定时任务的时行间加一天，以便此任务在下个时间点执行。
		// 如果不加一天，启动时间又过了的话，服务器启动任务会立即执行。
		if (date.before(new Date())) {
			calendar.add(Calendar.DAY_OF_MONTH, 1);
			date = calendar.getTime();
		}
	    return date;
	}
	public static void main(String[] args) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(format.format(new TimeAction().getDate()));
	}
}
