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
var CdKeyPanel = (function (_super) {
    __extends(CdKeyPanel, _super);
    function CdKeyPanel() {
        return _super.call(this) || this;
    }
    CdKeyPanel.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.txt.text == "")
                return UserTips.ins().showTipsBigToSmall("请输入要兑换的激活码!");
            HttpMgr.ins.sendMessage(ClientPacket.S_10045, { giftCode: _this.txt.text }, ServerPacket.LOGIC_URL, true);
            _this.txt.text = "";
        }, this);
    };
    return CdKeyPanel;
}(eui.Component));
__reflect(CdKeyPanel.prototype, "CdKeyPanel");
//# sourceMappingURL=CdKeyPanel.js.map