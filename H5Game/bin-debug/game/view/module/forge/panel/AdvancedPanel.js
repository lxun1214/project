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
var AdvancedPanel = (function (_super) {
    __extends(AdvancedPanel, _super);
    function AdvancedPanel() {
        var _this = _super.call(this) || this;
        _this.isFive = false;
        _this.upNum = 0;
        _this.skinName = "AdvancedSkin";
        _this.touchEnabled = false;
        _this.top = _this.bottom = 0;
        _this.item.itemIcon.imgBg.visible = false;
        return _this;
    }
    AdvancedPanel.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        var mc = new clips.BmpClip();
        this.Effmc = mc;
        this.Effmc.visible = false;
        ModelResMgr.getOtherEffect(10017, mc);
        this.Effmc.stop();
        this.Effmc.addEventListener(egret.Event.COMPLETE, function () {
            _this.Effmc.gotoAndStop(1);
            _this.Effmc.visible = false;
        }, this);
        this["g0"].addChild(mc);
    };
    AdvancedPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curData = param[0];
        this.curr.setData("\u5F53\u524D\u5F3A\u5316", null, true, 2);
        this.curr0.setData("\u4E0B\u4E00\u5F3A\u5316", null, false, 2);
        /*this.item.StarIcon.visible = */ this.strengGroup.visible = false;
        this.addTouchEvent(this.avdBtn, this.upEquip);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_ADVANCE, this.onUpEquip, this);
        if (this.curData)
            this.setData(this.curData);
        UIDmgr.bindingUID(this.avdBtn, uid.forgeBtn5);
    };
    AdvancedPanel.prototype.onUpEquip = function (e) {
        if (e.data.isSuccess) {
            this.Effmc.visible = true;
            this.setData(this.curData);
            this.Effmc.play(1);
        }
    };
    AdvancedPanel.prototype.setData = function (data) {
        // this.item.StarIcon.visible = true;
        this.item.data = this.curData = data;
        this.needItem.setIcon(ResMgr.getGameItemPng(MoneyUtils.M_6));
        if (!this.curData)
            return;
        this.strengGroup.visible = true;
        var eCfg = ForgeVo.ins().getEquipID(this.curData.itemId);
        var stone = UserVo.ins.reinforcedEquipmentStone;
        this.labName0.text = stone + "/" + eCfg.reinforcedEquipmentStone;
        this.labName0.textColor = stone >= eCfg.reinforcedEquipmentStone ? ColorUtlis.COLOR_GREEN : ColorUtlis.COLOR_RED;
        var itemCfg = BagVo.ins().getItem(this.curData.itemId);
        // this.labEquipN.text = itemCfg.name;
        // this.item.setIcon(itemCfg.iconID);
        this.star.setLv(eCfg.itemQuality);
        this.curr.setData("\u672C\u9636\u5C5E\u6027", this.curData, true, 2);
        this.curr0.setData("\u4E0B\u9636\u5C5E\u6027", this.curData, false, 2);
    };
    /**
     * 装备升级
     */
    AdvancedPanel.prototype.upEquip = function (e) {
        if (this.labName0.textColor == ColorUtlis.COLOR_RED) {
            UserTips.ins().showTipsBigToSmall("\u5347\u9636\u77F3\u4E0D\u8DB3");
            return;
        }
        ForgeVo.ins().advanceItem = this.item.data;
        HttpMgr.ins.sendMessage(ClientPacket.S_10010, { itemId: this.item.data.itemId }, ServerPacket.LOGIC_URL, true);
    };
    return AdvancedPanel;
}(BaseView));
__reflect(AdvancedPanel.prototype, "AdvancedPanel");
//# sourceMappingURL=AdvancedPanel.js.map