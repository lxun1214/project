class SkillLvlItem extends eui.Component{
	public constructor() {
		super();
		this.skinName = "SkillLvItemRender";
		this.skillList.itemRenderer = SkillIconItem;
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL,this.upStatus,this);
	}

	n0:eui.Label;
	labLv:eui.Label;
	skillList:eui.List;
	l3:eui.Label;
	g0:eui.Group;
	$vo:Array<any>;
	public set skillData(vo:Array<any>)
	{
		this.$vo = vo;
		this.n0.text = vo[0].need_role_lvl + "级解锁!"
		this.labLv.text = vo[0].need_role_lvl;
		this.skillList.dataProvider = new eui.ArrayCollection(vo);
		this.l3.text = vo[0].name;
		this.upStatus();
	}

	private upStatus():void
	{
		var hide:boolean = true;
		for(var i:number=0;i<this.$vo.length;i++)
		{
			 if(SkillMgr.ins.getRoleSkill(this.$vo[i].secondarySkill_id).level > 0)
			 {
				hide = false;
				break;
			 }
		}
		this.g0.visible = hide;
	}
}