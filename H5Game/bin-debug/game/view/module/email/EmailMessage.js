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
var EmailMessage = (function (_super) {
    __extends(EmailMessage, _super);
    function EmailMessage() {
        return _super.call(this) || this;
        // this.skinName = "EmailMessageSkin";
    }
    EmailMessage.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.dg.itemRenderer = BaseItem;
        this.btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.data.itemState != 0)
                return UserTips.ins().showTipsBigToSmall("该邮件附件已领取!");
            if (!_this.data.itemList || _this.data.itemList.length == 0)
                return UserTips.ins().showTipsBigToSmall("该邮件无附件可领取!");
            HttpMgr.ins.sendMessage(ClientPacket.S_10038, { emailId: _this.data.emailId }, ServerPacket.LOGIC_URL, true);
        }, this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_EMAIL_STATUS, this.upStatus, this);
        EmailMessage.ins = this;
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.REMOVE_EMAIL, function (e) {
            if (_this.data && e.data.indexOf(_this.data.emailId) != -1) {
                _this.l2.text = "";
                _this.data = null;
            }
        }, this);
    };
    EmailMessage.prototype.setData = function (d) {
        if (this.data == d)
            return;
        if (d.readState == 0)
            HttpMgr.ins.sendMessage(ClientPacket.S_10037, { emailId: d.emailId }, ServerPacket.LOGIC_URL, true);
        this.btn0.visible = true;
        this.data = d;
        // this.dg.dataProvider = new eui.ArrayCollection(d.itemList);
        this.l2.text = d.emailContent;
        this.upStatus(null);
    };
    EmailMessage.prototype.upStatus = function (e) {
        if (e && e.data.indexOf(this.data.emailId) == -1)
            return;
        this.btn0.visible = this.data.itemState == 0 && this.data.itemList && this.data.itemList.length > 0;
        if (this.btn0.visible)
            this.dg.dataProvider = new eui.ArrayCollection(this.data.itemList);
        else
            this.dg.dataProvider = new eui.ArrayCollection([]);
    };
    return EmailMessage;
}(eui.Component));
__reflect(EmailMessage.prototype, "EmailMessage");
//# sourceMappingURL=EmailMessage.js.map