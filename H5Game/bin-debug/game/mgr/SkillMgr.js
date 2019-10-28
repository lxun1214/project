var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkillMgr = (function () {
    function SkillMgr() {
        this.skillConfig = ConfigMgr.gameConfig["skill"];
        this.jobSkill = [];
        var vo;
        this.skillGroup = [];
        SkillMgr.COMMON_SKILL = [];
        for (var key in this.skillConfig) {
            vo = this.skillConfig[key];
            if (vo.skill_id == SkillMgr.COMMON_SKILL_ID) {
                SkillMgr.COMMON_SKILL[vo.careerType] = new SkillVo(vo.secondarySkill_id, 1);
                continue;
            }
            if (!this.jobSkill[vo.careerType])
                this.jobSkill[vo.careerType] = [];
            if (vo.level == 1)
                this.jobSkill[vo.careerType].push(vo);
            if (!this.skillGroup[vo.careerType])
                this.skillGroup[vo.careerType] = {};
            if (!this.skillGroup[vo.careerType]["" + vo.skill_id])
                this.skillGroup[vo.careerType]["" + vo.skill_id] = [];
            if (vo.level == 1)
                this.skillGroup[vo.careerType]["" + vo.skill_id].push(vo);
        }
        this.groupSkillId = [];
        var a = this.skillGroup[UserVo.ins.jobId];
        for (var key in a) {
            this.groupSkillId.push(a[key][0].secondarySkill_id);
        }
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.level, this.checkSkill, this);
    }
    Object.defineProperty(SkillMgr, "ins", {
        get: function () {
            if (SkillMgr._ins == null)
                SkillMgr._ins = new SkillMgr();
            return SkillMgr._ins;
        },
        enumerable: true,
        configurable: true
    });
    //检测是否是第一组第二个技能
    SkillMgr.prototype.check12 = function (vo) {
        if (!vo)
            return false;
        var a = this.skillGroup[UserVo.ins.jobId];
        for (var key in a) {
            if (vo.stdSkill.secondarySkill_id == a[key][1].secondarySkill_id)
                return true;
        }
        return false;
    };
    //检测是否切换被动技能、删加BUFF
    SkillMgr.prototype.skillChange = function (dx, b) {
        var a = Human.ins.useingSkill[dx];
        Human.ins.useingSkill[dx] = b;
        if (a && a.buffHandle.length > 0) {
            while (a && a.buffHandle.length) {
                Human.ins.removeBuff(0, a.buffHandle.pop());
            }
        }
        this.addBuff(b, Human.ins);
    };
    SkillMgr.skillConfigByID = function (id, lvl) {
        if (lvl === void 0) { lvl = 1; }
        if (lvl <= 0)
            return null;
        // throw new Error("获取技能数据错误!");
        var obj = ConfigMgr.gameConfig["skill"][SkillMgr.autoFillTab(id, lvl)];
        if (!obj)
            throw new Error("找不到指定的技能等级数据:" + id + "-" + lvl);
        return obj;
    };
    // public localPlayerSkill:Array<SkillVo>;
    // private useingSkill:Array<SkillVo>;
    //创建人物技能
    SkillMgr.prototype.createSkill = function (job, obj, useing, actor) {
        //obj[技能id_技能等级]
        var lvs = [];
        if (obj) {
            for (i = 0; i < obj.length; i++) {
                lvs[this.skillConfig[obj[i]].secondarySkill_id] = (this.skillConfig[obj[i]].level);
            }
        }
        // var skills:Array<SkillVo> = [];
        var vo;
        var id;
        var s;
        var i;
        for (i = 0; i < this.jobSkill[job].length; i++) {
            id = this.jobSkill[job][i].secondarySkill_id;
            vo = new SkillVo(id, lvs[id] ? lvs[id] : 0);
            // skills.push(vo);
            if (vo.level > 0 && useing.indexOf(SkillMgr.autoFillTab(id, vo.level)) != -1) {
                this.addBuff(vo, actor);
                if (actor)
                    actor.useingSkill[i] = vo;
            }
            if (actor)
                actor.skills.push(vo);
        }
        //再次全部检测下是否有新学习的
        this.checkSkill(null, actor.skills, false, actor, useing);
        // for(i=0;i<this.groupSkillId.length;i++)//不再自动装配第一个技能
        // {
        // 	if(!actor.useingSkill[i])
        // 	{
        // 		vo = this.getRoleSkill(this.groupSkillId[i]);
        // 		if(vo.level > 0)
        // 		{
        // 			useing[i] = vo.stdSkill.tab;
        // 			this.addBuff(vo,actor);
        // 			actor.useingSkill[i] = vo;
        // 		}
        // 	}
        // }
        // return skills;
    };
    SkillMgr.prototype.addBuff = function (vo, actor) {
        var s;
        if (vo.initiativeSkill && actor) {
            var buff;
            if (vo.skillHit) {
                for (var i = 0; i < vo.skillHit.length; i++) {
                    s = vo.skillHit[i].split(":");
                    buff = BuffVo.create(parseInt(s[1]), parseInt(s[2]));
                    buff.hurtType = s[3] == "0" ? 0 : parseInt(s[3]);
                    actor.addBuff(buff);
                    vo.buffHandle.push(buff.handle);
                }
            }
            if (vo.unMissileEffects.length > 0 && buff) {
                buff.effs = [];
                for (var j = 0; j < vo.unMissileEffects.length; j++) {
                    buff.effs.push(actor.playEffect(vo.unMissileEffects[j].effect, -1));
                }
            }
        }
    };
    SkillMgr.prototype.checkSkill = function (e, skills, newStudy, actor, use) {
        if (e === void 0) { e = null; }
        if (skills === void 0) { skills = null; }
        if (newStudy === void 0) { newStudy = true; }
        if (actor === void 0) { actor = null; }
        if (use === void 0) { use = null; }
        skills = skills ? skills : Human.ins.skills;
        var aaactor = actor ? actor : Human.ins;
        for (var i = 0; i < skills.length; i++) {
            if (skills[i].level == 0) {
                if (UserVo.ins.levelLimit(skills[i].stdSkill.need_role_lzs, skills[i].stdSkill.need_role_lvl)) {
                    skills[i].level = 1;
                    if (use && use.indexOf(skills[i].stdSkill.tab) != -1) {
                        var dx = use.indexOf(skills[i].stdSkill.tab);
                        this.addBuff(skills[i], aaactor);
                        aaactor.useingSkill[dx] = skills[i];
                        // if(aaactor == Human.ins && !UserVo.ins.skillColumn[dx])
                        // 	UserVo.ins.skillColumn[dx] = skills[i].stdSkill.tab;
                    }
                    if (aaactor == Human.ins) {
                        if (newStudy)
                            SkillMgr.NEW_STUDY.push(skills[i]);
                        DataEventDispatcher.dispatchEventWith(GameEvent.STUDY_SKILL);
                    }
                }
            }
        }
    };
    SkillMgr.prototype.getRoleSkill = function (id) {
        var skills = Human.ins.skills;
        var len = skills.length;
        for (var i = 0; i < len; i++) {
            if (skills[i].stdSkill.secondarySkill_id == id)
                return skills[i];
        }
    };
    SkillMgr.prototype.getRoleSkillByGroup = function (id) {
        var a = [];
        var skills = Human.ins.skills;
        var len = skills.length;
        for (var i = 0; i < len; i++) {
            if (skills[i].stdSkill.skill_id == id) {
                a.push(skills[i]);
            }
        }
        return a;
    };
    SkillMgr.autoFillTab = function (id, lv) {
        return id + (lv > 9 ? lv + "" : "0" + lv);
    };
    SkillMgr.prototype.upSkillLvl = function (data) {
        if (data.isSuccess) {
            var vo = this.getRoleSkill(this.skillConfig[data.nextSkillTab].secondarySkill_id);
            if (vo)
                vo.level += 1;
            else
                egret.log("技能升级错误!");
            // UserVo.ins.upUserVo({upgradeSkillsJade:data.upgradeSkillsJade});
        }
    };
    SkillMgr.prototype.isMaxSkill = function (vo) {
        var a = this.jobSkill[UserVo.ins.jobId];
        return vo.stdSkill.skill_id == a[a.length - 1].skill_id;
    };
    SkillMgr.COMMON_SKILL_ID = 112233;
    //检测是否有新技能学习
    SkillMgr.NEW_STUDY = [];
    return SkillMgr;
}());
__reflect(SkillMgr.prototype, "SkillMgr");
//# sourceMappingURL=SkillMgr.js.map