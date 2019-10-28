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
var ItemGetWayView = (function (_super) {
    __extends(ItemGetWayView, _super);
    function ItemGetWayView() {
        var _this = _super.call(this) || this;
        _this.skinName = "ItemGetWaySkin";
        _this.b0.name = "0";
        _this.b1.name = "1";
        _this.item.labName.visible = false;
        _this.item.labCount.visible = false;
        return _this;
    }
    ItemGetWayView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.param = [];
        var val = param[0];
        var icon = param[1];
        var itemName = param[2];
        var s;
        this.item.setIcon(icon);
        this.item.isClick = false;
        this.iname.text = itemName;
        this.g0.visible = this.g1.visible = false;
        for (var i = 0; i < 2; i++) {
            if (!val[i])
                break;
            s = val[i].split(",");
            this.param[i] = s;
            this["g" + i].visible = true;
            this.addTouchEvent(this["b" + i], this.onTap);
            this["i" + i].source = "gainItem" + s[0];
        }
        this.addTouchEvent(this.rc, this.onTap);
    };
    ItemGetWayView.prototype.onTap = function (e) {
        if (e.target == this.rc) {
        }
        else {
            var s = this.param[parseInt(e.target.name)];
            var uiView = ViewManager.ins().getView(UIView);
            switch (parseInt(s[0])) {
                case ViewID.points:
                    break;
                case ViewID.pveII:
                    if (s.length == 0)
                        ViewManager.ins().open(PVEWin);
                    else {
                        //uiView.setSelectView(PVEWinII,FBMgr.ins.fbData[parseInt(s[1])]);
                        ViewManager.ins().open(PVEWinII, FBMgr.ins.fbData[parseInt(s[1])]);
                    }
                    break;
                default:
                    if (s.length == 0) {
                        ViewManager.ins().open(UIView, ViewManager.getView(parseInt(s[0])));
                    }
                    else
                        egret.log("未实现!");
                    break;
            }
        }
        ViewManager.ins().close(this);
    };
    return ItemGetWayView;
}(BaseEuiView));
__reflect(ItemGetWayView.prototype, "ItemGetWayView");
ViewManager.ins().reg(ItemGetWayView, LayerManager.UI_Tips);
//# sourceMappingURL=ItemGetWayView.js.map