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
var RemindMgr = (function (_super) {
    __extends(RemindMgr, _super);
    function RemindMgr() {
        var _this = _super.call(this) || this;
        var vo;
        //任务、成就、技能、神器、装备强化、装备升阶、宝石升级、邮件、活动、首充、月卡、宝盒
        var systems = [TaskWin, AchievementWin, SkillWin, ArtifactWin, ForgeWin, ForgeWin, GemWin, EmailView, BagWin,
            ActivityWin, FirstCharge, MonthCard, LimitCard];
        var call = [_this.upTask, _this.upAchievement, _this.upSkillLvl, _this.checkArtifact, _this.checkEquipStreng, _this.checkEquipLvl, _this.checkGem, _this.checkEmail,
            _this.checkBag, _this.upActivety, _this.upActivety, _this.upActivety, _this.upActivety];
        for (var i = 0; i < systems.length; i++) {
            if (!SystemOpenMgr.checkOpen(systems[i])) {
                vo = SystemOpenMgr.getOpenCondition(systems[i]);
                if (vo.playerLvl > 0)
                    DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum, call[i], _this);
                if (vo.vipLvl > 0)
                    DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel, call[i], _this);
                if (vo["层数"] > 0)
                    DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.points, call[i], _this);
            }
            if (i == 2) {
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.SKILL_UP_LVL, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.level, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum, call[i], _this);
            }
            else if (i == 3) {
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_ARTIFACT_WIN, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE, call[i], _this);
            }
            else if (i == 4) {
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.WEAR_EQUIPS, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_PLAYER_WIN, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_STRENGTH, call[i], _this);
            }
            else if (i == 5) {
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.WEAR_EQUIPS, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_PLAYER_WIN, call[i], _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_ADVANCE, call[i], _this);
            }
            else if (i == 6) {
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_PLAYER_WIN, _this.checkGem, _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_GEM_DATA, _this.checkGem, _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA, _this.checkGem, _this);
            }
            else if (i == 7) {
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.ADD_EMAIL, _this.checkEmail, _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_EMAIL_STATUS, _this.checkEmail, _this);
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.REMOVE_EMAIL, _this.checkEmail, _this);
            }
            else if (i == 8) {
                DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA, call[i], _this);
            }
            else if (i < 13) {
                DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20032, _this.upActivety, _this);
                DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30006, _this.upActivety, _this);
            }
            call[i].apply(_this);
        }
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum, _this.checkArtifact, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel, _this.checkArtifact, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.points, _this.checkArtifact, _this);
        return _this;
    }
    RemindMgr.prototype.upActivety = function (e) {
        if (e === void 0) { e = null; }
        if (!e) {
            ActivetyMgr.ins();
            for (var i = 1000; i < ActivetyMgr.MAX_ACTIVE; i++) {
                RemindMgr.activetyAwards[i + ""] = [];
            }
            var aaa = UserVo.ins.activityInfos;
            for (i = 0; i < aaa.length; i++) {
                var b = aaa[i].completedActivityInfos;
                for (var j = 0; j < b.length; j++) {
                    if (!b[j].isReward)
                        RemindMgr.activetyAwards[aaa[i].activityId + ""].push(b[j].activityIndex);
                }
            }
        }
        else {
            if (e.type == ServerPacket.C_20032) {
                if (e.data.isSuccess) {
                    var a = RemindMgr.activetyAwards[e.data.activityId];
                    var dx = a.indexOf(e.data.activityIndex);
                    if (dx != -1)
                        a.splice(dx, 1);
                    else
                        egret.log("活动错误!");
                }
            }
            else {
                RemindMgr.activetyAwards[e.data.activityId].push(e.data.activityIndex);
            }
        }
        RemindMgr.activetyRED = false;
        for (var k in RemindMgr.activetyAwards) {
            if (k != ActivetyMgr.FIRST_CHARGE + ""
                && k != ActivetyMgr.MONTH_CARD + "" &&
                k != ActivetyMgr.LIMIT_CARD + "") {
                if (RemindMgr.activetyAwards[k].length > 0) {
                    RemindMgr.activetyRED = true;
                    break;
                }
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.RED_ACTIVETY);
    };
    RemindMgr.prototype.checkBag = function () {
        var a = BagVo.ins().getTypeItemList(BagVo.ITEM_TYPE_OTHER);
        var c = a.length != 0;
        if (c == RemindMgr.hasOtherItem)
            return;
        DataEventDispatcher.dispatchEventWith(GameEvent.RED_BAG_RED);
    };
    RemindMgr.prototype.checkEmail = function () {
        var isOpen = SystemOpenMgr.checkOpen(EmailView);
        if (!isOpen)
            return;
        var sb = RemindMgr.HAVE_READ_EMAIL;
        var xb = false;
        var d = UserVo.ins.emailInfos;
        for (var i = 0; i < d.length; i++) {
            if (d[i].readState == 0 || (d[i].itemState == 0 && d[i].itemList && d[i].itemList.length > 0)) {
                xb = true;
                break;
            }
        }
        if (RemindMgr.HAVE_READ_EMAIL == xb)
            return;
        RemindMgr.HAVE_READ_EMAIL = xb;
        DataEventDispatcher.dispatchEventWith(GameEvent.RED_EMAIL);
    };
    RemindMgr.prototype.checkGem = function () {
        var isOpen = SystemOpenMgr.checkOpen(GemWin);
        if (!isOpen)
            return;
        var a;
        var bagGemList = BagVo.ins().getBagGemList();
        RemindMgr.GEM_CAN_UP.length = 0;
        RemindMgr.GEM = false;
        for (var i = 0; i < 4; i++) {
            RemindMgr.GEM_CAN_UP[i] = [];
            a = UserVo.ins.Columns[i].gemGrooves.gemGrooves;
            for (var j = 0; j < a.length; j++) {
                if (a[j].isOpen && a[j].gemId > 0) {
                    var c = GemVo.ins().getGemAttr(a[j].gemId);
                    if (c.nextId == 0)
                        continue;
                    var curType = c.AttrType;
                    for (var key in bagGemList) {
                        var info = bagGemList[key];
                        var type = GemVo.ins().getGemAttr(info.itemId).AttrType;
                        if (curType == type) {
                            if (info.itemNum >= c.compose - 1) {
                                RemindMgr.GEM_CAN_UP[i][c.loc] = c;
                                RemindMgr.GEM = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.RED_GEM_LVL);
    };
    RemindMgr.prototype.checkEquipLvl = function () {
        if (!UserVo.ins.Columns)
            return;
        var isOpen = SystemOpenMgr.checkOpen(ForgeWin);
        if (!isOpen)
            return;
        RemindMgr.upEquipsLvl = [];
        var vo;
        var c = UserVo.ins.reinforcedEquipmentStone;
        for (var i = 0; i < UserVo.ins.Columns.length; i++) {
            var itemInfo = UserVo.ins.Columns[i].itemInfo;
            if (!itemInfo)
                continue;
            vo = ForgeVo.ins().getEquipID(itemInfo.itemId);
            if (c >= vo.reinforcedEquipmentStone && vo.reinforcedEquipmentStone != 0) {
                RemindMgr.upEquipsLvl[i] = itemInfo;
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.RED_EQUIP_LVL);
    };
    RemindMgr.prototype.checkEquipStreng = function () {
        if (!UserVo.ins.Columns)
            return;
        var isOpen = SystemOpenMgr.checkOpen(ForgeWin);
        if (!isOpen)
            return;
        RemindMgr.StrengEquips = [];
        var c = MoneyUtils.getMoneyNum(MoneyUtils.M_2);
        for (var i = 0; i < UserVo.ins.Columns.length; i++) {
            var itemInfo = UserVo.ins.Columns[i].itemInfo;
            if (!itemInfo)
                continue;
            if (c >= ForgeVo.ins().getUpEquipGold(itemInfo.level)) {
                RemindMgr.StrengEquips[i] = itemInfo;
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.RED_STRENG);
    };
    RemindMgr.prototype.checkArtifact = function () {
        var isOpen = SystemOpenMgr.checkOpen(ArtifactWin);
        if (!isOpen)
            return;
        if (!this.artifaceLists) {
            this.artifaceLists = [];
            for (var i_1 = 1; i_1 < 100; i_1++) {
                var id = 40001 + i_1 * 100;
                var cfg = ConfigMgr.gameConfig["artifact"][id];
                if (!cfg)
                    break;
                this.artifaceLists.push(cfg);
                RemindMgr.artifactTips[i_1 - 1] = 0;
            }
        }
        var allOpen = true;
        var artList = UserVo.ins.artifactInfos;
        var vo;
        var hav = false;
        var c = MoneyUtils.getMoneyNum(MoneyUtils.M_6);
        for (var i = 0; i < this.artifaceLists.length; i++) {
            hav = false;
            for (var j = 0; j < artList.length; j++) {
                vo = ConfigMgr.gameConfig["artifact"][artList[j]];
                if (this.artifaceLists[i].artifactType == vo.artifactType) {
                    hav = true;
                    if (c >= vo.strengthenArtifactStone && vo.strengthenArtifactStone != 0) {
                        RemindMgr.artifactTips[i] = 2;
                    }
                    else
                        RemindMgr.artifactTips[i] = 0;
                }
            }
            if (!hav) {
                allOpen = false;
                //检测是否激活
                var canActivate = false;
                switch (this.artifaceLists[i].access) {
                    case 1:
                        canActivate = UserVo.ins.MAX_POINTS >= this.artifaceLists[i].btainConditions;
                        break;
                    case 2:
                        canActivate = UserVo.ins.rebirthNum >= this.artifaceLists[i].btainConditions;
                        break;
                    case 3:
                        canActivate = UserVo.ins.vipLevel >= this.artifaceLists[i].btainConditions;
                        break;
                    case 4:
                        canActivate = BagVo.ins().getIdItem(this.artifaceLists[i].itemId) ? true : false;
                        break;
                    case 5:
                        canActivate = BagVo.ins().getIdItem(this.artifaceLists[i].itemId) ? true : false;
                        break;
                }
                RemindMgr.artifactTips[i] = canActivate ? 1 : 0;
            }
        }
        if (allOpen) {
            DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum, this.checkArtifact, this);
            DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel, this.checkArtifact, this);
            DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.points, this.checkArtifact, this);
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.RED_ARTIFACE);
    };
    RemindMgr.prototype.upSkillLvl = function () {
        var skills = SkillMgr.ins.skillGroup[UserVo.ins.jobId];
        var i = 0;
        var a;
        var count = MoneyUtils.getMoneyNum(MoneyUtils.M_5);
        var vo;
        RemindMgr.CAN_UP_SKILL = [];
        for (var key in skills) {
            a = skills[key];
            for (var i = 0; i < a.length; i++) {
                vo = SkillMgr.ins.getRoleSkill(a[i].secondarySkill_id);
                if (vo && vo.level > 0) {
                    if (count >= vo.stdSkill.upgrade_money && UserVo.ins.levelLimit(vo.stdSkill.need_role_lzs, vo.stdSkill.need_role_lvl) /*UserVo.ins.rebirthNum >= vo.stdSkill.need_role_lzs && UserVo.ins.level >= vo.stdSkill.need_role_lvl*/) {
                        RemindMgr.CAN_UP_SKILL.push(vo);
                    }
                }
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.RED_SKILL);
    };
    RemindMgr.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    RemindMgr.prototype.upTask = function () {
        this.checkTask(0);
    };
    RemindMgr.prototype.upAchievement = function () {
        this.checkTask(3);
    };
    RemindMgr.prototype.clearCall = function (call) {
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum, call, this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel, call, this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum, call, this);
    };
    RemindMgr.prototype.checkTask = function (t) {
        if (t === void 0) { t = 0; }
        var isOpen = SystemOpenMgr.checkOpen(TaskWin);
        var isOpenII = SystemOpenMgr.checkOpen(AchievementWin);
        var a;
        var c;
        if ((!t || t == 1) && isOpen) {
            this.clearCall(this.upTask);
            this.taskChange(1);
            DataEventDispatcher.dispatchEventWith(GameEvent.RED_MAIN_TASK);
        }
        if ((!t || t == 2) && isOpen) {
            this.taskChange(2);
            DataEventDispatcher.dispatchEventWith(GameEvent.RED_ACHEIEVEMENT);
        }
        if (!t || t == 3) {
            if (!isOpenII)
                return;
            else
                this.clearCall(this.upAchievement);
            this.taskChange(3);
            DataEventDispatcher.dispatchEventWith(GameEvent.RED_ACHEIEVEMENT);
        }
    };
    RemindMgr.prototype.taskChange = function (type) {
        var newdd = [];
        var a = TaskMgr.ins().typeTask[type];
        var c = UserVo.ins.getTaskInfo(type);
        for (var j = 0; j < a.length; j++) {
            a[j].completeNum = 0;
            a[j].isReceive = 1;
            for (var i = 0; i < c.length; i++) {
                if (a[j].taskId == c[i].taskId) {
                    a[j].completeNum = c[i].completeNum; //0已领 2 可领  1 未完成
                    a[j].isReceive = c[i].isReceive ? 0 : (c[i].completeNum >= a[j].taskTime &&
                        (a[j].lastTaskId == 0 || AchievementWin.isReceive(a[j].lastTaskId, type)) ? 2 : 1);
                    break;
                }
            }
            if (newdd[a[j].taskWin]) {
                if (a[j].isReceive > newdd[a[j].taskWin].isReceive)
                    newdd[a[j].taskWin] = a[j];
            }
            else
                newdd[a[j].taskWin] = a[j];
        }
        for (i = newdd.length - 1; i >= 0; i--) {
            if (!newdd[i])
                newdd.splice(i, 1);
        }
        newdd.sort(this.sortTask);
        RemindMgr.taskArr[type] = newdd;
        RemindMgr.taskGetSatus[type] = RemindMgr.taskArr[type][0].isReceive == 2;
    };
    RemindMgr.prototype.sortTask = function (a, b) {
        if (a.isReceive < b.isReceive)
            return 1;
        else
            return -1;
    };
    RemindMgr.activetyAwards = {};
    RemindMgr.activetyRED = false;
    RemindMgr.hasOtherItem = false;
    //邮件是否有可读
    RemindMgr.HAVE_READ_EMAIL = false;
    //宝石升级检测
    RemindMgr.GEM_CAN_UP = [];
    RemindMgr.GEM = false;
    //装备升阶
    RemindMgr.upEquipsLvl = [];
    //装备强化
    RemindMgr.StrengEquips = [];
    //神器可激活、升级
    RemindMgr.artifactTips = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //1激活 2升级 0无
    //技能检测
    RemindMgr.CAN_UP_SKILL = [];
    //主线、每日、成就
    RemindMgr.taskArr = [[], [], [], []];
    RemindMgr.taskGetSatus = [false, false, false, false];
    return RemindMgr;
}(BaseClass));
__reflect(RemindMgr.prototype, "RemindMgr");
//# sourceMappingURL=RemindMgr.js.map