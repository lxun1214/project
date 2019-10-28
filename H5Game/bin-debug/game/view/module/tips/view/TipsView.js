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
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    function TipsView() {
        var _this = _super.call(this) || this;
        _this.labCount = 0;
        _this.list = [];
        _this.initUI();
        return _this;
    }
    TipsView.prototype.initUI = function () {
        this.touchEnabled = false;
        this.touchChildren = false;
    };
    /**
     * 显示Tips
     * @param str
     */
    TipsView.prototype.showTips = function (str) {
        var tips = new TipsItem();
        tips.verticalCenter = 0;
        tips.horizontalCenter = 0;
        tips.labelText = str;
        this.addChild(tips);
        this.list.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTip, this);
        for (var i = this.list.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.list[i]);
            var t = egret.Tween.get(this.list[i]);
            t.to({ "verticalCenter": (i * -30) + 0 }, 500);
        }
    };
    TipsView.prototype.removeTip = function (e) {
        var index = this.list.indexOf(e.currentTarget);
        this.list.splice(index, 1);
        egret.Tween.removeTweens(e.currentTarget);
    };
    return TipsView;
}(BaseEuiView));
__reflect(TipsView.prototype, "TipsView");
ViewManager.ins().reg(TipsView, LayerManager.UI_Tips);
//# sourceMappingURL=TipsView.js.map