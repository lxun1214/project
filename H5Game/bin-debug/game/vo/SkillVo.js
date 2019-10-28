var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkillVo = (function () {
    function SkillVo(skillId, lv, cd, prevuseTime) {
        this.skillRange = new StdSkillRange();
        this.actions = [];
        this.sceneEffect = [];
        this.unMissileEffects = [];
        this.skillId = skillId;
        this.level = lv;
        this._currentCD = 0;
        if (cd !== undefined) {
            this._currentCD = cd;
        }
        if (prevuseTime !== undefined) {
            this._prevuseTime = prevuseTime;
        }
        this.buffHandle = [];
    }
    Object.defineProperty(SkillVo.prototype, "level", {
        get: function () {
            return this.nlevel;
        },
        set: function (val) {
            this.nlevel = val;
            this.stdSkill = SkillMgr.skillConfigByID(this.skillId, val <= 0 ? 1 : val);
            if (this.stdSkill) {
                var a;
                this.skillRange.data = this.stdSkill.skillRange;
                var i;
                this.actions.length = 0;
                if (this.stdSkill.actions && this.stdSkill.actions != "" && this.stdSkill.actions != "0") {
                    a = this.stdSkill.actions.split("#");
                    var actionVo;
                    for (i = 0; i < a.length; i++) {
                        actionVo = new StdSkillAction();
                        actionVo.data = a[i];
                        this.actions.push(actionVo);
                    }
                }
                else
                    this.actions.length = 0;
                this.sceneEffect.length = this.unMissileEffects.length = 0;
                if (this.stdSkill.playEffect && this.stdSkill.playEffect != "" && this.stdSkill.playEffect != "0") {
                    a = this.stdSkill.playEffect.split("#");
                    var hitVo;
                    for (i = 0; i < a.length; i++) {
                        hitVo = new StdSkillHitEffect();
                        hitVo.data = a[i];
                        if (hitVo.type == SkillVo.SKILL_EFF_TYPE_1 || hitVo.type == SkillVo.SKILL_EFF_TYPE_2)
                            this.sceneEffect.push(hitVo);
                        else
                            this.unMissileEffects.push(hitVo);
                    }
                }
                if (this.stdSkill["disTarge"] != 0) {
                    a = this.stdSkill["disTarge"].split(",");
                    this.needTarge = a[0] == "1";
                    this.dis = !this.needTarge ? 0 : parseInt(a[1]);
                }
                else
                    this.needTarge = false;
                if (this.stdSkill.HitNum && this.stdSkill.HitNum != "" && this.stdSkill.HitNum != "0" && this.stdSkill.HitNum != 0)
                    this.HitNum = (this.stdSkill.HitNum + "").split(",");
                else
                    this.HitNum = null;
                this.initiativeSkill = this.stdSkill.duration == "infinite";
                if (this.stdSkill.skillHit && this.stdSkill.skillHit != "" && this.stdSkill.skillHit != "0")
                    this.skillHit = this.stdSkill.skillHit.split("#");
                else
                    this.skillHit = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 使用技能
     *  重置cd
     */
    SkillVo.prototype.useSkill = function () {
        this._prevuseTime = GameLogic.ins.gameRunTick;
        this._currentCD = this._prevuseTime + this.stdSkill.CD;
        DataEventDispatcher.dispatchEventWith(SkillVo.SKILL_DOWN_CD, this);
    };
    Object.defineProperty(SkillVo.prototype, "prevUseTime", {
        get: function () {
            return this._prevuseTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillVo.prototype, "canUse", {
        get: function () {
            return this._currentCD < GameLogic.ins.gameRunTick;
        },
        enumerable: true,
        configurable: true
    });
    SkillVo.prototype.resetCD = function () {
        this._currentCD = GameLogic.ins.gameRunTick;
    };
    Object.defineProperty(SkillVo.prototype, "singleAttack", {
        //是否单体技能
        get: function () {
            return this.skillRange.g == 1 || (this.skillRange.w == 1 && this.skillRange.h == 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillVo.prototype, "multipleAttack", {
        //是否多次攻击技能
        get: function () {
            if (!this.HitNum)
                return 0;
            return parseInt(this.HitNum[0]);
        },
        enumerable: true,
        configurable: true
    });
    //0目标特效  1飞弹特效 2场景特效
    SkillVo.SKILL_EFF_TYPE_0 = 0;
    SkillVo.SKILL_EFF_TYPE_1 = 1;
    SkillVo.SKILL_EFF_TYPE_2 = 2;
    SkillVo.SKILL_DOWN_CD = "SKILL_DOWN_CD";
    return SkillVo;
}());
__reflect(SkillVo.prototype, "SkillVo");
//# sourceMappingURL=SkillVo.js.map