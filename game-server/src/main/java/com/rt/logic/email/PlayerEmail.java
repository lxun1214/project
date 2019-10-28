package com.rt.logic.email;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.rt.cache.ConfigCache;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.item.Item;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.PbBaseItemInfo;
import com.rt.pb.PbPlayer.PbPlayerEmailInfo;
import com.rt.utils.KV;

public class PlayerEmail {

	/** 用户邮件 key:邮件ID */
	private Map<Long, Email> playerEmailMap = new HashMap<>();

	/**
	 * 添加邮件
	 * 
	 * @param title
	 * @param content
	 * @param items
	 * @return
	 */
	public Email addEmail(long emailId, String title, String content, Map<Integer, Integer> items) {
		// 超出最大限制
		if (this.playerEmailMap.size() >= EmailConst.emailMaxSize) {
			return null;
		}
		if (this.playerEmailMap.containsKey(emailId)) {
			return null;
		}
		Email email = new Email();
		email.setEmailId(emailId);
		email.setEmailTitle(title);
		email.setEmailContent(content);
		email.setCreateTime(new Date().getTime());
		if (items != null && items.size() > 0) {
			email.setItems(items);
		}
		this.playerEmailMap.put(emailId, email);
		return email;
	}

	/**
	 * 一键删除邮件（只删除已领取奖励的邮件）
	 * 
	 * @param player
	 */
	public void delAllEmail(IPlayer player) {
		List<Long> emailIds = new ArrayList<>();
		for (Long emailId : this.playerEmailMap.keySet()) {
			Email email = this.playerEmailMap.get(emailId);
			if (email.getItemState() == 0 && email.getItems().size() > 0) {
				continue;
			}
			emailIds.add(emailId);

		}
		PlayerEmailMsg.sendDelEmailMsg(player.getPlayerId(), emailIds);
	}

	/**
	 * 删除邮件
	 * 
	 * @param player
	 * @param emailId
	 */
	public void delEmail(IPlayer player, long emailId) {
		this.playerEmailMap.remove(emailId);
		List<Long> emailIds = new ArrayList<>();
		emailIds.add(emailId);
		PlayerEmailMsg.sendDelEmailMsg(player.getPlayerId(), emailIds);
	}

