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
 * 商品Item
 */
var ShopItemRender = (function (_super) {
    __extends(ShopItemRender, _super);
    function ShopItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "shopItemSkin";
        _this.init();
        return _this;
    }
    ShopItemRender.prototype.init = function () {
        this.addTouchEvent(this.buyBtn, this.onTap);
    };
    ShopItemRender.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ShopItemRender.prototype.euiCompete = function () {
        this.dataChanged();
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_SHOP_BUY, this.upCount, this);
        this.item.tips = true;
    };
    ShopItemRender.prototype.dataChanged = function () {
        this.clears();
        if (!this.data || this.data.goods == 0)
            return;
        this.labName.visible = true;
        // this.goldImg.source = this.data.consume;
        this.item.data = this.data.goods;
        this.itemConfig = ConfigMgr.gameConfig["item"][this.data.goods];
        this.labName.text = this.itemConfig.name;
        this.labName.textColor = ColorUtlis.QUALITY_COLOR[this.itemConfig.rank];
        // this.lbMoney.text = this.data.consumeNum + "";
        this.lbMoney.data = [this.data.consume, this.data.consumeNum];
        this.validateNow();
        this.upCount();
    };
    ShopItemRender.prototype.upCount = function () {
        var v = ShopVo.ins().getShopBuyNum(this.data.seqId);
        if (v == -1)
            this.c.text = "";
        else
            this.c.text = "剩余购买次数:" + v;
    };
    ShopItemRender.prototype.onTap = function () {
        if (this.data)
            ViewManager.ins().open(ShopBuyTips, this.data);
    };
    ShopItemRender.prototype.clears = function () {
        this.labName.text = "";
        // this.labDesc.text = "";
    };
    return ShopItemRender;
}(BaseItemRender));
__reflect(ShopItemRender.prototype, "ShopItemRender");
//# sourceMappingURL=ShopItemRender.js.map