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
var ShopWin = (function (_super) {
    __extends(ShopWin, _super);
    // public returnBtn:eui.ToggleButton;
    function ShopWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "shopSkin";
        return _this;
    }
    ShopWin.prototype.createChildren = function () {
        // this.pt.titleImg.source = "t_1";
        this.list.itemRenderer = ShopItemRender;
    };
    // private selectType:number = 0;
    ShopWin.prototype.open = function () {
        var prama = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            prama[_i] = arguments[_i];
        }
        // this.update();
        _super.prototype.open.call(this, prama);
        this.addTouchEvent(this.b0, this.onTap);
        this.addTouchEvent(this.b1, this.onTap);
        this.addTouchEvent(this.b2, this.onTap);
        this.addTouchEvent(this.b3, this.onTap);
        if (!this.select)
            this.b0.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
        // this.addTouchEvent(this.returnBtn, this.onTap);
    };
    ShopWin.prototype.update = function (d) {
        var ar = ConfigMgr.gameConfig["store"];
        var c = [];
        for (var i = 0; i < ar.length; i++) {
            if (!ar[i].down && d == ar[i].storeType)
                c.push(ar[i]);
        }
        // this.list.itemRenderer = ShopItemRender;
        this.list.dataProvider = new eui.ArrayCollection(c);
        this.itemScroller.stopAnimation();
        this.itemScroller.viewport.scrollV = 0;
    };
    ShopWin.prototype.onTap = function (e) {
        var uiView = ViewManager.ins().getView(UIView);
        switch (e.currentTarget) {
            case this.b0:
                this.update(1);
                // uiView.setSelectView(BagWin);
                break;
            case this.b1:
                this.update(2);
                // uiView.setSelectView(GemWin);
                break;
            case this.b2:
                this.update(3);
                // uiView.setSelectView(GemWin);
                break;
            case this.b3:
                this.update(4);
                // uiView.setSelectView(GemWin);
                break;
        }
        if (this.select)
            this.select.currentState = "up";
        this.select = e.currentTarget;
        this.select.currentState = "down";
        //e.currentTarget.currentState = "up";
        // ViewManager.ins().close(this);
    };
    return ShopWin;
}(BaseEuiView));
__reflect(ShopWin.prototype, "ShopWin");
ViewManager.ins().reg(ShopWin, LayerManager.UI_MainUI);
//# sourceMappingURL=ShopWin.js.map