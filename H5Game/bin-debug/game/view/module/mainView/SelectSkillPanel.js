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
var SelectSkillPanel = (function (_super) {
    __extends(SelectSkillPanel, _super);
    function SelectSkillPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "selectSkillSkin";
        return _this;
    }
    SelectSkillPanel.prototype.euiCompete = function () {
        var _this = this;
        _super.prototype.euiCompete.call(this);
        for (var i = 0; i < 4; i++) {
            this.addTouchEvent(this["skill" + i], function (e) {
                if (e.currentTarget.data.level == 0)
                    UserTips.ins().showTipsBigToSmall("技能未学习,无法使用!");
                else {
                    DataEventDispatcher.dispatchEventWith(GameEvent.SELECT_SKILL, { a: _this.dx, b: e.currentTarget.data });
                }
                _this.visible = false;
            });
        }
    };
    SelectSkillPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.dx = param[0];
        var skills = SkillMgr.ins.getRoleSkillByGroup(param[1].stdSkill.skill_id);
        for (var i = 0; i < skills.length; i++) {
            this["skill" + i].setData(skills[i], true);
            this["skill" + i].monitorCD = false;
        }
        UIDmgr.bindingUID(this["skill1"], uid.skill1);
        this.visible = true;
        var nx = egret.MainContext.instance.stage.stageWidth > 750 ? (egret.MainContext.instance.stage.stageWidth - 750) / 2 : 0;
        var ny = egret.MainContext.instance.stage.stageHeight > 1334 ? (egret.MainContext.instance.stage.stageHeight - 1334) : 0;
        switch (this.dx) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                // this.x = nx + -20 + this.dx *(280/5);
                // this.y = 261;
                // this.jt.x = nx + (750 - 102*6)/8 * (this.dx+1) + this.dx * 102 + 102/2 - this.x - 16 + ny;
                break;
            case 6:
                // this.x = -20 + 5 *(280/5) + nx*2;
                // this.y = 80 + ny;
                // this.jt.x = (750 - 102*6)/8 * 7 + 5 * 102 + 102/2 - this.x - 16 + nx*2;
                break;
        }
    };
    return SelectSkillPanel;
}(BaseEuiView));
__reflect(SelectSkillPanel.prototype, "SelectSkillPanel");
//# sourceMappingURL=SelectSkillPanel.js.map