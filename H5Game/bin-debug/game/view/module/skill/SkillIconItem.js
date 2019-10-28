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
var SkillIconItem = (function (_super) {
    __extends(SkillIconItem, _super);
    function SkillIconItem() {
        var _this = _super.call(this) || this;
        _this._lookSkill = false;
        _this.skinName = "SkillItemSkin";
        _this.n_icon = _this["icon"]["imgIcon"];
        _this.touchChildren = false;
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.SKILL_UP_LVL, _this.upSkillLvl, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL, _this.upSkillLvl, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.RED_SKILL, function () {
            ViewManager.redToTarge(_this, RemindMgr.CAN_UP_SKILL.indexOf(_this.skillVo) != -1 || SkillMgr.NEW_STUDY.indexOf(_this.skillVo) != -1);
        }, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.SELECT_SKILL, _this.useSkill, _this);
        return _this;
    }
    Object.defineProperty(SkillIconItem.prototype, "lookSkill", {
        get: function () {
            return this._lookSkill;
        },
        set: function (v) {
            this._lookSkill = v;
        },
        enumerable: true,
        configurable: true
    });
    SkillIconItem.prototype.useSkill = function () {
        if (this.skillVo)
            this.l0.visible = UserVo.ins.skillColumn.indexOf(this.skillVo.stdSkill.tab) != -1;
    };
    SkillIconItem.prototype.dataChanged = function () {
        this.skillVo = SkillMgr.ins.getRoleSkill(this.data.secondarySkill_id);
        // this.labLv.text = "LV." + this.skillVo.level;
        this.labName.text = this.data.description2;
        this.n_icon.source = ResMgr.skillIcon(this.data.skillIcon);
        this.upSkillLvl();
        this.useSkill();
        if (!this._lookSkill) {
            var d = SkillMgr.ins.groupSkillId[0];
            if (this.data.secondarySkill_id == d || this.data.secondarySkill_id == d + 1) {
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.checkGuide, this);
            }
            this.checkGuide();
        }
    };
    SkillIconItem.prototype.checkGuide = function () {
        var d = SkillMgr.ins.groupSkillId[0];
        if (this.data.secondarySkill_id == d)
            UIDmgr.bindingUID(this, uid.jn1);
        else
            UIDmgr.bindingUID(this, uid.jn4);
    };
    SkillIconItem.prototype.upSkillLvl = function (e) {
        if (e === void 0) { e = null; }
        if (!this.skillVo)
            return;
        this.labLv.text = "LV." + this.skillVo.level;
        this.suo.visible = this.skillVo.level == 0;
        if (!e || e.type == GameEvent.STUDY_SKILL)
            ViewManager.redToTarge(this, SkillMgr.NEW_STUDY.indexOf(this.skillVo) != -1 || RemindMgr.CAN_UP_SKILL.indexOf(this.skillVo) != -1);
    };
    return SkillIconItem;
}(eui.ItemRenderer));
__reflect(SkillIconItem.prototype, "SkillIconItem");
//# sourceMappingURL=SkillIconItem.js.map