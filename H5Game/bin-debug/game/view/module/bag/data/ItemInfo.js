var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ItemInfo = (function () {
    function ItemInfo() {
        //显示物品数量
        this.showEquipsCount = false;
    }
    return ItemInfo;
}());
__reflect(ItemInfo.prototype, "ItemInfo");
//# sourceMappingURL=ItemInfo.js.map