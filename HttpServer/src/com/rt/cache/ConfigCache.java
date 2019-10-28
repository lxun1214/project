package com.rt.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rt.logic.arena.config.data.CommonTimesConfig;
import com.rt.logic.arena.config.data.RankingAwardConfig;
import com.rt.logic.artifact.config.data.ArtifactConfig;
import com.rt.logic.item.data.EquipConfig;
import com.rt.logic.item.data.EquipGrowConfig;
import com.rt.logic.item.data.GemAttrConfig;
import com.rt.logic.item.data.ItemConfig;
import com.rt.logic.player.config.data.AttributesIncreaseConfig;
import com.rt.logic.player.config.data.ExpUpConfig;
import com.rt.logic.player.config.data.HeroAttributeConfig;
import com.rt.logic.player.config.data.RebirthAwardConfig;
import com.rt.logic.player.config.data.SlotAttributeConfig;
import com.rt.logic.points.config.PointInfoConfig;
import com.rt.logic.shop.config.data.StoreConfig;
import com.rt.logic.skill.config.data.SkillInfoConfig;

public class ConfigCache {

	/** 道具表 */
	public static Map<Integer, ItemConfig> itemConfigMap = new HashMap<>();
	/** 装备 */
	public static Map<Integer, EquipConfig> equipConfigMap = new HashMap<>();
	/** 人物初始属性 */
	public static Map<Integer, HeroAttributeConfig> heroAttributeConfigMap = new HashMap<>();
	/** 关卡 */
	public static Map<Integer, PointInfoConfig> pointConfigMap = new HashMap<>();
	/** 技能,序列为key */
	public static Map<Integer, SkillInfoConfig> skillConfigMap = new HashMap<>();
	/** 经验升级表 */
	public static Map<Integer, ExpUpConfig> expUpConfigMap = new HashMap<>();
	/** 人物等级变化战力表 */
	public static Map<Integer, List<AttributesIncreaseConfig>> attributesIncreaseConfigMap = new HashMap<>();
	/** 装备升级表 */
	public static Map<Integer, EquipGrowConfig> equipGrowConfigMap = new HashMap<>();
	/** 重生奖励 */
	public static Map<Integer, RebirthAwardConfig> rebirthAwardConfigMap = new HashMap<>();
	/** 商城配置表 */
	public static Map<Integer, StoreConfig> storeMap = new HashMap<>();
	/** 宝石 */
	public static Map<Integer, GemAttrConfig> gemAttrConfigMap = new HashMap<>();
	/** 过关开启宝石槽 */
	public static Map<Integer, SlotAttributeConfig> slotAttributeConfigMap = new HashMap<>();
	/** 神器 */
	public static Map<Integer, ArtifactConfig> artifactMap = new HashMap<>();
	/** 购买配置 key:是类型组 */
	public static Map<Integer, Map<Integer, CommonTimesConfig>> commonTimesMap = new HashMap<>();
	/** 竞技场挑战购买次数最高值 */
	public static int MAX_PURCHASE_NUM = 0;
	/** 排行榜奖励配置 */
	public static List<RankingAwardConfig> rankAwardConfigList = new ArrayList<>();
}
