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
var MainUIWin = (function (_super) {
    __extends(MainUIWin, _super);
    function MainUIWin() {
        var _this = _super.call(this) || this;
        _this.pp = false;
        _this.right = 0;
        _this.touchEnabled = false;
        _this.skinName = "mainUISkin";
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONSTER_COUNT_CHANGE, _this.challengeStatus, _this);
        DataEventDispatcher.dispatcher.addEventListener(BaseMap.LOAD_MAP_COMPLETE, function () {
            var obj = ConfigMgr.gameConfig["pointInfo"][UserVo.ins.points + ""];
            _this.pro.visible = GameMap.ins().onHookMap;
            _this.pp = UserVo.ins.points % 3 == 2;
            var b = UserVo.ins.points - (_this.pp ? 1 : 0);
            _this.exit.visible = !GameMap.ins().onHookMap;
        }, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.SELECT_SKILL, function (e) {
            var k = e.data.b;
            //检测下是否被动技能
            SkillMgr.ins.skillChange(e.data.a, e.data.b);
            HttpMgr.ins.sendMessage(ClientPacket.S_10007, { skillTab: k.stdSkill.tab, loc: e.data.a }, ServerPacket.LOGIC_URL);
            _this.skills[e.data.a].setData(e.data.b);
        }, _this);
        return _this;
    }
    MainUIWin.prototype.euiCompete = function () {
        _super.prototype.euiCompete.call(this);
        this.challenge.visible = false;
        this.skills = [];
        var sw = 115 * 0.8;
        //从新布局技能
        var w = (GlobalVo.GAME_W - sw * 6 - 176);
        var space = w / 8;
        for (var i = 0; i < 7; i++) {
            this["skill" + i].name = i + "";
            if (i < 3)
                this["skill" + i].x = sw * i + (i + 1) * space;
            else if (i < 6) {
                this["skill" + i].x = GlobalVo.GAME_W - (6 - i) * sw - (6 - i) * space;
            }
            this.skills.push(this["skill" + i]);
            this.skills[i].monitorCD = true;
        }
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.fightPower, this.upPower, this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.INIT_ROLE, this.upSkillList, this);
        UIDmgr.bindingUID(this["skill0"], uid.skill0);
        UIDmgr.bindingUID(this.g0, uid.jnP0);
        UIDmgr.bindingUID(this.s, uid.jnP2);
        var mc = new clips.BmpClip();
        mc.y = 115 - 6;
        mc.x = 112 / 2 - 3;
        ModelResMgr.getOtherEffect(10013, mc);
        mc.play(-1);
        this.challenge.addChild(mc);
        var mc = new clips.BmpClip();
        mc.x = 100;
        mc.y = 10;
        ModelResMgr.getOtherEffect(10015, mc);
        mc.play(-1);
        this.challenge.addChild(mc);
        this.upRed(null);
        /****************************************************/
        this.navBtn = [this.roleBtn, this.bagBtn, this.riskBtn, this.skillBtn, this.achieveBtn];
        this.viewAr = [PlayerWin, BagWin, null, SkillWin, AchievementWin];
        for (var i_1 = 0; i_1 < this.navBtn.length; i_1++) {
            this.addTouchEvent(this.navBtn[i_1], this.onClick);
        }
        this.addTouchEvent(this.arenaBtn, this.onOpenBtn);
        this.addTouchEvent(this.copyBtn, this.onOpenBtn);
        this.addTouchEvent(this.mailBtn, this.onOpenBtn);
        this.addTouchEvent(this.rankBtn, this.onOpenBtn);
        this.addTouchEvent(this.taskBtn, this.onOpenBtn);
        this.addTouchEvent(this.shopBtn, this.onOpenBtn);
        this.addTouchEvent(this.noticeBtn, this.onOpenBtn);
        this.addTouchEvent(this.newsBtn, this.onOpenBtn);
        this.addTouchEvent(this.chatBtn, this.onOpenBtn);
        this.addTouchEvent(this.firstBtn, this.onOpenBtn);
        this.addTouchEvent(this.mcBtn, this.onOpenBtn);
        this.addTouchEvent(this.mbBtn, this.onOpenBtn);
        UIDmgr.bindingUID(this.roleBtn, uid.roleBtn);
        UIDmgr.bindingUID(this.bagBtn, uid.bag);
        UIDmgr.bindingUID(this.taskBtn, uid.rw0);
        UIDmgr.bindingUID(this.copyBtn, uid.fb0);
        UIDmgr.bindingUID(this.skillBtn, uid.jn0);
        UIDmgr.bindingUID(this.arenaBtn, uid.p0);
        UIDmgr.bindingUID(this.achieveBtn, uid.cj0);
        UIDmgr.bindingUID(this.riskBtn, uid.back1);
        UIDmgr.bindingUID(this.reBornBtn, uid.cs0);
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
        this.addEvent(GameEvent.RED_ACTIVETY, DataEventDispatcher.dispatcher, this.upRed);
        this.upRed(null);
        if (!UserVo.ins.isRecharge || !ActivetyMgr.ins().checkAtivityEnd(ActivetyMgr.FIRST_CHARGE, 1))
            ViewManager.effectToTarge(this.firstBtn, true);
        else {
            if (this.firstBtn.parent)
                this.firstBtn.parent.removeChild(this.firstBtn);
        }
        ViewManager.effectToTarge(this.mcBtn, true);
        ViewManager.effectToTarge(this.mbBtn, true);
    };
    MainUIWin.prototype.upRed = function (e) {
        var red = SkillMgr.NEW_STUDY.length > 0;
        // var forge:boolean = false;
        //成就、任务
        if (RemindMgr.taskGetSatus[3])
            red = true;
        //技能
        if (!red && RemindMgr.CAN_UP_SKILL.length > 0)
            red = true;
        //神器激活、升级
        if (!red && (RemindMgr.artifactTips.indexOf(1) != -1) || (RemindMgr.artifactTips.indexOf(2) != -1))
            red = true;
        //强化
        if (RemindMgr.StrengEquips.length > 0) {
            red = true;
        }
        //升阶
        if (RemindMgr.upEquipsLvl.length > 0) {
            red = true;
        }
        //宝石升级
        if (!red && RemindMgr.GEM)
            red = true;
        // 	//邮件有可读的提示
        // 	if(!red && RemindMgr.HAVE_READ_EMAIL)
        // 		red = true;
        ViewManager.redToTarge(this.mainBtn, red);
        ViewManager.redToTarge(this.actionBtn, RemindMgr.activetyRED);
        //成就、任务
        ViewManager.redToTarge(this.achieveBtn, RemindMgr.taskGetSatus[3] == true);
        ViewManager.redToTarge(this.taskBtn, RemindMgr.taskGetSatus[1] == true || RemindMgr.taskGetSatus[2] == true);
        //技能
        ViewManager.redToTarge(this.skillBtn, RemindMgr.CAN_UP_SKILL.length > 0 || SkillMgr.NEW_STUDY.length > 0);
        //强化
        ViewManager.redToTarge(this.roleBtn, (RemindMgr.artifactTips.indexOf(1) != -1) || (RemindMgr.artifactTips.indexOf(2) != -1) || (RemindMgr.StrengEquips.length > 0) || (RemindMgr.upEquipsLvl.length > 0) || (RemindMgr.GEM));
        //邮件有可读的提示
        ViewManager.redToTarge(this.mailBtn, RemindMgr.HAVE_READ_EMAIL);
        //背包
        ViewManager.redToTarge(this.bagBtn, RemindMgr.hasOtherItem);
    };
    MainUIWin.prototype.upSkillList = function () {
        for (var i = 0; i < this.skills.length; i++) {
            if (!this.skills[i].data) {
                if (UserVo.ins.skillColumn[i])
                    this.skills[i].setData(SkillMgr.ins.getRoleSkill(ConfigMgr.gameConfig["skill"][UserVo.ins.skillColumn[i]].secondarySkill_id));
                // else
                // 	this.skills[i].setData(SkillMgr.ins.getRoleSkill(SkillMgr.ins.groupSkillId[i]));
            }
        }
    };
    MainUIWin.prototype.upPower = function () {
        this.labfight.text = UserVo.ins.fightPower + "";
    };
    MainUIWin.prototype.challengeStatus = function (e) {
        var _this = this;
        //-2  隐藏按钮  判断进度条显示
        if (e.data == -2) {
            // this.challengeEff0.stop();
            this.challenge.visible = false;
            // this.hp.width = 94;
            this.pro.visible = GameMap.ins().onHookMap;
        }
        else if (e.data == -1) {
            if (this.challenge.visible)
                return;
            // this.challengeEff0.play(-1);
            this.challenge.x = GlobalVo.GAME_W;
            this.challenge.visible = true;
            var tw = egret.Tween.get(this.challenge).to({ x: GlobalVo.GAME_W / 2 - this.challenge.width / 2 }, 150).call(function () {
                UIDmgr.bindingUID(_this.challenge, uid.bossBtn);
            }, this);
        }
        else {
            if (e.data == 0) {
                // this.challengeEff0.stop();
                this.challenge.visible = false;
            }
        }
    };
    MainUIWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this.mainBtn, this.onTap);
        // this.addTouchEvent(this.forgeBtn, this.onTap);
        this.addTouchEvent(this.reBornBtn, this.onTap);
        for (var i = 0; i < this.skills.length; i++) {
            this.addEvent(egret.TouchEvent.TOUCH_BEGIN, this.skills[i], this.onTap);
            this.addEvent(egret.TouchEvent.TOUCH_END, this.skills[i], this.onTap);
        }
        this.addTouchEvent(this.challenge, this.onTap);
        // this.addTouchEvent(this.pvp, this.onTap);
        // this.addTouchEvent(this.pve, this.onTap);
        this.addTouchEvent(this.exit, this.onTap);
        this.addTouchEvent(this.reBtn, this.onTap);
        this.addTouchEvent(this.actionBtn, this.onTap);
        this.addTouchEvent(this.vipBtn, this.onTap);
        // this.addTouchEvent(this.achBtn, this.onTap);
        this.upPower();
        this.addEvent(GameEvent.RED_MAIN_TASK, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_DAY_TASK, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_ACHEIEVEMENT, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_SKILL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_ARTIFACE, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_STRENG, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_EQUIP_LVL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_GEM_LVL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_EMAIL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.STUDY_SKILL, DataEventDispatcher.dispatcher, this.upRed);
    };
    // t:number;
    MainUIWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.reBtn:
                ViewManager.ins().open(RechargeWin);
                break;
            case this.exit:
                if (GameMap.ins().inJJCMap)
                    PVPMgr.ins().pVPFightEnd(false);
                else if (GameMap.ins().inFBMap)
                    FBMgr.ins.eixtFb(true);
                break;
            case this.challenge:
                HttpMgr.ins.sendMessage(ClientPacket.S_10004, {}, ServerPacket.LOGIC_URL);
                this.challenge.visible = false;
                break;
            case this.mainBtn:
                this.g0.visible = true;
                this.qiehuan.visible = this.s.visible = false;
                break;
            case this.actionBtn:
                ViewManager.ins().open(ActivityWin);
                break;
            case this.vipBtn:
                ViewManager.ins().open(VipWin);
                break;
            case this.reBornBtn:
                //console.log('----sendMessage-',)
                // if(UserVo.ins.historyMaxPointsId < 22){
                // 	ViewManager.ins().open(TipsWin,"确定","到达11关以后才可以重生","提示","",()=>{
                // 	},null,this)
                // 	return ;
                // }
                if (!SystemOpenMgr.checkOpen(ReborthWin, true))
                    return;
                ViewManager.ins().open(ReborthWin);
                break;
            default:
                var s = e.currentTarget;
                if (s && s.canClick) {
                    if (GameMap.ins().inJJCMap) {
                        UserTips.ins().showTipsBigToSmall("竞技场内,无法手动释放技能!");
                        return;
                    }
                    if (s.data.initiativeSkill)
                        UserTips.ins().showTipsBigToSmall("被动技能,无需手动释放!");
                    else
                        Human.ins.addSkill(s.data);
                }
                break;
        }
    };
    /***************************** */
    MainUIWin.prototype.onClick = function (e) {
        var btn = e.currentTarget;
        if (btn == this.riskBtn) {
            this.g0.visible = false;
            this.qiehuan.visible = this.s.visible = true;
        }
        else {
            this.selectView(btn);
        }
        UIDmgr.bindingUID(this.riskBtn, uid.back1);
    };
    MainUIWin.prototype.onOpenBtn = function (e) {
        switch (e.currentTarget) {
            case this.chatBtn:
                ViewManager.ins().open(ChatWin);
                break;
            case this.firstBtn:
                ViewManager.ins().open(FirstCharge);
                break;
            case this.mbBtn:
                ViewManager.ins().open(LimitCard);
                break;
            case this.mcBtn:
                ViewManager.ins().open(MonthCard);
                break;
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
    MainUIWin.prototype.selectView = function (btn) {
        var btnIndex = this.navBtn.indexOf(btn);
        var d = this.viewAr[btnIndex] ? ViewManager.ins().open(this.viewAr[btnIndex]) : null;
        if (!d)
            return false;
        return true;
    };
    return MainUIWin;
}(BaseEuiView));
__reflect(MainUIWin.prototype, "MainUIWin");
ViewManager.ins().reg(MainUIWin, LayerManager.UI_Main);
//# sourceMappingURL=MainUIWin.js.map