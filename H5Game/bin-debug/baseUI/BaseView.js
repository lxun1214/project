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
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        _this.event = [];
        _this.addEvent(egret.Event.COMPLETE, _this, _this.euiCompete);
        return _this;
    }
    BaseView.prototype.addTouchEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
    };
    BaseView.prototype.addTouchEndEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.TOUCH_END, obj, func);
    };
    BaseView.prototype.addChangeEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.CHANGE, obj, func);
    };
    BaseView.prototype.addEvent = function (ev, obj, func) {
        if (!obj) {
            var s = this.skinName + ".exml\u6587\u4EF6\u9519\u8BEF";
            console.error(s);
            alert(s);
            return;
        }
        obj.addEventListener(ev, func, this);
        this.event.push([ev, func, obj]);
    };
    BaseView.prototype.removeTouchEvent = function (obj, func) {
        obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
    };
    BaseView.prototype.removeEvents = function () {
        for (var _i = 0, _a = this.event; _i < _a.length; _i++) {
            var ev = _a[_i];
            ev[2].removeEventListener(ev[0], ev[1], this);
        }
    };
    BaseView.prototype.euiCompete = function () {
    };
    BaseView.prototype.$onClose = function () {
        var fun = function (tar) {
            for (var i = 0; i < tar.numChildren; i++) {
                var obj = tar.getChildAt(i);
                if (obj instanceof BaseView) {
                    obj.$onClose();
                }
                else if (obj instanceof egret.DisplayObjectContainer) {
                    fun(obj);
                }
            }
        };
        fun(this);
        this.removeEvents();
    };
    BaseView.prototype.bindLogic = function (com, logic) {
        com["__proto__"] = logic;
    };
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView");
//# sourceMappingURL=BaseView.js.map