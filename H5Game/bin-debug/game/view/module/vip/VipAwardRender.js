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
var VipAwardRender = (function (_super) {
    __extends(VipAwardRender, _super);
    function VipAwardRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "VipAwardSkin";
        _this.dg.itemRenderer = BaseItem;
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            console.log('======touch');
            ;
            var data = {
                vipLvl: _this.itemIndex + 1,
            };
            HttpMgr.ins.sendMessage(ClientPacket.S_10043, data, ServerPacket.LOGIC_URL, true);
        }, _this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20043, function (e) {
            if (e.data.isSuccess) {
                UserVo.ins.vipLvlList.push(e.data.vipLvl);
                _this.upStatus();
            }
        }, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel, _this.upStatus, _this);
        return _this;
    }
    VipAwardRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.dg.dataProvider = new eui.ArrayCollection(ActivetyMgr.ins().getActivityAwards(this.data));
        this.upStatus();
        this.lvl.text = (this.itemIndex + 1) + "";
    };
    VipAwardRender.prototype.upStatus = function () {
        if (UserVo.ins.vipLevel >= this.itemIndex + 1) {
            if (UserVo.ins.vipLvlList.indexOf(this.itemIndex + 1) != -1) {
                this.btn.enabled = false;
                this.btn.label = "已 领 取";
            }
            else {
                this.btn.enabled = true;
                this.btn.label = "领  取";
            }
        }
        else {
            this.btn.enabled = false;
            this.btn.label = "未 达 成";
        }
    };
    return VipAwardRender;
}(eui.ItemRenderer));
__reflect(VipAwardRender.prototype, "VipAwardRender");
//# sourceMappingURL=VipAwardRender.js.map