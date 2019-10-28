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
var SelectLogin = (function (_super) {
    __extends(SelectLogin, _super);
    function SelectLogin(info, list) {
        var _this = _super.call(this) || this;
        _this.horizontalCenter = 0;
        _this.skinName = "selectLoginSkin";
        _this.data = info;
        _this.serverlist = list.reverse();
        if (_this.serverlist.length > 0) {
            var c = _this.serverlist[0];
            c.v = true;
            _this.l0.textFlow = ColorUtlis.COLOR_STR(c.serverId + "区  " + c.serverName, c.serverState == 1);
        }
        _this.da.itemRenderer = serverDataRender;
        _this.da.dataProvider = new eui.ArrayCollection(list);
        // var s:string = info.serverState == 1?"正常":"关闭";
        _this.l2.textFlow = _this.l1.textFlow = ColorUtlis.COLOR_STR(info.serverId + "区  " + info.serverName, info.serverState == 1);
        _this.b1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.getServer, _this);
        _this.da.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.getServer, _this);
        _this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.getServer, _this);
        _this.r.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.getServer, _this);
        return _this;
    }
    SelectLogin.prototype.getServer = function (e) {
        if (e.currentTarget == this.bg) {
            this.g0.visible = true;
        }
        else if (e.currentTarget == this.r) {
            this.g0.visible = false;
        }
        else if (e.currentTarget == this.b1) {
            if (this.data.serverState != 1) {
                UserTips.ins().showTipsBigToSmall("当前区服属于关闭状态,请重新选择!");
                return;
            }
            this.b1.touchEnabled = false;
            var data = {
                serverId: this.data.serverId,
                userId: UserVo.ins.userId
            };
            GlobalVo.serverId = this.data.serverId;
            HttpMgr.ins.sendMessage(ClientPacket.S_1004, data, ServerPacket.LOGIN_URL);
        }
        else {
            if (e.target instanceof serverDataRender) {
                this.g0.visible = false;
                var info = this.serverlist[e.target.itemIndex];
                this.data = info;
                // var s:string = info.serverState == 1?"正常":"关闭";
                this.l1.textFlow = ColorUtlis.COLOR_STR(info.serverId + "区  " + info.serverName, info.serverState == 1);
            }
        }
    };
    SelectLogin.prototype.dispose = function () {
        if (this.parent)
            this.parent.removeChild(this);
        this.b1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getServer, this);
    };
    return SelectLogin;
}(eui.Component));
__reflect(SelectLogin.prototype, "SelectLogin", ["IDispose"]);
//# sourceMappingURL=SelectLogin.js.map