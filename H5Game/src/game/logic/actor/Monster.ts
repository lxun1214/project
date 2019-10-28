/**
 *
 * @author 
 *
 */
class Monster extends BaseActor
{
    public constructor(race: number,aiRate: number)
    {
        super(race,aiRate);
        
        this.nNameLabel = new egret.TextField();
        this.nNameLabel.touchEnabled = false;
        this.nNameLabel.fontFamily = "黑体";
        this.nNameLabel.stroke = 1;
        this.nNameLabel.strokeColor = 0x2f0404;
        this.nNameLabel.textColor = 0xff0000;
        this.nNameLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.nNameLabel.size = 18;
        this.addChild(this.nNameLabel);
        this.nHPBar.y = -180;
        this.nHPBar._truck.source = "hp2";
    }
    public actorVo:MonsterVo;
    public setModelData(vo:MonsterVo):void
    {
        this.visible = true;
        this.actorVo = vo;
        var obj:Object = ConfigMgr.gameConfig["globalConfig"];
        this.nMoveSpeed = vo.playerAttrInfo.movingSpeed;//obj["monsterMoveSpeed"];
        this.nAttackSpeed = vo.playerAttrInfo.attackSpeed;//obj["monsterAttackSpeed"];
        this.nActionSpeed = obj["monsterActionSpeed"];
        this.nReadySpeed = this.nAttackSpeed - this.nActionSpeed;
        this.nBodyclip.playLoopTime = this.nActionSpeed;
        this.nHPBar.setPosition(this.actorVo.nHp,this.actorVo.nMaxHp);
        // this.nNameLabel.text = vo.testName + "";
        super.initBaseActor();
    }
    /**
     * 重写怪物获取怪物模型
     */
    protected getBodyModel(index: number,part:string): void
    {
        ModelResMgr.getMonsterModel(index,this.nBodyclip,part);
    }
    
    /**
     * 怪物ai
     */ 
    public AI():void
    {
        // return;
        if(this.isDie || this.sleep ||　this.mabiArr.length != 0)//如果已经睡眠或者正在跳转场景则跳出AI
        {
            return;
        }
        if(this.nActionTypeQueue.length > 0  || GameLogic.GAME_STATUS == 1 || this.readytime != 0)
            return;
    if(this.path && this.path.length >0)//有路径直接移动
        {
            if(!this.onMoveing)
            {
                if(this.nTargeter.isDie || this.nTargeter.sleep)
                {
                    this.path = null;
                     this.playActionType(ActionType.STAND);
                    return;
                }
                this.nextMovePoin = this.path.pop();
                this.direction = this.nextMovePoin.nDir;
                if(this.moveTo(this.nextMovePoin.nX,this.nextMovePoin.nY,this.nMoveSpeed)) {
                    this.nTargetPoint.x = -1;
                    this.nTargetPoint.y = -1;
                    this.playActionType(ActionType.RUN);
                    return;
                }
            }
           return;
        }
        if(this.nTargeter != null && this.nTargeter != undefined)
        {
             if(this.nTargeter.isDie || this.nTargeter.sleep)
             {
                this.lockAttackTarget(undefined);
                SystemInstance.nextFrameHandle(this.AI,this);
                return;
             }


             if(this.nSelectdSkill)
             {
                  if(this.distance(this.nTargeter) > this.nSelectdSkill.dis && !this.onMoveing)
                  {
                        this.path = GameMap.ins().getPath(this.distX,this.distY,this.nTargeter.distX,this.nTargeter.distY,this.moveSpeed/(this.moveSpeed+this.nTargeter.moveSpeed),this.nSelectdSkill.dis);
                        SystemInstance.nextFrameHandle(this.AI,this);
                       return;
                  }else if(!this.nCurrentSkill && !this.isMoving)
                  {
                      if(!GameLogic.ins.checkTargetCanStay(this))//重叠
                       {
                           var po:egret.Point = MapVo.ins.mapUNMarkNode(this.nTargeter.distX,this.nTargeter.distY,-2);
                           if(po)
                           {
                               if(this.distance(null,po.x,po.y) >　2)
                               {
                                   this.path = GameMap.ins().getPath(this.distX,this.distY,po.x,po.y,1);
                                    SystemInstance.nextFrameHandle(this.AI,this);
                                    return;
                               }else
                               {
                                   if(this.moveTo(po.x,po.y,this.nMoveSpeed)) {
                                        this.nTargetPoint.x = -1;
                                        this.nTargetPoint.y = -1;
                                        this.playActionType(ActionType.RUN);
                                        return;
                                    }
                               }
                           }else
                           {
                               egret.log("找不到坑站!");
                           }
                       }
                        this.playSkill(this.nSelectdSkill);
                        return;
                  }
                return;
             }else
             {
                 if(this.actorVo.skillArr)
                 {
                     for(var i:number=0;i<this.actorVo.skillArr.length;i++)
                     {
                         if(this.actorVo.skillArr[i].canUse)
                         {
                             this.nSelectdSkill = this.actorVo.skillArr[i];
                             SystemInstance.nextFrameHandle(this.AI,this);
                             return;
                         }
                     }
                 }
                 if(!SkillMgr.COMMON_SKILL[this.actorVo.jobId].canUse)
                        return;
                 if(this.nActionTypeQueue.length > 0)
                        return;
                  this.nSelectdSkill = SkillMgr.COMMON_SKILL[this.actorVo.jobId];
                  SystemInstance.nextFrameHandle(this.AI,this);
                  return;
             }
        }else
        {
            if(Human.ins.sleep || Human.ins.isDie)
                this.playActionType(ActionType.STAND);
            else
                this.lockAttackTarget(Human.ins);
            SystemInstance.nextFrameHandle(this.AI,this);
            return;
        } 

    }

