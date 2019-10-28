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
var BaseActivityPanel = (function (_super) {
    __extends(BaseActivityPanel, _super);
    function BaseActivityPanel() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BaseActivityPanel.prototype, "activetyID", {
        get: function () {
            return this.aID;
        },
        set: function (v) {
            this.aID = v;
            this.cf = ActivetyMgr.ins().activeConfig[v];
            this.dg.itemRenderer = ActivityItem;
            this.dg.dataProvider = new eui.ArrayCollection(this.cf);
            this.bg.source = "a" + v + "_png";
            DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20032, this.backGetAward, this);
            DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30006, this.completeActive, this);
        },
        enumerable: true,
        configurable: true
    });
    BaseActivityPanel.prototype.backGetAward = function (e) {
        if (e.data.isSuccess) {
            if (this.aID == e.data.activityId) {
                this.dg.getElementAt(e.data.activityIndex - 1).upStatus(false);
            }
        }
    };
    BaseActivityPanel.prototype.completeActive = function (e) {
        if (this.aID == e.data.activityId) {
            this.dg.getElementAt(e.data.activityIndex - 1).upStatus(true);
        }
    };
    return BaseActivityPanel;
}(eui.Component));
__reflect(BaseActivityPanel.prototype, "BaseActivityPanel");
//# sourceMappingURL=BaseActivityPanel.js.map