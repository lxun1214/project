class ModelResMgr {
	public static ins:ModelResMgr;
    public static _url_moviedatas:Array<egret.MovieClipData>;
	private humanModelGroup: clips.ClipGroup;//人物模型管理器
    private monsterModelGroup: clips.ClipGroup;//怪物模型管理器
    private weaponModelGroup: clips.ClipGroup;//武器模型
    private wingModelGroup: clips.ClipGroup;//翅膀模型
    private helmetModelGroup: clips.ClipGroup;//头盔模型
    private skillEffectGroup: clips.ClipGroup;//技能特效动画
    private otherEffectGroup: clips.ClipGroup;//特效动画
	public constructor() {
        ModelResMgr._url_moviedatas = [];
		let path:string = ParamMgr.gameSynRes + "/assets/model/";
		let obj:any = ConfigMgr.gameConfig["globalConfig"];
		this.humanModelGroup = new clips.ClipGroup(path+"human/",obj.humanVer);
        this.monsterModelGroup = new clips.ClipGroup(path+"monster/",obj.monsterVer);
        this.weaponModelGroup = new clips.ClipGroup(path+"weapon/",obj.weaponVer);
        this.helmetModelGroup = new clips.ClipGroup(path+"helmet/",obj.helmetVer);
        this.skillEffectGroup = new clips.ClipGroup(path+"skill/effect/",obj.skillVer);
        this.otherEffectGroup = new clips.ClipGroup(path+"other/",obj.otherVer);
        this.wingModelGroup = new clips.ClipGroup(path + "wing/",obj.wing);
        ModelResMgr.ins = this;
	}
    /**
     * 获取头盔特效
     */ 
    public static getHelmetEffect(index: number,mc?: egret.MovieClip,part?: string): clips.BmpClip
    {
        return ModelResMgr.ins.helmetModelGroup.getBmpClip(index,mc,part);
    }
	/**
	 * 获取角色模型
	 */ 
    public static getHumanModel(index: number,mc?: egret.MovieClip,part?:string):clips.BmpClip
	{
        var clip:clips.BmpClip = ModelResMgr.ins.humanModelGroup.getBmpClip(index,mc,part);
        if(!clip.isComplete)
        {
            clip.movieClipData = BaseActor.getDefaultBody();
        }
        return clip;
	}
	/**
     * 获取武器模型
     */ 
    public static getWeaponModel(index: number,mc?: egret.MovieClip,part?: string): clips.BmpClip
    {
        var clip: clips.BmpClip = ModelResMgr.ins.weaponModelGroup.getBmpClip(index,mc,part);
        if(!clip.isComplete) {
            clip.movieClipData = BaseActor.getDefaultBody();
        }
        return clip;
    }
	/**
	 * 获取怪物模型
	 */ 
    public static getMonsterModel(index: number,mc?: egret.MovieClip,part?: string): clips.BmpClip
    {
        var clip: clips.BmpClip = ModelResMgr.ins.monsterModelGroup.getBmpClip(index,mc,part);
        if(!clip.isComplete) {
            clip.movieClipData = BaseActor.getDefaultBody();
        }
        return clip;
    }

    /**
     * 获取翅膀模型
     */ 
    public static getWingModel(index: number,mc?: egret.MovieClip,part?: string): clips.BmpClip
    {
        var clip: clips.BmpClip = ModelResMgr.ins.wingModelGroup.getBmpClip(index,mc,part);
        if(!clip.isComplete) {
            clip.movieClipData = BaseActor.getDefaultBody();
        }
        return clip;
    }

    /**
     * 获取技能特效
     */ 
    public static getSkillEffect(index: number,mc?: egret.MovieClip,part?: string): clips.BmpClip
    {
        return ModelResMgr.ins.skillEffectGroup.getBmpClip(index,mc,part);
    }
    
    /**
     * 获取其他特效
     */ 
    public static getOtherEffect(index: number,mc?:egret.MovieClip,part?:string): clips.BmpClip
    {
        return ModelResMgr.ins.otherEffectGroup.getBmpClip(index,mc,part);
    }
}