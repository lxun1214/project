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
var BagWin = (function (_super) {
    __extends(BagWin, _super);
    function BagWin() {
        var _this = _super.call(this) || this;
        _this.typeAr = [];
        _this.skinName = "BagSkin";
        _this.isTopLevel = true;
        _this.itemList.addEventListener(egret.Event.RENDER, function () {
            UIDmgr.bindingUID(_this.itemList.getVirtualElementAt(0), uid.bagItem);
        }, _this);
        return _this;
    }
    BagWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.typeAr = [BagVo.ITEM_TYPE_EQUIP, BagVo.ITEM_TYPE_OTHER, BagVo.ITEM_TYPE_GEM];
        this.btnIndex = param[0] | 0;
        this.currList = [];
        this.itemList.itemRenderer = BaseItem;
        this.group.visible = this.smeltBtn.visible = true;
        // this.equipBtn.visible = this.gemBtn.visible = true;
        var data = ConfigMgr.gameConfig["item"][2001];
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA, this.selectType, this);
        this.addTouchEvent(this.smeltBtn, this.onTap);
        this.addTouchEvent(this.btn0, this.onTypeTap);
        this.addTouchEvent(this.btn1, this.onTypeTap);
        this.addTouchEvent(this.btn2, this.onTypeTap);
        // this.update();
        this.selectType();
        UIDmgr.bindingUID(this.btn0, uid.equipBtn);
        UIDmgr.bindingUID(this.smeltBtn, uid.rl0);
        UIDmgr.bindingUID(this.group, uid.itemParent);
        this.addEvent(GameEvent.RED_BAG_RED, DataEventDispatcher.dispatcher, this.upRed);
        UIDmgr.bindingUID(this.itemList.getVirtualElementAt(0), uid.bagItem);
        ViewManager.redToTarge(this.btn1, RemindMgr.hasOtherItem);
    };
    BagWin.prototype.upRed = function () {
        ViewManager.redToTarge(this.btn1, RemindMgr.hasOtherItem);
    };
    BagWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_BAG_DATA, this.selectType, this);
        if (this.curTabBtn)
            this.curTabBtn.currentState = "up";
    };
    BagWin.prototype.update = function () {
        if (this.currList.length < 36) {
            for (var i = 0; i < 36; i++) {
                if (!this.currList[i])
                    this.currList[i] = null;
            }
        }
        this.itemList.dataProvider = new eui.ArrayCollection(this.currList);
    };
    BagWin.prototype.onTap = function (e) {
        ViewManager.ins().open(SmeltWin);
    };
    BagWin.prototype.onTypeTap = function (e) {
        switch (e.currentTarget) {
            case this.btn0:
                this.btnIndex = 0;
                break;
            case this.btn1:
                this.btnIndex = 1;
                break;
            case this.btn2:
                this.btnIndex = 2;
                break;
        }
        this.selectType();
    };
    BagWin.prototype.selectType = function () {
        if (this.curTabBtn)
            this.curTabBtn.currentState = "up";
        this.curTabBtn = this["btn" + this.btnIndex];
        this.curTabBtn.currentState = "down";
        this.smeltBtn.visible = this.btnIndex == 0;
        this.currList = BagVo.ins().getTypeItemList(this.typeAr[this.btnIndex]);
        this.update();
    };
    return BagWin;
}(BaseEuiView));
__reflect(BagWin.prototype, "BagWin");
ViewManager.ins().reg(BagWin, LayerManager.UI_MainUI);
//# sourceMappingURL=BagWin.js.map