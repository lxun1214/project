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
// TypeScript file
var RechargeVo = (function (_super) {
    __extends(RechargeVo, _super);
    function RechargeVo() {
        var _this = _super.call(this) || this;
        _this.buyData = null;
        return _this;
    }
    RechargeVo.ins = function () {
        return _super.ins.call(this);
    };
    RechargeVo.prototype.initEvent = function () {
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20034, this.onRechargeOrderRequest, this);
    };
    /**
     * 充值
     * @param mallId 商品ID
     */
    RechargeVo.prototype.sendRechargeOrderRequest = function (mallId) {
        this.buyData = { mallId: mallId };
        HttpMgr.ins.sendMessage(ClientPacket.S_10034, this.buyData, ServerPacket.LOGIC_URL, true);
    };
    /**
     * 订单返回
     */
    RechargeVo.prototype.onRechargeOrderRequest = function (e) {
        egret.log(e.data);
        if (e.data.orderId) {
            var str = "购买成功 orderId = " + e.data.orderId;
            UserTips.ins().showTipsBigToSmall(str, false);
            egret.log(e.data.orderId);
        }
        else {
            UserTips.ins().showTipsBigToSmall("购买失败");
        }
    };
    /**
     * 更新商品购买次数
     */
    RechargeVo.prototype.upDateRechargeNum = function () {
        // if(!this.buyData)return;
        // let data = UserVo.ins.storeInfos;
        // for(let key in data){
        // 	let info = data[key];
        // 	if(info.mallId == this.buyData.mallId){
        // 		info.limitPlayerNum -= this.buyData.num;
        // 		info.limitPlayerNum = info.limitPlayerNum>0?info.limitPlayerNum:0;
        // 		break;
        // 	}
        // }
    };
    /**
     * 根据商品ID获取购买次数
     */
    RechargeVo.prototype.getRechargeNum = function (mallId) {
        // let data = UserVo.ins.storeInfos;
        // for(let key in data){
        // 	let info = data[key];
        // 	if(info.mallId == mallId){
        // 		return info.limitPlayerNum ;
        // 	}
        // }
        return -1;
    };
    /**
     * 更新拥有钻石数量
     */
    RechargeVo.prototype.upDateDiamondsNum = function () {
    };
    return RechargeVo;
}(BaseClass));
__reflect(RechargeVo.prototype, "RechargeVo");
//# sourceMappingURL=RechargeVo.js.map