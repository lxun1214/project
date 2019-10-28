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
var BaseWin1 = (function (_super) {
    __extends(BaseWin1, _super);
    function BaseWin1() {
        var _this = _super.call(this) || this;
        _this.left = _this.right = _this.top = _this.bottom = 0;
        return _this;
    }
    Object.defineProperty(BaseWin1.prototype, "titleS", {
        get: function () {
            return this._titleS;
        },
        set: function (v) {
            this._titleS = v;
            if (this.title)
                this.title.text = this._titleS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWin1.prototype, "bgH", {
        get: function () {
            return this._bgH;
        },
        set: function (v) {
            this._bgH = v;
            if (this.g0)
                this.g0.height = v;
        },
        enumerable: true,
        configurable: true
    });
    BaseWin1.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        if (this._titleS)
            this.title.text = this._titleS;
        if (this.g0)
            this.g0.height = this._bgH;
        this.rc.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            ViewManager.ins().close(_this.parent);
        }, this);
        if (this.newCloseBtn00) {
            this.newCloseBtn00.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                ViewManager.ins().close(_this.parent);
            }, this);
        }
    };
    return BaseWin1;
}(eui.Component));
__reflect(BaseWin1.prototype, "BaseWin1");
//# sourceMappingURL=BaseWin1.js.map