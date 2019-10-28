var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var SystemInstance = (function () {
    function SystemInstance() {
        this._frameInstance = new egret.DisplayObject; //帧时间轴对象
        this._framefuncls = new Array();
        this._framefuncparams = new Array();
        this._timerls = new Array();
        this._functimerls = new HashMap();
    }
    Object.defineProperty(SystemInstance, "instance", {
        get: function () {
            if (!SystemInstance._instance) {
                SystemInstance._instance = new SystemInstance();
            }
            return SystemInstance._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 帧循环函数
     *
     */
    SystemInstance.nextFrameHandle = function (func, thisObj) {
        var arg = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arg[_i - 2] = arguments[_i];
        }
        SystemInstance.instance._addFrameHandle(func, thisObj, arg, true);
    };
    SystemInstance.addFrameHandle = function (func, thisObj) {
        var arg = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arg[_i - 2] = arguments[_i];
        }
        SystemInstance.instance._addFrameHandle(func, thisObj, arg);
    };
    SystemInstance.removeFrameHandle = function (thisObj, func) {
        SystemInstance.instance._removeFrameHandle(thisObj, func);
    };
    SystemInstance.prototype._hasFrameHandle = function () {
        return this._framefuncls.length > 0 && !this._frameInstance.hasEventListener(egret.Event.ENTER_FRAME);
    };
    SystemInstance.prototype._addFrameHandle = function (func, thisObj, arg, once) {
        if (once === void 0) { once = false; }
        var index = this._framefuncls.indexOf(func);
        if (index == -1) {
            this._framefuncls.push(func);
            this._framefuncparams.push({ thisObj: thisObj, params: arg, once: once });
        }
        else {
            this._framefuncparams[index] = { thisObj: thisObj, params: arg, once: once };
        }
        if (this._hasFrameHandle()) {
            this._frameInstance.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        }
    };
    SystemInstance.prototype.onFrame = function (evt) {
        var i, func, param;
        var len = this._framefuncls.length - 1;
        for (i = len; i >= 0; i--) {
            func = this._framefuncls[i];
            param = this._framefuncparams[i];
            func.apply(param["thisObj"], param["params"]);
            if (param["once"]) {
                this._framefuncls.splice(i, 1);
                this._framefuncparams.splice(i, 1);
            }
        }
        if (this._framefuncls.length <= 0) {
            this._frameInstance.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        }
        //egret.log("onFrame");
    };
    SystemInstance.prototype._removeFrameHandle = function (thisObj, func) {
        // var index: number = this._framefuncls.indexOf(func);
        // if(index != -1)
        // {
        //     this._framefuncls.splice(index,1);
        //     this._framefuncparams.splice(index,1);
        // 	    if(index != -1)
        // {
        //     this._framefuncls.splice(index,1);
        //     this._framefuncparams.splice(index,1);
        // }
        var len = this._framefuncparams.length;
        var param;
        for (var i = 0; i < len; i++) {
            param = this._framefuncparams[i];
            if (thisObj == param["thisObj"]) {
                this._framefuncls.splice(i, 1);
                this._framefuncparams.splice(i, 1);
                break;
            }
        }
        if (this._hasFrameHandle()) {
            this._frameInstance.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        }
    };
    /**
     * 计时器函数
     *
     */
    SystemInstance.onceTickHandle = function (func, time, thisObj) {
        var arg = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            arg[_i - 3] = arguments[_i];
        }
        SystemInstance.instance._addTimeHandle(func, time, thisObj, arg, true);
    };
    /**
     * 计时器函数
     * 不覆盖原来的计时器
     */
    SystemInstance.onceTickHandleNotCover = function (func, time, thisObj) {
        var arg = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            arg[_i - 3] = arguments[_i];
        }
        SystemInstance.instance._addTimeHandle(func, time, thisObj, arg, true, false);
    };
    SystemInstance.addTimeHandle = function (func, time, thisObj) {
        var arg = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            arg[_i - 3] = arguments[_i];
        }
        SystemInstance.instance._addTimeHandle(func, time, thisObj, arg);
    };
    SystemInstance.prototype._addTimeHandle = function (func, time, thisObj, arg, once, isCover) {
        if (once === void 0) { once = false; }
        if (isCover === void 0) { isCover = true; }
        var timer = this._functimerls.get(func);
        if (timer && isCover) {
            if (timer.delay != time) {
                timer.removeFunc(func);
            }
            else {
                timer.addFunc(func, thisObj, arg, once);
                return;
            }
        }
        timer = new AutoTimer(time);
        timer.addFunc(func, thisObj, arg, once);
        this._functimerls.add(func, timer);
    };
    SystemInstance.removeTimeHandle = function (func) {
        SystemInstance.instance._removeTimeHandle(func);
    };
    SystemInstance.prototype._removeTimeHandle = function (func) {
        var timer = this._functimerls.get(func);
        if (timer) {
            timer.removeFunc(func);
            this._functimerls.delete(func);
        }
    };
    /*
     *求最大公约数
     */
    SystemInstance.divisor = function (a, b) {
        var r;
        while ((r = a % b) != 0) {
            a = b;
            b = r;
        }
        return b;
    };
    /*
     *求最小公倍数
     */
    SystemInstance.multiple = function (a, b) {
        var d;
        d = SystemInstance.divisor(a, b);
        return a * b / d;
    };
    /**
     * 判断显示对象是否可见
     */
    SystemInstance.checkDisplayVisibled = function (disObj) {
        if (!disObj.stage || !disObj.visible) {
            return false;
        }
        var parent = disObj.parent;
        while (parent) {
            if (parent == disObj.stage) {
                break;
            }
            if (!parent.visible) {
                return false;
            }
            parent = parent.parent;
        }
        return true;
    };
    /**
     * 精确精度
    */
    SystemInstance.formatFloat = function (value) {
        return value;
        //return Math.round(value * 100000000000000000) / 100000000000000000;
    };
    return SystemInstance;
}());
__reflect(SystemInstance.prototype, "SystemInstance");
//# sourceMappingURL=SystemInstance.js.map