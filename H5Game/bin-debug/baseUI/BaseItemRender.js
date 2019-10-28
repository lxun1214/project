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
var BaseItemRender = (function (_super) {
    __extends(BaseItemRender, _super);
    function BaseItemRender() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._selected = false;
        _this.itemIndex = -1;
        _this.touchCaptured = false;
        return _this;
    }
    BaseItemRender.prototype.ontouchcancel = function (e) {
        this.touchCaptured = false;
        var stage = e.$currentTarget;
        stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.ontouchcancel, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        this.invalidateState();
        this.tapHandleFun();
    };
    BaseItemRender.prototype.onTouchBegin = function (e) {
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.ontouchcancel, this);
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        this.touchEnabled = true;
        this.invalidateState();
        e.updateAfterEvent();
    };
    BaseItemRender.prototype.onStageTouchEnd = function (e) {
        var stage = e.$currentTarget;
        stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.ontouchcancel, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        this.touchEnabled = true;
        this.invalidateState();
        this.tapHandleFun();
    };
    BaseItemRender.prototype.tapHandleFun = function () {
    };
    BaseItemRender.prototype.getCurrentState = function () {
        var state = "up";
        if (this.touchCaptured) {
            state = "down";
        }
        if (this._selected) {
            var selectedState = state + "AndSelected";
            var skin = this.skin;
            if (skin && skin.hasState(selectedState)) {
                return selectedState;
            }
            return state == "disabled" ? "disabled" : "down";
        }
        return state;
    };
    Object.defineProperty(BaseItemRender.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.dataChanged();
        },
        enumerable: true,
        configurable: true
    });
    BaseItemRender.prototype.dataChanged = function () {
    };
    Object.defineProperty(BaseItemRender.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            if (this._selected == value) {
                return;
            }
            this._selected = value;
            this.invalidateState();
        },
        enumerable: true,
        configurable: true
    });
    BaseItemRender.prototype.dispose = function () {
        this._data = null;
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    return BaseItemRender;
}(BaseView));
__reflect(BaseItemRender.prototype, "BaseItemRender", ["eui.IItemRenderer", "eui.UIComponent", "egret.DisplayObject"]);
eui.registerBindable(BaseItemRender.prototype, "data");
//# sourceMappingURL=BaseItemRender.js.map