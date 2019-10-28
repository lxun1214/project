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
var MessageView = (function (_super) {
    __extends(MessageView, _super);
    function MessageView() {
        var _this = _super.call(this) || this;
        _this.skinName = "MessageSkin";
        return _this;
    }
    MessageView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var s;
        var v;
        var d;
        for (var i = 0; i < MessageView.dataList.length; i++) {
            switch (i) {
                case 0:
                    s = UserVo.ins.playerName;
                    break;
                case 1:
                    s = UserVo.ins.points + "";
                    d = this.getLvl(1, UserVo.ins.points);
                    break;
                case 2:
                    s = UserVo.ins.rebirthNum + "";
                    d = this.getLvl(2, UserVo.ins.rebirthNum);
                    break;
                case 3:
                    s = UserVo.ins.fightPower + "";
                    d = this.getLvl(3, UserVo.ins.fightPower);
                    break;
                case 4:
                    v = this.getEquipsPower();
                    s = v + "";
                    d = this.getLvl(4, v);
                    break;
                case 5:
                    v = this.getEquipsPower(1);
                    s = v + "";
                    d = this.getLvl(5, v);
                    break;
                case 6:
                    v = this.skillPower();
                    s = v + "";
                    d = this.getLvl(6, v);
                    break;
                case 7:
                    v = this.AchievementProgress();
                    s = v + "%";
                    d = this.getLvl(7, v);
                    break;
            }
            this["l" + i].text = MessageView.dataList[i] + s;
            if (i != 0)
                this["l" + (i + 7)].text = d;
        }
        this.addTouchEvent(this.btn0, this.onTap);
        this.addTouchEvent(this.rc, this.onTap);
    };
    MessageView.prototype.getLvl = function (id, val) {
        var obj = ConfigMgr.gameConfig["info"][id];
        var s = ["D", "C", "B", "A", "S", "SS", "SSS"];
        for (var i = 0; i < s.length; i++) {
            if (i == s.length - 1)
                return s[i];
            else {
                if (val >= obj["Class" + s[i]] && val < obj["Class" + s[i + 1]])
                    return s[i];
            }
        }
    };
    MessageView.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    MessageView.prototype.getEquipsPower = function (t) {
        if (t === void 0) { t = 0; }
        var val = 0;
        for (var i = 0; i < UserVo.ins.Columns.length; i++) {
            if (t == 0) {
                var itemInfo = UserVo.ins.Columns[i].itemInfo;
                if (!itemInfo)
                    continue;
                var userEquip = ConfigMgr.gameConfig["equip"][itemInfo.itemId];
                val += userEquip.initialScore + itemInfo.level * userEquip.growScore;
            }
            else {
                var equipGem = UserVo.ins.Columns[i].gemGrooves.gemGrooves;
                for (var key in equipGem) {
                    var info = equipGem[key];
                    if (info.gemId > 0) {
                        var gemcfg = ConfigMgr.gameConfig["gemAttr"][info.gemId];
                        val += gemcfg.initialScore;
                    }
                }
            }
        }
        return val;
    };
    MessageView.prototype.skillPower = function () {
        var val = 0;
        for (var i = 0; i < Human.ins.useingSkill.length; i++) {
            val += Human.ins.useingSkill[i].stdSkill.initialScore;
        }
        return val;
    };
    MessageView.prototype.AchievementProgress = function () {
        var dd = [[], [], []];
        var a = TaskMgr.ins().typeTask[3];
        var c = UserVo.ins.getTaskInfo(3);
        for (var j = 0; j < a.length; j++) {
            a[j].completeNum = 0;
            a[j].isReceive = 1;
            for (var i = 0; i < c.length; i++) {
                if (a[j].taskId == c[i].taskId) {
                    a[j].completeNum = c[i].completeNum; //0已领 2 可领  1 未完成
                    a[j].isReceive = c[i].isReceive ? 0 : (c[i].completeNum >= a[j].taskTime &&
                        (a[j].lastTaskId == 0 || AchievementWin.isReceive(a[j].lastTaskId, 3)) ? 2 : 1);
                    break;
                }
            }
            dd[a[j].isReceive].push(a[j]);
        }
        return Math.floor((1 - (dd[1].length / a.length)) * 100);
    };
    MessageView.dataList = [
        ["玩家名:"],
        ["最高关卡层数:"],
        ["重生次数:"],
        ["战力:"],
        ["装备战力:"],
        ["宝石战力:"],
        ["技能战力:"],
        ["成就完成度:"]
    ];
    return MessageView;
}(BaseEuiView));
__reflect(MessageView.prototype, "MessageView");
ViewManager.ins().reg(MessageView, LayerManager.UI_Popup);
//# sourceMappingURL=MessageView.js.map