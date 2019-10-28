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
var rewardItemTip = (function (_super) {
    __extends(rewardItemTip, _super);
    function rewardItemTip() {
        var _this = _super.call(this) || this;
        _this.skinName = "rewardItemTipSkin";
        _this.horizontalCenter = _this.verticalCenter = 0;
        return _this;
    }
    rewardItemTip.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var itemconfg = Object.assign(ConfigMgr.gameConfig["item"], ConfigMgr.gameConfig["gainInfo"]);
        this.itemVo = itemconfg[param[0]];
        this.itemVo.description;
        this.item.source = "resource/assets/item/" + this.itemVo.iconID + ".png";
        // this.item.data = this.itemVo;
        // var icfg:any = BagVo.ins().getItem(this.itemVo.itemId);
        this.nn.text = this.itemVo.name;
        this.l3.text = this.itemVo.description;
        // this.tp = icfg.itemType;
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            ViewManager.ins().close(_this);
        }, this);
    };
    rewardItemTip.getItemAtt = function (vo, type) {
        if (type === void 0) { type = 2; }
        var itemCfg;
        if (type == 2)
            itemCfg = ConfigMgr.gameConfig["equip"][vo.itemId];
        else
            itemCfg = ConfigMgr.gameConfig["gemAttr"][vo.itemId];
        var s = "";
        for (var key in itemCfg) {
            if (UserVo.ins.playerAttrInfo[key] && itemCfg[key] != 0 && ConfigMgr.gameConfig["attributeName"][key]) {
                s += ConfigMgr.gameConfig["attributeName"][key].value + ":" + itemCfg[key] + PbPlayerAttrInfo.isPercent(key);
                ;
                s += "\n";
            }
        }
        return s;
    };
    rewardItemTip.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    rewardItemTip.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
    };
    return rewardItemTip;
}(BaseEuiView));
__reflect(rewardItemTip.prototype, "rewardItemTip");
ViewManager.ins().reg(rewardItemTip, LayerManager.UI_Popup);
//# sourceMappingURL=rewardItemTip.js.map