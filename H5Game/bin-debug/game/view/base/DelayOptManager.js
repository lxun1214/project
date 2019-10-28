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
var DelayOptManager = (function (_super) {
    __extends(DelayOptManager, _super);
    function DelayOptManager() {
        var _this = _super.call(this) || this;
        _this.TIME_THRESHOLD = 2;
        _this._delayOpts = [];
        egret.startTick(_this.runCachedFun, _this);
        return _this;
    }
    DelayOptManager.ins = function () {
        return _super.ins.call(this);
    };
    DelayOptManager.prototype.addDelayOptFunction = function (thisObj, fun, funPara, callBack, para) {
        this._delayOpts.push({ "fun": fun, "funPara": funPara, "thisObj": thisObj, "callBack": callBack, "para": para });
    };
    DelayOptManager.prototype.clear = function () {
        this._delayOpts.length;
    };
    DelayOptManager.prototype.runCachedFun = function (time) {
        if (this._delayOpts.length == 0)
            return false;
        var timeFlag = egret.getTimer();
        var funObj;
        while (this._delayOpts.length) {
            funObj = this._delayOpts.shift();
            if (funObj.funPara)
                funObj.fun.call(funObj.thisObj, funObj.funPara);
            else
                funObj.fun.call(funObj.thisObj);
            if (funObj.callBack) {
                if (funObj.para != undefined) {
                    funObj.callBack.call(funObj.thisObj, funObj.para);
                }
                else
                    funObj.callBack();
            }
            if (egret.getTimer() - timeFlag > this.TIME_THRESHOLD)
                break;
        }
        return false;
    };
    return DelayOptManager;
}(BaseClass));
__reflect(DelayOptManager.prototype, "DelayOptManager");
//# sourceMappingURL=DelayOptManager.js.map