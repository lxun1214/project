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
var ActivityItem = (function (_super) {
    __extends(ActivityItem, _super);
    function ActivityItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ActivityItemSkin";
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            HttpMgr.ins.sendMessage(ClientPacket.S_10032, { activityId: _this.data.activityId, activityIndex: _this.itemIndex + 1 }, ServerPacket.LOGIC_URL, true);
        }, _this);
        return _this;
    }
    ActivityItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.dg.itemRenderer = BaseItem;
    };
    ActivityItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.dg.dataProvider = new eui.ArrayCollection(ActivetyMgr.ins().getActivityAwards(this.data));
        this.upStatus(!ActivetyMgr.ins().checkAtivityEnd(this.data.activityId, this.itemIndex + 1));
        if (this.data.activityId == ActivetyMgr.CONTINUE_LOGIN)
            this.title.text = "持续登陆" + this.data.part1 + "天!";
        else if (this.data.activityId == ActivetyMgr.STAGE_AWARD)
            this.title.text = "关卡达到" + this.data.part1 + "层!";
        else if (this.data.activityId == ActivetyMgr.INVEST_PLAN)
            this.title.text = "重生等级达到" + this.data.part1 + "级!";
        else
            this.title.text = "累计消费" + this.data.part1 + "!";
    };
    ActivityItem.prototype.upStatus = function (isReward) {
        if (isReward == -1)
            return;
        this.btn.label = isReward ? "领取" : "已领取";
        this.btn.enabled = isReward;
        ViewManager.redToTarge(this.btn, isReward);
    };
    return ActivityItem;
}(eui.ItemRenderer));
__reflect(ActivityItem.prototype, "ActivityItem");
//# sourceMappingURL=ActivityItem.js.map