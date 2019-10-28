var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdSkillAction = (function () {
    function StdSkillAction() {
        this.effect = 0; //特效id
        this.hasDir = 0; //是否有方向
        this.dataArr = ["act", "effect", "hasDir"];
    }
    Object.defineProperty(StdSkillAction.prototype, "data", {
        set: function (s) {
            var a = s.split(",");
            for (var i = 0; i < a.length; i++) {
                this[this.dataArr[i]] = i != 0 ? parseInt(a[i]) : a[i];
            }
        },
        enumerable: true,
        configurable: true
    });
    return StdSkillAction;
}());
__reflect(StdSkillAction.prototype, "StdSkillAction");
//# sourceMappingURL=StdSkillAction.js.map