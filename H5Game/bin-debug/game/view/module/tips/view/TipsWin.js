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
var TipsWin = (function (_super) {
    __extends(TipsWin, _super);
    // private l0: eui.Label;
    function TipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "TipsViewSkin";
        return _this;
    }
    TipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        // this.tipStr = param[0]||"";
        if (!param[3] || param[3] == "") {
            this.buyBtn1.visible = this.buyBtn2.visible = false;
            this.buyBtn0.visible = true;
            this.buyBtn0.label = param[0];
        }
        else {
            this.buyBtn1.visible = this.buyBtn2.visible = true;
            this.buyBtn0.visible = false;
            this.buyBtn1.label = param[0];
            this.buyBtn2.label = param[3];
        }
        this.labDesc.text = param[1];
        this.win1.titleS = param[2] ? param[2] : "提示";
        this.call0 = param[4];
        this.call1 = param[5];
        this.arg = param[6];
        // this.addTouchEvent(this.closeBg, this.onTap);
        // this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.buyBtn0, this.onTap);
        this.addTouchEvent(this.buyBtn1, this.onTap);
        this.addTouchEvent(this.buyBtn2, this.onTap);
        // this.setTips();
    };
    // private setTips(): void{
    // 	this.labDesc.text = this.tipStr;
    // }
    TipsWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.buyBtn0:
            case this.buyBtn1:
                if (this.call0)
                    this.call0.apply(this.arg);
                break;
            default:
                if (this.call1)
                    this.call1.apply(this.arg);
                break;
        }
        ViewManager.ins().close(this);
    };
    return TipsWin;
}(BaseEuiView));
__reflect(TipsWin.prototype, "TipsWin");
ViewManager.ins().reg(TipsWin, LayerManager.UI_Tips);
//# sourceMappingURL=TipsWin.js.map