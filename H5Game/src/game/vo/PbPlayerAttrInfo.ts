class PbPlayerAttrInfo {
	public power:number = 0;//力
	public intellect:number = 0;//智
	public alacrity:number = 0;//敏
	public physique:number = 0;//体

	public powerQuality:number = 0;
	public intellectQuality:number = 0;
	public alacrityQuality:number = 0;
	public physiqueQuality:number = 0;

	public attackInit:number = 0;//物理攻击
	public armorInit:number = 0;//物理防御
	public magicAttack:number = 0;//魔法攻击
	public magicArmorInit:number = 0;//魔法防御
	public blood:number = 0;//生命值


	public hitRate:number = 0;//命中率
	public dodgeRate:number = 0;//闪避率
	public critRate:number = 0;//暴击率
	public critDamage:number = 0;//暴击伤害
	public attackSpeed:number = 0;//攻击速度
	public attackRange:number = 0;//攻击范围
	public movingSpeed:number = 0;//移动速度
	public akillDamage:number = 0;//技能伤害增加
	public attackDamage:number = 0;//攻击伤害增加
	public damageReduction:number = 0;//伤害减免
	public speedAnger:number = 0;//怒气获取速度
	public skillInterval:number = 0;//技能CD
	public skillsConsumption:number = 0;//技能消耗怒气比例
	public fireDamage:number = 0;//火属性伤害
	public waterDamage:number = 0;//水属性伤害
	public thunderDamage:number = 0;//雷属性伤害
	public windDamage:number = 0;//风属性伤害
	public fireDefenses:number = 0;//火属性防御
	public waterDefense:number = 0;//水属性防御
	public thunderDefense:number = 0;//雷属性防御
	public windDefense:number = 0;//风属性防御
	public rebirthAttributeIncome = 0;
	public rebirthMaterialIncome = 0;
	public goldIncreased = 0;
	public experienceGained=  0;
	public offHook= 0;

	public propertyPCT:number = 1;//属性伤害

	public bonusDamage:number = 0;
	public constructor() {
	}

	public static isPercent(key):string
	{
		return (key == "critRate"|| key == "critDamage")?"%":"";
	}

	public static getSpecialAttr(vo:PbPlayerAttrInfo,dx:number,Defenses:boolean=false):number
	{
		switch(dx)
		{
			case 1:
				return vo.attackInit;
			case 2:
				return vo.magicAttack;
			case 3:
				if(!Defenses)
					return vo.fireDamage;
				return vo.fireDefenses;
			case 4:
				if(!Defenses)
					return vo.waterDamage;
				return vo.waterDefense;
			case 5:
				if(!Defenses)
					return vo.thunderDamage;
				return vo.thunderDefense;
			case 6:
				if(!Defenses)
					return vo.windDamage;
				return vo.windDefense;
		}
	}
}