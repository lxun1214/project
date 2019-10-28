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
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        var _this = _super.call(this) || this;
        _this.horizontalCenter = 0;
        _this.skinName = "loginViewSkin";
        _this.b1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.loginGame, _this);
        var obj = egret.localStorage.getItem("an");
        if (obj)
            _this.t1.text = obj + "";
        obj = egret.localStorage.getItem("pw");
        if (obj)
            _this.t2.text = obj + "";
        return _this;
    }
    LoginView.prototype.loginGame = function () {
        if (this.t1.text == "") {
            UserTips.ins().showTipsBigToSmall("请输入正确的账号!");
            return;
        }
        if (this.t2.text == "") {
            UserTips.ins().showTipsBigToSmall("请输入正确的密码!");
            return;
        }
        var data = {
            accountName: this.t1.text,
            passWord: this.t2.text
        };
        this.b1.touchEnabled = false;
        egret.localStorage.setItem("an", this.t1.text);
        egret.localStorage.setItem("pw", this.t2.text);
        HttpMgr.ins.sendMessage(ClientPacket.S_1002, data, ServerPacket.LOGIN_URL);
    };
    LoginView.prototype.dispose = function () {
        if (this.parent)
            this.parent.removeChild(this);
        this.b1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginGame, this);
    };
    return LoginView;
}(eui.Component));
__reflect(LoginView.prototype, "LoginView", ["IDispose"]);
//# sourceMappingURL=LoginView.js.map