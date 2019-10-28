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
var ForgeWin = (function (_super) {
    __extends(ForgeWin, _super);
    function ForgeWin() {
        var _this = _super.call(this) || this;
        _this.isFive = false;
        _this.upNum = 0;
        _this.skinName = "ForgeSkin";
        return _this;
    }
    ForgeWin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.glowFilter = new egret.GlowFilter(0xffff00, 0.8, 35, 35, 2, 3 /* HIGH */, false, false);
        var mc = new clips.BmpClip();
        mc.setScaleX(1.2);
        mc.scaleY = 1.2;
        ModelResMgr.getOtherEffect(10007, mc);
        mc.play(-1);
        this["g0"].addChild(mc);
        for (var i = 0; i < 10; i++) {
            this["equip" + i].itemIcon.labName.visible = false;
        }
    };
    ForgeWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_STRENGTH, this.onUpEquip, this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_ADVANCE, this.onAdvancedEquip, this);
        this.addChangeEvent(this.tabBar, this.selectPanel);
        this.addEvent(GameEvent.RED_STRENG, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_EQUIP_LVL, DataEventDispatcher.dispatcher, this.upRed);
        this.viewStack.selectedIndex = 0;
        this.panel = this.viewStack.getElementAt(0);
        this.update();
        for (var i_1 = 0; i_1 < 10; i_1++) {
            this.addTouchEvent(this["equip" + i_1], this.onSelectEquip);
        }
        this.panel.open(this.curData);
        for (var i = 0; i < 10; i++) {
            if (this["equip" + i].data) {
                UIDmgr.bindingUID(this["equip" + i], uid.forgeBtn1);
                break;
            }
        }
        this.upRed();
    };
    ForgeWin.prototype.upRed = function () {
        ViewManager.redToTarge(this.tabBar.getVirtualElementAt(0), RemindMgr.StrengEquips.length > 0);
        ViewManager.redToTarge(this.tabBar.getVirtualElementAt(1), RemindMgr.upEquipsLvl.length > 0);
        if (this.viewStack.selectedIndex == 0) {
            for (var i = 0; i < 10; i++) {
                ViewManager.redToTarge(this["equip" + i].itemIcon, RemindMgr.StrengEquips[i] ? true : false);
            }
        }
        else {
            for (var i = 0; i < 10; i++) {
                ViewManager.redToTarge(this["equip" + i].itemIcon, RemindMgr.upEquipsLvl[i] ? true : false);
            }
        }
    };
    ForgeWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        // if(this.currItem)this.currItem.itemIcon.filters = [];
        // this.currItem = null;
    };
    ForgeWin.prototype.selectPanel = function () {
        if (this.viewStack.selectedIndex == 0) {
            this.panel = this.viewStack.getElementAt(0);
        }
        else {
            this.panel = this.viewStack.getElementAt(1);
        }
        this.setSelectData();
        this.panel.open(this.curData);
        this.upRed();
    };
    ForgeWin.prototype.onUpEquip = function (e) {
        if (e.data.isSuccess) {
            this.update();
            this.setSelectData();
        }
    };
    ForgeWin.prototype.onAdvancedEquip = function (e) {
        if (e.data.isSuccess) {
            // UserVo.ins.reinforcedEquipmentStone = e.data.reinforcedStone;
            // UserVo.ins.fightPower = e.data.fightPower;
            this.curData.itemId++;
            this.update();
            this.setSelectData();
        }
    };
    ForgeWin.prototype.update = function () {
        if (!UserVo.ins.Columns)
            return;
        for (var i = 0; i < UserVo.ins.Columns.length; i++) {
            var itemInfo = UserVo.ins.Columns[i].itemInfo;
            this.removeTouchEvent(this["equip" + i], this.onSelectEquip);
            this.addTouchEvent(this["equip" + i], this.onSelectEquip);
            // if(!itemInfo)continue;
            this["equip" + i].data = itemInfo;
            // this["equip"+i].setItemName();
        }
    };
    ForgeWin.prototype.onSelectEquip = function (e) {
        if (this.currItem)
            this.currItem.itemIcon.filters = [];
        this.currItem = e.currentTarget;
        var data = this.currItem.data;
        if (!data)
            return;
        this.curData = data;
        this.setSelectData();
        this.currItem.itemIcon.filters = [this.glowFilter];
        UIDmgr.bindingUID(this.tabBar.getVirtualElementAt(0), uid.forgeBtn2);
        UIDmgr.bindingUID(this.tabBar.getVirtualElementAt(1), uid.forgeBtn4);
    };
    ForgeWin.prototype.setSelectData = function () {
        this.panel.setData(this.curData);
    };
    return ForgeWin;
}(BaseEuiView));
__reflect(ForgeWin.prototype, "ForgeWin");
ViewManager.ins().reg(ForgeWin, LayerManager.UI_MainUI);
//# sourceMappingURL=ForgeWin.js.map