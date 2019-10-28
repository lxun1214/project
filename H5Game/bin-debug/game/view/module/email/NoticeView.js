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
var NoticeView = (function (_super) {
    __extends(NoticeView, _super);
    function NoticeView() {
        var _this = _super.call(this) || this;
        _this.skinName = "NoticeSkin";
        _this.l0.textFlow = new egret.HtmlTextParser().parse(ConfigMgr.gameConfig["bulletin"][0].content);
        _this.l1.textFlow = new egret.HtmlTextParser().parse(ConfigMgr.gameConfig["bulletin"][0].title);
        return _this;
    }
    NoticeView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this.btn0, this.onTap);
        // this.addTouchEvent(this.rc,this.onTap);
    };
    NoticeView.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            // case this.rc:
            // 	ViewManager.ins().close(this);
            // 	break;
            case this.btn0:
                ViewManager.ins().close(this);
                break;
            default:
                break;
        }
    };
    return NoticeView;
}(BaseEuiView));
__reflect(NoticeView.prototype, "NoticeView");
ViewManager.ins().reg(NoticeView, LayerManager.UI_Popup);
//# sourceMappingURL=NoticeView.js.map