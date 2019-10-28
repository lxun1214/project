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
var EmailMgr = (function (_super) {
    __extends(EmailMgr, _super);
    function EmailMgr() {
        return _super.call(this) || this;
    }
    EmailMgr.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    EmailMgr.prototype.addEmail = function (a) {
        if (!UserVo.ins.emailInfos)
            UserVo.ins.emailInfos = [];
        UserVo.ins.emailInfos.unshift(a); // a.concat(UserVo.ins.emailInfos);
        DataEventDispatcher.dispatchEventWith(GameEvent.ADD_EMAIL);
    };
    EmailMgr.prototype.readEmail = function (id) {
        var d = UserVo.ins.emailInfos;
        for (var i = 0; i < d.length; i++) {
            if (d[i].emailId == id) {
                d[i].readState = 1;
                break;
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.UP_EMAIL_STATUS, [id]);
    };
    EmailMgr.prototype.removeEmail = function (c) {
        var d = UserVo.ins.emailInfos;
        for (var i = 0; i < c.length; i++) {
            for (var j = 0; j < d.length; j++) {
                if (d[j].emailId == c[i]) {
                    d.splice(j, 1);
                    break;
                }
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.REMOVE_EMAIL, c);
    };
    EmailMgr.prototype.getAward = function (c) {
        var d = UserVo.ins.emailInfos;
        for (var i = 0; i < c.length; i++) {
            for (var j = 0; j < d.length; j++) {
                if (d[j].emailId == c[i]) {
                    d[j].itemState = 1;
                    break;
                }
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.UP_EMAIL_STATUS, c);
    };
    return EmailMgr;
}(BaseClass));
__reflect(EmailMgr.prototype, "EmailMgr");
//# sourceMappingURL=EmailMgr.js.map