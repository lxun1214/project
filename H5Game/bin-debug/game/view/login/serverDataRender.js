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
var serverDataRender = (function (_super) {
    __extends(serverDataRender, _super);
    function serverDataRender() {
        var _this = _super.call(this) || this;
        _this.touchChildren = false;
        return _this;
    }
    serverDataRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        // var s:string = this.data.serverState == 1?"正常":"关闭";
        this.l0.textFlow = ColorUtlis.COLOR_STR(this.data.serverId + "区  " + this.data.serverName, this.data.serverState == 1);
        this.l1.source = !this.data.v ? "流畅" : "火爆";
    };
    return serverDataRender;
}(eui.ItemRenderer));
__reflect(serverDataRender.prototype, "serverDataRender");
//# sourceMappingURL=serverDataRender.js.map