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
var MonthCard = (function (_super) {
    __extends(MonthCard, _super);
    function MonthCard() {
        var _this = _super.call(this) || this;
        _this.skinName = "MonthCardSkin";
        _this.gd.itemRenderer = BaseItem;
        _this.gd.dataProvider = new eui.ArrayCollection(ActivetyMgr.ins().getActivityAwards(ConfigMgr.gameConfig["monthMember"][1]));
        _this.it.data = ActivetyMgr.ins().getActivityAwards(ConfigMgr.gameConfig["monthMember"][2])[0];
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20044, function (e) {
            console.log('----ServerPacket.C_20044----', e.data);
            _this.buyBtn.visible = false;
            _this.getBtn.label = "已 领 取";
            _this.getBtn.enabled = false;
            UserVo.ins.monthCardInfo.isReceive = true;
        }, _this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30010, function (e) {
            UserVo.ins.monthCardInfo = e.data.monthCardInfo;
            _this.buyBtn.visible = false;
            _this.getBtn.label = "领 取";
            _this.getBtn.enabled = true;
        }, _this);
        _this["rc"].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            ViewManager.ins().close(_this);
        }, _this);
        _this["newCloseBtn00"].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            ViewManager.ins().close(_this);
        }, _this);
        return _this;
    }
    MonthCard.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var mouthCard = UserVo.ins.monthCardInfo;
        if (mouthCard) {
            var isget = mouthCard['isReceive'];
            this.buyBtn.visible = false;
            if (isget) {
                this.getBtn.enabled = false;
                this.getBtn.label = "已 领 取";
            }
            else {
                this.getBtn.label = "领 取";
                this.getBtn.enabled = true;
            }
            this.left_text.text = "\u5269\u4F59" + mouthCard['cardEndDay'] + "\u5929";
        }
        else {
            this.getBtn.label = "未 达 成";
            this.buyBtn.visible = true;
            this.left_text.text = "\u5269\u4F590\u5929";
        }
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            HttpMgr.ins.sendMessage(ClientPacket.S_10044, {}, ServerPacket.LOGIC_URL, true);
        }, this);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var data = ConfigMgr.gameConfig["paymentBase"][6];
            if (ParamMgr.SPID == 0)
                RechargeVo.ins().sendRechargeOrderRequest(data.mallId);
            else
                MoneyUtils.recharge(data);
        }, this);
    };
    return MonthCard;
}(BaseEuiView));
__reflect(MonthCard.prototype, "MonthCard");
ViewManager.ins().reg(MonthCard, LayerManager.UI_MainUI);
//# sourceMappingURL=MonthCard.js.map