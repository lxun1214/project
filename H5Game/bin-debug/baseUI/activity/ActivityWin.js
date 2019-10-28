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
var ActivityWin = (function (_super) {
    __extends(ActivityWin, _super);
    function ActivityWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ActivitySkin";
        return _this;
    }
    ActivityWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.checkRed();
        this.addEvent(GameEvent.RED_ACTIVETY, DataEventDispatcher.dispatcher, this.checkRed);
    };
    ActivityWin.prototype.checkRed = function () {
        var a;
        for (var i = 0; i < 4; i++) {
            a = this.viewStack.getChildAt(i);
            ViewManager.redToTarge(this.tabBar.getChildAt(i), RemindMgr.activetyAwards[a.activetyID + ""].length);
        }
    };
    ActivityWin.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        var btn;
        for (var i = 0; i < this.tabBar.numChildren; i++) {
            btn = this.tabBar.getChildAt(i);
            btn.name = i + "";
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                _this.switchPage(e, parseInt(e.currentTarget.name));
            }, this);
            if (i == 0)
                btn.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
        }
    };
    ActivityWin.prototype.switchPage = function (e, idx) {
        this.viewStack.$children.forEach(function (e, i) {
            e.visible = i == idx;
        });
        this.tabBar.$children.forEach(function (e, i) {
            var btn = e;
            btn.currentState = i == idx ? "down" : "up";
        });
    };
    return ActivityWin;
}(BaseEuiView));
__reflect(ActivityWin.prototype, "ActivityWin");
ViewManager.ins().reg(ActivityWin, LayerManager.UI_MainUI);
//# sourceMappingURL=ActivityWin.js.map