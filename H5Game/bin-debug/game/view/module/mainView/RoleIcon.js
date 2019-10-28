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
var RoleIcon = (function (_super) {
    __extends(RoleIcon, _super);
    function RoleIcon() {
        var _this = _super.call(this) || this;
        _this.skinName = "roleIconSkin";
        return _this;
    }
    RoleIcon.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.level, this.upLvl, this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum, this.upLvl, this);
        this.upLvl();
        this.icon.source = "human" + UserVo.ins.sex + "_png"; //ResMgr.getGameOtherPng("human" + UserVo.ins.sex);
        var mc = new clips.BmpClip();
        ModelResMgr.getOtherEffect(10029, mc);
        mc.play(-1);
        this["eff"].addChild(mc);
    };
    RoleIcon.prototype.upLvl = function () {
        this.lvl.text = UserVo.ins.rebirthNum + "重" + UserVo.ins.level + "级";
    };
    return RoleIcon;
}(eui.Component));
__reflect(RoleIcon.prototype, "RoleIcon");
//# sourceMappingURL=RoleIcon.js.map