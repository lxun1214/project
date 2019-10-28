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
// TypeScript file
var ReborthWin = (function (_super) {
    __extends(ReborthWin, _super);
    function ReborthWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ReborthSkin";
        return _this;
    }
    ReborthWin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.reborthBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            HttpMgr.ins.sendMessage(ClientPacket.S_10011, {}, ServerPacket.LOGIC_URL);
            ViewManager.ins().close(ReborthWin);
        }, this);
        this.awardGroup.itemRenderer = BaseItem;
    };
    ReborthWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var a = ConfigMgr.gameConfig.rebirthAward[UserVo.ins.points];
        var c = [];
        var vo;
        for (var k in a) {
            var dx = MoneyUtils.isMoneyType(k);
            if (dx != -1 && a[k] > 0) {
                vo = new ItemInfo();
                vo.moneyType = MoneyUtils.ALL_MONEY[dx];
                vo.itemNum = a[k];
                c.push(vo);
            }
        }
        this.awardGroup.dataProvider = new eui.ArrayCollection(c);
        UIDmgr.bindingUID(this.reborthBtn, uid.cs1);
    };
    return ReborthWin;
}(BaseEuiView));
__reflect(ReborthWin.prototype, "ReborthWin");
ViewManager.ins().reg(ReborthWin, LayerManager.UI_MainUI);
//# sourceMappingURL=ReborthWin.js.map