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
var LookSkillPanel = (function (_super) {
    __extends(LookSkillPanel, _super);
    function LookSkillPanel() {
        var _this = _super.call(this) || this;
        _this.canUp = false;
        _this.skinName = "lookSkillSkin";
        // this.item.labName.visible = false;
        // this.item.labCount.visible = false;
        _this.l.source = ResMgr.getGameItemPng(MoneyUtils.M_5);
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!_this.canUp) {
                // MoneyUtils.ShowGetWay(MoneyUtils.M_5);
                return UserTips.ins().showTipsBigToSmall("材料不足,无法升级!");
            }
            // if(UserVo.ins.rebirthNum < this.skillVo.stdSkill.need_role_lzs)
            // 	return UserTips.ins().showTips("重生等级不足" + this.skillVo.stdSkill.need_role_lzs +",无法升级!");
            // if(UserVo.ins.level < this.skillVo.stdSkill.need_role_lvl)
            // 	return UserTips.ins().showTips("等级不足 " + this.skillVo.stdSkill.need_role_lvl + ",无法升级!");
            if (!UserVo.ins.levelLimit(_this.skillVo.stdSkill.need_role_lzs, _this.skillVo.stdSkill.need_role_lvl))
                return UserTips.ins().showTipsBigToSmall("重生等级或者等级不足 " + _this.skillVo.stdSkill.need_role_lvl + ",无法升级!");
            HttpMgr.ins.sendMessage(ClientPacket.S_10006, { skillTab: _this.skillVo.stdSkill.tab }, ServerPacket.LOGIC_URL);
        }, _this);
        // this.item.setIcon(MoneyUtils.M_5);
        // this.item.touchChildren = false;
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.SKILL_UP_LVL, _this.updata, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL, _this.updata, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE, _this.updata, _this);
        _this.btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.btn0.label == "装 配 中")
                return UserTips.ins().showTipsBigToSmall("该技能已装配至战斗页对应的技能栏中!");
            UserVo.ins.skillColumn[_this.skillDx] = _this.skillVo.stdSkill.tab;
            DataEventDispatcher.dispatchEventWith(GameEvent.SELECT_SKILL, { a: _this.skillDx, b: _this.skillVo });
            _this.btn0.label = "装 配 中";
        }, _this);
        return _this;
    }
    LookSkillPanel.prototype.upStatus = function () {
        this.btn0.label = UserVo.ins.skillColumn.indexOf(this.skillVo.stdSkill.tab) != -1 ? "装 配 中" : "装 配";
    };
    LookSkillPanel.prototype.setData = function (vo, dx, dx0) {
        this.skillDx = dx0;
        this.jt.x = 190 + 120 * dx;
        this.skillVo = vo;
        this.updata();
        this.upStatus();
        UIDmgr.bindingUID(this.btn, uid.jn2);
        var a = SkillMgr.ins.skillGroup[UserVo.ins.jobId];
        UIDmgr.bindingUID(this.btn0, uid.jn3);
    };
    LookSkillPanel.prototype.updata = function () {
        if (!this.skillVo)
            return;
        this.des.text = this.skillVo.stdSkill.description;
        // this.l1.text = "LV." + this.skillVo.level;
        // this.l2.text = this.skillVo.stdSkill.description2;
        var l = MoneyUtils.getMoneyNum(MoneyUtils.M_5);
        this.l6.text = l + "/" + this.skillVo.stdSkill.upgrade_money;
        this.canUp = l >= this.skillVo.stdSkill.upgrade_money;
        this.g1.setSkillData(this.skillVo.stdSkill);
        var nextVo = ConfigMgr.gameConfig["skill"][SkillMgr.autoFillTab(this.skillVo.stdSkill.secondarySkill_id, this.skillVo.level + 1)];
        if (nextVo) {
            this.g0.setSkillData(nextVo, 1);
            this.g2.visible = this.g0.visible = true;
            this.l7.visible = false;
            // this.l3.text = "LV." + nextVo.level;
            // this.l4.text = nextVo.description2;
        }
        else {
            this.g2.visible = this.g0.visible = false;
            this.l7.visible = true;
        }
    };
    return LookSkillPanel;
}(eui.Component));
__reflect(LookSkillPanel.prototype, "LookSkillPanel");
//# sourceMappingURL=LookSkillPanel.js.map