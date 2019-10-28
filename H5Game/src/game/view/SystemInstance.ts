/**
 *
 * @author 
 *
 */
class SystemInstance {
    private static _instance: SystemInstance;

    private _framefuncls: Array<Function>;//帧循环函数
    private _framefuncparams: Array<Object>;//帧循环函数参数

    private _timerls: Array<AutoTimer>;//计时器数组
    private _functimerls: HashMap;//时间函数列表

    private _frameInstance: egret.DisplayObject = new egret.DisplayObject;//帧时间轴对象

    public constructor() {
        this._framefuncls = new Array<Function>();
        this._framefuncparams = new Array<Object>();

        this._timerls = new Array<AutoTimer>();
        this._functimerls = new HashMap();
    }

    private static get instance(): SystemInstance {
        if (!SystemInstance._instance) {
            SystemInstance._instance = new SystemInstance();
        }
        return SystemInstance._instance;
    }

	/**
	 * 帧循环函数
	 * 
	 */
    public static nextFrameHandle(func: Function, thisObj: any, ...arg: any[]): void {
        SystemInstance.instance._addFrameHandle(func, thisObj, arg, true);
    }

    public static addFrameHandle(func: Function, thisObj: any, ...arg: any[]): void {
        SystemInstance.instance._addFrameHandle(func, thisObj, arg);
    }
    public static removeFrameHandle(thisObj: any, func: Function): void {
        SystemInstance.instance._removeFrameHandle(thisObj, func);
    }
    private _hasFrameHandle(): Boolean {
        return this._framefuncls.length > 0 && !this._frameInstance.hasEventListener(egret.Event.ENTER_FRAME);
    }
    private _addFrameHandle(func: Function, thisObj: any, arg: any[], once: Boolean = false): void {
        var index: number = this._framefuncls.indexOf(func);
        if (index == -1) {
            this._framefuncls.push(func);
            this._framefuncparams.push({ thisObj: thisObj, params: arg, once: once });
        } else {
            this._framefuncparams[index] = { thisObj: thisObj, params: arg, once: once };
        }
        if (this._hasFrameHandle()) {
            this._frameInstance.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        }
    }
    private onFrame(evt: egret.Event): void {
        var i: number, func: Function, param: Object;
        var len: number = this._framefuncls.length - 1;
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
    }
    private _removeFrameHandle(thisObj: any, func: Function): void {
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
        var len: number = this._framefuncparams.length;
        var param: Object;
        for (var i: number = 0; i < len; i++) {
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
    }

	/**
	 * 计时器函数
	 * 
	 */
    public static onceTickHandle(func: Function, time: number, thisObj: any, ...arg: any[]): void {
        SystemInstance.instance._addTimeHandle(func, time, thisObj, arg, true);
    }
    /**
	 * 计时器函数
	 * 不覆盖原来的计时器
	 */
    public static onceTickHandleNotCover(func: Function, time: number, thisObj: any, ...arg: any[]): void {
        SystemInstance.instance._addTimeHandle(func, time, thisObj, arg, true,false);
    }

    public static addTimeHandle(func: Function, time: number, thisObj: any, ...arg: any[]): void {
        SystemInstance.instance._addTimeHandle(func, time, thisObj, arg);
    }
    private _addTimeHandle(func: Function, time: number, thisObj: any, arg: any[], once: Boolean = false, isCover: boolean = true): void {
        var timer: AutoTimer = <AutoTimer>this._functimerls.get(func);
        if (timer && isCover) {
            if (timer.delay != time) {
                timer.removeFunc(func);
            } else {
                timer.addFunc(func, thisObj, arg, once);
                return;
            }
        }
        timer = new AutoTimer(time);
        timer.addFunc(func, thisObj, arg, once);
        this._functimerls.add(func, timer);
    }

    public static removeTimeHandle(func: Function): void {
        SystemInstance.instance._removeTimeHandle(func);
    }
    private _removeTimeHandle(func: Function): void {
        var timer: AutoTimer = <AutoTimer>this._functimerls.get(func);
        if (timer) {
            timer.removeFunc(func);
            this._functimerls.delete(func);
        }
    }

    /*
     *求最大公约数
     */
    public static divisor(a: number, b: number): number {
        var r: number;
        while ((r = a % b) != 0) {
            a = b;
            b = r;
        }
        return b;
    }

    /*
     *求最小公倍数
     */
    public static multiple(a: number, b: number): number {
        var d: number;
        d = SystemInstance.divisor(a, b);
        return a * b / d;
    }

    /**
     * 判断显示对象是否可见
     */
    public static checkDisplayVisibled(disObj: egret.DisplayObject): boolean {
        if (!disObj.stage || !disObj.visible) {
            return false;
        }
        var parent: egret.DisplayObjectContainer = disObj.parent;
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
    }

    /**
     * 精确精度
    */
    public static formatFloat(value: number): number {
        return value;
        //return Math.round(value * 100000000000000000) / 100000000000000000;
    }
}
