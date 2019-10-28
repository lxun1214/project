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
var ShopVo = (function (_super) {
    __extends(ShopVo, _super);
    function ShopVo() {
        return _super.call(this) || this;
    }
    ShopVo.ins = function () {
        return _super.ins.call(this);
    };
    ShopVo.prototype.initEvent = function () {
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20013, this.onBuyGoodsRequest, this);
    };
    /**
     * 购买商品
     * @param seqId 商品ID
     * @param num 数量
     */
    ShopVo.prototype.sendBuyGoodsRequest = function (seqId, num) {
        var c = { seqId: seqId, num: num };
        this.buyData = c;
        HttpMgr.ins.sendMessage(ClientPacket.S_10013, c, ServerPacket.LOGIC_URL, true);
    };
    /**
     * 购买返回
     */
    ShopVo.prototype.onBuyGoodsRequest = function (e) {
        if (e.data.isSuccess) {
            UserTips.ins().showTipsBigToSmall("购买成功", false);
            this.upDateShopNum(e.data.seqId);
        }
    };
    /**
     * 更新商品购买次数
     */
    ShopVo.prototype.upDateShopNum = function (d) {
        if (!this.buyData)
            return;
        var data = UserVo.ins.storeInfos;
        var has = false;
        for (var key in data) {
            var info = data[key];
            if (info.seqId == d) {
                data[key].limitPlayerNum++;
                has = true;
                break;
            }
        }
        if (!has) {
            UserVo.ins.storeInfos.push({ seqId: d, limitPlayerNum: 1 });
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.UP_SHOP_BUY);
    };
    /**
     * 根据商品ID获取购买次数
     */
    ShopVo.prototype.getShopBuyNum = function (seqId) {
        var data = UserVo.ins.storeInfos;
        var d = this.getStoreItem(seqId);
        var v = d.limitPlayerNum > 0 ? d.limitPlayerNum : (d.limitPlayerDayNum > 0 ? d.limitPlayerDayNum : -1);
        if (v == -1)
            return v;
        for (var key in data) {
            var info = data[key];
            if (info.seqId == seqId) {
                return v - info.limitPlayerNum;
            }
        }
        return v;
        //return -1;
    };
    ShopVo.prototype.getStoreItem = function (id) {
        var a = ConfigMgr.gameConfig["store"];
        for (var i = 0; i < a.length; i++) {
            if (a[i].seqId == id)
                return a[i];
        }
    };
    return ShopVo;
}(BaseClass));
__reflect(ShopVo.prototype, "ShopVo");
//# sourceMappingURL=ShopVo.js.map