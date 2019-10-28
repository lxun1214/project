//package com.rt.logic.player;
//
//import com.rt.logic.player.config.data.HeroAttributeConfig;
//import com.rt.pb.PbPlayer.PbPlayerAttrInfo;
//
///**
// * 人物属性
// *
// */
//public class PlayerAttr {
//	/***************基础属性***************/
//	/** 力量 */
//	private int power;
//	/** 智力 */
//	private int intellect;
//	/** 敏捷 */
//	private int alacrity;
//	/** 体力 */
//	private int physique;
//	/*****************装备、宝石、神器等附加的属性********************/
//	/** 力量 */
//	private int extendPower;
//	/** 智力 */
//	private int extendIntellect;
//	/** 敏捷 */
//	private int extendAlacrity;
//	/** 体力 */
//	private int extendPhysique;
//
//	/** 物理攻击 */
//	private int attack;
//	/** 物理防御 */
//	private int armor;
//	/** 魔法攻击 */
//	private int magicAttack;
//	/** 魔法防御 */
//	private int magicArmor;
//	/** 生命值 */
//	private int blood;
//	/** 暴击率 */
//	private int critRate;
//	/** 暴击伤害 */
//	private int critDamage;
//	/** 攻击速度 */
//	private int attackSpeed;
//
//	public void init(HeroAttributeConfig config) {
//		this.power = config.powerQuality;
//		this.intellect = config.intellectQuality;
//		this.alacrity = config.alacrityQuality;
//		this.physique = config.physiqueQuality;
//		this.attack = config.attackInit;
//		this.armor = config.armorInit;
//		this.magicAttack = config.magicAttack;
//		this.magicArmor = config.magicArmorInit;
//		this.blood = config.blood;
//		this.critRate = config.critRate;
//		this.critDamage = config.critDamage;
//		this.attackSpeed = config.attackSpeed;
//	}
//	
//	public PbPlayerAttrInfo.Builder showAttrInfo() {
//		PbPlayerAttrInfo.Builder builder = PbPlayerAttrInfo.newBuilder();
//		builder.setPower(this.power);
//		builder.setIntellect(this.intellect);
//		builder.setAlacrity(this.alacrity);
//		builder.setPhysique(this.physique);
//		return builder;
//	}
//
//	public int getPower() {
//		return power;
//	}
//
//	public void setPower(int power) {
//		this.power = power;
//	}
//
//	public int getIntellect() {
//		return intellect;
//	}
//
//	public void setIntellect(int intellect) {
//		this.intellect = intellect;
//	}
//
//	public int getAlacrity() {
//		return alacrity;
//	}
//
//	public void setAlacrity(int alacrity) {
//		this.alacrity = alacrity;
//	}
//
//	public int getPhysique() {
//		return physique;
//	}
//
//	public void setPhysique(int physique) {
//		this.physique = physique;
//	}
//
//	public int getAttack() {
//		return attack;
//	}
//
//	public void setAttack(int attack) {
//		this.attack = attack;
//	}
//
//	public int getArmor() {
//		return armor;
//	}
//
//	public void setArmor(int armor) {
//		this.armor = armor;
//	}
//
//	public int getMagicAttack() {
//		return magicAttack;
//	}
//
//	public void setMagicAttack(int magicAttack) {
//		this.magicAttack = magicAttack;
//	}
//
//	public int getMagicArmor() {
//		return magicArmor;
//	}
//
//	public void setMagicArmor(int magicArmor) {
//		this.magicArmor = magicArmor;
//	}
//
//	public int getBlood() {
//		return blood;
//	}
//
//	public void setBlood(int blood) {
//		this.blood = blood;
//	}
//
//	public int getCritRate() {
//		return critRate;
//	}
//
//	public void setCritRate(int critRate) {
//		this.critRate = critRate;
//	}
//
//	public int getCritDamage() {
//		return critDamage;
//	}
//
//	public void setCritDamage(int critDamage) {
//		this.critDamage = critDamage;
//	}
//
//	public int getAttackSpeed() {
//		return attackSpeed;
//	}
//
//	public void setAttackSpeed(int attackSpeed) {
//		this.attackSpeed = attackSpeed;
//	}
//
//	public int getExtendPower() {
//		return extendPower;
//	}
//
//	public void setExtendPower(int extendPower) {
//		this.extendPower = extendPower;
//	}
//
//	public int getExtendIntellect() {
//		return extendIntellect;
//	}
//
//	public void setExtendIntellect(int extendIntellect) {
//		this.extendIntellect = extendIntellect;
//	}
//
//	public int getExtendAlacrity() {
//		return extendAlacrity;
//	}
//
//	public void setExtendAlacrity(int extendAlacrity) {
//		this.extendAlacrity = extendAlacrity;
//	}
//
//	public int getExtendPhysique() {
//		return extendPhysique;
//	}
//
//	public void setExtendPhysique(int extendPhysique) {
//		this.extendPhysique = extendPhysique;
//	}
//
//}
