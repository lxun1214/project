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
var TaskRender = (function (_super) {
    __extends(TaskRender, _super);
    function TaskRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "AchieveRenderSkin";
        _this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            HttpMgr.ins.sendMessage(ClientPacket.S_10027, { taskId: _this.data.taskId }, ServerPacket.LOGIC_URL, true);
        }, _this);
        _this.items.labName.visible = false;
        return _this;
    }
    TaskRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        while (this.g0.numChildren) {
            this.g0.removeChildAt(0);
        }
        this.l1.text = this.data.taskTarget;
        var s = this.getitems();
        // this.l2.text = s[1];
        this.items.data = s[0];
        if (this.data.isReceive == 0) {
            this.btn1.label = "已领取";
            this.btn1.visible = true;
            this.btn.visible = this.btn1.enabled = false;
        }
        else if (this.data.isReceive == 2) {
            this.btn.visible = false;
            this.btn1.label = "领取奖励";
            this.btn1.enabled = this.btn1.visible = true;
        }
        else {
            this.btn1.enabled = this.btn1.visible = false;
            this.btn.visible = true;
        }
        if (this.itemIndex == 0) {
            if (this.data.taskType == 1)
                UIDmgr.bindingUID(this.btn1, uid.rw1);
            else
                UIDmgr.bindingUID(this.btn1, uid.cj1);
        }
        this.l0.text = this.data.name;
    };
    TaskRender.prototype.getitems = function () {
        var s = "奖励:";
        var a = this.data.awardGoods.split("#");
        var l;
        var oj;
        var vo;
        if (a && this.data.awardGoods != "") {
            while (a.length) {
                l = a.shift().split(":");
                s += BagVo.ins().getItem(parseInt(l[0])).name;
                s += "X";
                s += l[1] ? l[1] : 1;
                s += "  ";
                if (!vo) {
                    vo = new ItemInfo();
                    vo.itemId = parseInt(l[0]);
                    vo.itemNum = l[1] ? parseInt(l[1]) : 1;
                }
            }
        }
        a = this.data.awardCurrency.split("#");
        if (a && this.data.awardCurrency != "") {
            var awardRender;
            while (a.length) {
                l = a.shift().split(":");
                awardRender = new AwardShow();
                awardRender.data = [l[0], l[1] ? parseInt(l[1]) : 1];
                this.g0.addChild(awardRender);
                // s += MoneyUtils.getMoneyName(l[0])
                // s += "X";
                // s += l[1]?l[1]:1;
                // s += "  ";
                if (!vo) {
                    vo = new ItemInfo();
                    vo.moneyType = l[0];
                    vo.itemNum = 0;
                }
            }
        }
        return [vo, s];
    };
    return TaskRender;
}(eui.ItemRenderer));
__reflect(TaskRender.prototype, "TaskRender");
//# sourceMappingURL=TaskRender.js.map