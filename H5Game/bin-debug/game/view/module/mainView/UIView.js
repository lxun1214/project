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
/**
 * 主页面
 */
var UIView = (function (_super) {
    __extends(UIView, _super);
    function UIView() {
        var _this = _super.call(this) || this;
        _this.skinName = "UIViewSkin";
        _this.touchEnabled = false;
        return _this;
    }
    UIView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    UIView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        // this.riskBtn.currentState = "up";
        this.navBtn = [this.roleBtn, this.bagBtn, this.riskBtn, this.skillBtn, this.achieveBtn];
        this.viewAr = [PlayerWin, BagWin, null, SkillWin, AchievementWin];
        for (var i = 0; i < this.navBtn.length; i++) {
            this.addTouchEvent(this.navBtn[i], this.onClick);
        }
        this.addTouchEvent(this.arenaBtn, this.onOpenBtn);
        this.addTouchEvent(this.copyBtn, this.onOpenBtn);
        this.addTouchEvent(this.mailBtn, this.onOpenBtn);
        this.addTouchEvent(this.rankBtn, this.onOpenBtn);
        this.addTouchEvent(this.taskBtn, this.onOpenBtn);
        this.addTouchEvent(this.shopBtn, this.onOpenBtn);
        this.addTouchEvent(this.noticeBtn, this.onOpenBtn);
        this.addTouchEvent(this.newsBtn, this.onOpenBtn);
        DataEventDispatcher.dispatcher.addEventListener(BaseMap.LOAD_MAP_COMPLETE, this.updateRoleData, this);
        this.updateRoleData();
        UIDmgr.bindingUID(this.roleBtn, uid.roleBtn);
        UIDmgr.bindingUID(this.bagBtn, uid.bag);
        UIDmgr.bindingUID(this.taskBtn, uid.rw0);
        UIDmgr.bindingUID(this.copyBtn, uid.fb0);
        UIDmgr.bindingUID(this.skillBtn, uid.jn0);
        UIDmgr.bindingUID(this.arenaBtn, uid.p0);
        UIDmgr.bindingUID(this.achieveBtn, uid.cj0);
        UIDmgr.bindingUID(this.riskBtn, uid.back1);
        this.addEvent(GameEvent.RED_MAIN_TASK, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_DAY_TASK, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_ACHEIEVEMENT, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_SKILL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_ARTIFACE, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_STRENG, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_EQUIP_LVL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_GEM_LVL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_EMAIL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_BAG_RED, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.STUDY_SKILL, DataEventDispatcher.dispatcher, this.upRed);
        this.upRed(null);
        if (!param[0]) {
            return;
        }
        ViewManager.ins().open(param[0], param[1]);
    };
    UIView.prototype.upRed = function (e) {
        //成就、任务
        ViewManager.redToTarge(this.achieveBtn, RemindMgr.taskGetSatus[3] == true);
        ViewManager.redToTarge(this.taskBtn, RemindMgr.taskGetSatus[1] == true || RemindMgr.taskGetSatus[2] == true);
        //技能
        ViewManager.redToTarge(this.skillBtn, RemindMgr.CAN_UP_SKILL.length > 0 || SkillMgr.NEW_STUDY.length > 0);
        //神器激活、升级
        // ViewManager.redToTarge(this.roleBtn,(RemindMgr.artifactTips.indexOf(1) != -1) || (RemindMgr.artifactTips.indexOf(2) != -1));
        //强化
        ViewManager.redToTarge(this.roleBtn, (RemindMgr.artifactTips.indexOf(1) != -1) || (RemindMgr.artifactTips.indexOf(2) != -1) || (RemindMgr.StrengEquips.length > 0) || (RemindMgr.upEquipsLvl.length > 0) || (RemindMgr.GEM));
        //邮件有可读的提示
        ViewManager.redToTarge(this.mailBtn, RemindMgr.HAVE_READ_EMAIL);
        //背包
        ViewManager.redToTarge(this.bagBtn, RemindMgr.hasOtherItem);
    };
    UIView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        DataEventDispatcher.dispatcher.removeEventListener(BaseMap.LOAD_MAP_COMPLETE, this.updateRoleData, this);
    };
    /**
     * 更新角色信息
     */
    UIView.prototype.updateRoleData = function () {
        var obj = ConfigMgr.gameConfig["pointInfo"][UserVo.ins.points + ""];
    };
    UIView.prototype.onClick = function (e) {
        var btn = e.currentTarget;
        if (btn == this.riskBtn) {
            ViewManager.ins().closeTopLevel();
            ViewManager.ins().close(this);
        }
        else {
            this.selectView(btn);
        }
        UIDmgr.bindingUID(this.riskBtn, uid.back1);
    };
    UIView.prototype.onOpenBtn = function (e) {
        switch (e.currentTarget) {
            case this.arenaBtn:
                ViewManager.ins().open(PVPWin);
                break;
            case this.copyBtn:
                ViewManager.ins().open(PVEWin);
                break;
            case this.shopBtn:
                ViewManager.ins().open(ShopWin);
                break;
            case this.rankBtn:
                ViewManager.ins().open(RankWin);
                break;
            case this.taskBtn:
                ViewManager.ins().open(TaskWin);
                break;
            case this.mailBtn:
                ViewManager.ins().open(EmailView);
                break;
            case this.noticeBtn:
                ViewManager.ins().open(NoticeView);
                break;
            case this.newsBtn:
                ViewManager.ins().open(MessageView);
                break;
            default:
                UserTips.ins().showTipsBigToSmall("敬请期待");
        }
    };
    UIView.prototype.selectView = function (btn) {
        var btnIndex = this.navBtn.indexOf(btn);
        var d = this.viewAr[btnIndex] ? ViewManager.ins().open(this.viewAr[btnIndex]) : null;
        if (!d)
            return false;
        return true;
    };
    return UIView;
}(BaseEuiView));
__reflect(UIView.prototype, "UIView");
ViewManager.ins().reg(UIView, LayerManager.UI_Main);
//# sourceMappingURL=UIView.js.map