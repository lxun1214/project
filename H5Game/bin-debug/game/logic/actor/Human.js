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
 *
 * @author
 * 人类角色
 */
var Human = (function (_super) {
    __extends(Human, _super);
    function Human(race, aiRate) {
        var _this = _super.call(this, race, aiRate) || this;
        _this.selectSkillQue = [];
        _this.nextMovePoin = new ASPathNode(0, 0, 0);
        _this.nNameLabel = new egret.TextField();
        _this.nNameLabel.touchEnabled = false;
        _this.nNameLabel.stroke = 1;
        _this.nNameLabel.strokeColor = 0x2f0404;
        _this.nNameLabel.fontFamily = "黑体";
        _this.nNameLabel.bold = true;
        _this.nNameLabel.textAlign = egret.HorizontalAlign.CENTER;
        _this.nNameLabel.textColor = 0xffea00;
        _this.nNameLabel.bold = true;
        _this.nNameLabel.size = 18;
        _this.addChild(_this.nNameLabel);
        _this.dynamicLevel = 2;
        _this.nHPBar.y = -200;
        _this.nBodyclip.setScaleX(1.3);
        _this.nBodyclip.scaleY = 1.3;
        if (_this.nRace == ActorRace.HUMAN) {
            _this.lvlEff = new clips.BmpClip();
            ModelResMgr.getOtherEffect(10024, _this.lvlEff);
            DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.level, function () {
                if (_this.lvlEff.parent)
                    return;
                _this.addChild(_this.lvlEff);
                _this.lvlEff.play(1);
                _this.lvlEff.addEventListener(egret.Event.COMPLETE, function () {
                    _this.lvlEff.gotoAndStop(1);
                    if (_this.lvlEff.parent)
                        _this.removeChild(_this.lvlEff);
                }, _this);
            }, _this);
        }
        _this.bottmEff = new clips.BmpClip();
        _this.addChildAt(_this.bottmEff, 0);
        return _this;
    }
    Human.prototype.setModelData = function (vo) {
        this.actorVo = vo;
        this.upSpeed();
        this.nBodyclip.playLoopTime = this.nActionSpeed;
        this.useingSkill = [];
        this.skills = [];
        this.sleep = false;
        this.visible = true;
        _super.prototype.initBaseActor.call(this);
        SkillMgr.ins.createSkill(vo.jobId, vo.skillTabs, vo.skillColumn, this);
        if (this.nRace == ActorRace.HUMAN)
            ModelResMgr.getOtherEffect(10019 + vo.sex, this.bottmEff);
        else
            ModelResMgr.getOtherEffect(10022, this.bottmEff);
        this.bottmEff.play(-1);
    };
    Human.prototype.upSpeed = function () {
        if (!this.actorVo)
            return;
        var obj = ConfigMgr.gameConfig["globalConfig"];
        var a = ConfigMgr.gameConfig["heroAttribute"][this.actorVo.jobId];
        if (a.movingSpeed > this.actorVo.playerAttrInfo.movingSpeed)
            this.nMoveSpeed = a.movingSpeed + a.movingSpeed - this.actorVo.playerAttrInfo.movingSpeed;
        else
            this.nMoveSpeed = a.movingSpeed - (this.actorVo.playerAttrInfo.movingSpeed - a.movingSpeed);
        if (a.attackSpeed > this.actorVo.playerAttrInfo.attackSpeed)
            this.nAttackSpeed = a.attackSpeed + a.attackSpeed - this.actorVo.playerAttrInfo.attackSpeed;
        else
            this.nAttackSpeed = a.attackSpeed - (this.actorVo.playerAttrInfo.attackSpeed - a.attackSpeed);
        this.nActionSpeed = obj["humanActionSpeed"];
        this.nReadySpeed = 500; //this.nAttackSpeed-this.nActionSpeed;
        this.nHPBar.setPosition(this.actorVo.nHp, this.actorVo.nMaxHp);
    };
    Human.prototype.start = function () {
        this.direction = 0;
        if (this.nActionTypeQueue.length <= 0 && this.nPlayingType == "") {
            this.playActionType(ActionType.STAND);
        }
        this.readytime = 0;
        this.nBodyclip.playLoopTime = this.nActionSpeed;
        this.nActionTick = GameLogic.ins.gameRunTick + 100;
    };
    Human.prototype.stop = function () {
        if (this.actionEff) {
            this.nEffectlst.splice(this.nEffectlst.indexOf(this.actionEff), 1);
            this.actionEff.destruct();
            this.actionEff = null;
        }
        if (this.delayHitHandle != -1) {
            egret.clearTimeout(this.delayHitHandle);
            this.delayHitHandle = -1;
        }
        this.endMove(true);
        this.endSkill();
    };
    /**
     * 复活
     */
    Human.prototype.revival = function () {
        // GameMap.ins().checkHit(null,this,true);
        this.selectSkillQue.length = 0;
        this.path = null;
        this.nDie = false;
        this.sleep = false;
        this.visible = true;
        this.nTargetPoint.x = this.nTargetPoint.y = -1;
        this.nTargeter = undefined;
        this.addHp(this.actorVo.nMaxHp, false);
        this.nHPBar.setPosition(this.actorVo.nHp, this.actorVo.nMaxHp);
        for (var i = this.nBuffs.length - 1; i >= 0; i--) {
            if (this.nBuffs[i].endTime != 0)
                this.removeBuff(i);
        }
    };
    Object.defineProperty(Human.prototype, "sleep", {
        get: function () {
            return this._sleep;
        },
        /**
         * 设置睡眠
         */
        set: function (value) {
            this._sleep = value;
            if (this._sleep) {
                this.playActionType(ActionType.STAND);
                // this.visible = false;
            }
            else {
                // this.visible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Human.prototype.sendDie = function () {
        _super.prototype.sendDie.call(this);
        this.visible = false;
    };
    Human.prototype.addHp = function (hp, show) {
        if (show === void 0) { show = true; }
        _super.prototype.addHp.call(this, hp);
        if (Human.ins == this && (Human.WU_DI == 1 || Human.WU_DI == 3) && hp < 0)
            return;
        this.actorVo.nHp += hp;
        if (this.actorVo.nHp > this.actorVo.nMaxHp)
            this.actorVo.nHp = this.actorVo.nMaxHp;
        if (this.actorVo.nHp <= 0) {
            this.actorVo.nHp = 0;
            this.nDie = true;
            this.sleep = true;
            // this.addActionQueue(ActionType.DIE);
        }
        this.nHPBar.setPosition(this.actorVo.nHp, this.actorVo.nMaxHp);
    };
    Human.prototype.addSkill = function (skill) {
        if (!skill.canUse) {
            UserTips.ins().showTipsBigToSmall("技能正在CD中!");
            return false;
        }
        if (this.selectSkillQue.length > 0) {
            UserTips.ins().showTipsBigToSmall("等待释放!");
            return false;
        }
        UserTips.ins().showTipsBigToSmall("等待释放!");
        this.selectSkillQue.push(skill);
        return true;
    };
    Human.prototype.AI = function () {
        if (this.mabiArr.length != 0 || this._sprintTarget)
            return;
        if (this.isDie || this.sleep || GameLogic.GAME_STATUS == 1)
            return;
        if (this.nActionTypeQueue.length > 0 || this.actionEff || this.readytime != 0)
            return;
        if (this.path && this.path.length > 0) {
            if (!this.onMoveing) {
                this.nextMovePoin = this.path.pop();
                this.direction = this.nextMovePoin.nDir;
                if (this.moveTo(this.nextMovePoin.nX, this.nextMovePoin.nY, this.nMoveSpeed)) {
                    this.nTargetPoint.x = -1;
                    this.nTargetPoint.y = -1;
                    this.playActionType(ActionType.RUN);
                    return;
                }
            }
            return;
        }
        if (!GameLogic.AUTO_FIGHT)
            return;
        if (this.isMoving || this.nSelectdSkill)
            return;
        if (!this.nSelectdSkill && this.selectSkillQue.length > 0) {
            var useSkill = false;
            //释放技能
            if (this.nActionTypeQueue.length > 0)
                return;
            var s = this.selectSkillQue[0];
            if (s.needTarge) {
                if (!this.nTargeter || this.nTargeter.isDie) {
                    //重新设置目标
                    var o = this.chooseTargeter();
                    if (o) {
                        this.lockAttackTarget(o);
                        if (this.distance(this.nTargeter) <= s.dis)
                            useSkill = true;
                    }
                }
                else {
                    if (this.distance(this.nTargeter) <= s.dis)
                        useSkill = true;
                }
            }
            else
                useSkill = true;
            if (useSkill) {
                this.nSelectdSkill = this.selectSkillQue.shift();
                this.playSkill(this.nSelectdSkill, s.needTarge);
                return;
            }
        }
        if (this.nTargeter != null && this.nTargeter != undefined) {
            if (this.nTargeter.isDie || this.nTargeter.sleep) {
                this.lockAttackTarget(undefined);
                SystemInstance.nextFrameHandle(this.AI, this);
                return;
            }
            var dis = this.selectSkillQue.length > 0 ? this.selectSkillQue[0].dis : SkillMgr.COMMON_SKILL[this.actorVo.jobId].dis;
            if (this.distance(this.nTargeter) > dis && !this.onMoveing && this.nActionTypeQueue.length == 0) {
                this.path = GameMap.ins().getPath(this.distX, this.distY, this.nTargeter.distX, this.nTargeter.distY, this.moveSpeed / (this.moveSpeed + this.nTargeter.moveSpeed), dis == 2 ? dis : dis - 1);
                SystemInstance.nextFrameHandle(this.AI, this);
                return;
            }
            else {
                if (this.nActionTypeQueue.length > 0)
                    return;
                if (GameMap.ins().inJJCMap) {
                    var v;
                    for (var i = this.useingSkill.length - 1; i >= 0; i--) {
                        v = this.useingSkill[i];
                        if (!v)
                            continue;
                        if (v.initiativeSkill)
                            continue;
                        if (v.needTarge && this.distance(this.nTargeter) > v.dis)
                            continue;
                        if (!v.canUse)
                            continue;
                        this.nSelectdSkill = v;
                        this.playSkill(this.nSelectdSkill);
                        return;
                    }
                }
                if (!SkillMgr.COMMON_SKILL[this.actorVo.jobId].canUse)
                    return;
                this.nSelectdSkill = SkillMgr.COMMON_SKILL[this.actorVo.jobId];
                this.playSkill(this.nSelectdSkill);
                return;
            }
        }
        else {
            var obj = this.chooseTargeter();
            this.lockAttackTarget(obj);
            if (!obj) {
                if (MapVo.ins.autoChangeDX() && GameMap.ins().inFBMap) {
                    FBMgr.ins.checkChangeMap();
                    return;
                }
                GameLogic.ins.createMonsters();
            }
            SystemInstance.nextFrameHandle(this.AI, this);
            return;
        }
    };
    Human.prototype.chooseTargeter = function (type) {
        if (type === void 0) { type = 2; }
        var i, ds, actor;
        var ls;
        switch (type) {
            case 0://自己
                ls = new Array();
                ls.push(this);
                break;
            case 1://自己或友军
                break;
            default://敌人
                ls = this.getEnemy();
        }
        var distance = Number.MAX_VALUE;
        var chooseId = -1;
        var backupSelectedls = new Array(); //备选数组
        var dieNum = 0;
        for (i = 0; i < ls.length; i++) {
            actor = ls[i];
            if (actor.sleep || actor.isDie)
                continue;
            ds = this.distance(actor);
            if (distance > ds) {
                distance = ds;
                chooseId = i;
            }
            else {
                backupSelectedls.push(actor);
            }
        }
        if (chooseId != -1) {
            return ls[chooseId];
        }
        else if (backupSelectedls.length > 0) {
            backupSelectedls.sort(function (a, b) { if (a.distanceByTarget > b.distanceByTarget)
                return 1; });
            return backupSelectedls[0];
        }
        return null; //无目标
    };
    Human.prototype.getEnemy = function () {
        var ls = GameLogic.ins.getActorsByType(ActorRace.MONSTER);
        ls = ls.concat(GameLogic.ins.getActorsByType(ActorRace.PK_ROLE));
        return ls;
    };
    Human.prototype.endMove = function (sync) {
        if (sync === void 0) { sync = true; }
        _super.prototype.endMove.call(this, sync);
        this.AI();
    };
    Human.prototype.setPosition = function (nx, ny) {
        MapVo.ins.unMarkNode(this.currentX, this.currentY, MapNode.PLAYER);
        _super.prototype.setPosition.call(this, nx, ny);
        MapVo.ins.markNode(nx, ny, MapNode.PLAYER);
    };
    Human.WU_DI = 0; //1免伤2输出爆炸3免伤输出爆炸
    return Human;
}(BaseActor));
__reflect(Human.prototype, "Human");
//# sourceMappingURL=Human.js.map