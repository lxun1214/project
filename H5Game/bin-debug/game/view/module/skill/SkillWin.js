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
var SkillWin = (function (_super) {
    __extends(SkillWin, _super);
    function SkillWin() {
        var _this = _super.call(this) || this;
        _this.RENDER_H = 180;
        _this.skinName = "SkillSkin";
        return _this;
    }
    SkillWin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // this.pt.titleImg.source = "t_4";
    };
    SkillWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this);
        for (var i = 0; i < this.itemGroup.numChildren - 1; i++) {
            if (this.itemGroup.getChildAt(i) != this.lookPanel)
                this.addTouchEvent(this.itemGroup.getChildAt(i), this.onClick);
        }
        UIDmgr.bindingUID(this, uid.jnP1);
    };
    SkillWin.prototype.onClick = function (e) {
        if (e.currentTarget instanceof SkillLvlItem) {
            var dx = parseInt(e.currentTarget.name);
            if (e.target instanceof SkillIconItem) {
                if (e.target.skillVo.level == 0) {
                    UserTips.ins().showTipsBigToSmall("当前技能还未开启!");
                    return;
                }
                this.lookPanel.setData(e.target.skillVo, e.target.itemIndex, dx);
                this.lookPanel.visible = true;
                this.lookPanel.y = (dx + 1) * this.RENDER_H - 28;
                for (var i = 0; i < this.itemGroup.numChildren - 1; i++) {
                    if (i <= dx)
                        this.itemGroup.getChildAt(i).y = i * this.RENDER_H;
                    else
                        this.itemGroup.getChildAt(i).y = this.lookPanel.y + this.lookPanel.height + 10 + (i - dx - 1) * this.RENDER_H;
                }
                var dx = SkillMgr.NEW_STUDY.indexOf(e.target.skillVo);
                if (dx != -1) {
                    SkillMgr.NEW_STUDY.splice(dx, 1);
                    //新技能、是否可升级
                    if (RemindMgr.CAN_UP_SKILL.indexOf(e.target.skillVo) == -1)
                        ViewManager.redToTarge(e.target, false);
                    DataEventDispatcher.dispatchEventWith(GameEvent.RED_SKILL);
                }
            }
        }
    };
    SkillWin.prototype.euiCompete = function () {
        _super.prototype.euiCompete.call(this);
        var skills = SkillMgr.ins.skillGroup[UserVo.ins.jobId];
        var skillItem;
        var i = 0;
        this.lookPanel = new LookSkillPanel();
        for (var key in skills) {
            skillItem = new SkillLvlItem();
            skillItem.name = i + "";
            skillItem.skillData = skills[key];
            // if(i == 0)
            // {
            skillItem.y = i * this.RENDER_H;
            // 	this.lookPanel.y = (0 + 1)*this.RENDER_H - 28;
            // 	this.lookPanel.setData(SkillMgr.ins.getRoleSkill(skills[key][0].secondarySkill_id),0,0);
            // }else
            // {
            // 	skillItem.y = this.lookPanel.y + this.lookPanel.height + 10 + (i-1)*this.RENDER_H;
            // }
            this.itemGroup.addChild(skillItem);
            i++;
        }
        this.itemGroup.addChild(this.lookPanel);
        this.lookPanel.visible = false;
    };
    return SkillWin;
}(BaseEuiView));
__reflect(SkillWin.prototype, "SkillWin");
ViewManager.ins().reg(SkillWin, LayerManager.UI_MainUI);
//# sourceMappingURL=SkillWin.js.map