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
var PVEWin = (function (_super) {
    __extends(PVEWin, _super);
    function PVEWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "PVESkin";
        return _this;
    }
    PVEWin.prototype.euiCompete = function () {
        _super.prototype.euiCompete.call(this);
        var a = [];
        for (var i = 0; i < FBMgr.ins.fbData.length; i++) {
            a.push(FBMgr.ins.fbData[i][0]);
        }
        this.ls.dataProvider = new eui.ArrayCollection(a);
    };
    PVEWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
    };
    return PVEWin;
}(BaseEuiView));
__reflect(PVEWin.prototype, "PVEWin");
ViewManager.ins().reg(PVEWin, LayerManager.UI_MainUI);
//# sourceMappingURL=PVEWin.js.map