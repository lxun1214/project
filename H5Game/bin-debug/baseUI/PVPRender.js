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
var PVPRender = (function (_super) {
    __extends(PVPRender, _super);
    function PVPRender() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!_this.vo)
                return UserTips.ins().showTipsBigToSmall("无数据信息,无法挑战!");
            if (!GameMap.ins().onHookMap)
                return UserTips.ins().showTipsBigToSmall("非挂机地图,无法挑战!");
            if (UserVo.ins.challengeNum != 0) {
                ViewManager.ins().close(UIView);
                ViewManager.ins().close(PVPWin);
                HttpMgr.ins.sendMessage(ClientPacket.S_10022, { otherPlayerId: _this.vo.otherPlayerId }, ServerPacket.LOGIC_URL, true);
            }
            else {
                var a = PVPMgr.ins().buyCount;
                ViewManager.ins().open(TipsWin, "确定", "是否花费" + a[0] + "购买挑战一次数!", "提示", "取消", function () {
                    if (a[1])
                        HttpMgr.ins.sendMessage(ClientPacket.S_10021, { otherPlayerId: _this.vo.otherPlayerId }, ServerPacket.LOGIC_URL, true);
                    else
                        UserTips.ins().showTipsBigToSmall(MoneyUtils.getMoneyName(MoneyUtils.M_3) + "不足,无法购买!");
                }, null, _this);
            }
        }, _this);
        return _this;
    }
    Object.defineProperty(PVPRender.prototype, "data", {
        set: function (val) {
            this.vo = val;
            if (!val) {
                this.rname.text = this.power.text = this.rank.text = "";
                this.eff.source = this.icon.source = this.role.source = null;
                this.role.source = null;
            }
            else {
                this.rname.text = val.otherPlayerName;
                this.power.text = "战斗力" + val.otherFightPower;
                this.rank.text = "第" + val.otherRankings + "名";
                this.role.source = "h_" + val.sex + "_png";
                this.icon.source = val.otherRankings < 4 ? "pvp0" + (4 + val.otherRankings) : null;
                this.eff.source = val.otherRankings < 4 ? "pvp" + (9 + val.otherRankings) : null;
                // this.icon.source = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    return PVPRender;
}(eui.Component));
__reflect(PVPRender.prototype, "PVPRender");
//# sourceMappingURL=PVPRender.js.map