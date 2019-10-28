var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResMgr = (function () {
    function ResMgr() {
    }
    ResMgr.getGameOtherPng = function (value) {
        var url = ParamMgr.ressite + ParamMgr.gameSynRes;
        return url + "/assets/otherPng/" + value + ".png?v=" + ParamMgr.ver;
    };
    ResMgr.getGameOtherJpg = function (value) {
        var url = ParamMgr.ressite + ParamMgr.gameSynRes;
        return url + "/assets/otherPng/" + value + ".jpg?v=" + ParamMgr.ver;
    };
    ResMgr.getGameItemPng = function (value) {
        var url = ParamMgr.ressite + ParamMgr.gameSynRes;
        return url + "/assets/item/" + value + ".png?v=" + ParamMgr.ver;
    };
    ResMgr.getMapImage = function (value) {
        var url = ParamMgr.ressite + ParamMgr.gameSynRes;
        return url + "/assets/newMap/" + value + "?v=" + ConfigMgr.gameConfig["globalConfig"].mapVer;
    };
    ResMgr.skillIcon = function (value) {
        var url = ParamMgr.ressite + ParamMgr.gameSynRes;
        return url + "/assets/model/skill/" + value + ".png?v=" + ParamMgr.ver;
    };
    ResMgr.gameSound = function (value) {
        var url = ParamMgr.ressite + ParamMgr.gameSynRes;
        return url + "/assets/sound/" + value + ".mp3?v=" + ParamMgr.ver;
    };
    return ResMgr;
}());
__reflect(ResMgr.prototype, "ResMgr");
//# sourceMappingURL=ResMgr.js.map