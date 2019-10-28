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
var AchievementWin = (function (_super) {
    __extends(AchievementWin, _super);
    function AchievementWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "AchievementSkin";
        _this.dg.itemRenderer = TaskRender;
        return _this;
    }
    AchievementWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this);
        this.updata();
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.RED_ACHEIEVEMENT, this.updata, this);
        UIDmgr.bindingUID(this, uid.cjParent);
    };
    AchievementWin.prototype.updata = function (t) {
        if (t === void 0) { t = null; }
        this.dg.dataProvider = new eui.ArrayCollection(RemindMgr.taskArr[3]);
    };
    AchievementWin.isReceive = function (id, type) {
        var c = UserVo.ins.getTaskInfo(type);
        for (var i = 0; i < c.length; i++) {
            if (id == c[i].taskId) {
                if (c[i].isReceive)
                    return true;
                return false;
            }
        }
        return false;
    };
    return AchievementWin;
}(BaseEuiView));
__reflect(AchievementWin.prototype, "AchievementWin");
ViewManager.ins().reg(AchievementWin, LayerManager.UI_MainUI);
//# sourceMappingURL=AchievementWin.js.map