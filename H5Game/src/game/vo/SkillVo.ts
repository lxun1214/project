class SkillVo {
    //0目标特效  1飞弹特效 2场景特效
    static SKILL_EFF_TYPE_0:number = 0;
    static SKILL_EFF_TYPE_1:number = 1;
    static SKILL_EFF_TYPE_2:number = 2;
    static SKILL_DOWN_CD:string = "SKILL_DOWN_CD";

    private nlevel: number;       //技能等级
    
    public _currentCD: number;   //技能cd
    private _prevuseTime: number;//上一次使用的时间
    private skillId:number;

    public stdSkill:any;
    public buffHandle:Array<number>;

    public skillRange:StdSkillRange;
    public actions:Array<StdSkillAction>;

    public needTarge:boolean;
    public dis:number;

    public HitNum:Array<string>;

    public initiativeSkill:boolean;
    public dir:number;//技能方向
    public skillHit:Array<string>;//  目标 类型  值  0值1百分比
    public constructor(skillId: number,lv: number,cd?: number,prevuseTime?:number)
	{
        this.skillRange = new StdSkillRange();
        this.actions = [];
        this.sceneEffect = [];
        this.unMissileEffects = [];
        this.skillId = skillId;
        this.level = lv;
        this._currentCD = 0;
        if(cd !== undefined)
        {
            this._currentCD = cd;
        }
        if(prevuseTime !== undefined)
        {
            this._prevuseTime = prevuseTime;
        }
        this.buffHandle = [];
	}

    public get level():number
    {
        return this.nlevel;
    }

    public set level(val:number)
    {
        this.nlevel = val;
        this.stdSkill = SkillMgr.skillConfigByID(this.skillId,val<=0?1:val);

        if(this.stdSkill)
        {
            var a :Array<string>;
            this.skillRange.data = this.stdSkill.skillRange;
            var i:number;

            this.actions.length = 0;
            if(this.stdSkill.actions && this.stdSkill.actions != "" && this.stdSkill.actions != "0")
            {
                a = this.stdSkill.actions.split("#");
                var actionVo:StdSkillAction;
                for(i=0;i<a.length;i++)
                {
                    actionVo = new StdSkillAction();
                    actionVo.data = a[i];
                    this.actions.push(actionVo);
                }
            }else
                this.actions.length = 0;

            this.sceneEffect.length = this.unMissileEffects.length = 0;
            if(this.stdSkill.playEffect && this.stdSkill.playEffect != "" && this.stdSkill.playEffect != "0")
            {   
                 a = this.stdSkill.playEffect.split("#");
                 var hitVo:StdSkillHitEffect;
                for(i=0;i<a.length;i++)
                {
                    hitVo = new StdSkillHitEffect();
                    hitVo.data = a[i];
                    if(hitVo.type == SkillVo.SKILL_EFF_TYPE_1  || hitVo.type == SkillVo.SKILL_EFF_TYPE_2)
                        this.sceneEffect.push(hitVo);
                    else
                        this.unMissileEffects.push(hitVo);
                }
            }
            if(this.stdSkill["disTarge"] != 0)
            {
                a = (<string>this.stdSkill["disTarge"]).split(",");
                this.needTarge = a[0] == "1";
                this.dis = !this.needTarge?0:parseInt(a[1]);
            }else
                this.needTarge =false;

            if(this.stdSkill.HitNum && this.stdSkill.HitNum != "" && this.stdSkill.HitNum != "0" && this.stdSkill.HitNum != 0)
                 this.HitNum = (<string>this.stdSkill.HitNum + "").split(",");
            else
                this.HitNum = null;

            this.initiativeSkill = this.stdSkill.duration == "infinite";

            if(this.stdSkill.skillHit && this.stdSkill.skillHit != "" && this.stdSkill.skillHit != "0")
                this.skillHit = (<string>this.stdSkill.skillHit).split("#");
            else
                this.skillHit = null;
        }
    }

	/**
	 * 使用技能
	 *  重置cd
	 */ 
	public useSkill():void
	{
        this._prevuseTime = GameLogic.ins.gameRunTick;
        this._currentCD = this._prevuseTime + this.stdSkill.CD;
        DataEventDispatcher.dispatchEventWith(SkillVo.SKILL_DOWN_CD,this);
	}
	public get prevUseTime():number
	{
        return this._prevuseTime;
	}
    public get canUse():Boolean
	{
        return this._currentCD < GameLogic.ins.gameRunTick;
	}

    public resetCD():void
	{
        this._currentCD = GameLogic.ins.gameRunTick;
	}
    /**
	 * 获取命中延迟时间
	 */ 
	// public getHitTime():number
	// {
    //     return this.stdSkill.hitTime;
	// }

    public sceneEffect: Array<StdSkillHitEffect>;
    public unMissileEffects: Array<StdSkillHitEffect>;

    //是否单体技能
    public get singleAttack():boolean
    {
        return this.skillRange.g == 1 || (this.skillRange.w == 1 && this.skillRange.h == 1)
    }

    //是否多次攻击技能
    public get multipleAttack():number
    {
        if(!this.HitNum)
            return 0;
        return parseInt(this.HitNum[0]);
    }
}