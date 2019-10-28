var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UserVo = (function () {
    function UserVo() {
        this.uuid = "";
        this.userId = 0;
        this.playerId = "";
        this.jobId = 0;
        this.playerName = "";
        this.gold = 0;
        this.diamond = 0;
        this.headId = 0;
        this.exp = 0;
        this.level = 0;
        this.vipLevel = 0;
        this.sex = 1;
        this.playerAttrInfo = null;
        this.nHp = 0;
        this.rebirthNum = 0; //重生
        this.points = 1; //当前关卡
        this.strengthenArtifactStone = 0; //神器强化石
        this.upgradeSkillsJade = 0; //技能玉
        this.reinforcedEquipmentStone = 0; //装备升阶石
        this.skillTabs = null; //升级了的技能列表
        this.skillColumn = null; //技能栏里的技能列表
        this.fightPower = 0;
        this.Columns = null; //装备栏
        this.storeInfos = null; //商城限制商品购买次数信息
        this.sportsMoney = 0; //竞技币
        this.artifactInfos = null; //已拥有神器集合(artifact.xls表的itemId集合)
        this.challengeNum = 0; //当前竞技场挑战次数
        this.challengeCount = 0; //竞技场购买挑战的已购买次数
        this.playerTaskInfos = null; //任务集合
        this.partChallengNumInfos = null; //副本挑战次数
        this.refreshPurchaseCount = 0; //竞技场刷新挑战者，已购买次数
        this.offlineRewardInfo = null; //离线获得奖励信息
        this.activityInfos = null; //已完成活动信息（返回的是已完成的）
        //抽卡信息
        this.drawCardInfo = null;
        //vip经验（已累计充值多少钻石）
        this.vipExp = 0;
        //已领取vip奖励信息
        this.vipLvlList = null;
        //月卡信息
        this.monthCardInfo = null;
        //是否购买了投资计划 0未购买  1已购买
        this.purchaseInvestment = 35;
        this.guideStep = 0;
        this.isRecharge = false;
        this.historyMaxLevel = 0;
        this.historyMaxPointsId = 0;
        this.playerAttrInfo = new PbPlayerAttrInfo();
    }
    Object.defineProperty(UserVo, "ins", {
        get: function () {
            if (UserVo._ins == null)
                UserVo._ins = new UserVo();
            return UserVo._ins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserVo.prototype, "nMaxHp", {
        get: function () {
            return this.playerAttrInfo.blood;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserVo.prototype, "MAX_LVL", {
        get: function () {
            return this.historyMaxLevel > this.level ? this.historyMaxLevel : this.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserVo.prototype, "MAX_POINTS", {
        get: function () {
            return this.historyMaxPointsId > this.points ? this.historyMaxPointsId : this.points;
        },
        enumerable: true,
        configurable: true
    });
    UserVo.prototype.dispose = function () {
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_30004, this.upFight, this);
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_30005, this.upMoney, this);
    };
    UserVo.prototype.upFight = function (e) {
        this.upUserVo({ fightPower: e.data.fightPower });
    };
    UserVo.prototype.upMoney = function (e) {
        var s = MoneyUtils.getPropertyByType(e.data.currencyType);
        var obj = {};
        obj[s] = e.data.changeNum;
        this.upUserVo(obj);
        DataEventDispatcher.dispatcher.dispatchEventWith(GameEvent.MONEY_TYPE_CHANGE);
    };
    UserVo.prototype.setData = function (obj, $targe) {
        if (this == UserVo.ins) {
            DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30004, this.upFight, this);
            DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30005, this.upMoney, this);
        }
        var targe = $targe ? $targe : this;
        for (var k in obj) {
            targe[k] = obj[k];
        }
        var svo = ConfigMgr.gameConfig["heroAttribute"][this.jobId + ""];
        AttributeUtlis.attributeMgr(svo, true, this.playerAttrInfo, this.jobId);
        this.addLevelPro(this.level);
        if (isNaN(this.nHp))
            this.nHp = this.nMaxHp;
        var c = this.skillColumn.concat();
        this.skillColumn = [];
        for (var i = 0; i < c.length; i++) {
            this.skillColumn[c[i].loc] = c[i].skillTab;
        }
        if (this.Columns) {
            ForgeVo.ins().setEquipAttr(this);
            GemVo.ins().addGemAtts(this);
        }
        if (this.artifactInfos)
            ArtifactVo.ins().initArtPropertys(this);
        if (this.offlineRewardInfo && this == UserVo.ins)
            ViewManager.ins().open(OfflineWin, this.offlineRewardInfo);
        if (this == UserVo.ins) {
            GuideMgr.createAndInit([this.guideStep]);
            GuideMgr.dispatchTiggerEvent(tigger.points, UserVo.ins.points);
            GuideMgr.dispatchTiggerEvent(tigger.rebirthNum, UserVo.ins.rebirthNum);
            GuideMgr.dispatchTiggerEvent(tigger.level, UserVo.ins.level);
        }
    };
    UserVo.prototype.addLevelPro = function (currLv, oldLv) {
        if (oldLv === void 0) { oldLv = 1; }
        var d = ConfigMgr.gameConfig["attributesIncrease"];
        var len = d.length / 3;
        var i;
        var upLvl = currLv - oldLv;
        var j;
        var key;
        var obj;
        for (var i = len - 1; i >= 0; i--) {
            obj = d[(this.jobId - 1) * len + i];
            if (obj.lvMin <= currLv) {
                if (currLv - obj.lvMin >= upLvl) {
                    //直接添加upLvl次属性
                    for (j = 0; j < upLvl; j++) {
                        for (key in obj) {
                            if (key == "heroType" || key == "lvMin" || key == "lvMax")
                                continue;
                            d;
                            var np = {};
                            np["" + key] = obj[key];
                            AttributeUtlis.attributeMgr(np, true, this.playerAttrInfo, this.jobId);
                        }
                    }
                }
                else {
                    //继续下轮添加
                    upLvl -= currLv - d[(this.jobId - 1) * len + i].lvMin;
                    for (j = 0; j < upLvl; j++) {
                        for (key in obj) {
                            if (key == "heroType" || key == "lvMin" || key == "lvMax")
                                continue;
                            AttributeUtlis.attributeMgr({ key: obj[key] }, true, this.playerAttrInfo, this.jobId);
                        }
                    }
                }
            }
        }
    };
    UserVo.prototype.levelLimit = function (v0, v1) {
        return v0 <= this.rebirthNum && v1 <= this.MAX_LVL;
    };
    UserVo.prototype.upUserVo = function (d) {
        for (var key in d) {
            if (this[key] != undefined) {
                switch (key) {
                    case "level":
                        this.addLevelPro(d[key], this.level);
                        GuideMgr.dispatchTiggerEvent(tigger.level, d[key]);
                        break;
                    case "points":
                        GuideMgr.dispatchTiggerEvent(tigger.points, d[key]);
                        break;
                    case "rebirthNum":
                        GuideMgr.dispatchTiggerEvent(tigger.rebirthNum, d[key]);
                        break;
                }
                var dx = MoneyUtils.isMoneyType(key);
                if (dx != -1 && d[key] > this[key])
                    UserTips.ins().showitemTips(MoneyUtils.getMoneyName(MoneyUtils.ALL_MONEY[dx]) + ": +" + (d[key] - this[key]));
                var needDis = this[key] != d[key];
                this[key] = d[key];
                if (needDis)
                    DataEventDispatcher.dispatcher.dispatchEventWith(GameEvent.UP_PLAYER_PROPERTY + propertyType[key]);
            }
        }
    };
    UserVo.prototype.getTaskInfo = function (type) {
        switch (type) {
            case 1:
                return this.playerTaskInfos.threadTaskInfos;
            case 2:
                return this.playerTaskInfos.dayTaskInfos;
            default:
                return this.playerTaskInfos.achieveTaskInfos;
        }
    };
    UserVo.prototype.upFbCount = function (d) {
        var c = ConfigMgr.gameConfig["partInfo"][d.partId];
        for (var i = 0; i < this.partChallengNumInfos.length; i++) {
            if (this.partChallengNumInfos[i].partType == c.partType) {
                this.partChallengNumInfos[i].partChallengNum = d.partChallengNum;
                DataEventDispatcher.dispatcher.dispatchEventWith(GameEvent.UP_PLAYER_PROPERTY + propertyType.partChallengNumInfos);
                return;
            }
        }
    };
    UserVo.prototype.PK_ROLE_DATA = function (d) {
        var a0 = [
            "playerId", "playerName", "level", "jobId", "headId", "fightPower", "skillTabs",
            "skillColumn", "Columns", "artifactInfos", "sex"
        ];
        var a1 = [
            "otherPlayerId", "otherPlayerName", "level", "otherJobId", "otherHeadId", "otherFightPower", "skillTabs",
            "skillColumn", "Columns", "artifactInfos", "sex"
        ];
        var c = {};
        for (var i = 0; i < a0.length; i++) {
            c[a0[i]] = d.fightTargetDetailInfo[a1[i]];
        }
        this.setData(c);
        PVPMgr.ChallegeRank = d.fightTargetDetailInfo.otherRankings;
        //d.otherRankings
    };
    UserVo.NO_GUIDE = false;
    return UserVo;
}());
__reflect(UserVo.prototype, "UserVo");
var propertyType;
(function (propertyType) {
    propertyType[propertyType["level"] = 0] = "level";
    propertyType[propertyType["challengeNum"] = 1] = "challengeNum";
    propertyType[propertyType["fightPower"] = 2] = "fightPower";
    propertyType[propertyType["gold"] = 3] = "gold";
    propertyType[propertyType["vipExp"] = 4] = "vipExp";
    propertyType[propertyType["vipLevel"] = 5] = "vipLevel";
    propertyType[propertyType["isRecharge"] = 6] = "isRecharge";
    // upgradeSkillsJade = 7,
    // reinforcedEquipmentStone = 8,
    // sportsMoney = 9,
    propertyType[propertyType["partChallengNumInfos"] = 10] = "partChallengNumInfos";
    propertyType[propertyType["rebirthNum"] = 11] = "rebirthNum";
    propertyType[propertyType["points"] = 12] = "points";
})(propertyType || (propertyType = {}));
//# sourceMappingURL=UserVo.js.map