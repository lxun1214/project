/**
 *
 * @author
 * 基础角色
 * 实现各种朝向的动作
 *
 */
class BaseActor extends DisplayMapObject
{
    public skills:Array<SkillVo>;
    public useingSkill:Array<SkillVo>;
    public handleId: number = 0;
    public flag:string;
    public selected:number = 0;//是否被选择
    public distanceByTarget: number = Number.MAX_VALUE;//与目标的距离
    
    /*******************************************/
    
    protected nAIRate: number;//ai的频率
    public nRace: number;//种族
    protected nBodyid: number = 0;//模型id
    protected nWeaponId: number = 0;//武器
    protected nWingId: number = 0;//翅膀
    protected nMoveSpeed: number = 300;//移动速度,移动一格所需要的毫秒
    public get moveSpeed():number
    {
        return this.nMoveSpeed;
    }
    protected nActionSpeed: number = 250;//500;//动作速度
    protected nAttackSpeed: number = 500;//攻击速度
    protected nReadySpeed: number = 0;//攻击停留时间
    protected nDie: Boolean = false;
    
    protected _sleep: Boolean = true;//是否挂起
    public canBeAttacked: boolean = true;//是否可以攻击
    
    protected nTargeter: BaseActor = null;//攻击的目标
    private nLockTarget: BaseActor = null;//锁定的目标
    protected nTargetPoint: egret.Point;//目标坐标
    protected nCurrentSkill: SkillVo;//当前使用的技能
    protected nSelectdSkill: SkillVo;//选中的技能
    
    protected nShadow:eui.Image;//图片
    
    protected nActionTypeQueue: Array<string>;//动作队列
    protected nBodyclip: clips.BmpClip;//角色模型
    protected nWeaponclip: clips.BmpClip;//武器模型
    protected nWingclip: clips.BmpClip;//翅膀
    protected nHPBar: ActorHPBar;//血条
    protected nNameLabel:egret.TextField;//名字
    
    protected nEffectlst: Array<clips.BmpClip>;//动画列表
    protected nActionEffectQueue: Array<any>;//起手动作特效队列
    protected effectQueueParm:Array<any>;
    
    protected nBuffs: Array<BuffVo>;//角色的buff
    
    private nDirection: number = 0;//朝向，顺时针0-7八个方向
    private _delayShow:number = -1;//延迟显示
    
    public static handleSeed: number = 0;
    
    public receiveTime:number = 0;//回收时间
    protected bottmEff:clips.BmpClip;

    public constructor(race:number,aiRate:number)
    {
        super();
        this.mabiArr = [];
        this.skills = [];
        this.useingSkill = [];
        this.nShadow = new eui.Image();
        this.nShadow.source = ResMgr.getGameOtherPng("shadow");
        this.nShadow.x = -46;
        this.nShadow.y = -32;
        this.addChild(this.nShadow);
        
        this.nRace= race;
        this.nAIRate = aiRate;
        this.direction = 0;
        this.nTargetPoint = new egret.Point(-1,-1);
        this.nEffectlst = new Array<clips.BmpClip>();
        this.nActionTypeQueue = new Array<string>();
        this.nActionEffectQueue = new Array<any>();
        this.effectQueueParm = [];
        this.nBuffs = new Array<BuffVo>();
        
        if(!this.nBodyclip)
        {
            this.nBodyclip = new clips.BmpClip();
        }
        
        this.nHPBar = new ActorHPBar();
        this.nHPBar.y = -109;
        
        this.nWeaponclip = clips.BmpClip.create();
        this.nWingclip = clips.BmpClip.create();

        this.addChild(this.nBodyclip);
        this.addChild(this.nHPBar);
        this.addChild(this.nWeaponclip);
        this.addChild(this.nWingclip);
        

        this.switchDirIndex();
    }

    /**
     * 设置睡眠
     */ 
    public set sleep(value: Boolean)
    {
        this._sleep = value;
        if(this._sleep)
        {
            if(this.nPlayingType != ActionType.DIE)
                this.playActionType(ActionType.STAND);
        }
    }
    public get sleep(): Boolean
    {
        return this._sleep;
    }
    
    /**
     * 重写设置坐标
     */ 
    public setPosition(nx: number,ny: number): void
    {
        super.setPosition(nx,ny);
        this.syncMapPosition();
    }
    /**
     * 移除所有特效
     */
    public removeAllEffects():void
    {
        var clip: clips.BmpClip;
        while(this.nEffectlst.length)
        {
            clip = this.nEffectlst.pop();
            clip.stop();
            if(clip == this.actionEff)
                this.actionEff = null;
            clip.destruct();
        }
        this.nActionEffectQueue.length = 0;
        this.effectQueueParm.length = 0;
    }

