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
var MoneyPanel = (function (_super) {
    __extends(MoneyPanel, _super);
    function MoneyPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "moneySkin";
        return _this;
    }
    Object.defineProperty(MoneyPanel.prototype, "moneyType", {
        set: function (val) {
            this.mt = val;
            // var dx:number;
            // switch(val)
            // {
            // 	case MoneyUtils.M_2:
            // 		this.goldImg.source = "money_2";
            // 		// dx = propertyType.gold;
            // 		this.addGBtn.visible = false;
            // 		break;
            // 	case MoneyUtils.M_3:
            // 		this.goldImg.source = "money_3";
            // 		// dx = propertyType.diamond;
            // 		break;
            // }
            this.goldImg.source = ResMgr.getGameItemPng(val);
            DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE, this.upVal, this);
            this.upVal();
        },
        enumerable: true,
        configurable: true
    });
    MoneyPanel.prototype.upVal = function () {
        this.labGold.text = CommonUtils.overLength(MoneyUtils.getMoneyNum(this.mt)); //MoneyUtils.getMoneyNum(this.mt) + "";
    };
    return MoneyPanel;
}(eui.Component));
__reflect(MoneyPanel.prototype, "MoneyPanel");
//# sourceMappingURL=MoneyPanel.js.map