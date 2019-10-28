class SkillIconItem extends eui.ItemRenderer{
	labName:eui.Label;
	labLv:eui.Label;
	n_icon:eui.Image;
	suo:eui.Image;
	l0:eui.Label;

	
	private _lookSkill : boolean = false;
	public get lookSkill() : boolean {
		return this._lookSkill;
	}
	public set lookSkill(v : boolean) {
		this._lookSkill = v;
	}
	
	public constructor() {
		super();
		this.skinName = "SkillItemSkin";
		this.n_icon = this["icon"]["imgIcon"];
		this.touchChildren = false;
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.SKILL_UP_LVL,this.upSkillLvl,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL,this.upSkillLvl,this);

		DataEventDispatcher.dispatcher.addEventListener(GameEvent.RED_SKILL,()=>{
			ViewManager.redToTarge(this,RemindMgr.CAN_UP_SKILL.indexOf(this.skillVo) != -1 || SkillMgr.NEW_STUDY.indexOf(this.skillVo) != -1);
		},this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.SELECT_SKILL,this.useSkill,this);
	}
	private useSkill():void
	{
		if(this.skillVo)
			this.l0.visible = UserVo.ins.skillColumn.indexOf(this.skillVo.stdSkill.tab) != -1;
	}
	public skillVo:SkillVo;
	public dataChanged():void
	{
		this.skillVo = SkillMgr.ins.getRoleSkill(this.data.secondarySkill_id)
		// this.labLv.text = "LV." + this.skillVo.level;
		this.labName.text = this.data.description2;
		this.n_icon.source = ResMgr.skillIcon(this.data.skillIcon);
		this.upSkillLvl();
		this.useSkill();

		if(!this._lookSkill)
		{
			var d:number = SkillMgr.ins.groupSkillId[0];
			if(this.data.secondarySkill_id == d || this.data.secondarySkill_id == d+1)
			{
				this.addEventListener(egret.Event.ADDED_TO_STAGE,this.checkGuide,this);
			}
			this.checkGuide();
		}
	}

	checkGuide():void
	{
		var d:number = SkillMgr.ins.groupSkillId[0];
		if(this.data.secondarySkill_id == d)
			UIDmgr.bindingUID(this,uid.jn1);
		else
			UIDmgr.bindingUID(this,uid.jn4);
	}
	private upSkillLvl(e:egret.Event=null):void
	{
		if(!this.skillVo )
			return;
		this.labLv.text = "LV." + this.skillVo.level;
		this.suo.visible = this.skillVo.level == 0;
		if(!e || e.type == GameEvent.STUDY_SKILL)
			ViewManager.redToTarge(this,SkillMgr.NEW_STUDY.indexOf(this.skillVo) != -1 || RemindMgr.CAN_UP_SKILL.indexOf(this.skillVo) != -1);
	}
}