    public initBaseActor(create:Boolean = true):void
    {
        if(create)
        {
            BaseActor.handleSeed++;
            this.handleId = BaseActor.handleSeed;
        }
        for(var i: number = this.nBuffs.length-1;i>=0;i--)
        {
            this.removeBuff(i);
        }
        this.nBuffs.length = 0;
        
        if(!this.nBodyclip) {
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
        this.nBodyclip.addEventListener(egret.Event.LOOP_COMPLETE,this.playNextAction,this);
        this.nBodyclip.addEventListener(egret.Event.COMPLETE,this.playNextAction,this);

        this.addChild(this.nBodyclip);
        this.addChild(this.nHPBar);
        this.addChild(this.nWeaponclip);
        this.addChild(this.nWingclip);
        this.switchDirIndex();
    }
    /*
     * 设置角色身体模型资源
     */
    protected defaultBmp:egret.Bitmap;
    
    public static _defaultBody:egret.MovieClipData;
    
    public static getDefaultBody(): egret.MovieClipData
    {
        if(!BaseActor._defaultBody)
        {
            var texture: egret.Texture = RES.getRes("LoadingDefaultBody");
            var data: Object = new Object();
            data["res"] = {"0":{x: 0,y: 0,w: texture.textureWidth,h: texture.textureHeight}};
            var mov: Object = {
                frames: [{ res: "0",x: -texture.textureWidth / 2,y: -texture.textureHeight }],
                labels: [],
                frameRate: "12"
            }
            data["mc"] = { mov_1: mov };
            var json: any = JSON.parse(JSON.stringify(data));
            var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,texture);
            BaseActor._defaultBody = mcDataFactory.generateMovieClipData();
        }
        return BaseActor._defaultBody;
    }
    
    /**
     * 设置身体id
     */ 
    public setBodyId(value:number):void
    {
        if(this.nBodyid == value)
            return;
        this.nBodyid = value;
        this.renderAction(this.nPlayingType);
    }
    
    /**
     * 设置武器
     */ 
    public setWeaponId(id: number): void
    {
        if(id == this.nWeaponId)
            return;
        this.nWeaponId = id;
    }
    /**
     * 设置翅膀
     */ 
    public setWingId(id: number): void
    {
        if(id == this.nWingId)
            return;
        this.nWingId = id;
    }
    
    /**
     * 设置朝向
     */ 
    public set direction(value:number)
    {
        if(this.nDirection != value)
        {
            this.nDirection = value;
            this.renderAction(this.nPlayingType);
            this.switchDirIndex();
        }
    }
    
    public get direction():number
    {
        return this.nDirection;
    }
    
