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
var LimitCard = (function (_super) {
    __extends(LimitCard, _super);
    function LimitCard() {
        var _this = _super.call(this) || this;
        _this.MAX_NUM = 50;
        _this.skinName = "LimitCardSkin";
        _this["rc"].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            ViewManager.ins().close(_this);
        }, _this);
        return _this;
    }
    LimitCard.prototype.createChildren = function () {
        // DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20042,(e)=>{
        // if(e.data.isSuccess){
        // 	this.nextDraw.text = "连抽" + (50-e.data.drawCardNum) + "次必获得稀有道具"
        // }
        // },this);
        var _this = this;
        // this.nextDraw.text =  "连抽" + (50-UserVo.ins.drawCardInfo.drawCardNum) + "次必获得稀有道具";
        this.getOne.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (UserVo.ins.diamond < 50) {
                ViewManager.ins().open(TipsWin, "确定", "钻石不足", "提示", "", function () {
                    //location.replace(document.referrer);
                }, null, _this);
                return;
            }
            var data = {
                drawType: 1
            };
            HttpMgr.ins.sendMessage(ClientPacket.S_10042, data, ServerPacket.LOGIC_URL, true);
        }, this);
        this.getTen.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (UserVo.ins.diamond < 450) {
                ViewManager.ins().open(TipsWin, "确定", "钻石不足", "提示", "", function () {
                    //location.replace(document.referrer);
                }, null, _this);
                return;
            }
            var data = {
                drawType: 2
            };
            HttpMgr.ins.sendMessage(ClientPacket.S_10042, data, ServerPacket.LOGIC_URL, true);
        }, this);
    };
    return LimitCard;
}(BaseEuiView));
__reflect(LimitCard.prototype, "LimitCard");
ViewManager.ins().reg(LimitCard, LayerManager.UI_MainUI);
//# sourceMappingURL=LimitCard.js.map