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
var PVPWin = (function (_super) {
    __extends(PVPWin, _super);
    function PVPWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "PVPSkin";
        return _this;
    }
    PVPWin.prototype.euiCompete = function () {
        _super.prototype.euiCompete.call(this);
        this.l1.itemRenderer = AwardShow;
    };
    PVPWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this);
        this.addEvent(ServerPacket.C_20020, DataEventDispatcher.dispatcher, this.upData);
        this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.challengeNum, DataEventDispatcher.dispatcher, this.upChallenge);
        this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.fightPower, DataEventDispatcher.dispatcher, this.upPower);
        this.addEvent(ServerPacket.C_20030, DataEventDispatcher.dispatcher, this.upFightInfos);
        HttpMgr.ins.sendMessage(ClientPacket.S_10020, {}, ServerPacket.LOGIC_URL, true);
        this.addTouchEvent(this.btn, this.onClick);
        this.addTouchEvent(this.btn0, this.onClick);
        this.upChallenge();
        this.upPower();
        UIDmgr.bindingUID(this.r0, uid.p1);
    };
    PVPWin.prototype.onClick = function (e) {
        if (e.currentTarget == this.btn0) {
            HttpMgr.ins.sendMessage(ClientPacket.S_10026, {}, ServerPacket.LOGIC_URL, true);
            return;
        }
        var a = PVPMgr.ins().canRefresh;
        if (a[0] == 0)
            HttpMgr.ins.sendMessage(ClientPacket.S_10030, {}, ServerPacket.LOGIC_URL, true);
        else {
            ViewManager.ins().open(TipsWin, "确定", "是否花费" + a[0] + "刷新挑战对手!", "提示", "取消", function () {
                if (a[1])
                    HttpMgr.ins.sendMessage(ClientPacket.S_10030, {}, ServerPacket.LOGIC_URL, true);
                else
                    UserTips.ins().showTipsBigToSmall(MoneyUtils.getMoneyName(MoneyUtils.M_3) + "不足,无法购买!");
            }, null, this);
        }
    };
    PVPWin.prototype.upChallenge = function () {
        this.l4.text = "挑战次数:" + UserVo.ins.challengeNum;
    };
    PVPWin.prototype.upPower = function () {
        this.l3.text = "我的战斗力:" + UserVo.ins.fightPower;
    };
    PVPWin.prototype.upData = function (e) {
        this.l0.text = "当前排名:" + e.data.rankings;
        this.upFightInfos(e);
        var i;
        PVPMgr.MyRank = e.data.rankings;
        this.l1.dataProvider = new eui.ArrayCollection(PVPWin.getAwardStr(e.data.rankings));
    };
    PVPWin.getAwardStr = function (n) {
        var d = [];
        var a = ConfigMgr.gameConfig["rankingAward"];
        var i;
        var rank;
        for (i = 0; i < a.length; i++) {
            rank = a[i].rankingId.split("#");
            if (n >= parseInt(rank[0]) && n <= parseInt(rank[1])) {
                if (a[i].diamond > 0)
                    d.push([MoneyUtils.M_3, a[i].diamond]);
                if (a[i].battleCurrency > 0)
                    d.push([MoneyUtils.M_5, a[i].battleCurrency]);
            }
        }
        return d;
    };
    PVPWin.prototype.upFightInfos = function (e) {
        for (var i = 0; i < e.data.fightTargetInfos.length; i++) {
            this["r" + i].data = e.data.fightTargetInfos[i] ? e.data.fightTargetInfos[i] : null;
        }
    };
    PVPWin.PVP_ing = false;
    return PVPWin;
}(BaseEuiView));
__reflect(PVPWin.prototype, "PVPWin");
ViewManager.ins().reg(PVPWin, LayerManager.UI_MainUI);
//# sourceMappingURL=PVPWin.js.map