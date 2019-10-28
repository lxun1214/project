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
var PlayerEquipItem = (function (_super) {
    __extends(PlayerEquipItem, _super);
    function PlayerEquipItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "PlayerEquipItemSkin";
        return _this;
    }
    PlayerEquipItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    PlayerEquipItem.prototype.dataChanged = function () {
        this.clears();
        if (!this.data || this.data.itemId == 0)
            return;
        var itemId = this.data.itemId;
        this.itemConfing = BagVo.ins().getItem(itemId);
        this.item.data = this.data;
    };
    PlayerEquipItem.prototype.clears = function () {
        this.item.data = null;
    };
    return PlayerEquipItem;
}(BaseItemRender));
__reflect(PlayerEquipItem.prototype, "PlayerEquipItem");
//# sourceMappingURL=PlayerEquipItem.js.map