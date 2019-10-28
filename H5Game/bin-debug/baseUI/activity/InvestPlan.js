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
var InvestPlan = (function (_super) {
    __extends(InvestPlan, _super);
    function InvestPlan() {
        var _this = _super.call(this) || this;
        _this.skinName = "InvestPlanSkin";
        return _this;
    }
    InvestPlan.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.activetyID = ActivetyMgr.INVEST_PLAN;
        var actdata = UserVo.ins.activityInfos.filter(function (e) {
            return e.activityId == "1004";
        });
        if (UserVo.ins.purchaseInvestment == 0) {
            this.getBtn.enabled = true;
        }
        else {
            this.getBtn.enabled = false;
        }
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20046, function (e) {
            console.log('----ServerPacket.C_20046----', e.data);
            if (e.data.code == 0) {
                _this.getBtn.enabled = false;
            }
        }, this);
        //购买投资计划
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (UserVo.ins.diamond < 500) {
                ViewManager.ins().open(TipsWin, "确定", "钻石不足，请充值", "提示", "", function () { }, null, _this);
            }
            HttpMgr.ins.sendMessage(ClientPacket.S_10046, {}, ServerPacket.LOGIC_URL, true);
        }, this);
    };
    return InvestPlan;
}(BaseActivityPanel));
__reflect(InvestPlan.prototype, "InvestPlan");
//# sourceMappingURL=InvestPlan.js.map