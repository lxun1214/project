var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var StageAward = (function (_super) {
    __extends(StageAward, _super);
    function StageAward() {
        return _super.call(this) || this;
    }
    StageAward.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.activetyID = ActivetyMgr.STAGE_AWARD;
    };
    return StageAward;
}(BaseActivityPanel));
__reflect(StageAward.prototype, "StageAward");
//# sourceMappingURL=StageAward.js.map