var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ComAttribute = (function () {
    function ComAttribute() {
    }
    ComAttribute.hurt = 1; //伤害
    ComAttribute.critRatePCT = 10; //暴击率
    ComAttribute.hurtPCT = 34; //减血百分比
    ComAttribute.giddyPCT = 35; //眩晕
    ComAttribute.invincible = 36; //无敌
    ComAttribute.thornsPCT = 37; //反伤
    ComAttribute.leechPCT = 38; //吸血
    ComAttribute.intellectHurt = 39; //智力变伤害	
    ComAttribute.frost = 49; //冰冻
    ComAttribute.sprint = 50; //冲刺
    return ComAttribute;
}());
__reflect(ComAttribute.prototype, "ComAttribute");
//# sourceMappingURL=ComAttribute.js.map