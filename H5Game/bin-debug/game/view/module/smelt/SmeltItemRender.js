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
var SmeltItemRender = (function (_super) {
    __extends(SmeltItemRender, _super);
    function SmeltItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "SmeltItemSkin";
        return _this;
    }
    SmeltItemRender.prototype.init = function () {
        this.addTouchEvent(this, this.onTap);
    };
    SmeltItemRender.prototype.dataChanged = function () {
        this.item.isClick = false;
        this.item.data = this.data;
        if (SmeltWin.showItem.indexOf(this.item.data) != -1)
            this.selectGr.visible = true;
        else
            this.selectGr.visible = false;
    };
    SmeltItemRender.prototype.onTap = function () {
    };
    return SmeltItemRender;
}(BaseItemRender));
__reflect(SmeltItemRender.prototype, "SmeltItemRender");
//# sourceMappingURL=SmeltItemRender.js.map