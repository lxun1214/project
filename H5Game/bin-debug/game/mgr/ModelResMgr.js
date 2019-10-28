var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModelResMgr = (function () {
    function ModelResMgr() {
        ModelResMgr._url_moviedatas = [];
        var path = ParamMgr.gameSynRes + "/assets/model/";
        var obj = ConfigMgr.gameConfig["globalConfig"];
        this.humanModelGroup = new clips.ClipGroup(path + "human/", obj.humanVer);
        this.monsterModelGroup = new clips.ClipGroup(path + "monster/", obj.monsterVer);
        this.weaponModelGroup = new clips.ClipGroup(path + "weapon/", obj.weaponVer);
        this.helmetModelGroup = new clips.ClipGroup(path + "helmet/", obj.helmetVer);
        this.skillEffectGroup = new clips.ClipGroup(path + "skill/effect/", obj.skillVer);
        this.otherEffectGroup = new clips.ClipGroup(path + "other/", obj.otherVer);
        this.wingModelGroup = new clips.ClipGroup(path + "wing/", obj.wing);
        ModelResMgr.ins = this;
    }
    /**
     * 获取头盔特效
     */
    ModelResMgr.getHelmetEffect = function (index, mc, part) {
        return ModelResMgr.ins.helmetModelGroup.getBmpClip(index, mc, part);
    };
    /**
     * 获取角色模型
     */
    ModelResMgr.getHumanModel = function (index, mc, part) {
        var clip = ModelResMgr.ins.humanModelGroup.getBmpClip(index, mc, part);
        if (!clip.isComplete) {
            clip.movieClipData = BaseActor.getDefaultBody();
        }
        return clip;
    };
    /**
     * 获取武器模型
     */
    ModelResMgr.getWeaponModel = function (index, mc, part) {
        var clip = ModelResMgr.ins.weaponModelGroup.getBmpClip(index, mc, part);
        if (!clip.isComplete) {
            clip.movieClipData = BaseActor.getDefaultBody();
        }
        return clip;
    };
    /**
     * 获取怪物模型
     */
    ModelResMgr.getMonsterModel = function (index, mc, part) {
        var clip = ModelResMgr.ins.monsterModelGroup.getBmpClip(index, mc, part);
        if (!clip.isComplete) {
            clip.movieClipData = BaseActor.getDefaultBody();
        }
        return clip;
    };
    /**
     * 获取翅膀模型
     */
    ModelResMgr.getWingModel = function (index, mc, part) {
        var clip = ModelResMgr.ins.wingModelGroup.getBmpClip(index, mc, part);
        if (!clip.isComplete) {
            clip.movieClipData = BaseActor.getDefaultBody();
        }
        return clip;
    };
    /**
     * 获取技能特效
     */
    ModelResMgr.getSkillEffect = function (index, mc, part) {
        return ModelResMgr.ins.skillEffectGroup.getBmpClip(index, mc, part);
    };
    /**
     * 获取其他特效
     */
    ModelResMgr.getOtherEffect = function (index, mc, part) {
        return ModelResMgr.ins.otherEffectGroup.getBmpClip(index, mc, part);
    };
    return ModelResMgr;
}());
__reflect(ModelResMgr.prototype, "ModelResMgr");
//# sourceMappingURL=ModelResMgr.js.map