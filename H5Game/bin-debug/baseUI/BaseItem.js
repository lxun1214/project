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
 * 道具基类
 */
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem() {
        var _this = _super.call(this) || this;
        _this.isClick = true;
        _this.skinName = "BaseItemSkin";
        _this.init();
        return _this;
    }
    BaseItem.prototype.init = function () {
        this.addTouchEvent(this, this.onTap);
    };
    BaseItem.prototype.dataChanged = function () {
        this.clears();
        if (!this.data)
            return;
        if (this.data.moneyType) {
            this.setIcon(this.data.moneyType);
            this.setName(MoneyUtils.getMoneyName(this.data.moneyType));
            this.setCount(this.data.itemNum);
            this.itemIcon.setQuality(-1);
            return;
        }
        this.parent.parent.parent.parent;
        var itemId = this.data.itemId;
        this.itemConfing = BagVo.ins().getItem(itemId);
        this.setIcon(this.itemConfing.iconID);
        this.labName.text = this.itemConfing.name;
        this.labName.textColor = ColorUtlis.QUALITY_COLOR[this.itemConfing.rank];
        this.setCount(this.data.itemNum);
        this.validateNow();
        this.setQuality(this.itemConfing.rank);
    };
    BaseItem.prototype.setIcon = function (str) {
        this.itemIcon.setIcon(str == "" ? null : ResMgr.getGameItemPng(str));
    };
    BaseItem.prototype.setName = function (str) {
        this.labName.text = str;
    };
    /**
     * 设置数量
     */
    BaseItem.prototype.setCount = function (count) {
        if (this.itemConfing && this.itemConfing.itemType == BagVo.ITEM_TYPE_EQUIP) {
            if (!this.data.showEquipsCount)
                this.labCount.text = (this.data.level > 0 ? "+" + this.data.level : "") + "";
            else
                this.labCount.text = (count > 0 ? count : "") + "";
            var equipConfing = ForgeVo.ins().getEquipID(this.data.itemId);
            this.jie.text = equipConfing.itemQuality + "阶";
        }
        else {
            this.labCount.text = (count > 0 ? count : "") + "";
            this.jie.text = "";
        }
    };
    /**
     * 品质
     */
    BaseItem.prototype.setQuality = function (rank) {
        this.itemIcon.setQuality(rank);
        // this.imgBg.source = "quality_1" + (rank>4?4:rank);
    };
    BaseItem.prototype.onTap = function () {
        if (this.isClick) {
            this.onRescript();
            // if(!this.data)return;
            // let byte = new egret.ByteArray();
            // byte.writeDouble(this.data.uuid);
            // HttpMgr.ins.sendMessage(ClientPacket.S_10008,{uuid:this.data.uuid},ServerPacket.LOGIC_URL,true);
        }
    };
    BaseItem.prototype.onRescript = function () {
        if (!this.data || !this.itemConfing)
            return;
        //装备
        if (this.itemConfing.itemType == 2) {
            // let byte = new egret.ByteArray();
            // byte.writeDouble(this.data.uuid);
            // HttpMgr.ins.sendMessage(ClientPacket.S_10008,{uuid:this.data.uuid},ServerPacket.LOGIC_URL,true);
            //宝石
        }
        else if (this.itemConfing.itemType == 1) {
            if (ViewManager.ins().isShow(GemWin)) {
                var dx = GemVo.ins().isEquipGem(this.itemConfing.itemId);
                if (dx != -1)
                    return UserTips.ins().showTipsBigToSmall("已镶嵌同类型了的宝石!");
                //GemVo.ins().sendGemMountRequest(this.data.uuid, dx);
                GemVo.ins().sendGemMountRequest(this.data.uuid);
                return;
            }
        }
        //console.log('----item data',this.data);
        ViewManager.ins().open(ItemTipView, this.data);
    };
    BaseItem.prototype.clears = function () {
        this.labName.textColor = 0xffffff;
        this.itemIcon.setIcon("");
        this.labName.text = "";
        this.labCount.text = "";
        this.imgBg.source = "";
        this.setQuality(-1);
        this.jie.text = "";
        // this.itemIcon.imgBg.source = "";
    };
    return BaseItem;
}(BaseItemRender));
__reflect(BaseItem.prototype, "BaseItem");
//# sourceMappingURL=BaseItem.js.map