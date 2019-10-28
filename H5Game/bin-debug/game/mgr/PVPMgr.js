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
var PVPMgr = (function (_super) {
    __extends(PVPMgr, _super);
    function PVPMgr() {
        var _this = _super.call(this) || this;
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20023, _this.fightBack, _this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20021, _this.buyBack, _this);
        var c = ConfigMgr.gameConfig["commonTimes"];
        _this.data = [];
        for (var key in c) {
            if (!_this.data[c[key].type])
                _this.data[c[key].type] = [];
            _this.data[c[key].type].push(c[key]);
        }
        return _this;
    }
    PVPMgr.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    PVPMgr.prototype.fightBack = function (e) {
        UserVo.ins.upUserVo({ challengeNum: UserVo.ins.challengeNum - 1 });
        GameLogic.ins.changeMap(UserVo.ins.points);
    };
    PVPMgr.prototype.buyBack = function (e) {
        if (e.data.isSuccess) {
            UserTips.ins().showTipsBigToSmall("次数购买成功!", false);
            UserVo.ins.upUserVo({ challengeNum: 1, challengeCount: UserVo.ins.challengeCount + 1 });
        }
        else {
            UserTips.ins().showTipsBigToSmall("次数购买失败!");
        }
    };
    PVPMgr.prototype.pVPFightEnd = function (val) {
        HttpMgr.ins.sendMessage(ClientPacket.S_10023, { isVictory: val }, ServerPacket.LOGIC_URL, true);
    };
    Object.defineProperty(PVPMgr.prototype, "canRefresh", {
        get: function () {
            var need;
            if (UserVo.ins.refreshPurchaseCount >= this.data[2].length - 2)
                need = parseInt(this.data[2][this.data[2].length - 1].consume);
            else
                need = parseInt(this.data[2][UserVo.ins.refreshPurchaseCount + 1].consume);
            // var bol:boolean = MoneyUtils.getMoneyNum(MoneyUtils.M_3) >= need;
            // if(!bol)
            // 	UserTips.ins().showTips(MoneyUtils.getMoneyName(MoneyUtils.M_3) + "不足,无法刷新!");
            return [need + MoneyUtils.getMoneyName(MoneyUtils.M_3), MoneyUtils.getMoneyNum(MoneyUtils.M_3) >= need];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PVPMgr.prototype, "buyCount", {
        get: function () {
            var need;
            if (UserVo.ins.challengeCount >= this.data[2].length - 2)
                need = parseInt(this.data[2][this.data[2].length - 1].consume);
            else
                need = parseInt(this.data[2][UserVo.ins.challengeCount + 1].consume);
            return [need + MoneyUtils.getMoneyName(MoneyUtils.M_3), MoneyUtils.getMoneyNum(MoneyUtils.M_3) >= need];
        },
        enumerable: true,
        configurable: true
    });
    return PVPMgr;
}(BaseClass));
__reflect(PVPMgr.prototype, "PVPMgr");
//# sourceMappingURL=PVPMgr.js.map