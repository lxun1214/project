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
var SkillIconItemII = (function (_super) {
    __extends(SkillIconItemII, _super);
    function SkillIconItemII() {
        var _this = _super.call(this) || this;
        _this.skinName = "SkillItemSkin";
        _this.n_icon = _this["icon"]["imgIcon"];
        _this.suo.visible = false;
        _this.touchChildren = false;
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.SKILL_UP_LVL, _this.upSkillLvl, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL, _this.upSkillLvl, _this);
        return _this;
    }
    SkillIconItemII.prototype.setSkillData = function (d, lvl) {
        if (lvl === void 0) { lvl = 0; }
        this.offLvl = lvl;
        this.skillVo = SkillMgr.ins.getRoleSkill(d.secondarySkill_id);
        this.labName.text = d.description2;
        this.n_icon.source = ResMgr.skillIcon(d.skillIcon);
        this.upSkillLvl();
    };
    SkillIconItemII.prototype.upSkillLvl = function (e) {
        if (e === void 0) { e = null; }
        if (!this.skillVo)
            return;
        this.labLv.text = "LV." + (this.skillVo.level + this.offLvl);
    };
    return SkillIconItemII;
}(eui.Component));
__reflect(SkillIconItemII.prototype, "SkillIconItemII");
//# sourceMappingURL=SkillIconItemII.js.map