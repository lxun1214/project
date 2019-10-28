package com.rt.logic.artifact;

import java.util.ArrayList;
import java.util.List;

import com.rt.cache.ConfigCache;
import com.rt.logic.artifact.config.data.ArtifactConfig;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.IPlayer;

/**
 * 神器Gained
 *
 */
public class Artifact {
	/** 已获得神器列表 key：itemId value:加成属性 */
	List<Integer> itemIdList = new ArrayList<>();

	// 神器石加成
	 int rebirthMaterialIncome;
	// 金币加成
	 int gold;
	// 金币加成
	 int exp;
	// 离线挂机获取量
	 int offHook;
	// 装备强化消耗减少
	 int reduceConsumption;

	/**
	 * 升阶神器
	 * 
	 * @param player
	 * @param itemId
	 * @param response
	 */
	public void reinforcedArtifact(IPlayer player, int itemId) {
		ArtifactConfig artifactConfig = ConfigCache.artifactMap.get(itemId);
		if (artifactConfig == null) {
			return;
		}
		long playerId = player.getPlayerId();
		if (!itemIdList.contains(itemId)) {
			// 身上没这个神器
			ArtifactMsg.sendReinforcedArtifactMsg(playerId, false,0);
			return;
		}
		int nextId = artifactConfig.nextId;
		// 没有下一阶
		if (nextId <= 0) {
			ArtifactMsg.sendReinforcedArtifactMsg(playerId, false,0);
			return;
		}
		if (player.getStrengthenArtifactStone() < artifactConfig.strengthenArtifactStone) {
			// 神器石头不足
			ArtifactMsg.sendReinforcedArtifactMsg(playerId, false,0);
			return;
		}
		ArtifactConfig nextArtifactConfig = ConfigCache.artifactMap.get(nextId);
		if (nextArtifactConfig == null) {
			// 没找到下一阶的神器
			ArtifactMsg.sendReinforcedArtifactMsg(playerId, false,0);
			return;
		}
		// 扣除升阶石
		player.addDelStrengthenArtifactStone(-artifactConfig.strengthenArtifactStone,CoinConst.CONSUME_ARTIFACT);
		// 扣除原先战力
		int fightPower = player.getFightPower();
		fightPower -= artifactConfig.initialScore;
		// 增加战力
		fightPower += nextArtifactConfig.initialScore;
		player.updateFightPower(fightPower);
		// 更新身上的神器
		this.itemIdList.remove(Integer.valueOf(itemId));

		//替换奖励加成
		this.rebirthMaterialIncome -= artifactConfig.rebirthMaterialIncome;
		this.gold -= artifactConfig.goldIncreased;
		this.exp -= artifactConfig.experienceGained;
		this.offHook -= artifactConfig.offHook;
		this.reduceConsumption -= artifactConfig.reduceConsumption;
		
		this.rebirthMaterialIncome += nextArtifactConfig.rebirthMaterialIncome;
		this.gold += nextArtifactConfig.goldIncreased;
		this.exp += nextArtifactConfig.experienceGained;
		this.offHook += nextArtifactConfig.offHook;
		this.reduceConsumption += nextArtifactConfig.reduceConsumption;
	
		this.itemIdList.add(nextId);
		// 返回
		ArtifactMsg.sendReinforcedArtifactMsg(playerId, true,nextId);
	}

