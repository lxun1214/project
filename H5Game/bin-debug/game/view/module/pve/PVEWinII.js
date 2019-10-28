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
var PVEWinII = (function (_super) {
    __extends(PVEWinII, _super);
    function PVEWinII() {
        var _this = _super.call(this) || this;
        _this.skinName = "PVEIISkin";
        return _this;
    }
    PVEWinII.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.ls.dataProvider = new eui.ArrayCollection(param[0]);
    };
    PVEWinII.prototype.closeCall = function () {
        _super.prototype.closeCall.call(this);
        ViewManager.ins().open(PVEWin);
    };
    return PVEWinII;
}(BaseEuiView));
__reflect(PVEWinII.prototype, "PVEWinII");
ViewManager.ins().reg(PVEWinII, LayerManager.UI_MainUI);
//# sourceMappingURL=PVEWinII.js.map