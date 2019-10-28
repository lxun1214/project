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
/**
 *
 * @author
 *
 */
var AutoTimer = (function (_super) {
    __extends(AutoTimer, _super);
    function AutoTimer(delay, repeat) {
        var _this = this;
        var times = 0;
        if (repeat) {
            times = repeat;
        }
        _this = _super.call(this, delay, repeat) || this;
        _this.funcs = new Array();
        _this.params = new Array();
        return _this;
    }
    AutoTimer.prototype.hasFunc = function (func) {
        return this.funcs.indexOf(func) != -1;
    };
    AutoTimer.prototype.checkFuncs = function () {
        return this.funcs.length > 0 && !this.hasEventListener(egret.TimerEvent.TIMER);
    };
    AutoTimer.prototype.addFunc = function (func, thisObj, arg, once) {
        if (once === void 0) { once = false; }
        var index = this.funcs.indexOf(func);
        if (index == -1) {
            this.funcs.push(func);
            this.params.push({ thisObj: thisObj, params: arg, once: once });
        }
        else {
            this.params[index] = { thisObj: thisObj, params: arg, once: once };
        }
        if (this.checkFuncs()) {
            this.addEventListener(egret.TimerEvent.TIMER, this.onTime, this);
            this.start();
        }
    };
    AutoTimer.prototype.onTime = function (evt) {
        var i, func, param;
        var len = this.funcs.length - 1;
        var result;
        for (i = len; i >= 0; i--) {
            func = this.funcs[i];
            param = this.params[i];
            result = func.apply(param["thisObj"], param["params"]);
            if (param["once"] || result == true) {
                this.funcs.splice(i, 1);
                this.params.splice(i, 1);
            }
            //egret.log("ontime---" + param["once"]);
        }
        //egret.log("ontime---"+this.funcs.length);
        if (this.funcs.length <= 0) {
            this.stop();
            this.removeEventListener(egret.TimerEvent.TIMER, this.onTime, this);
        }
    };
    AutoTimer.prototype.removeFunc = function (func) {
        var index = this.funcs.indexOf(func);
        if (index != -1) {
            this.funcs.splice(index, 1);
            this.params.splice(index, 1);
        }
        if (this.funcs.length <= 0) {
            this.stop();
            this.removeEventListener(egret.TimerEvent.TIMER, this.onTime, this);
        }
        //egret.log("removeFunc---" + this.funcs.length);
    };
    /*
     * @销毁
     */
    AutoTimer.prototype.destruct = function () {
        //egret.log("removeFunc---" + this.funcs.length);
        this.stop();
        this.removeEventListener(egret.TimerEvent.TIMER, this.onTime, this);
        this.funcs = null;
        this.params = null;
    };
    return AutoTimer;
}(egret.Timer));
__reflect(AutoTimer.prototype, "AutoTimer");
//# sourceMappingURL=AutoTimer.js.map