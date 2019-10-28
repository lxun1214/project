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
var ItemTips = (function (_super) {
    __extends(ItemTips, _super);
    function ItemTips() {
        return _super.call(this) || this;
    }
    ItemTips.prototype.showTips = function (str) {
        var tips = new TipsItem();
        tips.bg.visible = true;
        tips.verticalCenter = 400;
        tips.horizontalCenter = 0;
        tips.labelText = str;
        this.addChild(tips);
        this.list.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTip, this);
        for (var i = this.list.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.list[i]);
            var t = egret.Tween.get(this.list[i]);
            t.to({ "verticalCenter": (i * -60) + 400 }, 500);
        }
    };
    return ItemTips;
}(TipsView));
__reflect(ItemTips.prototype, "ItemTips");
ViewManager.ins().reg(ItemTips, LayerManager.UI_Tips);
//# sourceMappingURL=ItemTips.js.map