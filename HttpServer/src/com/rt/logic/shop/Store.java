package com.rt.logic.shop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.cache.ConfigCache;
import com.rt.gloable.Response;
import com.rt.logic.item.Item;
import com.rt.logic.player.IPlayer;
import com.rt.logic.shop.config.data.StoreConfig;
import com.rt.pb.PbPlayer.PbStorePurchaseInfo;
import com.rt.utils.KV;
import com.rt.utils.TimeUtils;

/**
 * 商城，用户购买商品次数信息
 * 
 * @author MaHaiDong
 *
 */
public class Store {

	/** 永久购买限制的信息 key:商品ID，value:已购买数量 */
	Map<Integer, Integer> storelimitPlayerMap = new HashMap<>();

	/** 每日购买限制的信息 key:商品ID，value:已购买数量 */
	Map<Integer, Integer> storelimitPlayerDayMap = new HashMap<>();

	/** 最后购买的时间（一年当中的第几天，就不考虑跨年了） */
	int lastDay;

	/** 每日次数刷新 */
	public void checkStoreBuyNum() {
		if (lastDay != TimeUtils.getToday()) {
			storelimitPlayerDayMap.clear();
			lastDay = TimeUtils.getToday();
		}
	}

	/**
	 * 购买商品
	 * 
	 * @param player
	 * @param seqId
	 * @param num
	 * @param response
	 * @return
	 */
	public void buyStoreGoods(IPlayer player, int seqId, int num, Response response) {
		checkStoreBuyNum();
		StoreConfig config = ConfigCache.storeMap.get(seqId);
		if (config == null || num < 1) {
			return;
		}
		int buyNum = 0;
		List<Item> changeList = null;
		// 如果是永久限制商品
		if (config.limitPlayerNum > 0) {
			if (storelimitPlayerMap.containsKey(seqId)) {
				buyNum = storelimitPlayerMap.get(seqId);
			}
			buyNum += num;
			if (config.limitPlayerNum < buyNum) {
				// 超出购买限制，返回
				StoreMsg.buyGoodsMsg(false, changeList, response);
				return;
			}
		}
		// 每日限制商品
		if (config.limitPlayerDayNum > 0) {
			if (storelimitPlayerDayMap.containsKey(seqId)) {
				buyNum = storelimitPlayerDayMap.get(seqId);
			}
			buyNum += num;
			if (config.limitPlayerDayNum < buyNum) {
				// 超出购买限制，返回
				StoreMsg.buyGoodsMsg(false, changeList, response);
				return;
			}
		}
		// 根据货币类型验证货币（策划说，只有钻石和竞技币）
		if (config.consume.equals(StoreConst.STORE_DIAMOND)) {
			if (player.getDiamond() < config.consumeNum) {
				// 钻石不足返回
				StoreMsg.buyGoodsMsg(false, changeList, response);
				return;
			}
			// 减去货币
			player.addDelDiamond(-config.consumeNum);
		} else if (config.consume.equals(StoreConst.STORE_SPORTS_MONEY)) {
			if (player.getSportsMoney() < config.consumeNum) {
				// 竞技币不足返回
				StoreMsg.buyGoodsMsg(false, changeList, response);
				return;
			}
			// 减去货币
			player.addDelSportsMoney(-config.consumeNum);
		}

		// 如果是限制商品，保存购买次数
		if (buyNum > 0) {
			addStoreNum(seqId, buyNum);
		}
		// 加道具
		List<KV<Integer, Integer>> addItemList = new ArrayList<>();
		KV<Integer, Integer> kv = new KV<Integer, Integer>(config.goods, num);
		addItemList.add(kv);
		changeList = player.getBag().addItem(addItemList);
		StoreMsg.buyGoodsMsg(true, changeList, response);
	}

	/**
	 * 保存购买次数
	 * 
	 * @param seqId
	 * @param num
	 */
	public void addStoreNum(int seqId, int buyNum) {
		StoreConfig config = ConfigCache.storeMap.get(seqId);
		// 永久限制商品
		if (config.limitPlayerNum > 0) {
			storelimitPlayerMap.put(seqId, buyNum);
		}
		// 每日限制商品
		if (config.limitPlayerDayNum > 0) {
			storelimitPlayerDayMap.put(seqId, buyNum);
		}
	}

	public List<PbStorePurchaseInfo> showStoreInfos() {
		List<PbStorePurchaseInfo> list = new ArrayList<>();
		// 永久限制
		for (Integer seqId : storelimitPlayerMap.keySet()) {
			PbStorePurchaseInfo.Builder builder = PbStorePurchaseInfo.newBuilder();
			builder.setSeqId(seqId);
			builder.setLimitPlayerNum(storelimitPlayerMap.get(seqId));
			list.add(builder.build());
		}
		// 每日限制
		for (Integer seqId : storelimitPlayerDayMap.keySet()) {
			PbStorePurchaseInfo.Builder builder = PbStorePurchaseInfo.newBuilder();
			builder.setSeqId(seqId);
			builder.setLimitPlayerNum(storelimitPlayerDayMap.get(seqId));
			list.add(builder.build());
		}
		return list;
	}

	public Map<Integer, Integer> getStorelimitPlayerMap() {
		return storelimitPlayerMap;
	}

	public void setStorelimitPlayerMap(Map<Integer, Integer> storelimitPlayerMap) {
		this.storelimitPlayerMap = storelimitPlayerMap;
	}

	public Map<Integer, Integer> getStorelimitPlayerDayMap() {
		return storelimitPlayerDayMap;
	}

	public void setStorelimitPlayerDayMap(Map<Integer, Integer> storelimitPlayerDayMap) {
		this.storelimitPlayerDayMap = storelimitPlayerDayMap;
	}

	public int getLastDay() {
		return lastDay;
	}

	public void setLastDay(int lastDay) {
		this.lastDay = lastDay;
	}
	
}
