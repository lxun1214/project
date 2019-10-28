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
/*
http://cdnhjzl.xhlgame.com?times=1494834658&APP_key=7002568415863fd467a2c3c72fe244ed7a3e5297&tickets=dXNlcm5hbWU9MTIzNDU2Jm5pY2tuYW1lPVgxXzAx

rutong  rutong1124
*/
var RechargeWin = (function (_super) {
    __extends(RechargeWin, _super);
    function RechargeWin() {
        var _this = _super.call(this) || this;
        _this.RENDER_H = 210;
        _this.RENDER_W = 340;
        _this.skinName = "RechargeSkin";
        return _this;
    }
    RechargeWin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    RechargeWin.prototype.open = function () {
        var prama = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            prama[_i] = arguments[_i];
        }
        _super.prototype.open.call(this);
        this.update();
        this.reItemGroup.itemRenderer = RechargeItem;
        var obj = ConfigMgr.gameConfig["paymentBase"];
        this.reItemGroup.dataProvider = new eui.ArrayCollection(obj);
    };
    RechargeWin.prototype.update = function () {
    };
    return RechargeWin;
}(BaseEuiView));
__reflect(RechargeWin.prototype, "RechargeWin");
ViewManager.ins().reg(RechargeWin, LayerManager.UI_MainUI);
//# sourceMappingURL=RechargeWin.js.map