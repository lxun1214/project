package com.rt.gloable.managerGM.task;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;

import com.rt.cache.ConfigCache;
import com.rt.cache.GameCache;
import com.rt.db.domain.SystemEmailBean;
import com.rt.db.mapper.SystemEmailBeanMapper;
import com.rt.gloable.DbManager;
import com.rt.logic.email.Email;
import com.rt.logic.email.PlayerEmailMsg;
import com.rt.logic.email.SystemEmail;
import com.rt.logic.player.IPlayer;
import com.rt.utils.FastJsonUtils;

public class SendEmailTask implements Runnable {

	private Logger log = Logger.getLogger(SendEmailTask.class);

	SystemEmail systemEmail;

	public SendEmailTask(SystemEmail systemEmail) {
		this.systemEmail = systemEmail;
	}

	@Override
	public void run() {
		// 先存库
		SqlSession session = DbManager.getSession();
		try {
			SystemEmailBeanMapper mapper = session.getMapper(SystemEmailBeanMapper.class);
			SystemEmailBean bean = new SystemEmailBean();
			bean.setEmailId(systemEmail.getEmailId());
			bean.setEmailValue(FastJsonUtils.toJSONString(systemEmail));
			mapper.insert(bean);
			session.commit();
		} catch (Exception e) {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			e.printStackTrace(new PrintStream(baos));
			String exception = baos.toString();
			log.error(exception);
		} finally {
			session.close();
		}
		// 检测所有玩家在线，推送
		if (systemEmail.getEmailType() == 2) {
			// 具体用户有
			for (int i = 0; i < systemEmail.getPlayerNameList().size(); i++) {
				String playerName = systemEmail.getPlayerNameList().get(i);
				IPlayer player = GameCache.getIPlayerByPlayerName(playerName);
				if (player != null) {
					saveSendEmail(player);
				}
			}
		} else if (systemEmail.getEmailType() == 1) {
			// 全体用户

			Set<Entry<Long, IPlayer>> set = GameCache.playerMap.entrySet();
			Iterator<Entry<Long, IPlayer>> iterator = set.iterator();
			while (iterator.hasNext()) {
				java.util.Map.Entry<Long, IPlayer> entry = iterator.next();
				IPlayer player = entry.getValue();
				if (player != null) {
					if (GameCache.playerWsMap.containsKey(player.getPlayerId())) {
						saveSendEmail(player);
					}
				}
			}
		}

		ConfigCache.systemEmailMap.put(systemEmail.getEmailId(), systemEmail);
	}

	void saveSendEmail(IPlayer player) {
		Email email = player.getPlayerEmail().addEmail(systemEmail.getEmailId(), systemEmail.getEmailTitle(),
				systemEmail.getContent(), systemEmail.getItems());
		systemEmail.getReceivePlayerIdList().add(player.getPlayerId());
		PlayerEmailMsg.sendAddEmailChange(player.getPlayerId(), player.getPlayerEmail().createPbPlayerEmailInfo(email));
	}

}
