var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameLogic = (function () {
    function GameLogic() {
        this.skillMonster = 0;
        this._monsterls = [];
        this._monsterPooling = [];
        this._sceneEffects = [];
        this._pkRolePooling = [];
        DataEventDispatcher.dispatcher.addEventListener(BaseMap.LOAD_MAP_COMPLETE, this.initModel, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20022, this.createPk, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20004, function (d) {
            if (!d.data.isSuccess)
                UserTips.ins().showTipsBigToSmall("关卡挑战数据异常!!!");
            // BagVo.ins().setBagList(d.data.bagChangeInfo);
            // UserVo.ins.points = d.data.nextId;
            UserVo.ins.upUserVo({ "points": d.data.nextId });
            UserVo.ins.upUserVo(d.data);
            this.changeMap(UserVo.ins.points, false, false);
            // GameLogic.GAME_STATUS = 0;
        }, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20005, function (d) {
            // UserVo.ins.points = d.data.lastId;
            UserVo.ins.upUserVo({ "points": d.data.lastId });
            this.changeMap(UserVo.ins.points);
            // GameLogic.GAME_STATUS = 0;
        }, this);
        SystemInstance.addFrameHandle(this.update, this);
        BagVo.ins().initEvent();
        document.addEventListener("keyup", this.GMFun);
        // new PlayerTopView().open();
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20011, function (e) {
            //egret.log('---reborn data back--',data);
            UserVo._ins.dispose();
            UserVo._ins = null;
            UserVo.ins.setData(e.data.playerInfo, null);
            this.role.setModelData(UserVo.ins);
            ViewManager.ins().close(ReborthWin);
            GameLogic.ins.changeMap(UserVo.ins.points);
            DataEventDispatcher.dispatcher.dispatchEventWith(GameEvent.MONEY_TYPE_CHANGE);
            for (var key in propertyType) {
                DataEventDispatcher.dispatcher.dispatchEventWith(GameEvent.UP_PLAYER_PROPERTY + key);
            }
        }, this);
    }
    Object.defineProperty(GameLogic, "ins", {
        get: function () {
            if (GameLogic._ins == null)
                GameLogic._ins = new GameLogic();
            return GameLogic._ins;
        },
        enumerable: true,
        configurable: true
    });
    GameLogic.prototype.GMFun = function (e) {
        var key = e["keyCode"];
        if (key == 13) {
            var str = GameScene.ins.input.text.split(" ");
            switch (str[0]) {
                case "@s":
                    GameMap.ins().shake(parseInt(str[1]), parseInt(str[2]), parseInt(str[3]));
                    break;
                case "@as":
                    UserVo.ins.playerAttrInfo.attackSpeed = parseInt(str[1]);
                    Human.ins.upSpeed();
                    break;
                case "@XY":
                    Human.ins.setPosition(parseInt(str[1]), parseInt(str[2]));
                    return;
                case "@points":
                    UserVo.ins.points = parseInt(str[1]);
                    GameLogic.ins.changeMap(UserVo.ins.points, false, false);
                    return;
                case "@auto":
                    GameLogic.AUTO_FIGHT = !GameLogic.AUTO_FIGHT;
                    return;
                case "@wudi":
                    Human.WU_DI = parseInt(str[1]);
                    return;
                case "@die":
                    Human.ins.addHp(-99999999999);
                    return;
                case "@sw":
                    ViewManager.ins().open(MonthCard);
                    return;
                case "@fr":
                    ViewManager.ins().open(FightResultWin, str[1]);
                    return;
                case "@gi"://@gi money_5
                    return MoneyUtils.ShowGetWay(str[1]);
                case "@pro":
                    var obj = {};
                    obj[str[1]] = parseInt(str[2]);
                    return UserVo.ins.upUserVo(obj);
                case "@guide":
                    var d = parseInt(str[1]);
                    if (d == 0) {
                        for (var i = 0; i < Guide.guideCfg.length; i++) {
                            GuideMgr._instance.save(Guide.guideCfg[i].id);
                        }
                    }
                    else
                        GuideMgr._instance.save(d);
                    return;
            }
            var data = {
                command: str[0],
                parameter: str[1]
            };
            HttpMgr.ins.sendMessage(ClientPacket.S_100, data, ServerPacket.LOGIC_URL, true);
        }
        else if (key == 192) {
            GameScene.ins.input.visible = !GameScene.ins.input.visible;
            GameScene.ins.input.text = !GameScene.ins.input.visible ? "" : "GM";
        }
    };
    GameLogic.prototype.update = function () {
        this.gameRunTick = egret.getTimer();
        if (this.role)
            this.role.update(this.gameRunTick);
        if (this._pkRole)
            this._pkRole.update(this.gameRunTick);
        GameMap.ins().update(this.gameRunTick);
        var i;
        for (i = 0; i < this._monsterls.length; i++) {
            this._monsterls[i].update(this.gameRunTick);
        }
        var sceneEffect;
        for (i = this._sceneEffects.length - 1; i >= 0; i--) {
            sceneEffect = this._sceneEffects[i];
            sceneEffect.processMove(this.gameRunTick);
            if (sceneEffect.finish) {
                if (sceneEffect.user != undefined && !sceneEffect.user.isDie && !sceneEffect.user.sleep) {
                    if (sceneEffect.target && (sceneEffect.target instanceof BaseActor)) {
                        if (!sceneEffect.target.isDie && !sceneEffect.target.sleep && sceneEffect.target.handleId == sceneEffect.targetHandle) {
                            var targets = new Array();
                            if (sceneEffect.skill.needTarge) {
                                if (sceneEffect.skill.singleAttack)
                                    this.SkillHitActorEffect(sceneEffect.skill, sceneEffect.user, sceneEffect.target);
                                else
                                    this.SkillHitActorEffect(sceneEffect.skill, sceneEffect.user, sceneEffect.target.currentX, sceneEffect.target.currentY, sceneEffect.target);
                            }
                            else
                                this.SkillHitActorEffect(sceneEffect.skill, sceneEffect.user, sceneEffect.user.currentX, sceneEffect.user.currentY);
                        }
                    }
                }
                sceneEffect.destruct();
                this._sceneEffects.splice(i, 1);
            }
        }
        if (GameLogic.GAME_STATUS == 1)
            return;
        if (this.role && this.role.isDie && !this.revivaling) {
            this.role.endSkill();
            this.revivaling = true;
            if (GameMap.ins().inJJCMap) {
                ViewManager.ins().open(FightResultWin, 0, function () {
                    PVPMgr.ins().pVPFightEnd(false);
                });
            }
            else if (GameMap.ins().inFBMap) {
                ViewManager.ins().open(FightResultWin, 2, function () {
                    FBMgr.ins.eixtFb(true);
                });
            }
            else {
                if (GameMap.ins().inBossMap) {
                    ViewManager.ins().open(FightResultWin, 4, function () {
                        HttpMgr.ins.sendMessage(ClientPacket.S_10005, {}, ServerPacket.LOGIC_URL, true);
                    });
                }
                else {
                    ViewManager.ins().open(FightResultWin, 2, function () {
                        GameLogic.ins.changeMap(UserVo.ins.points);
                    });
                }
            }
        }
        if (this.role && !this.role.isDie && this._pkRole && this._pkRole.isDie && !this.revivaling) {
            this.revivaling = true;
            egret.setTimeout(function () {
                ViewManager.ins().open(FightResultWin, 1, function () {
                    PVPMgr.ins().pVPFightEnd(true);
                });
            }, this, 2000);
        }
    };
    /**
     * 回收怪物对象
     */
    GameLogic.prototype.receiveMonster = function (monster) {
        if (monster.parent) {
            monster.parent.removeChild(monster);
        }
        if (!monster.isDie) {
            monster.die();
        }
        var index = this._monsterls.indexOf(monster);
        if (index != -1) {
            this._monsterls.splice(index, 1);
            this._monsterPooling.push(monster);
        }
    };
    GameLogic.prototype.changeMap = function (id, inFb, s) {
        var _this = this;
        if (id === void 0) { id = 0; }
        if (inFb === void 0) { inFb = false; }
        if (s === void 0) { s = true; }
        GameLogic.GAME_STATUS = 1;
        if (!s) {
            if (Human.ins && !Human.ins.isDie)
                Human.ins.playActionType(ActionType.STAND);
            GameMap.ins().stopShake();
            DataEventDispatcher.dispatchEventWith(GameEvent.MONSTER_COUNT_CHANGE, -2);
            this.md = [id, inFb];
            //第一次进地图 -  副本里跳转以及跳出  竞技场跳出
            if (!GameMap.ins().inFBMap && !GameMap.ins().inJJCMap) {
                var ov = !this.mc || !this.mc.isComplete;
                if (!this.mc) {
                    this.mc = new clips.BmpClip();
                    ModelResMgr.getOtherEffect(10041, this.mc);
                    this.mc.addEventListener(egret.Event.COMPLETE, function () {
                        _this.mc.gotoAndStop(1);
                        if (_this.mc.parent)
                            _this.mc.parent.removeChild(_this.mc);
                        _this.changeMap(_this.md[0], _this.md[1], true);
                        _this.md = null;
                    }, this);
                }
                if (ov)
                    this.changeMap(id, inFb, true);
                else {
                    Human.ins.addChildAt(this.mc, 0);
                    this.mc.play(1);
                }
            }
            else
                this.changeMap(id, inFb, true);
        }
        else {
            this.skillMonster = 0;
            if (this.role) {
                this.role.sleep = true;
                this.role.visible = false;
            }
            this.clearScene();
            if (!GameMap.ins().gotoScene(id, inFb))
                throw new Error("地图切换失败!");
            else {
                if (id == ConfigMgr.gameConfig["globalConfig"].jjcID) {
                    if (this.pkE) {
                        this.createPk(this.pkE, true);
                        this.pkE = null;
                    }
                }
            }
        }
    };
    GameLogic.prototype.initModel = function (e, s) {
        var _this = this;
        if (s === void 0) { s = false; }
        egret.log("地图切换成功！");
        //设置关卡进度条
        if (!s) {
            DataEventDispatcher.dispatchEventWith(GameEvent.MONSTER_COUNT_CHANGE, GameMap.ins().onHookMap ? 0 : -2);
            this.revivaling = false;
            if (!this.role) {
                this.role = new Human(ActorRace.HUMAN, AiType.HUMAN);
                Human.ins = this.role;
                this.role.setBodyId(ConfigMgr.gameConfig["globalConfig"].body[UserVo.ins.jobId - 1][UserVo.ins.sex - 1]);
                this.role.setModelData(UserVo.ins);
                GameMap.ins().addActor(this.role);
                DataEventDispatcher.dispatchEventWith(GameEvent.INIT_ROLE);
                RemindMgr.ins();
            }
            var vo = MapVo.ins;
            var dx = Math.floor(Math.random() * vo.bornPoint.length);
            var po = vo.bornPoint[dx];
            this.role.start();
            this.role.revival();
            this.role.setPosition(po.x, po.y);
            var ov = !this.mc1 || !this.mc1.isComplete;
            if (!this.mc1) {
                this.mc1 = clips.BmpClip.create();
                ModelResMgr.getOtherEffect(10040, this.mc1);
                this.mc1.addEventListener(egret.Event.COMPLETE, function () {
                    _this.mc1.gotoAndStop(1);
                    if (_this.mc1.parent)
                        _this.mc1.parent.removeChild(_this.mc1);
                    _this.role.alpha = 1;
                    _this.initModel(null, true);
                }, this);
            }
            if (!ov) {
                this.role.alpha = 0;
                this.mc1.x = this.role.x;
                this.mc1.y = this.role.y - 300;
                LayerManager.mapLayer.addChild(this.mc1);
                this.mc1.play(1);
            }
            else
                this.initModel(null, true);
        }
        else {
            this.createMonsters();
            if (!GuideMgr._instance.openFistGuide)
                GameLogic.GAME_STATUS = 0;
            else {
                var d = new WelcomWin();
                var tw = egret.Tween.get(d);
                tw.to({ y: 0 }, 800, egret.Ease.bounceOut);
                LayerManager.UI_MainUI.addChild(d);
            }
        }
    };
    GameLogic.prototype.createPk = function (e, force) {
        if (force === void 0) { force = false; }
        if (!force) {
            this.pkE = e.data;
            ViewManager.ins().close(UIView);
            ViewManager.ins().close(PVPWin);
            GameLogic.ins.changeMap(ConfigMgr.gameConfig["globalConfig"].jjcID);
            return;
        }
        if (this._pkRolePooling.length > 0)
            this._pkRole = this._pkRolePooling.pop();
        else
            this._pkRole = new PKHuman(ActorRace.PK_ROLE, AiType.PK_ROLE);
        this._pkRole.sleep = true;
        var vo = new UserVo();
        vo.PK_ROLE_DATA(e);
        var c = ConfigMgr.gameConfig["globalConfig"];
        this._pkRole.setBodyId(c.body[vo.jobId - 1][vo.sex - 1]);
        this._pkRole.setModelData(vo);
        this._pkRole.revival();
        GameMap.ins().addActor(this._pkRole);
        var d = MapVo.ins;
        this._pkRole.setPosition(d.refreshPoint[0].x, d.refreshPoint[0].y);
    };
    GameLogic.prototype.clearScene = function () {
        if (this.role)
            this.role.stop();
        while (this._monsterls.length) {
            this._monsterls[0].destruct();
        }
        if (this._pkRole) {
            this._pkRole.destruct();
        }
    };
    GameLogic.prototype.createMonsters = function () {
        if (GameMap.ins().inJJCMap || GameLogic.GAME_STATUS == 1)
            return;
        var vo = MapVo.ins;
        var po = vo.refreshPoint[vo.refreshDx];
        if (!po)
            return;
        var mo;
        var len = GameMap.ins().inBossMap ? 1 : Math.floor(GameLogic.SKILL_MONSTER_COUNT / vo.refreshPoint.length);
        var po1;
        for (var i = 0; i < len; i++) {
            // po = arr[i];
            if (this._monsterPooling.length > 0 && egret.getTimer() - this._monsterPooling[0].receiveTime > 1000)
                mo = this._monsterPooling.shift();
            else
                mo = new Monster(ActorRace.MONSTER, AiType.MONSTER_1);
            var moData;
            if (!GameMap.ins().inFBMap)
                moData = ConfigMgr.gameConfig["monsterAttr"]["" + ConfigMgr.gameConfig["pointInfo"][UserVo.ins.points + ""]["difficultyFactor"]];
            else
                moData = ConfigMgr.gameConfig["partMonster"]["" + ConfigMgr.gameConfig["partInfo"][GameMap.ins().currMapID + ""]["difficultyFactor"]];
            var d = new MonsterVo(moData);
            mo.setBodyId(d.nid);
            po1 = MapVo.ins.mapUNMarkNode(po.x, po.y);
            mo.setPosition(po1.x, po1.y);
            mo.setModelData(d);
            mo.sleep = false;
            mo.addActionQueue(ActionType.STAND);
            GameMap.ins().addActor(mo);
            this._monsterls.push(mo);
        }
        // MapVo.ins.autoChangeDX();
    };
    GameLogic.prototype.getActorsByType = function (type) {
        var ls = new Array();
        if (type == ActorRace.MONSTER || type == ActorRace.ALL)
            ls = ls.concat(this._monsterls);
        if (type == ActorRace.HUMAN || type == ActorRace.ALL)
            ls = ls.concat(this.role);
        if ((type == ActorRace.PK_ROLE || type == ActorRace.ALL) && this._pkRole)
            ls = ls.concat(this._pkRole);
        return ls;
    };
    /**
     * 判断节点是否有固定的实体占位
     */
    GameLogic.prototype.checkTargetCanStay = function (target) {
        var i, actor;
        var actors = this.getActorsByType(ActorRace.ALL);
        actors = this.checkHitTargets(target.currentX, target.currentY, { w: 0, h: 0, type: 1 }, actors);
        for (i = 0; i < actors.length; i++) {
            actor = actors[i];
            if (actor != target && !actor.isMoving) {
                return false;
            }
        }
        return true;
    };
    /**
     * 获取范围内的目标
     */
    GameLogic.prototype.checkHitTargets = function (nx, ny, obj, ls, dir, attacker) {
        var targets = new Array();
        if (obj instanceof StdSkillRange && obj.type == -1)
            return targets;
        var i, actor;
        var width = obj.w;
        var height = obj.h;
        var g = obj.g;
        var c = obj.c;
        if (obj.type == 1) {
            var rect = new egret.Rectangle(nx - width, ny - height, width * 2, height * 2);
            for (i = ls.length - 1; i >= 0; i--) {
                actor = ls[i];
                if (!actor.isDie && rect.contains(actor.currentX, actor.currentY)) {
                    ls.splice(i, 1);
                    targets.push(actor);
                }
            }
        }
        else if (obj.type == 0) {
            for (i = ls.length - 1; i >= 0; i--) {
                actor = ls[i];
                if (!actor.isDie) {
                    var contains = false;
                    var po = DisplayMapObject.DIR_LS[dir];
                    for (var z = 0; z <= g; z++) {
                        if (actor.currentX == nx + po.x * z && actor.currentY == ny + po.y * z) {
                            contains = true;
                            break;
                        }
                    }
                    if (contains) {
                        ls.splice(i, 1);
                        targets.push(actor);
                    }
                }
            }
        }
        else {
            for (i = ls.length - 1; i >= 0; i--) {
                actor = ls[i];
                if (!actor.isDie) {
                    if (attacker.distance(actor) <= g) {
                        ls.splice(i, 1);
                        targets.push(actor);
                    }
                }
            }
        }
        return targets;
    };
    GameLogic.prototype.skillHitTarget = function (skill, user, target) {
        var i;
        var targetX;
        var targetY;
        //检测技能是否需要目标   需要目标以目标为中心点范围、不需要目标的则以人物为中心点范围伤害
        if (skill.needTarge) {
            targetX = target.currentX;
            targetY = target.currentY;
        }
        else {
            targetX = user.currentX;
            targetY = user.currentY;
        }
        var hitVo;
        if (skill.sceneEffect.length > 0) {
            var hasMissile = false;
            for (i = 0; i < skill.sceneEffect.length; i++) {
                hitVo = skill.sceneEffect[i];
                var effect = DisplayMapEffect.create();
                GameMap.ins().addActor(effect);
                if (skill.sceneEffect[i].type == SkillVo.SKILL_EFF_TYPE_1) {
                    if (!target)
                        throw new Error("配置错误!");
                    hasMissile = true;
                    effect.setEndHandle(skill, user, target);
                    effect.setPosition(user.currentX, user.currentY);
                    effect.playEffect(skill.sceneEffect[i].effect, hitVo.times, hitVo.keepTime, hitVo.flag);
                    effect.moveTo(targetX, targetY, hitVo.speed);
                    this._sceneEffects.push(effect);
                }
                else {
                    effect.setPosition(targetX, targetY);
                    effect.playEffect(skill.sceneEffect[i].effect, hitVo.times, hitVo.keepTime, hitVo.flag);
                    effect.moveTo(targetX, targetY, 0);
                    this._sceneEffects.push(effect);
                }
            }
            if (!hasMissile) {
                if ((target instanceof BaseActor) && skill.singleAttack)
                    this.SkillHitActorEffect(skill, user, target);
                else
                    this.SkillHitActorEffect(skill, user, targetX, targetY, target);
            }
        }
        else {
            if ((target instanceof BaseActor) && skill.singleAttack)
                this.SkillHitActorEffect(skill, user, target);
            else
                this.SkillHitActorEffect(skill, user, targetX, targetY, target);
        }
    };
    GameLogic.prototype.SkillHitActorEffect = function (skill, user) {
        var _this = this;
        var arg = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arg[_i - 2] = arguments[_i];
        }
        var targetX, targetY, target;
        var targets = new Array();
        var l;
        if (arg.length != 1) {
            targetX = Number(arg[0]);
            targetY = Number(arg[1]);
            l = arg[2];
        }
        else {
            targets.push(arg[0]);
            l = arg[0];
        }
        if (targets.length == 0)
            targets = this.checkHitTargets(targetX, targetY, skill.skillRange, user.getEnemy(), user.direction, user);
        var i;
        var ls = skill.unMissileEffects;
        var s;
        var hitVo;
        for (i = 0; i < ls.length; i++) {
            hitVo = ls[i];
            switch (hitVo.type) {
                case SkillVo.SKILL_EFF_TYPE_0:
                    if (ls[i].targeType == 0) {
                        if (hitVo.keepTime != -1)
                            user.playEffect(hitVo.effect, hitVo.times, this.gameRunTick + hitVo.keepTime, hitVo.flag == 1 ? skill.dir : -1);
                        else
                            user.playEffect(hitVo.effect, hitVo.times, -1, hitVo.flag == 1 ? skill.dir : -1);
                    }
                    else {
                        if (hitVo.keepTime != -1)
                            this.addEffectToTargets(targets, hitVo.effect, hitVo.times, this.gameRunTick + hitVo.keepTime, hitVo.flag == 1 ? skill.dir : -1, l);
                        else
                            this.addEffectToTargets(targets, hitVo.effect, hitVo.times, -1, hitVo.flag == 1 ? skill.dir : -1, l);
                    }
                    break;
            }
        }
        var len = targets.length;
        var ratio = 1;
        for (i = 0; i < targets.length; i++) {
            ratio = 1;
            if (skill.HitNum && skill.HitNum.length > 1) {
                if (skill.HitNum[i + 1])
                    ratio = parseInt(skill.HitNum[i + 1]) / 100;
            }
            this.hurtActor(skill, user, targets[i], ratio);
        }
        //循环还有目标没死亡的话、再次攻击
        var n = skill.multipleAttack - len;
        while (n > 0 && targets.length > 0) {
            for (i = targets.length - 1; i >= 0; i--) {
                if (n <= 0)
                    break;
                if (targets[i].isDie) {
                    targets.splice(i, 1);
                }
                else {
                    len++;
                    ratio = 1;
                    if (skill.HitNum && skill.HitNum.length > 1) {
                        if (skill.HitNum[len])
                            ratio = parseInt(skill.HitNum[len]) / 100;
                    }
                    this.hurtActor(skill, user, targets[i], ratio, false);
                    n--;
                }
            }
        }
        if (GameMap.ins().onHookMap) {
            if (this.skillMonster >= GameLogic.SKILL_MONSTER_COUNT && GameLogic.GAME_STATUS != 1) {
                if (ConfigMgr.gameConfig["pointInfo"][(UserVo.ins.points + 1) + ""]) {
                    if (ConfigMgr.gameConfig["pointInfo"][(UserVo.ins.points + 1) + ""].maptype == MapType.TYPE_1) {
                        DataEventDispatcher.dispatchEventWith(GameEvent.MONSTER_COUNT_CHANGE, -1);
                        return;
                    }
                }
                GameLogic.GAME_STATUS = 1;
                // UserVo.ins.points ++;
                this.clearScene();
                HttpMgr.ins.sendMessage(ClientPacket.S_10004, {}, ServerPacket.LOGIC_URL);
                // this.changeMap(UserVo.ins.points);
            }
        }
        else if (GameMap.ins().inBossMap) {
            if (this.skillMonster >= 1 && GameLogic.GAME_STATUS != 1) {
                GameLogic.GAME_STATUS = 1;
                var obj = ConfigMgr.gameConfig["pointInfo"][GameMap.ins().currMapID];
                var arr = MoneyUtils.getMoneyData(obj);
                ViewManager.ins().open(FightResultWin, 3, function () {
                    _this.clearScene();
                    HttpMgr.ins.sendMessage(ClientPacket.S_10004, {}, ServerPacket.LOGIC_URL);
                }, obj.item, arr);
                // UserVo.ins.points ++;
                // this.changeMap(UserVo.ins.points);
            }
        }
        //添加自身BUFF
        if (skill.stdSkill.skill_id != SkillMgr.COMMON_SKILL_ID) {
            var data = skill.skillHit;
            var hitArr;
            var dir;
            if (data) {
                var buff;
                for (i = 0; i < data.length; i++) {
                    hitArr = data[i].split(":");
                    if (parseInt(hitArr[1]) != ComAttribute.critRatePCT && parseInt(hitArr[1]) != ComAttribute.sprint) {
                        if (skill.stdSkill.duration != "0") {
                            if (hitArr[0] == "0") {
                                buff = BuffVo.create(parseInt(hitArr[1]), parseInt(hitArr[2]));
                                buff.endTime = this.gameRunTick + (skill.stdSkill.duration * 1000) + 1;
                                user.addBuff(buff);
                            }
                            else
                                throw new Error("持续buff作用敌人!");
                        }
                    }
                }
            }
        }
    };
    GameLogic.prototype.hurtActor = function (skill, attacker, target, ratio, first) {
        if (first === void 0) { first = true; }
        var attackerInfo = attacker["actorVo"]["playerAttrInfo"];
        var targetInfo = target["actorVo"]["playerAttrInfo"];
        var isCrit = attackerInfo["critRate"] == 0 ? false : Math.random() * 100 < attackerInfo["critRate"];
        var hurtVal = 0;
        var coefficient = 1;
        if (target.nRace == ActorRace.MONSTER)
            coefficient = target["actorVo"]["difficultyFactor"];
        else if (attacker.nRace == ActorRace.MONSTER)
            coefficient = attacker["actorVo"]["difficultyFactor"];
        else
            coefficient = 2000;
        var buff;
        var i, j;
        if (skill.stdSkill.skill_id != SkillMgr.COMMON_SKILL_ID) {
            var data = skill.skillHit;
            var hitVo;
            var dir;
            if (data) {
                for (i = 0; i < data.length; i++) {
                    hitVo = data[i].split(":");
                    switch (parseInt(hitVo[1])) {
                        case ComAttribute.hurt:
                            if (hitVo[0] == "1")
                                hurtVal += parseInt(hitVo[2]);
                            else
                                throw new Error("ComAttribute.hurt");
                            break;
                        case ComAttribute.giddyPCT://眩晕
                            if (hitVo[0] == "1") {
                                buff = BuffVo.create(ComAttribute.giddyPCT, 0);
                                buff.endTime = parseInt(hitVo[2]) * 1000 + this.gameRunTick;
                                target.addBuff(buff);
                            }
                            else
                                throw new Error("ComAttribute.hurt");
                            break;
                        case ComAttribute.critRatePCT://添加暴击率  重新随机下暴击
                            if (hitVo[0] == "0")
                                isCrit = attackerInfo["critRate"] == 0 ? false : Math.random() * 100 < (attackerInfo["critRate"] * (1 + parseInt(hitVo[2]) / 100));
                            else
                                throw new Error("ComAttribute.critRatePCT");
                            break;
                        case ComAttribute.frost://冰冻
                            if (hitVo[0] == "1") {
                                buff = BuffVo.create(ComAttribute.frost, 0);
                                buff.endTime = parseInt(hitVo[2]) * 1000 + this.gameRunTick;
                                target.addBuff(buff);
                            }
                            else
                                throw new Error("ComAttribute.hurt");
                            break;
                        case ComAttribute.sprint://冲锋
                            if (hitVo[0] == "0") {
                                dir = attacker.countTargetDirection(target, attacker.direction); //面向目标
                                attacker.sprint(dir, skill.skillRange.g, target, parseInt(hitVo[2]));
                            }
                            else
                                throw new Error("ComAttribute.sprint");
                            break;
                        case ComAttribute.hurtPCT://掉血百分比
                            if (hitVo[0] == "1")
                                hurtVal += targetInfo["blood"] * parseInt(hitVo[2]) / 100;
                            else
                                throw new Error("ComAttribute.hurtPCT");
                            break;
                    }
                }
            }
            var percentAttack;
            if (skill.stdSkill.percentAttack != "" && skill.stdSkill.percentAttack != "0") {
                percentAttack = skill.stdSkill["percentAttack"].split(":");
                var attribute = percentAttack[0] == "1" ? attackerInfo["attackInit"] : attackerInfo["magicAttack"];
                switch (percentAttack[1]) {
                    case "1":
                        //伤害值=（物理攻击*（1+攻击伤害增加）*技能伤害比值）*（1+技能伤害增加）*（1-伤害减免）*（1-魔法防御值/（难度系数/5+魔法防御值））+技能附加伤害值
                        hurtVal += (attackerInfo["attackInit"] * (1 + attackerInfo["attackDamage"]) * parseInt(percentAttack[2]) / 100) *
                            (1 + attackerInfo["akillDamage"]) * (1 - targetInfo["damageReduction"]) * (1 - targetInfo["magicArmorInit"] /
                            (coefficient * 5 + targetInfo["magicArmorInit"]));
                        break;
                    case "2":
                        //伤害值=魔法攻击*技能伤害比值*（1+技能伤害增加）*（1-伤害减免）*（1-魔法防御值/（难度系数/5+魔法防御值））+技能附加伤害值
                        hurtVal += attackerInfo["magicAttack"] * parseInt(percentAttack[2]) / 100 * (1 + attackerInfo["attackDamage"])
                            * (1 - targetInfo["magicArmorInit"] / (coefficient * 5 + targetInfo["magicArmorInit"]));
                        break;
                    default:
                        //伤害值=（魔法攻击*技能伤害比值））*（1+技能伤害增加）*（1+当前属性效果增加提升比值）*（1+被动技能对应属性提升比例）*
                        //（1+BUFF技能对应属性提升比例）*（1-伤害减免）*（1-属性防御百分比）*（1-魔法防御值/（难度系数/5+魔法防御值））+技能附加伤害值
                        hurtVal += attribute * parseInt(percentAttack[2]) / 100 * (1 + attackerInfo["akillDamage"]) * (1 + PbPlayerAttrInfo.getSpecialAttr(attackerInfo, parseInt(percentAttack[1])))
                            * (1 - targetInfo["damageReduction"]) * (1 - targetInfo["magicArmorInit"] / (coefficient * 5 + targetInfo["magicArmorInit"]))
                            * (1 - PbPlayerAttrInfo.getSpecialAttr(targetInfo, parseInt(percentAttack[1]), true)) * attackerInfo["propertyPCT"];
                        break;
                }
            }
            hurtVal = Math.floor(hurtVal);
            hurtVal = hurtVal * (isCrit ? attackerInfo["critDamage"] / 100 : 1);
        }
        else {
            //伤害=（物理攻击*（1+攻击伤害增加）*（1-物理防御值/（难度系数*5+物理防御值）)）*（1-伤害减免）*暴击伤害
            hurtVal += (attackerInfo["attackInit"] * (1 + attackerInfo["attackDamage"]) * (1 - Math.ceil(targetInfo["armorInit"]) /
                (coefficient * 5 + Math.ceil(targetInfo["armorInit"])))) * (1 - targetInfo["damageReduction"]) * (isCrit ? attackerInfo["critDamage"] / 100 : 1);
            hurtVal += attackerInfo["bonusDamage"];
            hurtVal = Math.floor(hurtVal);
            // hurtVal =  hurtVal == 0? 50:hurtVal;
        }
        hurtVal = Math.floor(hurtVal * ratio);
        if (skill.stdSkill.sustainHP && skill.stdSkill.sustainHP != "" && skill.stdSkill.sustainHP != "0") {
            var s;
            var endT;
            data = skill.stdSkill["sustainHP"].split("#");
            for (i = 0; i < data.length; i++) {
                hitVo = data[i].split(":");
                switch (hitVo[0]) {
                    case "0"://自己持续加血
                        {
                            throw new Error("持续加血功能、需要检测！");
                            buff = BuffVo.create(BuffType.SUSTAIN_HP, parseInt(hitVo[1]));
                            s = hitVo[3].split(",");
                            endT = this.gameRunTick;
                            if (s.length != parseInt(hitVo[2]))
                                throw new Error("持续BUFF的间隔时间数量跟触发次数不搭!");
                            for (j = 0; j < s.length; j++) {
                                endT += parseInt(s[j]);
                                buff.interval.push(endT);
                            }
                            buff.endTime = endT + 1;
                            attacker.addBuff(buff);
                            break;
                        }
                    case "1":
                        {
                            buff = BuffVo.create(BuffType.SUSTAIN_HP, hurtVal * parseInt(hitVo[1]));
                            s = hitVo[3].split(",");
                            endT = this.gameRunTick;
                            if (s.length != parseInt(hitVo[2]))
                                throw new Error("持续BUFF的间隔时间数量跟触发次数不搭!");
                            for (j = 0; j < s.length; j++) {
                                endT += parseInt(s[j]);
                                buff.interval.push(endT);
                            }
                            buff.endTime = endT + 1;
                            target.addBuff(buff);
                            break;
                        }
                }
            }
        }
        if (Human.WU_DI == 2 || Human.WU_DI == 3)
            hurtVal = 9999999999;
        //目标无敌BUFF
        if (target.getBuffByType(ComAttribute.invincible))
            egret.log("对方无敌....");
        else {
            // if(hurtVal != 16 && hurtVal != 92 && hurtVal != 184)
            // {
            target.addHp(-hurtVal);
            CutHpEffect.playHp(-Math.floor(hurtVal), target, isCrit ? 1 : 0, 0, first ? 0 : -120);
            // }
        }
        //反伤BUFF
        if (target.getBuffByType(ComAttribute.thornsPCT)) {
            egret.log("对方有反伤BUFF...");
            attacker.addHp[-hurtVal * buff.value / 100];
        }
        //吸血BUFF
        if (attacker.getBuffByType(ComAttribute.leechPCT)) {
            egret.log("自带吸血BUFF....");
            attacker.addHp(Math.pow(attackerInfo["blood"], buff.value) / 100);
        }
        // if(attacker.nRace == ActorRace.HUMAN)
        //      egret.log("目标伤害:",hurtVal,target.isDie,skill.stdSkill.name);
        if (target.isDie) {
            this.skillMonster++;
            DataEventDispatcher.dispatchEventWith(GameEvent.MONSTER_COUNT_CHANGE, this.skillMonster);
        }
    };
    /**
     * 给命中的对象添加特效
     */
    GameLogic.prototype.addEffectToTargets = function (targets, effectId, times, keepTime, flag, l) {
        var i, target;
        for (i = 0; i < targets.length; i++) {
            target = targets[i];
            // if(l == target)
            target.playEffect(effectId, times, keepTime, flag);
        }
    };
    GameLogic.prototype.receivePkHuman = function () {
        if (this._pkRole) {
            this._pkRolePooling.push(this._pkRole);
            this._pkRole = null;
        }
    };
    GameLogic.AUTO_FIGHT = true;
    GameLogic.GAME_STATUS = 0; //0正常、1跳关中
    GameLogic.SKILL_MONSTER_COUNT = 20;
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map