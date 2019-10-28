var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdSkillHitEffect = (function () {
    function StdSkillHitEffect() {
        this.effect = 0;
        this.times = 1;
        this.keepTime = -1;
        this.targeType = 1;
        this.speed = 80;
        this.flag = -1;
        this.dataArr = ["type", "effect", "targeType", "times", "keepTime", "flag", "speed"];
    }
    Object.defineProperty(StdSkillHitEffect.prototype, "data", {
        set: function (s) {
            var a = s.split(",");
            for (var i = 0; i < a.length; i++) {
                this[this.dataArr[i]] = parseInt(a[i]);
            }
        },
        enumerable: true,
        configurable: true
    });
    return StdSkillHitEffect;
}());
__reflect(StdSkillHitEffect.prototype, "StdSkillHitEffect");
//# sourceMappingURL=StdSkillHitEffect.js.map