/**
 *
 * @author 
 * 人类角色
 */
class Human extends BaseActor
{
    static WU_DI:number = 0;//1免伤2输出爆炸3免伤输出爆炸

	public static ins:Human;
    public actorVo:UserVo;
	public constructor(race:number,aiRate:number)
	{
        super(race,aiRate);
        this.nNameLabel = new egret.TextField();
        this.nNameLabel.touchEnabled = false;
        this.nNameLabel.stroke = 1;
        this.nNameLabel.strokeColor = 0x2f0404;
        this.nNameLabel.fontFamily = "黑体";
        this.nNameLabel.bold = true;
        this.nNameLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.nNameLabel.textColor = 0xffea00;
        this.nNameLabel.bold = true;
        this.nNameLabel.size = 18;
        this.addChild(this.nNameLabel);
        this.dynamicLevel = 2;
        this.nHPBar.y = -200;

        this.nBodyclip.setScaleX(1.3);
        this.nBodyclip.scaleY = 1.3;
        if(this.nRace == ActorRace.HUMAN){
            this.lvlEff = new clips.BmpClip();
            ModelResMgr.getOtherEffect(10024,this.lvlEff);
            DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.level,()=>{
                if(this.lvlEff.parent)
                    return;
                this.addChild(this.lvlEff);
                this.lvlEff.play(1);
                this.lvlEff.addEventListener(egret.Event.COMPLETE,()=>{
                    this.lvlEff.gotoAndStop(1);
                    if(this.lvlEff.parent)
                        this.removeChild(this.lvlEff);
                },this);
            },this);
        }

