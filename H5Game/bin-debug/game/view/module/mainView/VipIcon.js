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
var VipIcon = (function (_super) {
    __extends(VipIcon, _super);
    function VipIcon() {
        return _super.call(this) || this;
    }
    VipIcon.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel, this.upVip, this);
        this.upVip();
    };
    // vipImg:eui.Image;
    VipIcon.prototype.upVip = function () {
        this.vip.text = "" + UserVo.ins.vipLevel;
        // this.vipImg.source = `VIP_json.v_${UserVo.ins.vipLevel + 1}`
    };
    return VipIcon;
}(eui.Component));
__reflect(VipIcon.prototype, "VipIcon");
//# sourceMappingURL=VipIcon.js.map