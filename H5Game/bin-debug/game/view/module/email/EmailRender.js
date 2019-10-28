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
var EmailRender = (function (_super) {
    __extends(EmailRender, _super);
    // btn0:eui.Button;
    function EmailRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "EmailRenderSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // if(this.data.itemState != 0)
            // 	return UserTips.ins().showTips("该邮件附件已领取!");
            // if(!this.data.itemList || this.data.itemList.length == 0)
            // 	return UserTips.ins().showTips("该邮件无附件可领取!");
            // HttpMgr.ins.sendMessage(ClientPacket.S_10038,{emailId:this.data.emailId},ServerPacket.LOGIC_URL,true);
            EmailMessage.ins.setData(_this.data);
        }, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_EMAIL_STATUS, _this.upStatus, _this);
        return _this;
    }
    EmailRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.upStatus(null);
    };
    EmailRender.prototype.upStatus = function (e) {
        if (e && e.data.indexOf(this.data.emailId) == -1)
            return;
        // this.btn0.visible = false;
        var s = "";
        if (this.data.readState == 0)
            s = " <font color='#1CFF05'>未读";
        else {
            if (this.data.itemState == 0 && this.data.itemList && this.data.itemList.length > 0) {
                // if(s != "")
                // 	s += " (可领取";
                // else
                s = " <font color='#1CFF05'>可领取";
                // this.btn0.visible = true;
            }
            else
                s = " <font color='#F70707'>已读";
        }
        if (s != "")
            s += "</font>";
        this.l1.text = this.data.emailTitle;
        this.l0.textFlow = new egret.HtmlTextParser().parser(s);
    };
    return EmailRender;
}(eui.ItemRenderer));
__reflect(EmailRender.prototype, "EmailRender");
//# sourceMappingURL=EmailRender.js.map