package com.rt.logic.artifact;

import java.util.ArrayList;
import java.util.List;

import com.rt.cache.ConfigCache;
import com.rt.gloable.Response;
import com.rt.logic.artifact.config.data.ArtifactConfig;
import com.rt.logic.player.IPlayer;

/**
 * 神器
 *
 */
public class Artifact {

	/** 已获得神器列表 */
	List<Integer> itemIdList = new ArrayList<>();

	/**
	 * 升阶神器
	 * 
	 * @param player
	 * @param itemId
	 * @param response
	 */
	public void reinforcedArtifact(IPlayer player, int itemId, Response response) {
		ArtifactConfig artifactConfig = ConfigCache.artifactMap.get(itemId);
		if (artifactConfig == null) {
			return;
		}
		if (!itemIdList.contains(itemId)) {
			// 身上没这个神器
			ArtifactMsg.sendReinforcedArtifactMsg(false, 0, response);
			return;
		}
		int nextId = artifactConfig.nextId;
		// 没有下一阶
		if (nextId <= 0) {
			ArtifactMsg.sendReinforcedArtifactMsg(false, 0, response);
			return;
		}
		if (player.getStrengthenArtifactStone() < artifactConfig.strengthenArtifactStone) {
			// 神器石头不足
			ArtifactMsg.sendReinforcedArtifactMsg(false, 0, response);
			return;
		}
		ArtifactConfig nextArtifactConfig = ConfigCache.artifactMap.get(nextId);
		if (nextArtifactConfig == null) {
			// 没找到下一阶的神器
			ArtifactMsg.sendReinforcedArtifactMsg(false, 0, response);
			return;
		}
		// 扣除升阶石
		player.addDelStrengthenArtifactStone(-artifactConfig.strengthenArtifactStone);
		//扣除原先战力
		int fightPower=player.getFightPower();
		fightPower-=artifactConfig.initialScore;
		// 增加战力
		fightPower+=nextArtifactConfig.initialScore;
		player.updateFightPower(fightPower);
		// 更新身上的神器
		this.itemIdList.remove(Integer.valueOf(itemId));
		this.itemIdList.add(nextId);
		// 返回
		ArtifactMsg.sendReinforcedArtifactMsg(true, player.getFightPower(), response);
	}

	/**
	 * 激活神器
	 * 
	 * @param player
	 * @param itemId
	 * @param response
	 */
	public void activationArtifact(IPlayer player, int itemId, Response response) {
		ArtifactConfig artifactConfig = ConfigCache.artifactMap.get(itemId);
		if (artifactConfig == null) {
			return;
		}
		// 激活只能是品阶为1的神器
		if (artifactConfig.artifactQuality != 1) {
			ArtifactMsg.sendActivationArtifactMsg(false, 0, response);
			return;
		}
		// 如果当前组神器激活过，不能再激活
		for(int i = 0;i < itemIdList.size();i++) {
			ArtifactConfig config = ConfigCache.artifactMap.get(itemIdList.get(i));
			if(config.groupId == artifactConfig.groupId) {
				ArtifactMsg.sendActivationArtifactMsg(false, 0, response);
				return;
			}
		}
		// 判断激活条件
		if (artifactConfig.access == ArtifactConst.ACCESS_SCREEN) {
			// 关卡
			if (player.getPointsId() < artifactConfig.btainConditions) {
				// 没有达到关卡条件
				ArtifactMsg.sendActivationArtifactMsg(false, 0, response);
				return;
			}

		} else if (artifactConfig.access == ArtifactConst.ACCESS_REBORN) {
			// 重生
			if (player.getRebirthNum() < artifactConfig.btainConditions) {
				// 没有达到重生条件
				ArtifactMsg.sendActivationArtifactMsg(false, 0, response);
				return;
			}

		} else if (artifactConfig.access == ArtifactConst.ACCESS_VIP) {
			// vip
			if (player.getVipLevel() < artifactConfig.btainConditions) {
				// 没有达到vip条件
				ArtifactMsg.sendActivationArtifactMsg(false, 0, response);
				return;
			}
		} else {
			// 走这里说明表配错了，没匹配到激活条件
			ArtifactMsg.sendActivationArtifactMsg(false, 0, response);
			return;
		}
		// 激活神器
		this.itemIdList.add(itemId);
		// 增加战力
		player.updateFightPower(player.getFightPower() + artifactConfig.initialScore);
		// 返回
		ArtifactMsg.sendActivationArtifactMsg(true, player.getFightPower(), response);

	}

	public List<Integer> getItemIdList() {
		return itemIdList;
	}

	public void setItemIdList(List<Integer> itemIdList) {
		this.itemIdList = itemIdList;
	}

}
