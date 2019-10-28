package com.rt.gloable;

import com.rt.common.ConfigLoader;
import com.rt.logic.arena.config.loader.CommonTimesConfigLoader;
import com.rt.logic.arena.config.loader.RankingAwardConfigLoader;
import com.rt.logic.artifact.config.loader.ArtifactConfigLoader;
import com.rt.logic.item.loader.EquipConfigLoader;
import com.rt.logic.item.loader.EquipGrowConfigLoader;
import com.rt.logic.item.loader.GemAttrConfigLoader;
import com.rt.logic.item.loader.ItemConfigLoader;
import com.rt.logic.player.config.loader.AttributesIncreaseConfigLoadler;
import com.rt.logic.player.config.loader.ExpUpConfigLoadler;
import com.rt.logic.player.config.loader.HeroAttributeConfigLoadler;
import com.rt.logic.player.config.loader.RebirthAwardConfigLoadler;
import com.rt.logic.player.config.loader.SlotAttributeConfigLoadler;
import com.rt.logic.player.config.loader.WordshieldConfigLoadler;
import com.rt.logic.points.config.PointInfoConfigLoadler;
import com.rt.logic.shop.config.loader.StoreConfigLoadler;
import com.rt.logic.skill.config.loader.SkillConfigLoader;

/**
 * excel配置文件加载
 * 
 * @author xin.fengtao
 *
 */
public class ExcelConfigLoader extends ConfigLoader {

	@Override
	public void load() {
		loadConfig(new ItemConfigLoader());
		loadConfig(new WordshieldConfigLoadler());
		loadConfig(new HeroAttributeConfigLoadler());
		loadConfig(new EquipConfigLoader());
		loadConfig(new PointInfoConfigLoadler());
		loadConfig(new ExpUpConfigLoadler());
		loadConfig(new AttributesIncreaseConfigLoadler());
		loadConfig(new EquipGrowConfigLoader());
		loadConfig(new SkillConfigLoader());
		loadConfig(new RebirthAwardConfigLoadler());
		loadConfig(new GemAttrConfigLoader());
		loadConfig(new SlotAttributeConfigLoadler());
		loadConfig(new StoreConfigLoadler());
		loadConfig(new ArtifactConfigLoader());
		loadConfig(new CommonTimesConfigLoader());
		loadConfig(new RankingAwardConfigLoader());
	}
}
