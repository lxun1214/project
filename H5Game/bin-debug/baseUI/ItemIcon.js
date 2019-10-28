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
var ItemIcon = (function (_super) {
    __extends(ItemIcon, _super);
    function ItemIcon() {
        var _this = _super.call(this) || this;
        _this.skinName = "ItemIconSkin";
        return _this;
    }
    ItemIcon.prototype.euiCompete = function () {
        // this.setIcon(this.iconStr);
    };
    ItemIcon.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var itemId = 0;
        if (!isNaN(this.data)) {
            var info = new ItemInfo();
            info.itemId = this.data;
            info.itemNum = 0;
            itemId = info.itemId;
        }
        else {
            itemId = this.data.itemId;
        }
        // this.data.itemId;
        if (itemId == 0)
            return;
        this.itemConfing = BagVo.ins().getItem(itemId);
        this.setQuality(this.itemConfing.rank);
        this.setIcon(ResMgr.getGameItemPng(this.itemConfing.iconID));
    };
    ItemIcon.prototype.setData = function (config) {
    };
    ItemIcon.prototype.setIcon = function (str) {
        this.iconStr = str;
        this.imgIcon.source = str;
    };
    /**
     * 设置品质背景
     * @param num 品质(1蓝，2紫，3金，4暗金，5橙）
     */
    ItemIcon.prototype.setQuality = function (num) {
        this.imgBg.source = num == 0 ? null : (num == -1 ? "quality_10" : ("quality_1" + num));
        if (num >= 3) {
            if (!this.mc)
                this.mc = new clips.BmpClip();
            ModelResMgr.getOtherEffect(10007 + num, this.mc);
            this.eff.addChild(this.mc);
            this.mc.play(-1);
        }
        else {
            if (this.mc) {
                this.mc.stop();
                if (this.mc.parent)
                    this.mc.parent.removeChild(this.mc);
            }
        }
    };
    Object.defineProperty(ItemIcon.prototype, "tips", {
        get: function () {
            return this._tips;
        },
        set: function (v) {
            this._tips = v;
            if (v)
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tipsShow, this);
            else
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tipsShow, this);
        },
        enumerable: true,
        configurable: true
    });
    ItemIcon.prototype.tipsShow = function () {
        ViewManager.ins().open(ItemTipView, this.itemConfing);
    };
    return ItemIcon;
}(BaseItemRender));
__reflect(ItemIcon.prototype, "ItemIcon");
//# sourceMappingURL=ItemIcon.js.map