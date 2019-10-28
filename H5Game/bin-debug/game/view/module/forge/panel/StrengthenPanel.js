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
var StrengthenPanel = (function (_super) {
    __extends(StrengthenPanel, _super);
    function StrengthenPanel() {
        var _this = _super.call(this) || this;
        _this.isFive = false;
        _this.upNum = 0;
        _this.skinName = "StrengSkin";
        _this.name = "强 化";
        _this.top = _this.bottom = 0;
        _this.item.itemIcon.imgBg.visible = false;
        return _this;
    }
    StrengthenPanel.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.touchEnabled = false;
        var mc = new clips.BmpClip();
        this.Effmc = mc;
        this.Effmc.visible = false;
        ModelResMgr.getOtherEffect(10017, mc);
        this.Effmc.addEventListener(egret.Event.COMPLETE, function () {
            _this.Effmc.gotoAndStop(1);
            _this.Effmc.visible = false;
        }, this);
        this["g0"].addChild(mc);
    };
    StrengthenPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curData = param[0];
        this.curr.setData("\u5F53\u524D\u5F3A\u5316", null, true, 1);
        this.curr0.setData("\u4E0B\u4E00\u5F3A\u5316", null, false, 1);
        this.strengGroup.visible = false;
        if (this.curData)
            this.setData(param[0]);
        this.addTouchEvent(this.equipBtn1, this.upEquip);
        this.addTouchEvent(this.equipBtn2, this.upEquip);
        UIDmgr.bindingUID(this.equipBtn2, uid.forgeBtn3);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_STRENGTH, this.onUpEquip, this);
    };
    StrengthenPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.equipBtn1, this.upEquip);
        this.removeTouchEvent(this.equipBtn2, this.upEquip);
    };
    StrengthenPanel.prototype.onUpEquip = function (e) {
        if (e.data.isSuccess) {
            this.Effmc.visible = true;
            this.Effmc.play(1);
            this.upNum++;
            if (this.isFive && this.upNum < 5) {
                HttpMgr.ins.sendMessage(ClientPacket.S_10009, { itemId: this.curData.itemId }, ServerPacket.LOGIC_URL, true);
            }
            else {
                this.upNum = 0;
                this.isFive = false;
            }
            if (this.upNum == 0) {
                this.setData(this.curData);
            }
        }
    };
    StrengthenPanel.prototype.setData = function (data) {
        // this.item.StarIcon.visible = false;
        this.item.data = this.curData = data;
        if (!this.curData)
            return;
        this.strengGroup.visible = true;
        var eCfg = ForgeVo.ins().getEquipID(this.curData.itemId);
        var five = 0;
        for (var i = 0; i < 5; i++) {
            five += ForgeVo.ins().getUpEquipGold(this.curData.level + i);
        }
        var userGold = UserVo.ins.gold;
        this.labNeed1.text = "\u6D88\u8017\u91D1\u5E01\uFF1A" + five;
        this.labNeed1.textColor = userGold >= five ? ColorUtlis.COLOR_GREEN : ColorUtlis.COLOR_RED;
        this.labNeed2.text = "\u6D88\u8017\u91D1\u5E01\uFF1A" + ForgeVo.ins().getUpEquipGold(this.curData.level);
        this.labNeed2.textColor = userGold >= ForgeVo.ins().getUpEquipGold(this.curData.level) ? ColorUtlis.COLOR_GREEN : ColorUtlis.COLOR_RED;
        this.curr.setData("\u5F53\u524D\u5F3A\u5316", this.curData, true, 1);
        this.curr0.setData("\u4E0B\u4E00\u5F3A\u5316", this.curData, false, 1);
    };
    /**
     * 装备升级
     */
    StrengthenPanel.prototype.upEquip = function (e) {
        if (e.currentTarget == this.equipBtn1) {
            this.isFive = true;
            if (this.labNeed1.textColor == ColorUtlis.COLOR_RED) {
                UserTips.ins().showTipsBigToSmall("\u91D1\u5E01\u4E0D\u8DB3");
                return;
            }
        }
        else {
            if (this.labNeed2.textColor == ColorUtlis.COLOR_RED) {
                UserTips.ins().showTipsBigToSmall("\u91D1\u5E01\u4E0D\u8DB3");
                return;
            }
        }
        ForgeVo.ins().strengthenItem = this.item.data;
        HttpMgr.ins.sendMessage(ClientPacket.S_10009, { itemId: this.item.data.itemId }, ServerPacket.LOGIC_URL, true);
    };
    return StrengthenPanel;
}(BaseView));
__reflect(StrengthenPanel.prototype, "StrengthenPanel");
//# sourceMappingURL=StrengthenPanel.js.map