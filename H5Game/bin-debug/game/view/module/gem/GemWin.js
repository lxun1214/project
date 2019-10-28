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
 * 宝石
 */
var GemWin = (function (_super) {
    __extends(GemWin, _super);
    function GemWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "GemSkin";
        return _this;
    }
    GemWin.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.itemList.itemRenderer = BaseItem;
        this.itemList.addEventListener(eui.UIEvent.RENDER, function () {
            UIDmgr.bindingUID(_this.itemList.getVirtualElementAt(0), uid.bs1);
        }, this);
    };
    GemWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        for (var i = 0; i < BagVo.EQUIP_MAX; i++) {
            this.addTouchEvent(this["btn" + i], this.onSelectBtn);
            this.addTouchEndEvent(this["btn" + i], this.onSelectBtn);
            this["btn" + i].name = i + "";
        }
        for (var j = 0; j < 8; j++) {
            this.addTouchEvent(this["gen" + j], this.onItemRender);
        }
        if (!this.currBtn)
            this.btn0.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
        this.updateGemList();
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_GEM_DATA, this.selectEquip, this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA, this.updateGemList, this);
        UIDmgr.bindingUID(this.gen0.itemIcon, uid.bs2);
        UIDmgr.bindingUID(this.gen0.upBtn, uid.bs3);
        UIDmgr.bindingUID(this.gen0.downBtn, uid.bs4);
        // UIDmgr.bindingUID(this.itemList.getVirtualElementAt(0),uid.bs1);
        UIDmgr.bindingUID(this, uid.bsParent);
        this.addEvent(GameEvent.RED_GEM_LVL, DataEventDispatcher.dispatcher, this.upRed);
        this.upRed();
    };
    GemWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        GemVo.ins().equipPos = -1;
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_GEM_DATA, this.selectEquip, this);
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_BAG_DATA, this.updateGemList, this);
    };
    GemWin.prototype.upRed = function (e) {
        if (e === void 0) { e = null; }
        for (var i = 0; i < 4; i++) {
            if (RemindMgr.GEM_CAN_UP[i].length > 0) {
                ViewManager.redToTarge(this["btn" + i], true);
            }
            else
                ViewManager.redToTarge(this["btn" + i], false);
        }
        for (var i = 0; i < 8; i++) {
            if (!RemindMgr.GEM_CAN_UP[this.selectIndex])
                ViewManager.redToTarge(this["gen" + i].itemIcon, false);
            else {
                ViewManager.redToTarge(this["gen" + i].itemIcon, RemindMgr.GEM_CAN_UP[this.selectIndex][i] ? true : false);
            }
        }
    };
    GemWin.prototype.onSelectBtn = function (e) {
        var _this = this;
        // if(this.currBtn)
        // 	this.currBtn.selected = false;
        this.currBtn = e.currentTarget;
        // this.currBtn.selected = true;
        this.tabBar.$children.forEach(function (e, i) {
            var btn = e;
            btn.currentState = btn == _this.currBtn ? "down" : "up";
        });
        this.selectIndex = parseInt(this.currBtn.name);
        this.selectEquip();
        this.upRed();
    };
    GemWin.prototype.selectEquip = function () {
        if (this.currGem)
            this.currGem.setBtnGrou(false);
        GemVo.ins().equipPos = this.selectIndex;
        this.selectItem.data = UserVo.ins.Columns[this.selectIndex].itemInfo;
        var equipGem = UserVo.ins.Columns[this.selectIndex].gemGrooves.gemGrooves;
        var pos = 0;
        for (var key in equipGem) {
            var info = equipGem[key];
            this["gen" + pos].data = info;
            pos++;
        }
        // this.selectItem.setItemName();
    };
    GemWin.prototype.updateGemList = function () {
        var gemList = BagVo.ins().getBagGemList();
        if (gemList.length < 12) {
            for (var i = 0; i < 12; i++) {
                if (!gemList[i]) {
                    gemList[i] = null;
                }
            }
        }
        this.itemList.dataProvider = new eui.ArrayCollection(gemList);
    };
    GemWin.prototype.onItemRender = function (e) {
        if (this.currGem)
            this.currGem.setBtnGrou(false);
        this.currGem = e.currentTarget;
        if (this.currGem.data.gemId > 0) {
            this.currGem.setBtnGrou(!this.currGem.btnGroup.visible, this.currGem == this.gen2 ? -133 : 0);
        }
    };
    return GemWin;
}(BaseEuiView));
__reflect(GemWin.prototype, "GemWin");
ViewManager.ins().reg(GemWin, LayerManager.UI_MainUI);
//# sourceMappingURL=GemWin.js.map