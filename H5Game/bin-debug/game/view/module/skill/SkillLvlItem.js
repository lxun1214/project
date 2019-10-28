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
var SkillLvlItem = (function (_super) {
    __extends(SkillLvlItem, _super);
    function SkillLvlItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SkillLvItemRender";
        _this.skillList.itemRenderer = SkillIconItem;
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL, _this.upStatus, _this);
        return _this;
    }
    Object.defineProperty(SkillLvlItem.prototype, "skillData", {
        set: function (vo) {
            this.$vo = vo;
            this.n0.text = vo[0].need_role_lvl + "级解锁!";
            this.labLv.text = vo[0].need_role_lvl;
            this.skillList.dataProvider = new eui.ArrayCollection(vo);
            this.l3.text = vo[0].name;
            this.upStatus();
        },
        enumerable: true,
        configurable: true
    });
    SkillLvlItem.prototype.upStatus = function () {
        var hide = true;
        for (var i = 0; i < this.$vo.length; i++) {
            if (SkillMgr.ins.getRoleSkill(this.$vo[i].secondarySkill_id).level > 0) {
                hide = false;
                break;
            }
        }
        this.g0.visible = hide;
    };
    return SkillLvlItem;
}(eui.Component));
__reflect(SkillLvlItem.prototype, "SkillLvlItem");
//# sourceMappingURL=SkillLvlItem.js.map