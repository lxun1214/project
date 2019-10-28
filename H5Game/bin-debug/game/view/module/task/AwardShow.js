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
var AwardShow = (function (_super) {
    __extends(AwardShow, _super);
    function AwardShow() {
        var _this = _super.call(this) || this;
        _this.skinName = "AwardShowSkin";
        return _this;
    }
    AwardShow.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.goldImg.source = ResMgr.getGameItemPng(this.data[0]);
        this.labGold.text = "x" + this.data[1];
    };
    return AwardShow;
}(eui.ItemRenderer));
__reflect(AwardShow.prototype, "AwardShow");
//# sourceMappingURL=AwardShow.js.map