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
var TopPanel = (function (_super) {
    __extends(TopPanel, _super);
    function TopPanel() {
        return _super.call(this) || this;
    }
    TopPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this["nn"].text = UserVo.ins.playerName;
        this.m2.moneyType = MoneyUtils.M_2;
        this.m3.moneyType = MoneyUtils.M_3;
        this.addTouchEvent(this.m3.addGBtn, function () {
            ViewManager.ins().open(RechargeWin);
        });
    };
    return TopPanel;
}(BaseView));
__reflect(TopPanel.prototype, "TopPanel");
//# sourceMappingURL=TopPanel.js.map