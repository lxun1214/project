class SelectSkillPanel extends BaseEuiView{
	public constructor() {
		super();
		this.skinName = "selectSkillSkin";
	}
	protected euiCompete():void
	{
		super.euiCompete()
		for(var i:number = 0;i<4;i++)
		{
			this.addTouchEvent(this["skill" + i],(e:egret.TouchEvent)=>{
				if(e.currentTarget.data.level == 0)
					UserTips.ins().showTipsBigToSmall("技能未学习,无法使用!");
				else
				{
					DataEventDispatcher.dispatchEventWith(GameEvent.SELECT_SKILL,{a:this.dx,b:e.currentTarget.data});
				}
				this.visible = false;
			});
		}
	}

	jt:eui.Image;
	private dx:number;
	public open(...param: any[])
	{
		super.open(param);
		this.dx = param[0];
		var skills:Array<SkillVo> = SkillMgr.ins.getRoleSkillByGroup(param[1].stdSkill.skill_id);
		for(var i:number=0;i<skills.length;i++)
		{
			this["skill" + i].setData(skills[i],true);
			this["skill" + i].monitorCD = false;
		}
		UIDmgr.bindingUID(this["skill1"],uid.skill1);
		this.visible = true;
		var nx:number = egret.MainContext.instance.stage.stageWidth > 750?(egret.MainContext.instance.stage.stageWidth-750)/2:0;
		var ny:number = egret.MainContext.instance.stage.stageHeight > 1334?(egret.MainContext.instance.stage.stageHeight-1334):0;
		switch(this.dx)
		{
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
				// this.x = nx + -20 + this.dx *(280/5);
				// this.y = 261;
				// this.jt.x = nx + (750 - 102*6)/8 * (this.dx+1) + this.dx * 102 + 102/2 - this.x - 16 + ny;
				break;
			case 6:
				// this.x = -20 + 5 *(280/5) + nx*2;
				// this.y = 80 + ny;
				// this.jt.x = (750 - 102*6)/8 * 7 + 5 * 102 + 102/2 - this.x - 16 + nx*2;
				break;
		}
	}
}