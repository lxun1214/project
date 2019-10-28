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
 * 购买弹窗
 */
var ShopBuyTips = (function (_super) {
    __extends(ShopBuyTips, _super);
    function ShopBuyTips() {
        var _this = _super.call(this) || this;
        _this.count = 1;
        _this.skinName = "suerBuyTipSkin";
        _this.left = _this.right = _this.top = _this.bottom = 0;
        return _this;
    }
    ShopBuyTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.data = param[0];
        this.lbNum.restrict = "0-9";
        this.count = 1;
        this.lbNum.text = "1";
        this.goldImg.source = this.data.consume;
        this.setBuyData();
        // this.rect.touchEnabled = true;
        // this.addTouchEvent(this.rect, this.onTap);
        this.addTouchEvent(this.sureBtn, this.onTap);
        // this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.samllBtn, this.onTap);
        this.addTouchEvent(this.maxBtn, this.onTap);
        this.addChangeEvent(this.lbNum, this.changeInput);
    };
    ShopBuyTips.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            // case this.rect:
            // case this.closeBtn:
            // 	ViewManager.ins().close(ShopBuyTips);
            // 	break;
            case this.sureBtn:
                this.onBuyItem();
                break;
            case this.samllBtn:
                this.count -= 1;
                this.setBuyData();
                break;
            case this.maxBtn:
                this.count += 1;
                this.setBuyData();
                break;
        }
    };
    ShopBuyTips.prototype.changeInput = function () {
        this.count = parseInt(this.lbNum.text);
        this.setBuyData();
    };
    ShopBuyTips.prototype.setBuyData = function () {
        if (this.count <= 0) {
            this.count = 1;
        }
        else if (this.count > 999) {
            this.count = 999;
        }
        if (this.data.limitPlayerDayNum > 0 && this.count > ShopVo.ins().getShopBuyNum(this.data.seqId)) {
            this.count = ShopVo.ins().getShopBuyNum(this.data.seqId);
        }
        this.lbNum.text = this.count + '';
        this.lbMoney.text = this.count * this.data.consumeNum + "";
    };
    ShopBuyTips.prototype.onBuyItem = function () {
        if (ShopVo.ins().getShopBuyNum(this.data.seqId) == 0) {
            UserTips.ins().showTipsBigToSmall("购买次数不足");
            return;
        }
        var obj = ShopVo.ins().getStoreItem(this.data.seqId);
        if (obj.consumeNum * this.count > MoneyUtils.getMoneyNum(obj.consume))
            return UserTips.ins().showTipsBigToSmall("货币不足,无法购买!");
        ShopVo.ins().sendBuyGoodsRequest(this.data.seqId, this.count);
    };
    return ShopBuyTips;
}(BaseEuiView));
__reflect(ShopBuyTips.prototype, "ShopBuyTips");
ViewManager.ins().reg(ShopBuyTips, LayerManager.UI_Tips);
//# sourceMappingURL=ShopBuyTips.js.map