	/**
	 * 一键领取邮件
	 * 
	 * @param player
	 */
	public void allReceiveEmailAward(IPlayer player) {
		List<Long> emailIds = new ArrayList<>();
		List<Item> changeItemList = null;
		for (Long emailId : this.playerEmailMap.keySet()) {
			Email email = this.playerEmailMap.get(emailId);
			if (email.getItemState() != 0) {
				continue;
			}
			if (email.getItems().size() < 1) {
				continue;
			}
			email.setReadState(1);
			email.setItemState(1);

			List<KV<Integer, Integer>> addItemList = new ArrayList<>();
			Map<Integer, KV<Integer, Integer>> map = new HashMap<>();
			for (Integer itemId : email.getItems().keySet()) {
				int num = email.getItems().get(itemId);
				// 合并重复的道具
				if (map.containsKey(itemId)) {
					KV<Integer, Integer> kv = map.get(itemId);
					int itemNum = kv.getV() + num;
					kv.setV(itemNum);
					continue;
				}
				map.put(itemId, new KV<Integer, Integer>(itemId, num));
			}
			addItemList.addAll(map.values());

			if (changeItemList == null) {
				changeItemList = new ArrayList<>();
			}
			changeItemList.addAll(player.getBag().addItem(addItemList, ItemConst.ITEM_GET_SCREEN));
			emailIds.add(emailId);
		}
		// 返回信息
		PlayerEmailMsg.sendReceiveEmailAwardMsg(player.getPlayerId(), emailIds);
		// 推送道具变化
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeItemList);
	}

	/**
	 * 领取邮件奖励
	 * 
	 * @param player
	 * @param emailId
	 */
	public void receiveEmailAward(IPlayer player, long emailId) {
		if (!playerEmailMap.containsKey(emailId)) {
			return;
		}
		Email email = this.playerEmailMap.get(emailId);
		if (email.getItemState() != 0) {
			// 已经领取过了，不能再领取
			return;
		}
		if (email.getItems().size() < 1) {
			// 没有奖励可领取
			return;
		}

		// 设置状态（有可能是纬度状态直接领取的，把读取状态也设置成已读）
		email.setReadState(1);
		email.setItemState(1);

		List<Item> changeItemList = null;
		List<KV<Integer, Integer>> addItemList = new ArrayList<>();
		Map<Integer, KV<Integer, Integer>> map = new HashMap<>();
		for (Integer itemId : email.getItems().keySet()) {
			int num = email.getItems().get(itemId);
			// 合并重复的道具
			if (map.containsKey(itemId)) {
				KV<Integer, Integer> kv = map.get(itemId);
				int itemNum = kv.getV() + num;
				kv.setV(itemNum);
				continue;
			}
			map.put(itemId, new KV<Integer, Integer>(itemId, num));
		}
		addItemList.addAll(map.values());
		changeItemList = player.getBag().addItem(addItemList, ItemConst.ITEM_GET_SCREEN);
		// 推送道具变化
		BagMsg.sendItemChangeMsg(player.getPlayerId(), changeItemList);
		// 返回信息
		List<Long> emailIds = new ArrayList<>();
		emailIds.add(emailId);
		PlayerEmailMsg.sendReceiveEmailAwardMsg(player.getPlayerId(), emailIds);
	}

	/**
	 * 读取邮件
	 * 
	 * @param player
	 * @param emailId
	 */
	public void readEmail(IPlayer player, long emailId) {
		if (!playerEmailMap.containsKey(emailId)) {
			return;
		}
		Email email = this.playerEmailMap.get(emailId);
		email.setReadState(1);
		PlayerEmailMsg.sendReadEmailMsg(player.getPlayerId(), emailId);

	}

	public List<PbPlayerEmailInfo> showPbPlayerEmailInfo(IPlayer player) {
		//刷新获取邮件
		refresh(player);
		List<PbPlayerEmailInfo> list = new ArrayList<>();
		Set<java.util.Map.Entry<Long, Email>> set = this.playerEmailMap.entrySet();
		Iterator<java.util.Map.Entry<Long, Email>> iterator = set.iterator();
		while (iterator.hasNext()) {
			java.util.Map.Entry<Long, Email> entry = iterator.next();
			Email email = entry.getValue();
			// 验证到期时间,只保留20天，3.超出时间的，不管是否领取一律删除。
			if ((email.getCreateTime() + EmailConst.delTime) < System.currentTimeMillis()) {
				iterator.remove();
				continue;
			}
			list.add(createPbPlayerEmailInfo(email).build());
		}

		return list;
	}

	public PbPlayerEmailInfo.Builder createPbPlayerEmailInfo(Email email) {
		PbPlayerEmailInfo.Builder builder = PbPlayerEmailInfo.newBuilder();
		builder.setEmailId(email.getEmailId());
		builder.setEmailTitle(email.getEmailTitle());
		builder.setEmailContent(email.getEmailContent());

		if (email.getItems().size() > 0) {
			List<PbBaseItemInfo> itemList = new ArrayList<>();
			for (Integer itemId : email.getItems().keySet()) {
				PbBaseItemInfo.Builder itemBuild = PbBaseItemInfo.newBuilder();
				itemBuild.setItemId(itemId);
				itemBuild.setItemNum(email.getItems().get(itemId));
				itemList.add(itemBuild.build());
			}
			builder.addAllItemList(itemList);
		}
		builder.setReadState(email.getReadState());
		builder.setItemState(email.getItemState());
		builder.setCreateTime(email.getCreateTime());
		return builder;
	}

	/**
	 * 刷新 新的邮件
	 */
	public void refresh(IPlayer player) {
		for (Long emailId : ConfigCache.systemEmailMap.keySet()) {
			SystemEmail semail = ConfigCache.systemEmailMap.get(emailId);
			if (semail.getEndTime().getTime() < System.currentTimeMillis()) {
				continue;
			}
			if (semail.getStartTime().getTime() > System.currentTimeMillis()) {
				continue;
			}
			if (this.playerEmailMap.containsKey(semail.getEmailId())) {
				//已经获取过
				continue;
			}
			if(semail.getReceivePlayerIdList().contains(player.getPlayerId())){
				//说明玩家获取过后删除了，不让获取，返回
				continue;
			}
			//具体用户邮件
			if(semail.getEmailType() == EmailConst.PALERY_LIMIT){
				if(!semail.getPlayerNameList().contains(player.getPlayerName())){
					//如果不是自己邮件，返回
					continue;
				}
			}
		    this.addEmail(emailId, semail.getEmailTitle(), semail.getContent(), semail.getItems());
		    semail.getReceivePlayerIdList().add(player.getPlayerId());
		}
	}

	public Map<Long, Email> getPlayerEmailMap() {
		return playerEmailMap;
	}

	public void setPlayerEmailMap(Map<Long, Email> playerEmailMap) {
		this.playerEmailMap = playerEmailMap;
	}

}
