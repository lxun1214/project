var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ParamMgr = (function () {
    function ParamMgr() {
    }
    Object.defineProperty(ParamMgr, "gameSynRes", {
        get: function () {
            if (true)
                return ParamMgr.synRes;
            else
                return "resource";
        },
        enumerable: true,
        configurable: true
    });
    ParamMgr.initParam = function () {
        var obj = window["gameParam"];
        if (obj) {
            for (var k in obj) {
                this[k] = obj[k];
            }
        }
    };
    ParamMgr.synRes = "resource";
    ParamMgr.ressite = "";
    ParamMgr.serverUrl = "http://106.12.117.205:8080/"; //选服服务器
    ParamMgr.gameUrl = ""; //游戏登陆的服务器
    ParamMgr.SPID = 0; //运营商Id
    ParamMgr.rechargeURL = ""; //充值接口
    return ParamMgr;
}());
__reflect(ParamMgr.prototype, "ParamMgr");
//# sourceMappingURL=ParamMgr.js.map