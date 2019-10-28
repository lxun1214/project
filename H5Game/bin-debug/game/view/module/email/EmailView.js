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
var EmailView = (function (_super) {
    __extends(EmailView, _super);
    // rc:eui.Rect;
    // mess:EmailMessage;
    function EmailView() {
        var _this = _super.call(this) || this;
        _this.skinName = "EmailSkin";
        _this.g0.itemRenderer = EmailRender;
        return _this;
        // this.mess = new EmailMessage();
    }
    EmailView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        // this.addTouchEvent(this.g0,this.onTap);
        this.addTouchEvent(this.btn0, this.onTap);
        this.addTouchEvent(this.btn1, this.onTap);
        // this.addTouchEvent(this.rc,this.onTap);
        this.currDx = -1;
        this.addEvent(GameEvent.REMOVE_EMAIL, DataEventDispatcher.dispatcher, this.upEmail);
        this.addEvent(GameEvent.ADD_EMAIL, DataEventDispatcher.dispatcher, this.upEmail);
        this.upEmail();
    };
    EmailView.prototype.upEmail = function () {
        // while(this.g0.numChildren)
        // {
        // 	this.g0.removeChildAt(0);
        // }
        this.g0.dataProvider = new eui.ArrayCollection(UserVo.ins.emailInfos);
        // var s:EmailRender;
        // for(var i:number=0;i<UserVo.ins.emailInfos.length;i++)
        // {
        // 	s = new EmailRender();
        // 	s.data = UserVo.ins.emailInfos[i];
        // 	this.g0.addChild(s);
        // }
    };
    EmailView.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            // case this.rc:
            // 	ViewManager.ins().close(this);
            // 	break;
            case this.btn0:
                // var a:Array<number> = []
                // for(var i:number=0;i<UserVo.ins.emailInfos.length;i++)
                // {
                // 	if(UserVo.ins.emailInfos[i].readState == 1)
                // 		a.push(UserVo.ins.emailInfos[i].emailId);
                // }
                // if(a.length == 0)
                // 	return UserTips.ins().showTips("没有可删除的邮件!");
                HttpMgr.ins.sendMessage(ClientPacket.S_10041, {}, ServerPacket.LOGIC_URL, true);
                break;
            case this.btn1:
                var has = false;
                for (var i = 0; i < UserVo.ins.emailInfos.length; i++) {
                    if (UserVo.ins.emailInfos[i].itemList && UserVo.ins.emailInfos[i].itemList.length > 0 && UserVo.ins.emailInfos[i].itemState == 0)
                        has = true;
                }
                if (!has)
                    return UserTips.ins().showTipsBigToSmall("没有可领取的邮件!");
                HttpMgr.ins.sendMessage(ClientPacket.S_10039, {}, ServerPacket.LOGIC_URL, true);
                break;
        }
    };
    return EmailView;
}(BaseEuiView));
__reflect(EmailView.prototype, "EmailView");
ViewManager.ins().reg(EmailView, LayerManager.UI_MainUI);
//# sourceMappingURL=EmailView.js.map