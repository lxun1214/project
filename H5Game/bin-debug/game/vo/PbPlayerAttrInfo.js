var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PbPlayerAttrInfo = (function () {
    function PbPlayerAttrInfo() {
        this.power = 0; //力
        this.intellect = 0; //智
        this.alacrity = 0; //敏
        this.physique = 0; //体
        this.powerQuality = 0;
        this.intellectQuality = 0;
        this.alacrityQuality = 0;
        this.physiqueQuality = 0;
        this.attackInit = 0; //物理攻击
        this.armorInit = 0; //物理防御
        this.magicAttack = 0; //魔法攻击
        this.magicArmorInit = 0; //魔法防御
        this.blood = 0; //生命值
        this.hitRate = 0; //命中率
        this.dodgeRate = 0; //闪避率
        this.critRate = 0; //暴击率
        this.critDamage = 0; //暴击伤害
        this.attackSpeed = 0; //攻击速度
        this.attackRange = 0; //攻击范围
        this.movingSpeed = 0; //移动速度
        this.akillDamage = 0; //技能伤害增加
        this.attackDamage = 0; //攻击伤害增加
        this.damageReduction = 0; //伤害减免
        this.speedAnger = 0; //怒气获取速度
        this.skillInterval = 0; //技能CD
        this.skillsConsumption = 0; //技能消耗怒气比例
        this.fireDamage = 0; //火属性伤害
        this.waterDamage = 0; //水属性伤害
        this.thunderDamage = 0; //雷属性伤害
        this.windDamage = 0; //风属性伤害
        this.fireDefenses = 0; //火属性防御
        this.waterDefense = 0; //水属性防御
        this.thunderDefense = 0; //雷属性防御
        this.windDefense = 0; //风属性防御
        this.rebirthAttributeIncome = 0;
        this.rebirthMaterialIncome = 0;
        this.goldIncreased = 0;
        this.experienceGained = 0;
        this.offHook = 0;
        this.propertyPCT = 1; //属性伤害
        this.bonusDamage = 0;
    }
    PbPlayerAttrInfo.isPercent = function (key) {
        return (key == "critRate" || key == "critDamage") ? "%" : "";
    };
    PbPlayerAttrInfo.getSpecialAttr = function (vo, dx, Defenses) {
        if (Defenses === void 0) { Defenses = false; }
        switch (dx) {
            case 1:
                return vo.attackInit;
            case 2:
                return vo.magicAttack;
            case 3:
                if (!Defenses)
                    return vo.fireDamage;
                return vo.fireDefenses;
            case 4:
                if (!Defenses)
                    return vo.waterDamage;
                return vo.waterDefense;
            case 5:
                if (!Defenses)
                    return vo.thunderDamage;
                return vo.thunderDefense;
            case 6:
                if (!Defenses)
                    return vo.windDamage;
                return vo.windDefense;
        }
    };
    return PbPlayerAttrInfo;
}());
__reflect(PbPlayerAttrInfo.prototype, "PbPlayerAttrInfo");
//# sourceMappingURL=PbPlayerAttrInfo.js.map