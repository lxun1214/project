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
 *
 */
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(race, aiRate) {
        var _this = _super.call(this, race, aiRate) || this;
        _this.nextMovePoin = new ASPathNode(0, 0, 0);
        _this.delayRemove = 0;
        _this.nNameLabel = new egret.TextField();
        _this.nNameLabel.touchEnabled = false;
        _this.nNameLabel.fontFamily = "黑体";
        _this.nNameLabel.stroke = 1;
        _this.nNameLabel.strokeColor = 0x2f0404;
        _this.nNameLabel.textColor = 0xff0000;
        _this.nNameLabel.textAlign = egret.HorizontalAlign.CENTER;
        _this.nNameLabel.size = 18;
        _this.addChild(_this.nNameLabel);
        _this.nHPBar.y = -180;
        _this.nHPBar._truck.source = "hp2";
        return _this;
    }
    Monster.prototype.setModelData = function (vo) {
        this.visible = true;
        this.actorVo = vo;
        var obj = ConfigMgr.gameConfig["globalConfig"];
        this.nMoveSpeed = vo.playerAttrInfo.movingSpeed; //obj["monsterMoveSpeed"];
        this.nAttackSpeed = vo.playerAttrInfo.attackSpeed; //obj["monsterAttackSpeed"];
        this.nActionSpeed = obj["monsterActionSpeed"];
        this.nReadySpeed = this.nAttackSpeed - this.nActionSpeed;
        this.nBodyclip.playLoopTime = this.nActionSpeed;
        this.nHPBar.setPosition(this.actorVo.nHp, this.actorVo.nMaxHp);
        // this.nNameLabel.text = vo.testName + "";
        _super.prototype.initBaseActor.call(this);
    };
    /**
     * 重写怪物获取怪物模型
     */
    Monster.prototype.getBodyModel = function (index, part) {
        ModelResMgr.getMonsterModel(index, this.nBodyclip, part);
    };
    /**
     * 怪物ai
     */
    Monster.prototype.AI = function () {
        // return;
        if (this.isDie || this.sleep || this.mabiArr.length != 0) {
            return;
        }
        if (this.nActionTypeQueue.length > 0 || GameLogic.GAME_STATUS == 1 || this.readytime != 0)
            return;
        if (this.path && this.path.length > 0) {
            if (!this.onMoveing) {
                if (this.nTargeter.isDie || this.nTargeter.sleep) {
                    this.path = null;
                    this.playActionType(ActionType.STAND);
                    return;
                }
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
        if (this.nTargeter != null && this.nTargeter != undefined) {
            if (this.nTargeter.isDie || this.nTargeter.sleep) {
                this.lockAttackTarget(undefined);
                SystemInstance.nextFrameHandle(this.AI, this);
                return;
            }
            if (this.nSelectdSkill) {
                if (this.distance(this.nTargeter) > this.nSelectdSkill.dis && !this.onMoveing) {
                    this.path = GameMap.ins().getPath(this.distX, this.distY, this.nTargeter.distX, this.nTargeter.distY, this.moveSpeed / (this.moveSpeed + this.nTargeter.moveSpeed), this.nSelectdSkill.dis);
                    SystemInstance.nextFrameHandle(this.AI, this);
                    return;
                }
                else if (!this.nCurrentSkill && !this.isMoving) {
                    if (!GameLogic.ins.checkTargetCanStay(this)) {
                        var po = MapVo.ins.mapUNMarkNode(this.nTargeter.distX, this.nTargeter.distY, -2);
                        if (po) {
                            if (this.distance(null, po.x, po.y) > 2) {
                                this.path = GameMap.ins().getPath(this.distX, this.distY, po.x, po.y, 1);
                                SystemInstance.nextFrameHandle(this.AI, this);
                                return;
                            }
                            else {
                                if (this.moveTo(po.x, po.y, this.nMoveSpeed)) {
                                    this.nTargetPoint.x = -1;
                                    this.nTargetPoint.y = -1;
                                    this.playActionType(ActionType.RUN);
                                    return;
                                }
                            }
                        }
                        else {
                            egret.log("找不到坑站!");
                        }
                    }
                    this.playSkill(this.nSelectdSkill);
                    return;
                }
                return;
            }
            else {
                if (this.actorVo.skillArr) {
                    for (var i = 0; i < this.actorVo.skillArr.length; i++) {
                        if (this.actorVo.skillArr[i].canUse) {
                            this.nSelectdSkill = this.actorVo.skillArr[i];
                            SystemInstance.nextFrameHandle(this.AI, this);
                            return;
                        }
                    }
                }
                if (!SkillMgr.COMMON_SKILL[this.actorVo.jobId].canUse)
                    return;
                if (this.nActionTypeQueue.length > 0)
                    return;
                this.nSelectdSkill = SkillMgr.COMMON_SKILL[this.actorVo.jobId];
                SystemInstance.nextFrameHandle(this.AI, this);
                return;
            }
        }
        else {
            if (Human.ins.sleep || Human.ins.isDie)
                this.playActionType(ActionType.STAND);
            else
                this.lockAttackTarget(Human.ins);
            SystemInstance.nextFrameHandle(this.AI, this);
            return;
        }
    };
    /*
     * 上一动作完成自动从动作缓冲区读取下一个动作
     */
    Monster.prototype.playNextAction = function (evt) {
        if (this.sleep) {
            if (this.nPlayingType == ActionType.DIE || this.isDie) {
                this.sendDie();
            }
            return;
        }
        _super.prototype.playNextAction.call(this, evt);
    };
    /*死亡消息*/
    Monster.prototype.sendDie = function () {
        // this.actorSound(null,0);
        if (this.delayRemove != 0)
            return;
        this.nBodyclip.gotoAndStop(this.nBodyclip.totalFrames);
        this.receive();
        // this.delayRemove = setTimeout(this.delayRemoveCall,100,this);
    };
    // private delayRemoveCall(thisArg:Monster):void
    // {
    //     thisArg.receive();
    // }
    /**
     * 重写移动结束
     */
    Monster.prototype.endMove = function (sync) {
        if (sync === void 0) { sync = true; }
        _super.prototype.endMove.call(this, sync);
        this.AI();
    };
    Monster.prototype.getEnemy = function () {
        var ls = GameLogic.ins.getActorsByType(ActorRace.HUMAN);
        return ls;
    };
    /**
     * 回收怪物
     */
    Monster.prototype.receive = function () {
        this.readytime = 0;
        // GameMap.ins().checkHit(null,this,true);
        MapVo.ins.unMarkNode(this.currentX, this.currentY, MapNode.MONSTER);
        if (this.delayRemove > 0) {
            clearTimeout(this.delayRemove);
            this.delayRemove = 0;
        }
        this.sleep = true;
        this.endSkill();
        _super.prototype.receive.call(this);
        GameLogic.ins.receiveMonster(this);
        this.path = null;
        this.m_JumpPoints = null;
    };
    Monster.prototype.update = function (tick) {
        _super.prototype.update.call(this, tick);
    };
    Monster.prototype.addHp = function (hp) {
        _super.prototype.addHp.call(this, hp);
        this.actorVo.nHp += hp;
        if (this.actorVo.nHp > this.actorVo.nMaxHp)
            this.actorVo.nHp = this.actorVo.nMaxHp;
        if (this.actorVo.nHp <= 0) {
            this.actorVo.nHp = 0;
            this.die();
            this.sleep = true;
        }
        this.nHPBar.setPosition(this.actorVo.nHp, this.actorVo.nMaxHp);
    };
    Monster.prototype.setPosition = function (nx, ny) {
        MapVo.ins.unMarkNode(this.currentX, this.currentY, MapNode.MONSTER);
        _super.prototype.setPosition.call(this, nx, ny);
        MapVo.ins.markNode(nx, ny, MapNode.MONSTER);
    };
    return Monster;
}(BaseActor));
__reflect(Monster.prototype, "Monster");
//# sourceMappingURL=Monster.js.map