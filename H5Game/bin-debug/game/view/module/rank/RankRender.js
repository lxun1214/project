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
var RankRender = (function (_super) {
    __extends(RankRender, _super);
    function RankRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankRenderSkin";
        return _this;
    }
    RankRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.l0.text = (this.itemIndex + 1) + "";
        this.l1.text = this.data.otherPlayerName;
        this.l2.text = this.data.otherPlayerLevel + "";
        this.l3.text = this.data.otherFightPower + "";
        this.tt.source = this.itemIndex % 2 == 0 ? "rankI" : null;
    };
    return RankRender;
}(eui.ItemRenderer));
__reflect(RankRender.prototype, "RankRender");
//# sourceMappingURL=RankRender.js.map