	/**
	 * 激活神器
	 * 
	 * @param player
	 * @param itemId
	 * @param response
	 */
	public void activationArtifact(IPlayer player, int itemId) {
		ArtifactConfig artifactConfig = ConfigCache.artifactMap.get(itemId);
		if (artifactConfig == null) {
			return;
		}
		long playerId = player.getPlayerId();
		// 激活只能是品阶为1的神器
		if (artifactConfig.artifactQuality != 1) {
			ArtifactMsg.sendActivationArtifactMsg(playerId, false,itemId);
			return;
		}
		// 如果当前组神器激活过，不能再激活
		for (int i = 0; i < itemIdList.size(); i++) {
			ArtifactConfig config = ConfigCache.artifactMap.get(itemIdList.get(i));
			if (config.artifactType == artifactConfig.artifactType) {
				ArtifactMsg.sendActivationArtifactMsg(playerId, false,itemId);
				return;
			}
		}
		// 判断激活条件
		if (artifactConfig.access == ArtifactConst.ACCESS_SCREEN) {
			// 关卡
			if (player.getHistoryMaxPointsId() < artifactConfig.btainConditions) {
				// 没有达到关卡条件
				ArtifactMsg.sendActivationArtifactMsg(playerId, false,itemId);
				return;
			}

		} else if (artifactConfig.access == ArtifactConst.ACCESS_REBORN) {
			// 重生
			if (player.getRebirthNum() < artifactConfig.btainConditions) {
				// 没有达到重生条件
				ArtifactMsg.sendActivationArtifactMsg(playerId, false,itemId);
				return;
			}

		} else if (artifactConfig.access == ArtifactConst.ACCESS_VIP) {
			// vip
			if (player.getVipLevel() < artifactConfig.btainConditions) {
				// 没有达到vip条件
				ArtifactMsg.sendActivationArtifactMsg(playerId, false,itemId);
				return;
			}
		} else if (artifactConfig.access == ArtifactConst.FIRST_RECHARGE) {
			// 首充
			if (player.getVipExp() == 0 && player.getVipLevel() == 0) {
				// 没有达到首充条件
				ArtifactMsg.sendActivationArtifactMsg(playerId, false,itemId);
				return;
			}
		} else if (artifactConfig.access == ArtifactConst.SHOP) {
			//商店购买，激活没有逻辑
		} else {
			// 走这里说明表配错了，没匹配到激活条件
			ArtifactMsg.sendActivationArtifactMsg(playerId, false,itemId);
			return;
		}
		// 激活神器
		this.itemIdList.add(itemId);
		// 奖励加成
		this.rebirthMaterialIncome += artifactConfig.rebirthMaterialIncome;
		this.gold += artifactConfig.goldIncreased;
		this.exp += artifactConfig.experienceGained;
		this.offHook += artifactConfig.offHook;
		this.reduceConsumption += artifactConfig.reduceConsumption;
		// 增加战力
		player.updateFightPower(player.getFightPower() + artifactConfig.initialScore);
		// 返回
		ArtifactMsg.sendActivationArtifactMsg(playerId, true,itemId);

	}
	
	
	public void gm(IPlayer player, int itemId) {
		ArtifactConfig artifactConfig = ConfigCache.artifactMap.get(itemId);
		if (artifactConfig == null) {
			return;
		}
		long playerId = player.getPlayerId();
		// 激活神器
		this.itemIdList.add(itemId);
		// 奖励加成
		this.rebirthMaterialIncome += artifactConfig.rebirthMaterialIncome;
		this.gold += artifactConfig.goldIncreased;
		this.exp += artifactConfig.experienceGained;
		this.offHook += artifactConfig.offHook;
		this.reduceConsumption += artifactConfig.reduceConsumption;
		// 增加战力
		player.updateFightPower(player.getFightPower() + artifactConfig.initialScore);
		// 返回
		ArtifactMsg.sendActivationArtifactMsg(playerId, true,itemId);

	}

	public int getRebirthMaterialIncome() {
		return rebirthMaterialIncome;
	}

	public void setRebirthMaterialIncome(int rebirthMaterialIncome) {
		this.rebirthMaterialIncome = rebirthMaterialIncome;
	}

	public int getGold() {
		return gold;
	}

	public void setGold(int gold) {
		this.gold = gold;
	}

	public int getExp() {
		return exp;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

	public int getOffHook() {
		return offHook;
	}

	public void setOffHook(int offHook) {
		this.offHook = offHook;
	}

	public int getReduceConsumption() {
		return reduceConsumption;
	}

	public void setReduceConsumption(int reduceConsumption) {
		this.reduceConsumption = reduceConsumption;
	}

	public List<Integer> getItemIdList() {
		return itemIdList;
	}

	public void setItemIdList(List<Integer> itemIdList) {
		this.itemIdList = itemIdList;
	}
}