    /**
     * 调换层级
     */
    private _dirLayerList: Array<egret.DisplayObject> = new Array<egret.DisplayObject>();
    protected switchDirIndex(): void
    {
        var dir: number = BaseActor.lrDirs[this.direction];
        switch(this.direction) {
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
        for(var i: number = 3;i >= 0;i--) {
            if(this._dirLayerList[i])
            {
                if(this._dirLayerList[i] == this.nWingclip && this.nWingId <=0)
                {
                    if( this.nWingclip.parent != null)
                        this.removeChild(this.nWingclip);
                }
                else
                    this.addChildAt(this._dirLayerList[i],0);
            }
        }
        this.addChildAt(this.nShadow,0);
        if(this.bottmEff)
            this.addChildAt(this.bottmEff,1);
    }
    
    /**
     * 获取模型
     */ 
    protected getBodyModel(index:number,part:string):void
    {
        ModelResMgr.getHumanModel(index,this.nBodyclip,part);
    }
    
    /*
     * 根据动作类型播放动画
     */ 
    protected formatActDir(type:string,dir:number):string
    {
        // if(type == ActionType.DIE)
        // {
        //     return String(ActionType.getAct(type)) + 1;
        // }else
        // {
            return ActionType.getAct(type) + dir.toString();
        // }
    }
    
    private static smId:Array<number> = [];
    private static lrDirs: any[] = [0,1,2,3,4,3,2,1]
    protected nPlayingType: string = ActionType.STAND;//当前播放的类型
    protected nActionTick: number = -1;//播放超时
    protected readytime:number = 0;
    protected renderAction(type: string,refresh:Boolean = false): void
    {
        if(type == ActionType.READY)
        {
            this.readytime = GameLogic.ins.gameRunTick + this.nReadySpeed;
            this.nBodyclip.playLoopTime = this.nActionSpeed;
            type = ActionType.STAND;
        }
        
        this.nPlayingType = type;
        
        if(type == ActionType.WALK || type == ActionType.RUN || this.nTargeter == undefined) {
            
        } else if(this.nTargeter) {
            this.direction = this.countAngle(this.nTargeter,this.direction)
        }
        
        var dir: number = BaseActor.lrDirs[this.direction];
        var part: string = this.formatActDir(type,dir);
        if(type == ActionType.ATTACK88)
        {
            this.nBodyclip.stop();
            this.nBodyclip.visible = false;
        }else
        {
            this.nBodyclip.visible = true;
        if(this.nBodyid)
        {
            if(type == ActionType.DIE)
            {
                this.getBodyModel(10026,"");
                this.nBodyclip.alpha = 0.5;
            }
            else
                this.getBodyModel(this.nBodyid,part);
        }
        if(!this.nBodyclip.isComplete)
        {
            this.nBodyclip.movieClipData = BaseActor.getDefaultBody();
        }
        
        this.nBodyclip.play(-1);
        }
        var scalex:number = 1;

        if(this.nRace == ActorRace.MONSTER && BaseActor.smId.indexOf(this.nBodyid) == -1)
        {
            if(type == ActionType.FIGHT)
            {
                if(this.direction >= 4)//左右对调处理
                {
                    scalex = -Math.abs(this.nBodyclip.scaleX);
                } else 
                {
                    scalex = Math.abs(this.nBodyclip.scaleX);
                }
            }else
            {
                if(this.direction > 0 && this.direction<4)
                     scalex = -Math.abs(this.nBodyclip.scaleX);
                else
                    scalex = Math.abs(this.nBodyclip.scaleX);
            }
        }else
        {
            if(this.direction >= 4)//左右对调处理
            {
                scalex = -Math.abs(this.nBodyclip.scaleX);
            } else 
            {
                scalex = Math.abs(this.nBodyclip.scaleX);
            }
        }
        
        this.nBodyclip.setScaleX(scalex);
        
        if(!refresh)//重新刷新用于加载延迟处理
        {
            this.nActionTick = GameLogic.ins.gameRunTick + this.nBodyclip.playLoopTime;
        }    
        if(this.nActionTick == -1)
        {
            this.nActionTick = GameLogic.ins.gameRunTick + this.nActionSpeed;
        }
        
        if(this.nWeaponId)//处理武器模型
        {
            this.nWeaponclip.playLoopTime = this.nBodyclip.playLoopTime;
            this.nWeaponclip.setScaleX(scalex);
            this.getWeaponModel(this.nWeaponId,part);
            this.nWeaponclip.play(-1);
        }
        if(this.nWingId)
        {
            this.nWingclip.playLoopTime = this.nBodyclip.playLoopTime;
            this.nWingclip.setScaleX(scalex);
            this.getWingModel(this.nWingId,part);
            this.nWingclip.play(-1);
        }
        this.switchDirIndex();
    }
    
    /**
     * 获取武器模型
     * @param index
     * @param part
     */
    protected getWeaponModel(index:number,part:string):void
    {
        ModelResMgr.getWeaponModel(index,this.nWeaponclip,part);
    }
    
    /**
     * 加载翅膀模型
     */ 
    protected getWingModel(index:number,part:string):void
    {
        ModelResMgr.getWingModel(index,this.nWingclip,part);
    }
    
    /**
     * 指定播放动作
     */ 
    public playActionType(type: string): void
    {
        this.renderAction(type);
        
        this.nActionTypeQueue.length = 0;
        this.nActionEffectQueue.length = 0;
        this.effectQueueParm.length = 0;
    }
    
    /*
     * 上一动作完成自动从动作缓冲区读取下一个动作
     * 
     */
    protected playNextAction(evt: egret.Event):void
    {
        if(this.mabiArr.length != 0)
            return;
        
        if(this._sprintTarget != undefined)//冲刺特殊处理
        {
            return;
        }
        
        if(this.nActionTypeQueue.length)
        {
            var act: string = this.nActionTypeQueue.shift();
            if(this.nPlayingType == ActionType.DIE || this.isDie)
            {
                this.sendDie();
            }else if(this.nActionTypeQueue.length > 0)
            {
                this.renderAction(this.nActionTypeQueue[0]);
                if(this.nActionEffectQueue.length)
                {
                    var s: any = this.nActionEffectQueue.shift();
                    var obj:any = this.effectQueueParm.shift();
                    this.playEffect(s,1,this.nAttackSpeed,obj.currDir,obj.nScaleX);
                }
                return;//如果是还有动作队列则不会触发AI
            }else if(this.onMoveing)
            {
                if(this.nRace == ActorRace.MONSTER)
                {
                    this.playActionType(ActionType.WALK);
                }else
                {
                    this.playActionType(ActionType.RUN);
                }
            }else
            {
                this.playActionType(ActionType.STAND);
            }
        }

        this.AI();
        if(this.nPlayingType == ActionType.DIE || this.isDie )
        {
           this.sendDie();
        }
    }
    /**
     * 发送死亡消息
     */ 
    protected sendDie():void
    {

    }
    
    protected delayHitHandle: number = -1;
    /*
     * 更新
     */
    public update(tick: number): void
    {
        this.triggerBuffResult(tick);
        if(this.m_JumpPoints != null)
        {
            if(!this.isMoving)
            {
                 this.runJump();
                 return;
            }
        }
        //移动
        this.processMove(tick);
        
        if(this.mabiArr.length != 0)
        {
            return;
        }
        
        //先判断一下是否已经达到技能命中时间
        // if(this.nCurrentSkill && this.nTargeter && tick - this.nCurrentSkill.prevUseTime > this.nCurrentSkill.getHitTime())
        // {
        //     this.skillHitTarget(this.targetHandle,this.nCurrentSkill);
        // }
        
        //判断动作播放是否超时
        if(this.nActionTick < tick && this.nActionTick > -1)
        {
            this.nActionTick = -1;
            this.playNextAction(null);
        }
        
        
        var i: number,clip: clips.BmpClip,buff: BuffVo;
        
        //判断特效是否已经完成
        for(i = this.nEffectlst.length-1;i >= 0 ;i--)
        {
            clip = this.nEffectlst[i];
            //trace("endEffect---",clip.lastPlayTimes);
            if(clip.lastPlayTimes == 0 || clip.onPlaying == false || (clip.endPlayloop > 0 && clip.endPlayloop < tick))
            {
                this.nEffectlst.splice(i,1);
                if(clip == this.actionEff)
                    this.actionEff = null;
                clip.destruct();
            }
        }
        this.readytime = tick >= this.readytime?0:this.readytime;
        this.AI();
    }
    
  private triggerBuffResult(tick:number):void
    {
        var i: number,buff:BuffVo;
        var overTime:boolean = true;
        for(i = this.nBuffs.length-1;i>=0;i--)
        {
            buff = this.nBuffs[i];
            if(buff.endTime == 0)
                continue;
            if(tick > buff.endTime) {
                if(buff.triggerCount == buff.interval.length)//间隔BUFF没完毕、下轮回删除
                {
                    this.removeBuff(i);
                    continue;
                }
            }

            //检测间隔触发的
            var total:number = 0;
            for(var j:number=buff.interval.length-1;j>=0;j--)
            {
                if(tick >= buff.interval[j])
                {
                    total = j + 1;
                    break;
                }
            }

            while(buff.triggerCount != total)
            {
                switch(buff.type)
                {
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
                total --;   
            }
        }
    }
    
    public addBuff(buff:BuffVo):void
    {
        for(var i:number = 0;i>this.nBuffs.length;i++)
        {
            if(this.nBuffs[i].type == buff.type && this.nBuffs[i].value == buff.value &&
            this.nBuffs[i].hurtType == buff.hurtType)
            {
                this.nBuffs[i].endTime = buff.endTime;
                return;
            }
        }
        if(buff.interval.length == 0)//非间隔作用时间的BUFF直接添加BUFF属性
        {
            if(buff.type == ComAttribute.giddyPCT)
            {
                this.mabiArr.push(buff.handle);
                // CutHpEffect.playEffect("眩晕",0xFF00FF,this,0,-100);
                this.playActionType(ActionType.READY);
                return;
            }
            if(buff.type == ComAttribute.frost)
            {
                this.mabiArr.push(buff.handle);
                // CutHpEffect.playEffect("冰冻",0xFF00FF,this,0,-100);
                this.playActionType(ActionType.READY);
                return;
            }
            AttributeUtlis.BuffAttributeByTarge(buff,this["actorVo"],true);
        }
        this.nBuffs.push(buff);
    }

    /**
     * 移除buff
     * @param type
     */
    public removeBuff(dx:number,handle?:number):void
    {
        var buff:BuffVo;
        if(!handle)
            buff = this.nBuffs[dx];
        else
        {
            for(var i:number=0;i<this.nBuffs.length;i++)
            {
                if(this.nBuffs[i].handle == handle)
                {
                    buff = this.nBuffs[i];
                    dx = i;
                    break;
                }
            }
        }
        if(!buff)
        {
            egret.log("BUFF移除失败!");
            return;
        }
        if(buff.interval.length == 0)
        {
            if(buff.type == ComAttribute.giddyPCT || buff.type == ComAttribute.frost)
                this.mabiArr.splice(this.mabiArr.indexOf(buff.handle),1);
            else
                AttributeUtlis.BuffAttributeByTarge(buff,this["actorVo"],false);
        }
        buff.destruct();
        this.nBuffs.splice(dx,1);
    }
    /*
     * 添加动作到动作缓冲器
     * 如果立即播放则返回true，否则返回false
     */ 
    public addActionQueue(type:string):Boolean
    {
        if(type == ActionType.READY)
        {
            if(this.onMoveing)
            {
                if(this.nRace == ActorRace.MONSTER) {
                    type = ActionType.WALK;
                } else {
                    type = ActionType.RUN;
                }
            }
        }
        if((type == ActionType.STAND || type == ActionType.READY) && this.nActionTypeQueue[0] == type)
        {
            return;
        }
        this.nActionTypeQueue.push(type);
        if(this.nActionTypeQueue.length <= 1)
        {
            this.renderAction(this.nActionTypeQueue[0]);
            return true;
        }
        return false;
    }
    
    /**
     * 获取当前动作缓冲器里的动作
     */ 
    public get currentActionType():string
    {
        if(this.nActionTypeQueue.length <= 0)
            return this.nPlayingType;
        return this.nActionTypeQueue[0];
    }
    /*
     * 智能
     */ 
    public AI():void
    {
        
    }
    
    /**
     * 获取同伙
     */ 
    public getAllys():Array<BaseActor>
    {
        return new Array<BaseActor>();
    }
    
    /**
     * 获取敌人列表
     */ 
    public getEnemy():Array<BaseActor>
    {
        return new Array<BaseActor>();
    }

    /*
     * 死亡
     */ 
    public die():void
    {
        if(this.nDie)
            return;
            
        // this.hideTargetEffect();
        this.selected = 0;
        this.nDie = true;
        this.nActionTypeQueue.length = 0;
        this.playActionType(ActionType.DIE);
        this.endMove(false);
    }

    public endMove(sync:Boolean = true):void
    {
        super.endMove(sync);
        if(this._sprintTarget != undefined)
        {
            this._sprintTarget = undefined;
            this.setAttackTarget(undefined);
            //trace("结束冲刺---");
        }
        this.syncMapPosition();
    }

    public get isDie():Boolean
    {
        return this.nDie;
    }
    
    private delayFilters:number = 0;
    public set bodyFilters(arr:Array<any>)
    {
        if(arr)
        {
            if(this.delayFilters != 0 && this.nBodyclip.filters != null)
                return;
            this.nBodyclip.filters = arr;
            this.delayFilters = egret.setTimeout(()=>{
                this.bodyFilters = null;
                this.delayFilters = 0;
            },this,500);
        }else
        {
            this.nBodyclip.filters = arr;
            if(this.delayFilters != 0)
                egret.clearTimeout(this.delayFilters);
            this.delayFilters = 0;
        }
    }

    /*
     * 销毁
     */ 
    public destruct(gc:Boolean = false): void
    {
        this.sleep = true;
        this.bodyFilters = null;
        this.receive();
        if(gc)
        {
            this.nBodyclip.destruct();
            this.nBodyclip = null;
        }
    }
    public receive():void
    {
        this.mabiArr.length = this.skills.length = this.useingSkill.length = 0;
        this.m_JumpPoints = null;
        this.nTargeter = undefined;
        
        this.receiveTime = egret.getTimer();
        this.sleep = true;
        
        if(this.delayHitHandle != -1){
            egret.clearTimeout(this.delayHitHandle);
            this.delayHitHandle = -1;
        }
        if(this.parent) {
            this.parent.removeChild(this);
        }
        
        
        this.nBodyclip.stop();
        this.nBodyclip.clearData();
        
        this.nWeaponclip.stop();
        this.nWeaponclip.clearData();
        
        this.nWingclip.stop();
        this.nWingclip.clearData();
        
        for(var i: number = this.nBuffs.length-1;i>=0;i--){
            this.removeBuff(i);
        }
        this.nBuffs.length = 0;
        this.nActionTypeQueue.length = 0;
        this.removeAllEffects();
        
        this.nBodyclip.removeEventListener(egret.Event.LOOP_COMPLETE,this.playNextAction,this);
        this.nBodyclip.removeEventListener(egret.Event.COMPLETE,this.playNextAction,this);
        
    }

    private m_dwJumpStartTick: number; //跳跃起始时间
		private m_nJumpTime: number; //跳跃持续时间
        private m_nJumpUpInterval: number; //跳跃时抛物线更新的周期，单位是毫秒
		protected m_JumpPoints: Array<egret.Point>;	//跳跃位置抛物线采样点
        private m_nJumpPointIdx: number; //跳跃抛物线位置索引
        private m_nJumpDestX: number; //跳跃落点X
        private m_nJumpDestY: number; //跳跃落点Y
        private static DefaultJumpSpeed: number = 1/3;
        //角色跳跃动作的更新速度，单位是毫秒
		public static DefaultJumpUpInterval: number = 50;
        public jumpTo(X: number, Y: number,isStruckFly:boolean = false, maxTime:number = 10): void
		{
			var nSamplingCount: number;
			var nActionTime: number;
			
			this.m_nJumpDestX = X;
            this.m_nJumpDestY = Y;			
			
			//计算跳跃时间
            this.m_nJumpTime = Math.max(Math.abs(X - this.currentX) / BaseActor.DefaultJumpSpeed,Math.abs(Y - this.currentY) / BaseActor.DefaultJumpSpeed);
            nSamplingCount = this.m_nJumpTime * 2;
            if(this.m_nJumpTime > maxTime) this.m_nJumpTime = maxTime;//限制抛物线不超过1秒，否则速度太慢会引起Y轴曲线太高的问题
				
            nActionTime = this.m_nJumpTime * BaseActor.DefaultJumpUpInterval;
            this.m_dwJumpStartTick = GameLogic.ins.gameRunTick;
            this.m_nJumpUpInterval = nActionTime / nSamplingCount;
            var accY: number = 0;
			if(isStruckFly)
			{
//				m_dwJumpStartTick += DefaultJumpUpInterval * 10;   //跳跃延迟一点,做出硬直效果
				//随机一个重力加速度,因为坐标系Y轴是相反的,所以g越大,飞的越高
                accY = Math.abs(this.currentX - X)*6 + 20*Math.random();
			}
			
            this.m_JumpPoints = Parabola.MakeParabolaPoints(
                (this.currentX + 0.5) * DisplayMapObject.MAP_CELL_WIDE,(this.currentY + 0.5) * DisplayMapObject.MAP_CELL_HIDE, 
                (X + 0.5) * DisplayMapObject.MAP_CELL_WIDE,(Y + 0.5) * DisplayMapObject.MAP_CELL_HIDE, 
                this.m_nJumpTime, nSamplingCount,accY);
			
            this.m_nJumpPointIdx = 0;
			
			//跳跃开始时需同步设置角色位置，防止在跳跃期间发出寻路或移动指令而导致起点计算错误
            this.setPosition(X,Y);
            this.nTargetX = X;
            this.nTargetY = Y;		
			
		}
		protected  runJump(): void
		{
            var nIdx: number = Math.floor((GameLogic.ins.gameRunTick- this.m_dwJumpStartTick) / this.m_nJumpUpInterval);
			if (nIdx == this.m_nJumpPointIdx)
				return;
            if(isNaN(nIdx) || nIdx >= this.m_JumpPoints.length)
			{
                this.endJump();
			}
			else if(nIdx >= 0)
			{
                this.m_nJumpPointIdx = nIdx;
                var pt: egret.Point = this.m_JumpPoints[nIdx];
                this.updateJumpOffset(pt);
			}
		}
		protected endJump(): void
		{
            this.m_JumpPoints = null;
            this.setCurrentXY(this.m_nJumpDestX,this.m_nJumpDestY);
		}
		protected updateJumpOffset(posInPixel: egret.Point): void
		{
            this.x = posInPixel.x;
            this.y = posInPixel.y;
		}

            /**
     * 设置攻击目标
     */
    private setAttackTarget(target: BaseActor): void
    {
        if(!this.nLockTarget || this.nLockTarget.isDie || this.nLockTarget.sleep)
        {
            this.nLockTarget = undefined;
        }
        if(this.nLockTarget && !this.nLockTarget.isDie && !this.nLockTarget.sleep)
        {
            this.nTargeter = this.nLockTarget;
        }else
        {
            this.nTargeter = target;
            if(this.nTargeter && (this.nTargeter.isDie || this.nTargeter.sleep))
            {
                this.nTargeter = undefined;
            }
        }
    }

    /**
     * 锁定攻击目标
     */
    public lockAttackTarget(target: BaseActor)
    {
        this.nLockTarget = target;
        if(this.nTargeter != target) {
            this.setAttackTarget(target);
        }
    }
    public get currLockTarget():BaseActor
    {
        if(!this.nLockTarget || this.nLockTarget.isDie || this.nLockTarget.sleep)
        {
            return null;
        }
        return this.nLockTarget;
    }

    /**
     * 播放并使用技能
     */
    protected actionEff:clips.BmpClip;
    public playSkill(vo:SkillVo,needTarge:boolean=true):void
    {
        vo.useSkill();//标示技能的使用时间
        this.nCurrentSkill = vo;
        this.nBodyclip.playLoopTime = this.nAttackSpeed;
        var std:any = vo.stdSkill;
        var i:number,stdAction: StdSkillAction,clip:clips.BmpClip;
        if(!needTarge)
        {
            
        }
        else if(this.nTargeter)
        {
            this.nDirection = this.countTargetDirection(this.nTargeter,this.nDirection);//面向目标
        }else if(this.nTargetPoint.x != -1 && this.nTargetPoint.y != -1)
        {
            this.nDirection = this.countPointDirection(this.nTargetPoint,this.nDirection);
        }
        vo.dir = this.nDirection;
        // if(vo.stdSkill.skill_id != SkillMgr.COMMON_SKILL_ID && this.attackNum == 0)
        //     UserTips.ins().showTips("释放  " + vo.stdSkill.name +  "  技能成功!");
        //播放起手动作
        for(i = 0;i < vo.actions.length;i++)
        {
            stdAction = vo.actions[i];
            if(this.addActionQueue(stdAction.act))//如果对应的动作已经开始播放
            {
                var c:clips.BmpClip = this.playEffect(stdAction,1,this.nAttackSpeed);
                if(c && stdAction.act == ActionType.ATTACK88)
                   this.actionEff = c;
            }else
            {
                this.effectQueueParm.push({currDir:this.direction,nScaleX:this.nBodyclip.scaleX})
                this.nActionEffectQueue.push(stdAction);
            }
        }
        this.addActionQueue(ActionType.READY);
        
        this.targetHandle = !needTarge?0:this.nTargeter.handleId;

        //播放命中效果
        // if(std.hitTime > 0 && vo.actions.length > 0)//延迟命中
        // {
            if(this.delayHitHandle == -1)
            {
                this.delayHitHandle = egret.setTimeout(this.skillHitTarget,this,this.nAttackSpeed - std.hitTime,this.targetHandle,vo);
            }
        // }else//直接命中
        // {
        //     this.skillHitTarget(this.targetHandle,vo);
        // }
    }

     public playEffect(actObj: any,times: number = 1,keepTime?: number,dir: number = -1,nScaleX:number=undefined):clips.BmpClip
    {
        if(!actObj)
        {
            return null;
        }
        
        var stdact: any,effectId: number,hasPart:number;
        stdact = <any>actObj;
        if(typeof (actObj) == "number")
        {
            effectId = Number(actObj);
        }else
        {
            effectId = stdact.effect;
            hasPart = stdact.hasDir;
        }
        if(!effectId) {
            return null;
        }
        
        var clip: clips.BmpClip;
        if(hasPart || dir != -1)
        {
            var ndir: number = BaseActor.lrDirs[dir==-1?this.nDirection:dir];
            clip = ModelResMgr.getSkillEffect(effectId,null,ndir.toString());
            clip.setScaleX(this.nBodyclip.scaleX);
        }else
        {
            clip = ModelResMgr.getSkillEffect(effectId);
        }
        if(clip.isComplete)
        {
            if(keepTime != -1)
            {
                if(times == 1)
                {
                    clip.playLoopTime = keepTime;
                }else
                {
                    clip.endPlayloop = keepTime;
                }
            }
            clip.play(times);
            this.addChild(clip);
            this.nEffectlst.push(clip);
        }else//如果未加载完则不显示了
        {
            if(times == -1)
            {
                clip.play(times);
                this.addChild(clip);
                this.nEffectlst.push(clip);
                return clip;
            }
            clip.destruct();
            return null;
        }
        return clip;
    }
    protected targetHandle:number = 0;
    protected skillHitTarget(targetHandle:number,vo:SkillVo):void
    {
        if(this.delayHitHandle != -1)
        {
            egret.clearTimeout(this.delayHitHandle);
            this.delayHitHandle = -1;
        }
        if(targetHandle == 0|| (this.nTargeter != undefined && !this.nTargeter.sleep && !this.nTargeter.isDie && this.nTargeter.handleId == targetHandle
        ))
        {
            if(SkillMgr.ins.isMaxSkill(vo))
                GameMap.ins().shake(20,20,500);
           GameLogic.ins.skillHitTarget(this.nCurrentSkill,this,this.nTargeter);
        }
        this.endSkill();
    }

    public endSkill():void
    {
        // egret.log("强制结束技能!this")
        // this.attackTarges = null;
        if(this.delayHitHandle != -1)
        {
            egret.clearTimeout(this.delayHitHandle);
            this.delayHitHandle = -1;
        }
        this.nTargeter = undefined;
        this.lockAttackTarget(this.nLockTarget);
        // this.attackNum = 0;
        this.nSelectdSkill = undefined;
        this.nCurrentSkill = undefined;
    }

    public addHp(hp: number):void
    {
        
    }

    /**
     * 冲刺
     */ 
    protected _sprintTarget:BaseActor;
    public sprint(dir: number,distance: number,target: BaseActor,sprintRate:number):number
    {
        this.nDirection = dir;
        this.nActionTypeQueue.length = 0;
        
        var po:egret.Point = DisplayMapObject.DIR_LS[this.nDirection];
        var targetX: number = this.currentX;
        var targetY: number = this.currentY;
        for(var i:number=1;i<=distance;i++)
        {
            //主动者每冲刺一步先检测 前面第一步  第二步
            if(GameMap.ins().moveable(targetX + po.x*i,targetY + po.y*i))
            {  
                targetX += po.x;
                targetY += po.y; 
            }else
            {
                egret.log("冲刺遇到障碍!!!");
                break;
            }
        }
        
        var dx: number = Math.abs(targetX - this.currentX);
        var dy: number = Math.abs(targetY - this.currentY);
        
        var range: number = Math.max(dx,dy);
        if(range > 0)
        {
            this._sprintTarget = target;
            var sprintRange: number = this.nMoveSpeed * range / sprintRate;
            if(this.moveTo(targetX,targetY,sprintRange)) {
                // this.addActionQueue(ActionType.RUN);
                // this.nBodyclip.playLoopTime = this.nMoveSpeed / sprintRate;//如果是移动的话就是用定制的动作速度
            }
        }
        return range;
    }


    public getBuffByType(type:number):boolean
    {
        for(var i:number=0;i<this.nBuffs.length;i++)
        {
            if(this.nBuffs[i].type == type)
                return true;
        }
        return false;
    }
    /*
     * 重写移动，同步地图
     */
    public processMove(tick: number): void
    {
        super.processMove(tick);
        this.syncMapPosition();
    }

    protected mabiArr:Array<number>;

    // public attackNum:number = 0;
    // public attackTarges:Array<BaseActor>;


	private lastX:number;
	private lastY:number;
    private globalPosition: egret.Point = new egret.Point(0,0);
    private rect:egret.Rectangle = new egret.Rectangle();
    public syncMapPosition():void
    {
        if(this.stage  && (this.lastX != this.x || this.lastY != this.y || GameMap.ins().m_dwShakingOverTick))
		{
            this.lastX = this.x;
			this.lastY = this.y;
            if(this.nRace == ActorRace.HUMAN)
            {
                this.globalPosition = this.stage.globalToLocal(GlobalVo.GAME_W / 2,GlobalVo.GAME_H / 2);
                var winX:number = (this.globalPosition.x - this.x);
                var winY:number = (this.globalPosition.y - this.y);

                //检测出界
                let minXYpo:egret.Point = MapVo.ins.minXYpo;
                let nx:number = winX >0?0:(winX < minXYpo.x?minXYpo.x:winX);
                let ny:number = winY >0?0:(winY < minXYpo.y?minXYpo.y:winY);
                if(GameMap.ins().titleLayXY(nx,ny,GameMap.ins().m_dwShakingOverTick!=0))
                {
                    // GameScene.ins.setActorXY(nx + GameMap.ins().m_nLayersOffsetX,ny + + GameMap.ins().m_nLayersOffsetX)
                    // GameLogic.ins().checkVisibleRange(nx,ny);
                }
                // if(force)
                //     GameLogic.ins.checkVisibleRange(nx,ny,force);
                //以人物为中心点、处理小地图显示
                DataEventDispatcher.dispatchEventWith(GameEvent.CHANGE_MINIMAP,{a:this.x,b:this.y});
            }
		}
    }
}
