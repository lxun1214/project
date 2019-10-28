class SkillIconItemII extends eui.Component{
	labName:eui.Label;
	labLv:eui.Label;
	n_icon:eui.Image;
	suo:eui.Image;
	public constructor() {
		super();
		this.skinName = "SkillItemSkin";
		this.n_icon = this["icon"]["imgIcon"];
		this.suo.visible = false;
		this.touchChildren = false;
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.SKILL_UP_LVL,this.upSkillLvl,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL,this.upSkillLvl,this);
	}
	public skillVo:SkillVo;
	offLvl:number;
	public setSkillData(d:any,lvl:number = 0):void
	{
		this.offLvl = lvl;
		this.skillVo = SkillMgr.ins.getRoleSkill(d.secondarySkill_id)
		this.labName.text = d.description2;
		this.n_icon.source = ResMgr.skillIcon(d.skillIcon);
		this.upSkillLvl();
	}

	private upSkillLvl(e:egret.Event=null):void
	{
		if(!this.skillVo )
			return;
		this.labLv.text = "LV." + (this.skillVo.level+this.offLvl);
	}
}