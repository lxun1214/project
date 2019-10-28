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
var BaseWin0 = (function (_super) {
    __extends(BaseWin0, _super);
    function BaseWin0() {
        var _this = _super.call(this) || this;
        _this.left = _this.right = _this.top = _this.bottom = 0;
        return _this;
    }
    Object.defineProperty(BaseWin0.prototype, "titleS", {
        get: function () {
            return this._titleS;
        },
        set: function (v) {
            this._titleS = v;
            if (this.tt)
                this.tt.source = this._titleS;
        },
        enumerable: true,
        configurable: true
    });
    BaseWin0.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this._titleS)
            this.tt.source = this._titleS;
    };
    return BaseWin0;
}(eui.Component));
__reflect(BaseWin0.prototype, "BaseWin0");
//# sourceMappingURL=BaseWin0.js.map