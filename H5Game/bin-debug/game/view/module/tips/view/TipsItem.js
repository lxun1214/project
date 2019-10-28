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
var TipsItem = (function (_super) {
    __extends(TipsItem, _super);
    function TipsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "tips_skin";
        return _this;
    }
    Object.defineProperty(TipsItem.prototype, "labelText", {
        get: function () {
            return this._labelText;
        },
        set: function (value) {
            var _this = this;
            this._labelText = value;
            this.label.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
            this.bg.width = this.label.width + 20;
            this.bg.height = this.label.height + 20;
            this.bg.x = -10;
            this.bg.y = -10;
            this.label.alpha = 1;
            this.bg.y = 0;
            this.label.verticalCenter = -1;
            var t1 = egret.Tween.get(this.bg);
            t1.to({ "y": -30 }, 500).wait(800).to({ "alpha": 0 }, 200).call(function () {
                if (_this.parent)
                    _this.parent.removeChild(_this);
            }, this);
            var t = egret.Tween.get(this.label);
            t.to({ "verticalCenter": -30 }, 500).wait(800).to({ "alpha": 0 }, 200);
        },
        enumerable: true,
        configurable: true
    });
    return TipsItem;
}(BaseView));
__reflect(TipsItem.prototype, "TipsItem");
//# sourceMappingURL=TipsItem.js.map