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
var ContinueLogin = (function (_super) {
    __extends(ContinueLogin, _super);
    function ContinueLogin() {
        return _super.call(this) || this;
    }
    ContinueLogin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.activetyID = ActivetyMgr.CONTINUE_LOGIN;
    };
    return ContinueLogin;
}(BaseActivityPanel));
__reflect(ContinueLogin.prototype, "ContinueLogin");
//# sourceMappingURL=ContinueLogin.js.map