package com.rt.log;

import com.dataeye.sdk.client.domain.TaskType;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.AccountType;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.PlatformType;
import com.rt.cache.ConfigCache;
import com.rt.cache.GameCache;
import com.rt.gloable.ServerInfo;
import com.rt.log.model.PlayerLogModel;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.item.data.ItemConfig;
import com.rt.logic.player.CurrencyConst;

public class LogUtils {

	/** 创建用户日志实体 */
	public static void createPlayerLogModel(long playerId, int channelId, int systemType) {
		PlayerLogModel model = new PlayerLogModel(String.valueOf(playerId), getSystemType(systemType),
				getAccountType(channelId), String.valueOf(ServerInfo.serverId), String.valueOf(channelId));
		GameCache.logModelMap.put(playerId, model);
	}

	public static PlatformType getSystemType(int systemType) {
		if (systemType == 0)
			return PlatformType.ADR;
		return PlatformType.IOS;
	}

	/** 获取账号类型 */
	public static AccountType getAccountType(int channelId) {
		switch (channelId) {
		case 1001:
			return AccountType.Type1;
		case 1002:
			return AccountType.Type2;
		case 1003:
			return AccountType.Type3;
		case 1004:
			return AccountType.Type4;
		case 1005:
			return AccountType.Type5;
		case 1006:
			return AccountType.Type6;
		case 1007:
			return AccountType.Type7;
		case 1008:
			return AccountType.Type8;
		case 1009:
			return AccountType.Type9;
		case 1010:
			return AccountType.Type10;
		default:
			return AccountType.Registered;// 游戏自身注册用户
		}

	}

	/**
	 * 获取任务类型
	 * 
	 * @param taskType
	 * @return
	 */
	public static TaskType getTaskType(int taskType) {
		switch (taskType) {
		case 1:
			return TaskType.Activity;// dataeye是活动任务类型
		case 2:
			return TaskType.Other;// dataeye是其他类型，这里是闯关任务类型
		default:
			break;
		}
		return null;
	}

	/**
	 * 获取道具类型
	 * 
	 * @param tab
	 * @return
	 */
	public static String getItemType(int itemId) {
		ItemConfig item = ConfigCache.itemConfigMap.get(itemId);
		switch (item.itemType) {
		case 1:
			return "宝石";
		case 2:
			return "装备";
		case 3:
			return "神器";
		case 4:
			return "道具";
		default:
			break;
		}
		return "未知" + item.itemType;
	}

	/**
	 * 获取虚拟币类型
	 * 
	 * @param currencyType
	 * @return
	 */
	public static String getCoinType(String currencyType) {
		if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
			return "金币";
		} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
			return "钻石";
		} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
			return "竞技币";
		} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
			return "技能玉";
		} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
			return "神器强化石头";
		} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
			return "装备强化石";
		}
		return currencyType;
	}

	/**
	 * 获取物品获得方式
	 * 
	 * @param getType
	 * @return
	 */
	public static String getItemGetType(int getType) {
		switch (getType) {
		case ItemConst.ITEM_GET_GM:
			return "gm指令获得";
		case ItemConst.ITEM_GET_SCREEN:
			return "关卡获得";
		case ItemConst.ITEM_GET_PART:
			return "副本获得";
		case ItemConst.ITEM_GET_TASK:
			return "任务获得";
		case ItemConst.ITEM_GET_ACHIEVE:
			return "成就获得";
		case ItemConst.ITEM_GET_ACTIVITY:
			return "活动获得";
		case ItemConst.ITEM_GET_REFINE:
			return "提炼获得";
		case ItemConst.ITEM_GET_REPLACE:
			return "更替获得";
		case ItemConst.ITEM_GET_SHOP:
			return "商城获得";
		case ItemConst.ITEM_GET_OPEN_BOX:
			return "开箱子获得";
		case ItemConst.ITEM_GET_USE_GIFT_CODE:
			return "激活码获得";
		default: {
			return "未知";
		}
		}
	}
}
