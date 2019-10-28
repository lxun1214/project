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
var OfflineWin = (function (_super) {
    __extends(OfflineWin, _super);
    // b2:eui.Button;
    // rc:eui.Rect;
    function OfflineWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "offlineSkin";
        return _this;
    }
    OfflineWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this);
        var obj = param[0];
        this.l0.text = "离线时间:" + DateTimeUtils.toTimeString(obj.offlineTime);
        this.l1.text = "" + CommonUtils.overLength(obj.gold);
        this.l2.text = "" + CommonUtils.overLength(obj.exp);
        this.b0.visible = obj.amplitude == 0;
        // this.l3.text = "0";
        this.l4.text = "" + CommonUtils.overLength(obj.gold * obj.amplitude / 100);
        this.l5.text = "" + CommonUtils.overLength(obj.exp * obj.amplitude / 100);
        this.addTouchEvent(this.b0, this.onTap);
        // this.addTouchEvent(this.rc,this.onTap);
        this.addTouchEvent(this.b1, this.onTap);
        // this.addTouchEvent(this.b2,this.onTap);
        this.addEvent(egret.Event.ADDED_TO_STAGE, this, this.addStage);
    };
    OfflineWin.prototype.addStage = function () {
        this.addTouchEvent(this.stage, this.onTap);
    };
    OfflineWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.b0:
                ViewManager.ins().open(MonthCard);
                break;
        }
        ViewManager.ins().close(this);
    };
    return OfflineWin;
}(BaseEuiView));
__reflect(OfflineWin.prototype, "OfflineWin");
ViewManager.ins().reg(OfflineWin, LayerManager.UI_Tips);
//# sourceMappingURL=OfflineWin.js.map