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
 * 熔炼
 */
var SmeltWin = (function (_super) {
    __extends(SmeltWin, _super);
    function SmeltWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SmeltSkin";
        return _this;
    }
    SmeltWin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.group.visible = true;
        // this.selectData = [];
        this.userItem.isClick = false;
        this.smaltItem.isClick = false;
    };
    SmeltWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this.smeltBtn, this.onTap);
        this.itemList.itemRenderer = SmeltItemRender;
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA, this.onBox, this);
        // SmeltWin.selectAr = [];
        SmeltWin.showItem = [];
        var colorAr = [0xffffff, 0x0000ff, 0xff00ff, 0xffff00, 0xe69138, 0xffd966];
        for (var i = 0; i < 6; i++) {
            // this.getChildAt
            this.addChangeEvent(this["box" + i], this.onBox);
            this["box" + i].getChildAt(2).textColor = colorAr[i];
        }
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onList, this);
        this.onBox(null);
        UIDmgr.bindingUID(this.smeltBtn, uid.rl1);
    };
    SmeltWin.prototype.updateList = function () {
        // this.dataList = BagVo.ins().getSmeltList();
        if (!this.dataList)
            return;
        this.itemList.dataProvider = new eui.ArrayCollection(this.dataList);
        this.updateObtain();
    };
    SmeltWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            // case this.returnBtn:
            // 	ViewManager.ins().close(this);
            // 	break;
            case this.smeltBtn:
                this.sendSmelt();
                break;
        }
    };
    /**
     * 选择品质道具
     */
    SmeltWin.prototype.onBox = function (e) {
        var box = e ? e.currentTarget : undefined;
        if (box) {
            SmeltWin.selectAr = [];
            for (var i = 0; i < 6; i++) {
                if (this["box" + i].selected) {
                    SmeltWin.selectAr.push(i);
                }
            }
        }
        if (!box || !(box instanceof eui.CheckBox)) {
            // this["box0"].selected = true;
            // SmeltWin.selectAr = [0];
            this.dataList = BagVo.ins().getQualitySmeltList([0]);
        }
        // else if(this.selectAr.length > 0 && !this.selectAr.indexOf(0)){
        // 	this["box0"].selected = false;
        // }
        SmeltWin.showItem = BagVo.ins().getQualitySmeltList(SmeltWin.selectAr);
        this.updateList();
    };
    /**
     * 点击熔炼列表
     */
    SmeltWin.prototype.onList = function (e) {
        var item = e.itemRenderer;
        item.selectGr.visible = !item.selectGr.visible;
        if (item.selectGr.visible) {
            SmeltWin.showItem.push(item.data);
        }
        else {
            SmeltWin.showItem.splice(SmeltWin.showItem.indexOf(item.data), 1);
        }
        this.updateObtain();
    };
    /**
     * 更新获取
     */
    SmeltWin.prototype.updateObtain = function () {
        if (!SmeltWin.showItem || SmeltWin.showItem.length == 0) {
            this.userItem.data = null;
            this.smaltItem.data = null;
            return;
        }
        this.userItem.setQuality(1);
        this.userItem.setIcon("money_6");
        this.userItem.setName("升阶石");
        this.userItem.setCount(UserVo.ins.reinforcedEquipmentStone);
        this.smaltItem.setQuality(1);
        this.smaltItem.setIcon("money_6");
        this.smaltItem.setName("升阶石");
        var addNum = 0;
        for (var key in SmeltWin.showItem) {
            var info = SmeltWin.showItem[key];
            var cfg = ConfigMgr.gameConfig["equip"][info.itemId];
            addNum += cfg.fenjieEquipmentStone;
        }
        this.smaltItem.setCount(UserVo.ins.reinforcedEquipmentStone + addNum);
    };
    SmeltWin.prototype.sendSmelt = function () {
        if (SmeltWin.showItem.length == 0)
            return UserTips.ins().showTipsBigToSmall("没有可熔炼的装备!");
        var data = {};
        data.uuids = [];
        for (var key in SmeltWin.showItem) {
            var element = SmeltWin.showItem[key];
            data.uuids.push(element.uuid);
        }
        HttpMgr.ins.sendMessage(ClientPacket.S_10012, data, ServerPacket.LOGIC_URL, true);
    };
    SmeltWin.selectAr = [];
    return SmeltWin;
}(BaseEuiView));
__reflect(SmeltWin.prototype, "SmeltWin");
ViewManager.ins().reg(SmeltWin, LayerManager.UI_MainUI);
//# sourceMappingURL=SmeltWin.js.map