        this.bottmEff = new clips.BmpClip();
        this.addChildAt(this.bottmEff,0);
	}
	lvlEff:clips.BmpClip;
    public setModelData(vo:UserVo):void
    {
        this.actorVo = vo;
        this.upSpeed();
        this.nBodyclip.playLoopTime = this.nActionSpeed;
        this.useingSkill = [];
        this.skills = [];
        this.sleep = false;
		this.visible = true;
        super.initBaseActor();
        SkillMgr.ins.createSkill(vo.jobId,vo.skillTabs,vo.skillColumn,this);

        if(this.nRace == ActorRace.HUMAN)
            ModelResMgr.getOtherEffect(10019+vo.sex,this.bottmEff);
        else
            ModelResMgr.getOtherEffect(10022,this.bottmEff);
        this.bottmEff.play(-1);
    }

    public upSpeed():void
    {
        if(!this.actorVo)
            return;
        var obj:Object = ConfigMgr.gameConfig["globalConfig"];
        var a:any = ConfigMgr.gameConfig["heroAttribute"][this.actorVo.jobId];
        if(a.movingSpeed > this.actorVo.playerAttrInfo.movingSpeed)
            this.nMoveSpeed = a.movingSpeed + a.movingSpeed - this.actorVo.playerAttrInfo.movingSpeed;
        else
            this.nMoveSpeed = a.movingSpeed - (this.actorVo.playerAttrInfo.movingSpeed - a.movingSpeed);

        if(a.attackSpeed > this.actorVo.playerAttrInfo.attackSpeed)
            this.nAttackSpeed = a.attackSpeed + a.attackSpeed - this.actorVo.playerAttrInfo.attackSpeed;
        else
            this.nAttackSpeed = a.attackSpeed - (this.actorVo.playerAttrInfo.attackSpeed - a.attackSpeed);
        this.nActionSpeed = obj["humanActionSpeed"];
        this.nReadySpeed = 500;//this.nAttackSpeed-this.nActionSpeed;
        this.nHPBar.setPosition(this.actorVo.nHp,this.actorVo.nMaxHp);
    }

	public start():void
	{
    	this.direction = 0;
        if(this.nActionTypeQueue.length <= 0 && this.nPlayingType == "")
	    {
    	      this.playActionType(ActionType.STAND);
        }
        this.readytime = 0;
        this.nBodyclip.playLoopTime = this.nActionSpeed;
        this.nActionTick = GameLogic.ins.gameRunTick+100;
	}
	
	public stop():void
	{
        if(this.actionEff)
        {
            this.nEffectlst.splice(this.nEffectlst.indexOf(this.actionEff),1);
            this.actionEff.destruct();
            this.actionEff = null;
        }
        if(this.delayHitHandle != -1) {
            egret.clearTimeout(this.delayHitHandle);
            this.delayHitHandle = -1;
        }
        this.endMove(true);
        this.endSkill();
	}
    
    /**
     * 复活
     */
    public revival():void
    {
        // GameMap.ins().checkHit(null,this,true);
        this.selectSkillQue.length = 0;
        this.path = null;
        this.nDie = false;
        this.sleep = false;
        this.visible = true;
        this.nTargetPoint.x = this.nTargetPoint.y = -1;
        this.nTargeter = undefined;
        this.addHp(this.actorVo.nMaxHp,false);
        this.nHPBar.setPosition(this.actorVo.nHp,this.actorVo.nMaxHp);
        for(var i:number = this.nBuffs.length-1;i>=0;i--)
        {
            if(this.nBuffs[i].endTime != 0)
                this.removeBuff(i);
        }
    }
    /**
     * 设置睡眠
     */
    public set sleep(value: Boolean)
    {
        this._sleep = value;
        if(this._sleep) {
            this.playActionType(ActionType.STAND);
            // this.visible = false;
        }else
        {
            // this.visible = true;
        }
    }
    protected sendDie():void
    {
        super.sendDie();
        this.visible = false;
    }
    public get sleep(): Boolean
    {
        return this._sleep;
    }
    public addHp(hp: number,show:boolean=true):void
    {
        super.addHp(hp);
        if(Human.ins == this &&　(Human.WU_DI == 1 || Human.WU_DI == 3) && hp <0)
              return;
        this.actorVo.nHp += hp;
        if(this.actorVo.nHp > this.actorVo.nMaxHp)
            this.actorVo.nHp = this.actorVo.nMaxHp;
        if(this.actorVo.nHp <= 0)
        {
            this.actorVo.nHp = 0;
            this.nDie = true;
            this.sleep = true;
            // this.addActionQueue(ActionType.DIE);
        }
        this.nHPBar.setPosition(this.actorVo.nHp,this.actorVo.nMaxHp);
    }

    public addSkill(skill:SkillVo):boolean
    {
        if(!skill.canUse)
        {
            UserTips.ins().showTipsBigToSmall("技能正在CD中!");
            return false;
        }
        if(this.selectSkillQue.length > 0)
        {
            UserTips.ins().showTipsBigToSmall("等待释放!");
            return false;
        }
         UserTips.ins().showTipsBigToSmall("等待释放!");
        this.selectSkillQue.push(skill);
        return true;
    }
	
    public path:Array<any>;
    private selectSkillQue:Array<any> = [];
    private normalHiting:boolean;
    protected nextMovePoin: ASPathNode = new ASPathNode(0,0,0);
    public AI(): void {
         if(this.mabiArr.length != 0 || this._sprintTarget)
            return;
        if(this.isDie || this.sleep || GameLogic.GAME_STATUS == 1)//如果已经睡眠或者正在跳转场景则跳出AI
            return;
        if(this.nActionTypeQueue.length > 0 || this.actionEff  || this.readytime != 0)
            return;
        if(this.path && this.path.length >0)//有路径直接移动
        {
            if(!this.onMoveing)
            {
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
       if(!GameLogic.AUTO_FIGHT)
            return;
       if(this.isMoving || this.nSelectdSkill)
            return;
       if(!this.nSelectdSkill && this.selectSkillQue.length > 0)//有技能直接释放
       {
           var useSkill:boolean = false;
           //释放技能
            if(this.nActionTypeQueue.length > 0)
                return;
            var s:SkillVo = this.selectSkillQue[0];
            if(s.needTarge)
            {
                if(!this.nTargeter || this.nTargeter.isDie)
                {
                    //重新设置目标
                     var o:BaseActor = this.chooseTargeter();
                     if(o)
                     {
                        this.lockAttackTarget(o);
                        if(this.distance(this.nTargeter) <= s.dis)
                            useSkill = true;
                     }
                }else
                {
                    if(this.distance(this.nTargeter) <= s.dis)
                        useSkill = true;
                }
            }else
                useSkill = true;
            if(useSkill)
            {
                this.nSelectdSkill = this.selectSkillQue.shift();
                this.playSkill(this.nSelectdSkill,s.needTarge);
                return;
            }
       }
        if(this.nTargeter != null && this.nTargeter != undefined)
        {
             if(this.nTargeter.isDie || this.nTargeter.sleep)
             {
                this.lockAttackTarget(undefined);
                SystemInstance.nextFrameHandle(this.AI,this);
                return;
             }
             var dis:number = this.selectSkillQue.length>0?this.selectSkillQue[0].dis:SkillMgr.COMMON_SKILL[this.actorVo.jobId].dis;
            if(this.distance(this.nTargeter) > dis && !this.onMoveing && this.nActionTypeQueue.length == 0) 
            {
                this.path = GameMap.ins().getPath(this.distX,this.distY,this.nTargeter.distX,this.nTargeter.distY,this.moveSpeed/(this.moveSpeed+this.nTargeter.moveSpeed),dis==2?dis:dis-1);
                SystemInstance.nextFrameHandle(this.AI,this);
                return;
            }else
            {
                if(this.nActionTypeQueue.length > 0)
                    return;
                if(GameMap.ins().inJJCMap)
                {
                    var v:SkillVo;
                    for(var i:number=this.useingSkill.length-1;i>=0;i--)
                    {
                        v = this.useingSkill[i];
                        if(!v)
                            continue;
                        if(v.initiativeSkill)
                            continue;
                        if(v.needTarge &&　this.distance(this.nTargeter) > v.dis)
                            continue;
                        if(!v.canUse)
                            continue;
                        this.nSelectdSkill = v;
                        this.playSkill(this.nSelectdSkill);
                        return;
                    }
                }
                if(!SkillMgr.COMMON_SKILL[this.actorVo.jobId].canUse)
                    return;
                this.nSelectdSkill = SkillMgr.COMMON_SKILL[this.actorVo.jobId];
                this.playSkill(this.nSelectdSkill);
                return;
            }
        }else
        {
            var obj:BaseActor = this.chooseTargeter();
            this.lockAttackTarget(obj);
            if(!obj)
            {
                if(MapVo.ins.autoChangeDX() && GameMap.ins().inFBMap)
                {
                    FBMgr.ins.checkChangeMap();
                    return;
                }
                GameLogic.ins.createMonsters();
            }
            SystemInstance.nextFrameHandle(this.AI,this);
            return;
        } 
	}

    public chooseTargeter(type:number = 2): BaseActor
    {
        var i: number,ds: number,actor: BaseActor;
        var ls:Array<BaseActor>;
        switch(type)
        {
            case 0://自己
                ls = new Array<BaseActor>();
                ls.push(this);
                break;
            case 1://自己或友军

                break;
            default://敌人
                ls = this.getEnemy();
        }
        var distance: number = Number.MAX_VALUE;
        var chooseId: number = -1;
        var backupSelectedls: Array<BaseActor> = new Array<BaseActor>();//备选数组
        var dieNum:number = 0;
        
        for(i = 0;i < ls.length;i++)
        {
            actor = ls[i];
            if(actor.sleep || actor.isDie)
                continue;
            
            ds = this.distance(actor);
            if(distance > ds)//距离比较小则切换目标
            {
                distance = ds;
                chooseId = i;
            }else //如果空闲目标距离比较大则放入备选数组
            {
                backupSelectedls.push(actor);
            }
        }
        if(chooseId != -1)//已经找到目标
        {
            return <BaseActor>ls[chooseId];
        } else if(backupSelectedls.length > 0)//有备选列表
        {
            backupSelectedls.sort(function(a: BaseActor,b: BaseActor): number { if(a.distanceByTarget > b.distanceByTarget) return 1 });
            return <BaseActor>backupSelectedls[0];
        }

        return null;//无目标
	}

    public getEnemy():Array<BaseActor>
    {
        var ls:Array<BaseActor> = GameLogic.ins.getActorsByType(ActorRace.MONSTER);
        ls = ls.concat(GameLogic.ins.getActorsByType(ActorRace.PK_ROLE))
        return ls;
    }
    public endMove(sync: Boolean = true): void
    {
        super.endMove(sync);
        this.AI();
    }
    public setPosition(nx: number,ny: number): void
    {
        MapVo.ins.unMarkNode(this.currentX,this.currentY,MapNode.PLAYER);
        super.setPosition(nx,ny);
        MapVo.ins.markNode(nx,ny,MapNode.PLAYER);
    }
}