    protected path: Array<any>;
    private nextMovePoin: ASPathNode = new ASPathNode(0,0,0);
    /*
     * 上一动作完成自动从动作缓冲区读取下一个动作
     */
    protected playNextAction(evt: egret.Event): void
    {
        if(this.sleep)
        {
            if(this.nPlayingType == ActionType.DIE || this.isDie )
            {
                this.sendDie();
            }
            return;
        }
        super.playNextAction(evt);
    }
    protected delayRemove:number = 0;
    /*死亡消息*/
    protected sendDie():void
    {
        // this.actorSound(null,0);
        if(this.delayRemove != 0)
          return;
        this.nBodyclip.gotoAndStop(this.nBodyclip.totalFrames);
        this.receive();
        // this.delayRemove = setTimeout(this.delayRemoveCall,100,this);
    }

    // private delayRemoveCall(thisArg:Monster):void
    // {
    //     thisArg.receive();
    // }

    /**
     * 重写移动结束
     */ 
    public endMove(sync: Boolean = true): void
    {
        super.endMove(sync);
        this.AI();
    }
    public getEnemy(): Array<BaseActor>
    {
        var ls:Array<BaseActor> = GameLogic.ins.getActorsByType(ActorRace.HUMAN);
        return ls;
    }
    /**
     * 回收怪物
     */ 
    public receive():void
    {
        this.readytime = 0;
        // GameMap.ins().checkHit(null,this,true);
        MapVo.ins.unMarkNode(this.currentX,this.currentY,MapNode.MONSTER);
        if(this.delayRemove > 0)
        {
            clearTimeout(this.delayRemove);
            this.delayRemove = 0;
        }
        this.sleep = true;
        this.endSkill();
        super.receive();
        GameLogic.ins.receiveMonster(this);
        this.path = null;
        this.m_JumpPoints = null;
    }

    public update(tick: number): void
    {
        super.update(tick);
    }

    public addHp(hp: number):void
    {
        super.addHp(hp);
        this.actorVo.nHp += hp;
        if(this.actorVo.nHp > this.actorVo.nMaxHp)
            this.actorVo.nHp = this.actorVo.nMaxHp;
        if(this.actorVo.nHp <= 0)
        {
            this.actorVo.nHp = 0;
            this.die();
            this.sleep = true;
        }
        this.nHPBar.setPosition(this.actorVo.nHp,this.actorVo.nMaxHp);
    }

    public setPosition(nx: number,ny: number): void
    {
        MapVo.ins.unMarkNode(this.currentX,this.currentY,MapNode.MONSTER);
        super.setPosition(nx,ny);
        MapVo.ins.markNode(nx,ny,MapNode.MONSTER);
    }
}
