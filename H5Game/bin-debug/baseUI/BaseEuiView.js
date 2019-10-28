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
 * View基类，继承eui.Compeonent
 */
var BaseEuiView = (function (_super) {
    __extends(BaseEuiView, _super);
    function BaseEuiView() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = false;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    /**
     * 面板是否显示
     * @param return
     */
    BaseEuiView.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    /**
     * 添加到父级
     */
    BaseEuiView.prototype.addToParent = function (p) {
        p.addChild(this);
    };
    /**
     * 从父级移除
     */
    BaseEuiView.prototype.removeFromParent = function (p) {
        this.destroy();
    };
    /**
     * 销毁
     */
    BaseEuiView.prototype.destroy = function () {
        if (!this.parent == null)
            return;
        this.parent.removeChild(this);
    };
    BaseEuiView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.win) {
            this.newCloseBtn01 = this.win["newCloseBtn01"];
            this.newCloseBtn00 = this.win["newCloseBtn00"];
            if (this.newCloseBtn01) {
                this.addChild(this.newCloseBtn01);
                this.addTouchEvent(this.newCloseBtn01, this.closeCall);
                UIDmgr.bindingUID(this.newCloseBtn01, uid.back2);
            }
            if (this.newCloseBtn00) {
                this.addChild(this.newCloseBtn00);
                this.addTouchEvent(this.newCloseBtn00, this.closeCall);
                UIDmgr.bindingUID(this.newCloseBtn00, uid.back0);
            }
        }
    };
    BaseEuiView.prototype.closeCall = function () {
        ViewManager.ins().close(this);
    };
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param参数
     */
    BaseEuiView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseEuiView.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    return BaseEuiView;
}(BaseView));
__reflect(BaseEuiView.prototype, "BaseEuiView");
//# sourceMappingURL=BaseEuiView.js.map