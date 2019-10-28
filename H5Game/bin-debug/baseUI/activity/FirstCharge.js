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
// TypeScript file
var FirstCharge = (function (_super) {
    __extends(FirstCharge, _super);
    function FirstCharge() {
        var _this = _super.call(this) || this;
        _this.skinName = "FirstChargeSkin";
        _this["rc"].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            ViewManager.ins().close(_this);
        }, _this);
        _this["newCloseBtn00"].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            ViewManager.ins().close(_this);
        }, _this);
        _this.activetyID = ActivetyMgr.FIRST_CHARGE;
        return _this;
    }
    FirstCharge.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.isRecharge, DataEventDispatcher.dispatcher, this.dataChange);
        this.dataChange();
    };
    FirstCharge.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.gd.itemRenderer = BaseItem;
        this.gd.dataProvider = new eui.ArrayCollection(ActivetyMgr.ins().getActivityAwards(ActivetyMgr.ins().activeConfig[ActivetyMgr.FIRST_CHARGE][0]));
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (_this.getBtn.label == "我要充值") {
                ViewManager.ins().open(RechargeWin);
                return;
            }
            var data = {
                activityId: ActivetyMgr.FIRST_CHARGE,
                activityIndex: 1
            };
            HttpMgr.ins.sendMessage(ClientPacket.S_10032, data, ServerPacket.LOGIC_URL, true);
        }, this);
        this.dataChange();
    };
    FirstCharge.prototype.dataChange = function () {
        var isReward = ActivetyMgr.ins().checkAtivityEnd(this.activetyID, 1);
        if (UserVo.ins.isRecharge) {
            if (isReward == true) {
                this.getBtn.enabled = false;
                this.getBtn.label = "已 领 取";
            }
            else {
                this.getBtn.enabled = true;
                this.getBtn.label = "领 取";
            }
        }
        else {
            this.getBtn.enabled = true;
            this.getBtn.label = "我要充值";
        }
    };
    return FirstCharge;
}(BaseEuiView));
__reflect(FirstCharge.prototype, "FirstCharge");
ViewManager.ins().reg(FirstCharge, LayerManager.UI_MainUI);
//# sourceMappingURL=FirstCharge.js.map