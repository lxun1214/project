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
 * 充值Item
 */
var RechargeItem = (function (_super) {
    __extends(RechargeItem, _super);
    // public itemConfig: any;
    function RechargeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "RechargeItemSkin";
        _this.init();
        return _this;
    }
    RechargeItem.prototype.init = function () {
        this.addTouchEvent(this.buyBtn, this.onTap);
    };
    RechargeItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    RechargeItem.prototype.euiCompete = function () {
        this.dataChanged();
    };
    RechargeItem.prototype.dataChanged = function () {
        this.clears();
        if (!this.data)
            return;
        var goldArr = this.data.gold.split("#");
        var arr = this.data.payAward.split("#");
        var str = arr[1] ? goldArr[1] + '钻石' : '月卡充值';
        this.title.text = str;
        this.labName.text = this.data.payDesc == '月卡充值' ? "" : "首次" + this.data.payDesc;
        this.labName.visible = !UserVo.ins.isRecharge;
        var gold = this.data.gold;
        this.labNum.text = this.data.price + "元";
        this.price = this.data.price;
        this.mallId = this.data.id;
        this.validateNow();
    };
    ;
    RechargeItem.prototype.onTap = function () {
        if (this.data.id == 100) {
            var mouthCard = UserVo.ins['monthCardInfo'];
            if (mouthCard && mouthCard["cardEndDay"]) {
                ViewManager.ins().open(TipsWin, "确定", "月卡已经购买，不能重复购买", "提示", "", function () { }, null, this);
                return;
            }
        }
        if (ParamMgr.SPID == 0) {
            RechargeVo.ins().sendRechargeOrderRequest(this.mallId);
            UserVo.ins.isRecharge = true;
        }
        else
            MoneyUtils.recharge(this.data);
        this.validateNow();
    };
    RechargeItem.prototype.ReturnSignData = function (arr) {
        var tArr = "";
        arr.forEach(function (e) {
            var o = e.split("=");
            tArr += (o[1]);
        });
        return MoneyUtils.MD5(tArr);
    };
    RechargeItem.prototype.clears = function () {
        this.labNum.text = "";
        // this.labDesc.text = "";
    };
    return RechargeItem;
}(BaseItemRender));
__reflect(RechargeItem.prototype, "RechargeItem");
//# sourceMappingURL=RechargeItem.js.map