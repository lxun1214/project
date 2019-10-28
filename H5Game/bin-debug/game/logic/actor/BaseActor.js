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
 * 基础角色
 * 实现各种朝向的动作
 *
 */
var BaseActor = (function (_super) {
    __extends(BaseActor, _super);
    function BaseActor(race, aiRate) {
        var _this = _super.call(this) || this;
        _this.handleId = 0;
        _this.selected = 0; //是否被选择
        _this.distanceByTarget = Number.MAX_VALUE; //与目标的距离
        _this.nBodyid = 0; //模型id
        _this.nWeaponId = 0; //武器
        _this.nWingId = 0; //翅膀
        _this.nMoveSpeed = 300; //移动速度,移动一格所需要的毫秒
        _this.nActionSpeed = 250; //500;//动作速度
        _this.nAttackSpeed = 500; //攻击速度
        _this.nReadySpeed = 0; //攻击停留时间
        _this.nDie = false;
        _this._sleep = true; //是否挂起
        _this.canBeAttacked = true; //是否可以攻击
        _this.nTargeter = null; //攻击的目标
        _this.nLockTarget = null; //锁定的目标
        _this.nDirection = 0; //朝向，顺时针0-7八个方向
        _this._delayShow = -1; //延迟显示
        _this.receiveTime = 0; //回收时间
        /**
         * 调换层级
         */
        _this._dirLayerList = new Array();
        _this.nPlayingType = ActionType.STAND; //当前播放的类型
        _this.nActionTick = -1; //播放超时
        _this.readytime = 0;
        _this.delayHitHandle = -1;
        _this.delayFilters = 0;
        _this.targetHandle = 0;
        _this.globalPosition = new egret.Point(0, 0);
        _this.rect = new egret.Rectangle();
        _this.mabiArr = [];
        _this.skills = [];
        _this.useingSkill = [];
        _this.nShadow = new eui.Image();
        _this.nShadow.source = ResMgr.getGameOtherPng("shadow");
        _this.nShadow.x = -46;
        _this.nShadow.y = -32;
        _this.addChild(_this.nShadow);
        _this.nRace = race;
        _this.nAIRate = aiRate;
        _this.direction = 0;
        _this.nTargetPoint = new egret.Point(-1, -1);
        _this.nEffectlst = new Array();
        _this.nActionTypeQueue = new Array();
        _this.nActionEffectQueue = new Array();
        _this.effectQueueParm = [];
        _this.nBuffs = new Array();
        if (!_this.nBodyclip) {
            _this.nBodyclip = new clips.BmpClip();
        }
        _this.nHPBar = new ActorHPBar();
        _this.nHPBar.y = -109;
        _this.nWeaponclip = clips.BmpClip.create();
        _this.nWingclip = clips.BmpClip.create();
        _this.addChild(_this.nBodyclip);
        _this.addChild(_this.nHPBar);
        _this.addChild(_this.nWeaponclip);
        _this.addChild(_this.nWingclip);
        _this.switchDirIndex();
        return _this;
    }
    Object.defineProperty(BaseActor.prototype, "moveSpeed", {
        get: function () {
            return this.nMoveSpeed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseActor.prototype, "sleep", {
        get: function () {
            return this._sleep;
        },
        /**
         * 设置睡眠
         */
        set: function (value) {
            this._sleep = value;
            if (this._sleep) {
                if (this.nPlayingType != ActionType.DIE)
                    this.playActionType(ActionType.STAND);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 重写设置坐标
     */
    BaseActor.prototype.setPosition = function (nx, ny) {
        _super.prototype.setPosition.call(this, nx, ny);
        this.syncMapPosition();
    };
    /**
     * 移除所有特效
     */
    BaseActor.prototype.removeAllEffects = function () {
        var clip;
        while (this.nEffectlst.length) {
            clip = this.nEffectlst.pop();
            clip.stop();
            if (clip == this.actionEff)
                this.actionEff = null;
            clip.destruct();
        }
        this.nActionEffectQueue.length = 0;
        this.effectQueueParm.length = 0;
    };
    BaseActor.prototype.initBaseActor = function (create) {
        if (create === void 0) { create = true; }
        if (create) {
            BaseActor.handleSeed++;
            this.handleId = BaseActor.handleSeed;
        }
        for (var i = this.nBuffs.length - 1; i >= 0; i--) {
            this.removeBuff(i);
        }
        this.nBuffs.length = 0;
        if (!this.nBodyclip) {
            this.nBodyclip = new clips.BmpClip();
        }
        this.selected = 0;
        this.nDie = false;
        this.nSelectdSkill = null;
        this.nTargeter = null;
        this.nLockTarget = null;
        this.nTargetX = undefined;
        this.nTargetY = undefined;
        this.nPlayingType = "";
        this.nBodyclip.alpha = 1;
        this.nActionTypeQueue.length = 0;
        this.removeAllEffects();
        this.nBodyclip.addEventListener(egret.Event.LOOP_COMPLETE, this.playNextAction, this);
        this.nBodyclip.addEventListener(egret.Event.COMPLETE, this.playNextAction, this);
        this.addChild(this.nBodyclip);
        this.addChild(this.nHPBar);
        this.addChild(this.nWeaponclip);
        this.addChild(this.nWingclip);
        this.switchDirIndex();
    };
    BaseActor.getDefaultBody = function () {
        if (!BaseActor._defaultBody) {
            var texture = RES.getRes("LoadingDefaultBody");
            var data = new Object();
            data["res"] = { "0": { x: 0, y: 0, w: texture.textureWidth, h: texture.textureHeight } };
            var mov = {
                frames: [{ res: "0", x: -texture.textureWidth / 2, y: -texture.textureHeight }],
                labels: [],
                frameRate: "12"
            };
            data["mc"] = { mov_1: mov };
            var json = JSON.parse(JSON.stringify(data));
            var mcDataFactory = new egret.MovieClipDataFactory(json, texture);
            BaseActor._defaultBody = mcDataFactory.generateMovieClipData();
        }
        return BaseActor._defaultBody;
    };
    /**
     * 设置身体id
     */
    BaseActor.prototype.setBodyId = function (value) {
        if (this.nBodyid == value)
            return;
        this.nBodyid = value;
        this.renderAction(this.nPlayingType);
    };
    /**
     * 设置武器
     */
    BaseActor.prototype.setWeaponId = function (id) {
        if (id == this.nWeaponId)
            return;
        this.nWeaponId = id;
    };
    /**
     * 设置翅膀
     */
    BaseActor.prototype.setWingId = function (id) {
        if (id == this.nWingId)
            return;
        this.nWingId = id;
    };
    Object.defineProperty(BaseActor.prototype, "direction", {
        get: function () {
            return this.nDirection;
        },
        /**
         * 设置朝向
         */
        set: function (value) {
            if (this.nDirection != value) {
                this.nDirection = value;
                this.renderAction(this.nPlayingType);
                this.switchDirIndex();
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseActor.prototype.switchDirIndex = function () {
        var dir = BaseActor.lrDirs[this.direction];
        switch (this.direction) {
            // case 1:
            // case 7:
            case 6:
            case 2:
                this._dirLayerList[0] = this.nBodyclip;
                this._dirLayerList[1] = this.nWeaponclip;
                this._dirLayerList[2] = this.nWingclip;
                break;
            case 1:
            case 7:
                this._dirLayerList[0] = this.nWeaponclip;
                this._dirLayerList[1] = this.nBodyclip;
                this._dirLayerList[2] = this.nWingclip;
                break;
            case 0:
                this._dirLayerList[0] = this.nWeaponclip;
                this._dirLayerList[1] = this.nBodyclip;
                this._dirLayerList[2] = this.nWingclip;
                break;
            case 3:
            case 4:
            case 5:
                this._dirLayerList[0] = this.nWingclip;
                this._dirLayerList[1] = this.nBodyclip;
                this._dirLayerList[2] = this.nWeaponclip;
                break;
        }
        for (var i = 3; i >= 0; i--) {
            if (this._dirLayerList[i]) {
                if (this._dirLayerList[i] == this.nWingclip && this.nWingId <= 0) {
                    if (this.nWingclip.parent != null)
                        this.removeChild(this.nWingclip);
                }
                else
                    this.addChildAt(this._dirLayerList[i], 0);
            }
        }
        this.addChildAt(this.nShadow, 0);
        if (this.bottmEff)
            this.addChildAt(this.bottmEff, 1);
    };
    /**
     * 获取模型
     */
    BaseActor.prototype.getBodyModel = function (index, part) {
        ModelResMgr.getHumanModel(index, this.nBodyclip, part);
    };
    /*
     * 根据动作类型播放动画
     */
    BaseActor.prototype.formatActDir = function (type, dir) {
        // if(type == ActionType.DIE)
        // {
        //     return String(ActionType.getAct(type)) + 1;
        // }else
        // {
        return ActionType.getAct(type) + dir.toString();
        // }
    };
    BaseActor.prototype.renderAction = function (type, refresh) {
        if (refresh === void 0) { refresh = false; }
        if (type == ActionType.READY) {
            this.readytime = GameLogic.ins.gameRunTick + this.nReadySpeed;
            this.nBodyclip.playLoopTime = this.nActionSpeed;
            type = ActionType.STAND;
        }
        this.nPlayingType = type;
        if (type == ActionType.WALK || type == ActionType.RUN || this.nTargeter == undefined) {
        }
        else if (this.nTargeter) {
            this.direction = this.countAngle(this.nTargeter, this.direction);
        }
        var dir = BaseActor.lrDirs[this.direction];
        var part = this.formatActDir(type, dir);
        if (type == ActionType.ATTACK88) {
            this.nBodyclip.stop();
            this.nBodyclip.visible = false;
        }
        else {
            this.nBodyclip.visible = true;
            if (this.nBodyid) {
                if (type == ActionType.DIE) {
                    this.getBodyModel(10026, "");
                    this.nBodyclip.alpha = 0.5;
                }
                else
                    this.getBodyModel(this.nBodyid, part);
            }
            if (!this.nBodyclip.isComplete) {
                this.nBodyclip.movieClipData = BaseActor.getDefaultBody();
            }
            this.nBodyclip.play(-1);
        }
        var scalex = 1;
        if (this.nRace == ActorRace.MONSTER && BaseActor.smId.indexOf(this.nBodyid) == -1) {
            if (type == ActionType.FIGHT) {
                if (this.direction >= 4) {
                    scalex = -Math.abs(this.nBodyclip.scaleX);
                }
                else {
                    scalex = Math.abs(this.nBodyclip.scaleX);
                }
            }
            else {
                if (this.direction > 0 && this.direction < 4)
                    scalex = -Math.abs(this.nBodyclip.scaleX);
                else
                    scalex = Math.abs(this.nBodyclip.scaleX);
            }
        }
        else {
            if (this.direction >= 4) {
                scalex = -Math.abs(this.nBodyclip.scaleX);
            }
            else {
                scalex = Math.abs(this.nBodyclip.scaleX);
            }
        }
        this.nBodyclip.setScaleX(scalex);
        if (!refresh) {
            this.nActionTick = GameLogic.ins.gameRunTick + this.nBodyclip.playLoopTime;
        }
        if (this.nActionTick == -1) {
            this.nActionTick = GameLogic.ins.gameRunTick + this.nActionSpeed;
        }
        if (this.nWeaponId) {
            this.nWeaponclip.playLoopTime = this.nBodyclip.playLoopTime;
            this.nWeaponclip.setScaleX(scalex);
            this.getWeaponModel(this.nWeaponId, part);
            this.nWeaponclip.play(-1);
        }
        if (this.nWingId) {
            this.nWingclip.playLoopTime = this.nBodyclip.playLoopTime;
            this.nWingclip.setScaleX(scalex);
            this.getWingModel(this.nWingId, part);
            this.nWingclip.play(-1);
        }
        this.switchDirIndex();
    };
    /**
     * 获取武器模型
     * @param index
     * @param part
     */
    BaseActor.prototype.getWeaponModel = function (index, part) {
        ModelResMgr.getWeaponModel(index, this.nWeaponclip, part);
    };
    /**
     * 加载翅膀模型
     */
    BaseActor.prototype.getWingModel = function (index, part) {
        ModelResMgr.getWingModel(index, this.nWingclip, part);
    };
    /**
     * 指定播放动作
     */
    BaseActor.prototype.playActionType = function (type) {
        this.renderAction(type);
        this.nActionTypeQueue.length = 0;
        this.nActionEffectQueue.length = 0;
        this.effectQueueParm.length = 0;
    };
    /*
     * 上一动作完成自动从动作缓冲区读取下一个动作
     *
     */
    BaseActor.prototype.playNextAction = function (evt) {
        if (this.mabiArr.length != 0)
            return;
        if (this._sprintTarget != undefined) {
            return;
        }
        if (this.nActionTypeQueue.length) {
            var act = this.nActionTypeQueue.shift();
            if (this.nPlayingType == ActionType.DIE || this.isDie) {
                this.sendDie();
            }
            else if (this.nActionTypeQueue.length > 0) {
                this.renderAction(this.nActionTypeQueue[0]);
                if (this.nActionEffectQueue.length) {
                    var s = this.nActionEffectQueue.shift();
                    var obj = this.effectQueueParm.shift();
                    this.playEffect(s, 1, this.nAttackSpeed, obj.currDir, obj.nScaleX);
                }
                return; //如果是还有动作队列则不会触发AI
            }
            else if (this.onMoveing) {
                if (this.nRace == ActorRace.MONSTER) {
                    this.playActionType(ActionType.WALK);
                }
                else {
                    this.playActionType(ActionType.RUN);
                }
            }
            else {
                this.playActionType(ActionType.STAND);
            }
        }
        this.AI();
        if (this.nPlayingType == ActionType.DIE || this.isDie) {
            this.sendDie();
        }
    };
    /**
     * 发送死亡消息
     */
    BaseActor.prototype.sendDie = function () {
    };
    /*
     * 更新
     */
    BaseActor.prototype.update = function (tick) {
        this.triggerBuffResult(tick);
        if (this.m_JumpPoints != null) {
            if (!this.isMoving) {
                this.runJump();
                return;
            }
        }
        //移动
        this.processMove(tick);
        if (this.mabiArr.length != 0) {
            return;
        }
        //先判断一下是否已经达到技能命中时间
        // if(this.nCurrentSkill && this.nTargeter && tick - this.nCurrentSkill.prevUseTime > this.nCurrentSkill.getHitTime())
        // {
        //     this.skillHitTarget(this.targetHandle,this.nCurrentSkill);
        // }
        //判断动作播放是否超时
        if (this.nActionTick < tick && this.nActionTick > -1) {
            this.nActionTick = -1;
            this.playNextAction(null);
        }
        var i, clip, buff;
        //判断特效是否已经完成
        for (i = this.nEffectlst.length - 1; i >= 0; i--) {
            clip = this.nEffectlst[i];
            //trace("endEffect---",clip.lastPlayTimes);
            if (clip.lastPlayTimes == 0 || clip.onPlaying == false || (clip.endPlayloop > 0 && clip.endPlayloop < tick)) {
                this.nEffectlst.splice(i, 1);
                if (clip == this.actionEff)
                    this.actionEff = null;
                clip.destruct();
            }
        }
        this.readytime = tick >= this.readytime ? 0 : this.readytime;
        this.AI();
    };
    BaseActor.prototype.triggerBuffResult = function (tick) {
        var i, buff;
        var overTime = true;
        for (i = this.nBuffs.length - 1; i >= 0; i--) {
            buff = this.nBuffs[i];
            if (buff.endTime == 0)
                continue;
            if (tick > buff.endTime) {
                if (buff.triggerCount == buff.interval.length) {
                    this.removeBuff(i);
                    continue;
                }
            }
            //检测间隔触发的
            var total = 0;
            for (var j = buff.interval.length - 1; j >= 0; j--) {
                if (tick >= buff.interval[j]) {
                    total = j + 1;
                    break;
                }
            }
            while (buff.triggerCount != total) {
                switch (buff.type) {
                    case BuffType.SUSTAIN_HP:
                        this.addHp[buff.value];
                        break;
                    case ComAttribute.hurtPCT:
                        this.addHp[buff.value];
                        break;
                    default:
                        throw new Error("未知间隔BUFF类型!");
                        break;
                }
                total--;
            }
        }
    };
    BaseActor.prototype.addBuff = function (buff) {
        for (var i = 0; i > this.nBuffs.length; i++) {
            if (this.nBuffs[i].type == buff.type && this.nBuffs[i].value == buff.value &&
                this.nBuffs[i].hurtType == buff.hurtType) {
                this.nBuffs[i].endTime = buff.endTime;
                return;
            }
        }
        if (buff.interval.length == 0) {
            if (buff.type == ComAttribute.giddyPCT) {
                this.mabiArr.push(buff.handle);
                // CutHpEffect.playEffect("眩晕",0xFF00FF,this,0,-100);
                this.playActionType(ActionType.READY);
                return;
            }
            if (buff.type == ComAttribute.frost) {
                this.mabiArr.push(buff.handle);
                // CutHpEffect.playEffect("冰冻",0xFF00FF,this,0,-100);
                this.playActionType(ActionType.READY);
                return;
            }
            AttributeUtlis.BuffAttributeByTarge(buff, this["actorVo"], true);
        }
        this.nBuffs.push(buff);
    };
    /**
     * 移除buff
     * @param type
     */
    BaseActor.prototype.removeBuff = function (dx, handle) {
        var buff;
        if (!handle)
            buff = this.nBuffs[dx];
        else {
            for (var i = 0; i < this.nBuffs.length; i++) {
                if (this.nBuffs[i].handle == handle) {
                    buff = this.nBuffs[i];
                    dx = i;
                    break;
                }
            }
        }
        if (!buff) {
            egret.log("BUFF移除失败!");
            return;
        }
        if (buff.interval.length == 0) {
            if (buff.type == ComAttribute.giddyPCT || buff.type == ComAttribute.frost)
                this.mabiArr.splice(this.mabiArr.indexOf(buff.handle), 1);
            else
                AttributeUtlis.BuffAttributeByTarge(buff, this["actorVo"], false);
        }
        buff.destruct();
        this.nBuffs.splice(dx, 1);
    };
    /*
     * 添加动作到动作缓冲器
     * 如果立即播放则返回true，否则返回false
     */
    BaseActor.prototype.addActionQueue = function (type) {
        if (type == ActionType.READY) {
            if (this.onMoveing) {
                if (this.nRace == ActorRace.MONSTER) {
                    type = ActionType.WALK;
                }
                else {
                    type = ActionType.RUN;
                }
            }
        }
        if ((type == ActionType.STAND || type == ActionType.READY) && this.nActionTypeQueue[0] == type) {
            return;
        }
        this.nActionTypeQueue.push(type);
        if (this.nActionTypeQueue.length <= 1) {
            this.renderAction(this.nActionTypeQueue[0]);
            return true;
        }
        return false;
    };
    Object.defineProperty(BaseActor.prototype, "currentActionType", {
        /**
         * 获取当前动作缓冲器里的动作
         */
        get: function () {
            if (this.nActionTypeQueue.length <= 0)
                return this.nPlayingType;
            return this.nActionTypeQueue[0];
        },
        enumerable: true,
        configurable: true
    });
    /*
     * 智能
     */
    BaseActor.prototype.AI = function () {
    };
    /**
     * 获取同伙
     */
    BaseActor.prototype.getAllys = function () {
        return new Array();
    };
    /**
     * 获取敌人列表
     */
    BaseActor.prototype.getEnemy = function () {
        return new Array();
    };
    /*
     * 死亡
     */
    BaseActor.prototype.die = function () {
        if (this.nDie)
            return;
        // this.hideTargetEffect();
        this.selected = 0;
        this.nDie = true;
        this.nActionTypeQueue.length = 0;
        this.playActionType(ActionType.DIE);
        this.endMove(false);
    };
    BaseActor.prototype.endMove = function (sync) {
        if (sync === void 0) { sync = true; }
        _super.prototype.endMove.call(this, sync);
        if (this._sprintTarget != undefined) {
            this._sprintTarget = undefined;
            this.setAttackTarget(undefined);
            //trace("结束冲刺---");
        }
        this.syncMapPosition();
    };
    Object.defineProperty(BaseActor.prototype, "isDie", {
        get: function () {
            return this.nDie;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseActor.prototype, "bodyFilters", {
        set: function (arr) {
            var _this = this;
            if (arr) {
                if (this.delayFilters != 0 && this.nBodyclip.filters != null)
                    return;
                this.nBodyclip.filters = arr;
                this.delayFilters = egret.setTimeout(function () {
                    _this.bodyFilters = null;
                    _this.delayFilters = 0;
                }, this, 500);
            }
            else {
                this.nBodyclip.filters = arr;
                if (this.delayFilters != 0)
                    egret.clearTimeout(this.delayFilters);
                this.delayFilters = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    /*
     * 销毁
     */
    BaseActor.prototype.destruct = function (gc) {
        if (gc === void 0) { gc = false; }
        this.sleep = true;
        this.bodyFilters = null;
        this.receive();
        if (gc) {
            this.nBodyclip.destruct();
            this.nBodyclip = null;
        }
    };
    BaseActor.prototype.receive = function () {
        this.mabiArr.length = this.skills.length = this.useingSkill.length = 0;
        this.m_JumpPoints = null;
        this.nTargeter = undefined;
        this.receiveTime = egret.getTimer();
        this.sleep = true;
        if (this.delayHitHandle != -1) {
            egret.clearTimeout(this.delayHitHandle);
            this.delayHitHandle = -1;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.nBodyclip.stop();
        this.nBodyclip.clearData();
        this.nWeaponclip.stop();
        this.nWeaponclip.clearData();
        this.nWingclip.stop();
        this.nWingclip.clearData();
        for (var i = this.nBuffs.length - 1; i >= 0; i--) {
            this.removeBuff(i);
        }
        this.nBuffs.length = 0;
        this.nActionTypeQueue.length = 0;
        this.removeAllEffects();
        this.nBodyclip.removeEventListener(egret.Event.LOOP_COMPLETE, this.playNextAction, this);
        this.nBodyclip.removeEventListener(egret.Event.COMPLETE, this.playNextAction, this);
    };
    BaseActor.prototype.jumpTo = function (X, Y, isStruckFly, maxTime) {
        if (isStruckFly === void 0) { isStruckFly = false; }
        if (maxTime === void 0) { maxTime = 10; }
        var nSamplingCount;
        var nActionTime;
        this.m_nJumpDestX = X;
        this.m_nJumpDestY = Y;
        //计算跳跃时间
        this.m_nJumpTime = Math.max(Math.abs(X - this.currentX) / BaseActor.DefaultJumpSpeed, Math.abs(Y - this.currentY) / BaseActor.DefaultJumpSpeed);
        nSamplingCount = this.m_nJumpTime * 2;
        if (this.m_nJumpTime > maxTime)
            this.m_nJumpTime = maxTime; //限制抛物线不超过1秒，否则速度太慢会引起Y轴曲线太高的问题
        nActionTime = this.m_nJumpTime * BaseActor.DefaultJumpUpInterval;
        this.m_dwJumpStartTick = GameLogic.ins.gameRunTick;
        this.m_nJumpUpInterval = nActionTime / nSamplingCount;
        var accY = 0;
        if (isStruckFly) {
            //				m_dwJumpStartTick += DefaultJumpUpInterval * 10;   //跳跃延迟一点,做出硬直效果
            //随机一个重力加速度,因为坐标系Y轴是相反的,所以g越大,飞的越高
            accY = Math.abs(this.currentX - X) * 6 + 20 * Math.random();
        }
        this.m_JumpPoints = Parabola.MakeParabolaPoints((this.currentX + 0.5) * DisplayMapObject.MAP_CELL_WIDE, (this.currentY + 0.5) * DisplayMapObject.MAP_CELL_HIDE, (X + 0.5) * DisplayMapObject.MAP_CELL_WIDE, (Y + 0.5) * DisplayMapObject.MAP_CELL_HIDE, this.m_nJumpTime, nSamplingCount, accY);
        this.m_nJumpPointIdx = 0;
        //跳跃开始时需同步设置角色位置，防止在跳跃期间发出寻路或移动指令而导致起点计算错误
        this.setPosition(X, Y);
        this.nTargetX = X;
        this.nTargetY = Y;
    };
    BaseActor.prototype.runJump = function () {
        var nIdx = Math.floor((GameLogic.ins.gameRunTick - this.m_dwJumpStartTick) / this.m_nJumpUpInterval);
        if (nIdx == this.m_nJumpPointIdx)
            return;
        if (isNaN(nIdx) || nIdx >= this.m_JumpPoints.length) {
            this.endJump();
        }
        else if (nIdx >= 0) {
            this.m_nJumpPointIdx = nIdx;
            var pt = this.m_JumpPoints[nIdx];
            this.updateJumpOffset(pt);
        }
    };
    BaseActor.prototype.endJump = function () {
        this.m_JumpPoints = null;
        this.setCurrentXY(this.m_nJumpDestX, this.m_nJumpDestY);
    };
    BaseActor.prototype.updateJumpOffset = function (posInPixel) {
        this.x = posInPixel.x;
        this.y = posInPixel.y;
    };
    /**
* 设置攻击目标
*/
    BaseActor.prototype.setAttackTarget = function (target) {
        if (!this.nLockTarget || this.nLockTarget.isDie || this.nLockTarget.sleep) {
            this.nLockTarget = undefined;
        }
        if (this.nLockTarget && !this.nLockTarget.isDie && !this.nLockTarget.sleep) {
            this.nTargeter = this.nLockTarget;
        }
        else {
            this.nTargeter = target;
            if (this.nTargeter && (this.nTargeter.isDie || this.nTargeter.sleep)) {
                this.nTargeter = undefined;
            }
        }
    };
    /**
     * 锁定攻击目标
     */
    BaseActor.prototype.lockAttackTarget = function (target) {
        this.nLockTarget = target;
        if (this.nTargeter != target) {
            this.setAttackTarget(target);
        }
    };
    Object.defineProperty(BaseActor.prototype, "currLockTarget", {
        get: function () {
            if (!this.nLockTarget || this.nLockTarget.isDie || this.nLockTarget.sleep) {
                return null;
            }
            return this.nLockTarget;
        },
        enumerable: true,
        configurable: true
    });
    BaseActor.prototype.playSkill = function (vo, needTarge) {
        if (needTarge === void 0) { needTarge = true; }
        vo.useSkill(); //标示技能的使用时间
        this.nCurrentSkill = vo;
        this.nBodyclip.playLoopTime = this.nAttackSpeed;
        var std = vo.stdSkill;
        var i, stdAction, clip;
        if (!needTarge) {
        }
        else if (this.nTargeter) {
            this.nDirection = this.countTargetDirection(this.nTargeter, this.nDirection); //面向目标
        }
        else if (this.nTargetPoint.x != -1 && this.nTargetPoint.y != -1) {
            this.nDirection = this.countPointDirection(this.nTargetPoint, this.nDirection);
        }
        vo.dir = this.nDirection;
        // if(vo.stdSkill.skill_id != SkillMgr.COMMON_SKILL_ID && this.attackNum == 0)
        //     UserTips.ins().showTips("释放  " + vo.stdSkill.name +  "  技能成功!");
        //播放起手动作
        for (i = 0; i < vo.actions.length; i++) {
            stdAction = vo.actions[i];
            if (this.addActionQueue(stdAction.act)) {
                var c = this.playEffect(stdAction, 1, this.nAttackSpeed);
                if (c && stdAction.act == ActionType.ATTACK88)
                    this.actionEff = c;
            }
            else {
                this.effectQueueParm.push({ currDir: this.direction, nScaleX: this.nBodyclip.scaleX });
                this.nActionEffectQueue.push(stdAction);
            }
        }
        this.addActionQueue(ActionType.READY);
        this.targetHandle = !needTarge ? 0 : this.nTargeter.handleId;
        //播放命中效果
        // if(std.hitTime > 0 && vo.actions.length > 0)//延迟命中
        // {
        if (this.delayHitHandle == -1) {
            this.delayHitHandle = egret.setTimeout(this.skillHitTarget, this, this.nAttackSpeed - std.hitTime, this.targetHandle, vo);
        }
        // }else//直接命中
        // {
        //     this.skillHitTarget(this.targetHandle,vo);
        // }
    };
    BaseActor.prototype.playEffect = function (actObj, times, keepTime, dir, nScaleX) {
        if (times === void 0) { times = 1; }
        if (dir === void 0) { dir = -1; }
        if (nScaleX === void 0) { nScaleX = undefined; }
        if (!actObj) {
            return null;
        }
        var stdact, effectId, hasPart;
        stdact = actObj;
        if (typeof (actObj) == "number") {
            effectId = Number(actObj);
        }
        else {
            effectId = stdact.effect;
            hasPart = stdact.hasDir;
        }
        if (!effectId) {
            return null;
        }
        var clip;
        if (hasPart || dir != -1) {
            var ndir = BaseActor.lrDirs[dir == -1 ? this.nDirection : dir];
            clip = ModelResMgr.getSkillEffect(effectId, null, ndir.toString());
            clip.setScaleX(this.nBodyclip.scaleX);
        }
        else {
            clip = ModelResMgr.getSkillEffect(effectId);
        }
        if (clip.isComplete) {
            if (keepTime != -1) {
                if (times == 1) {
                    clip.playLoopTime = keepTime;
                }
                else {
                    clip.endPlayloop = keepTime;
                }
            }
            clip.play(times);
            this.addChild(clip);
            this.nEffectlst.push(clip);
        }
        else {
            if (times == -1) {
                clip.play(times);
                this.addChild(clip);
                this.nEffectlst.push(clip);
                return clip;
            }
            clip.destruct();
            return null;
        }
        return clip;
    };
    BaseActor.prototype.skillHitTarget = function (targetHandle, vo) {
        if (this.delayHitHandle != -1) {
            egret.clearTimeout(this.delayHitHandle);
            this.delayHitHandle = -1;
        }
        if (targetHandle == 0 || (this.nTargeter != undefined && !this.nTargeter.sleep && !this.nTargeter.isDie && this.nTargeter.handleId == targetHandle)) {
            if (SkillMgr.ins.isMaxSkill(vo))
                GameMap.ins().shake(20, 20, 500);
            GameLogic.ins.skillHitTarget(this.nCurrentSkill, this, this.nTargeter);
        }
        this.endSkill();
    };
    BaseActor.prototype.endSkill = function () {
        // egret.log("强制结束技能!this")
        // this.attackTarges = null;
        if (this.delayHitHandle != -1) {
            egret.clearTimeout(this.delayHitHandle);
            this.delayHitHandle = -1;
        }
        this.nTargeter = undefined;
        this.lockAttackTarget(this.nLockTarget);
        // this.attackNum = 0;
        this.nSelectdSkill = undefined;
        this.nCurrentSkill = undefined;
    };
    BaseActor.prototype.addHp = function (hp) {
    };
    BaseActor.prototype.sprint = function (dir, distance, target, sprintRate) {
        this.nDirection = dir;
        this.nActionTypeQueue.length = 0;
        var po = DisplayMapObject.DIR_LS[this.nDirection];
        var targetX = this.currentX;
        var targetY = this.currentY;
        for (var i = 1; i <= distance; i++) {
            //主动者每冲刺一步先检测 前面第一步  第二步
            if (GameMap.ins().moveable(targetX + po.x * i, targetY + po.y * i)) {
                targetX += po.x;
                targetY += po.y;
            }
            else {
                egret.log("冲刺遇到障碍!!!");
                break;
            }
        }
        var dx = Math.abs(targetX - this.currentX);
        var dy = Math.abs(targetY - this.currentY);
        var range = Math.max(dx, dy);
        if (range > 0) {
            this._sprintTarget = target;
            var sprintRange = this.nMoveSpeed * range / sprintRate;
            if (this.moveTo(targetX, targetY, sprintRange)) {
                // this.addActionQueue(ActionType.RUN);
                // this.nBodyclip.playLoopTime = this.nMoveSpeed / sprintRate;//如果是移动的话就是用定制的动作速度
            }
        }
        return range;
    };
    BaseActor.prototype.getBuffByType = function (type) {
        for (var i = 0; i < this.nBuffs.length; i++) {
            if (this.nBuffs[i].type == type)
                return true;
        }
        return false;
    };
    /*
     * 重写移动，同步地图
     */
    BaseActor.prototype.processMove = function (tick) {
        _super.prototype.processMove.call(this, tick);
        this.syncMapPosition();
    };
    BaseActor.prototype.syncMapPosition = function () {
        if (this.stage && (this.lastX != this.x || this.lastY != this.y || GameMap.ins().m_dwShakingOverTick)) {
            this.lastX = this.x;
            this.lastY = this.y;
            if (this.nRace == ActorRace.HUMAN) {
                this.globalPosition = this.stage.globalToLocal(GlobalVo.GAME_W / 2, GlobalVo.GAME_H / 2);
                var winX = (this.globalPosition.x - this.x);
                var winY = (this.globalPosition.y - this.y);
                //检测出界
                var minXYpo = MapVo.ins.minXYpo;
                var nx = winX > 0 ? 0 : (winX < minXYpo.x ? minXYpo.x : winX);
                var ny = winY > 0 ? 0 : (winY < minXYpo.y ? minXYpo.y : winY);
                if (GameMap.ins().titleLayXY(nx, ny, GameMap.ins().m_dwShakingOverTick != 0)) {
                    // GameScene.ins.setActorXY(nx + GameMap.ins().m_nLayersOffsetX,ny + + GameMap.ins().m_nLayersOffsetX)
                    // GameLogic.ins().checkVisibleRange(nx,ny);
                }
                // if(force)
                //     GameLogic.ins.checkVisibleRange(nx,ny,force);
                //以人物为中心点、处理小地图显示
                DataEventDispatcher.dispatchEventWith(GameEvent.CHANGE_MINIMAP, { a: this.x, b: this.y });
            }
        }
    };
    BaseActor.handleSeed = 0;
    BaseActor.smId = [];
    BaseActor.lrDirs = [0, 1, 2, 3, 4, 3, 2, 1];
    BaseActor.DefaultJumpSpeed = 1 / 3;
    //角色跳跃动作的更新速度，单位是毫秒
    BaseActor.DefaultJumpUpInterval = 50;
    return BaseActor;
}(DisplayMapObject));
__reflect(BaseActor.prototype, "BaseActor");
//# sourceMappingURL=BaseActor.js.map