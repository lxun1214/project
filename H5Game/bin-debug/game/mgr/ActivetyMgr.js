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
var ActivetyMgr = (function (_super) {
    __extends(ActivetyMgr, _super);
    function ActivetyMgr() {
        var _this = _super.call(this) || this;
        _this.activeConfig = {};
        var a = ConfigMgr.gameConfig["operationActivityDetail"];
        for (var i = 0; i < a.length; i++) {
            if (!_this.activeConfig[a[i].activityId])
                _this.activeConfig[a[i].activityId] = [];
            _this.activeConfig[a[i].activityId].push(a[i]);
        }
        return _this;
    }
    ActivetyMgr.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    ActivetyMgr.prototype.getActivityAwards = function (data) {
        var a = [];
        var d = [];
        var vo;
        var c;
        if (data.awardGoods != "" && data.awardGoods != "0") {
            d = data.awardGoods.split("#");
            for (var i = 0; i < d.length; i++) {
                c = d[i].split(":");
                vo = new ItemInfo();
                vo.itemId = parseInt(c[0]);
                vo.itemNum = parseInt(c[1]);
                a.push(vo);
            }
        }
        if (data.awardCurrency != "" && data.awardCurrency != "0") {
            d = data.awardCurrency.split("#");
            for (var i = 0; i < d.length; i++) {
                c = d[i].split(":");
                vo = new ItemInfo();
                vo.moneyType = c[0];
                vo.itemNum = parseInt(c[1]);
                a.push(vo);
            }
        }
        return a;
    };
    //检测奖励是否领取
    ActivetyMgr.prototype.checkAtivityEnd = function (id, dx) {
        var a = UserVo.ins.activityInfos;
        for (var i = 0; i < a.length; i++) {
            if (a[i].activityId == id) {
                var b = a[i].completedActivityInfos;
                for (var j = 0; j < b.length; j++) {
                    if (b[j].activityIndex == dx)
                        return b[j].isReward;
                }
            }
        }
        return -1;
    };
    ActivetyMgr.FIRST_CHARGE = 1000; //首冲
    ActivetyMgr.CONTINUE_LOGIN = 1001; //登陆奖励
    ActivetyMgr.STAGE_AWARD = 1002; //关卡奖励
    ActivetyMgr.MONTH_CARD = 1003; //月卡
    ActivetyMgr.INVEST_PLAN = 1004; //投资计划
    ActivetyMgr.CONSUME_GIFT = 1005; //消费礼包
    ActivetyMgr.LIMIT_CARD = 1006; //抽奖
    //活动序列
    ActivetyMgr.MAX_ACTIVE = 10007;
    return ActivetyMgr;
}(BaseClass));
__reflect(ActivetyMgr.prototype, "ActivetyMgr");
//# sourceMappingURL=ActivetyMgr.js.map