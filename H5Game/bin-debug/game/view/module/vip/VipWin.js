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
var VipWin = (function (_super) {
    __extends(VipWin, _super);
    function VipWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "VipSkin";
        // this.horizontalCenter = this.verticalCenter = 0;
        VipWin.MAX_VIP_LVL = ConfigMgr.gameConfig["vipBase"].length;
        _this.vipList.itemRenderer = VipAwardRender;
        _this.vipList.dataProvider = new eui.ArrayCollection(ConfigMgr.gameConfig["vipBase"]);
        return _this;
    }
    VipWin.prototype.upVip = function () {
        // this.labDengji.text = `${UserVo.ins.vipLevel}`
        var next = UserVo.ins.vipLevel >= VipWin.MAX_VIP_LVL ? 'VIP达到最大等级' : ConfigMgr.gameConfig["vipBase"][UserVo.ins.vipLevel]["vipDesc"];
        this.labNext.text = next;
        this.progress.maximum = UserVo.ins.vipLevel >= VipWin.MAX_VIP_LVL ? 100 : ConfigMgr.gameConfig["vipBase"][UserVo.ins.vipLevel].payGold;
        this.progress.value = UserVo.ins.vipExp;
        this.c.text = "当前VIP等级:" + UserVo.ins.vipLevel;
    };
    VipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this);
        this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel, DataEventDispatcher.dispatcher, this.upVip);
        this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipExp, DataEventDispatcher.dispatcher, this.upVip);
        this.upVip();
    };
    return VipWin;
}(BaseEuiView));
__reflect(VipWin.prototype, "VipWin");
ViewManager.ins().reg(VipWin, LayerManager.UI_MainUI);
//# sourceMappingURL=VipWin.js.map