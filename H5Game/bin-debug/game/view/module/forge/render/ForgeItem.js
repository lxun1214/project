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
 * 装备item
 */
var ForgeItem = (function (_super) {
    __extends(ForgeItem, _super);
    // private equipConfing: EquipConfing;
    function ForgeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "EquipSkin";
        _this.itemIcon.isClick = false;
        return _this;
    }
    ForgeItem.prototype.dataChanged = function () {
        this.itemIcon.clears();
        if (!this.data || this.data.itemId == 0)
            return;
        this.itemIcon.data = this.data;
        // let itemId: number = this.data.itemId;
        // this.equipConfing = ForgeVo.ins().getEquipID(itemId);
        // this.itemConfing = BagVo.ins().getItem(itemId);
        // this.setIcon(this.itemConfing.iconID);
        // this.labStreng.text = this.data.level>0?"+"+this.data.level:"";
        // this.setStarLv(this.equipConfing.itemQuality);
        // this.setQuality(this.itemConfing.rank);
        // this.labCount.text = this.data.itemNum;
    };
    return ForgeItem;
}(BaseItemRender));
__reflect(ForgeItem.prototype, "ForgeItem");
//# sourceMappingURL=ForgeItem.js.map