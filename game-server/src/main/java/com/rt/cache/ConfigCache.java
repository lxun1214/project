package com.rt.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.rt.cache.npc.NpcEquipModel;
import com.rt.cache.npc.NpcGemGrooveInfo;
import com.rt.cache.npc.NpcPlayerModel;
import com.rt.logic.activity.config.data.ExtractInfoConfig;
import com.rt.logic.activity.config.data.OperationActivityConfig;
import com.rt.logic.activity.config.data.OperationActivityDetailConfig;
import com.rt.logic.arena.config.data.CommonTimesConfig;
import com.rt.logic.arena.config.data.RankingAwardConfig;
import com.rt.logic.artifact.config.data.ArtifactConfig;
import com.rt.logic.email.SystemEmail;
import com.rt.logic.item.data.EquipConfig;
import com.rt.logic.item.data.EquipGrowConfig;
import com.rt.logic.item.data.GemAttrConfig;
import com.rt.logic.item.data.ItemConfig;
import com.rt.logic.item.data.ItemDrawConfig;
import com.rt.logic.part.config.data.PartInfoConfig;
import com.rt.logic.player.config.data.AttributesIncreaseConfig;
import com.rt.logic.player.config.data.ExpUpConfig;
import com.rt.logic.player.config.data.HeroAttributeConfig;
import com.rt.logic.player.config.data.RebirthAwardConfig;
import com.rt.logic.player.config.data.SlotAttributeConfig;
import com.rt.logic.player.config.data.VipBaseConfig;
import com.rt.logic.points.config.PointInfoConfig;
import com.rt.logic.recharge.config.data.MonthMemberConfig;
import com.rt.logic.recharge.config.data.PaymentBaseConfig;
import com.rt.logic.shop.config.data.StoreConfig;
import com.rt.logic.skill.config.data.SkillInfoConfig;
import com.rt.logic.task.config.data.TaskConfig;

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
	/** 竞技场刷新购买次数最高值 */
	public static int MAX_REFRESH_PURCHASE_NUM = 0;
	/** 排行榜奖励配置 */
	public static List<RankingAwardConfig> rankAwardConfigList = new ArrayList<>();
	/** 任务奖励配置 */
	public static Map<Integer, TaskConfig> taskConfigMap = new HashMap<>();
	/** 任务分组配置 key:taskWin事件类型 */
	public static Map<Integer, List<TaskConfig>> groupTaskConfigMap = new HashMap<>();
	/** 副本 */
	public static Map<Integer, PartInfoConfig> partInfoConfigMap = new HashMap<>();
	/**副本 类型集合  */
	public static Set<Integer> partInfoTypeSets = new HashSet<>();
	/**活动配置  key:活动id*/
	public static Map<Integer, OperationActivityConfig> operationActivityConfigMap = new HashMap<>();
	/**活动配置  key:活动id   value: key:下标   value:奖励配置，各参数配置>*/
	public static Map<Integer,Map<Integer,OperationActivityDetailConfig>> operationActivityDetailConfigMap = new HashMap<>();
	/**开箱子配置*/
	public static Map<Integer, ItemDrawConfig> ItemDrawConfigMap = new HashMap<>();
	/**抽卡配置*/
	public static Map<Integer,ExtractInfoConfig> extractInfoConfigMap = new HashMap<>();
	/**vip升级-奖励配置*/ 
	public static Map<Integer, VipBaseConfig> vipBaseConfigMap = new HashMap<>();
	/**月卡奖励配置*/
	public static Map<Integer, MonthMemberConfig> monthCardConfigMap = new HashMap<>();
	/**充值配置*/
	public static Map<Integer, PaymentBaseConfig>  paymentBaseConfigMap = new HashMap<>();
	/**系统邮件缓存*/
	public static Map<Long, SystemEmail> systemEmailMap = new HashMap<>();
	
	/**推送邮件单线程池*/
	public static ExecutorService emailExecuter = Executors.newSingleThreadExecutor();
	
	
	
	//////////////////////NPC配置///////////////////////
	public static Map<Integer, NpcPlayerModel> npcPlayerModelMap = new HashMap<>();
	
	public static Map<Integer, NpcEquipModel> npcEquipModelMap = new HashMap<>();
	
	public static Map<Integer, NpcGemGrooveInfo> npcGemGrooveInfoMap = new HashMap<>();
	
}
