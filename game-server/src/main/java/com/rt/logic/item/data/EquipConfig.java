package com.rt.logic.item.data;

import com.rt.common.GameModel;

public class EquipConfig extends GameModel{

	public int itemId;
	
	/**品阶*/
	public int itemQuality;
	/** 下一阶id */
	public int nextId;
	/** 使用职业类型（1勇士，2枪手，3格斗家） */
	public int heroType;
	/** 装备部位（0，武器；1，头盔；2，铠甲；3，披风） */
	public int equipCoordinate;
	
	
	/**初始战力*/
	public int initialScore;
	/**每级强化增加战力*/
	public int growScore;
	/**消耗升阶石*/
	public int reinforcedEquipmentStone;
	/**熔炼分解*/
	public int fenjieEquipmentStone;
	
//	/** 力量 */
//	public int power;
//	/** 智力 */
//	public int intellect;
//	/** 敏捷 */
//	public int alacrity;
//	/** 体力 */
//	public int physique;
//	/** 物理攻击 */
//	public int attackInit;
//	/** 物理防御 */
//	public int armorInit;
//	/** 魔法攻击 */
//	public int magicAttack;
//	/** 魔法防御 */
//	public int magicArmorInit;
//	/** 暴击率（百分比） */
//	public int critRate;
//	/** 暴击伤害（百分比） */
//	public int critDamage;
//	/** 生命值 */
//	public int blood;
//	/** 攻击速度 */
//	public int attackSpeed;
//	/** 力量资质 */
//	public int powerQuality;
//	/** 智力资质 */
//	public int intellectQuality;
//	/** 敏捷资质 */
//	public int alacrityQuality;
//	/** 体力资质 */
//	public int physiqueQuality;
}
