class SkillWin extends BaseEuiView{
	public constructor() {
		super();
		this.skinName = "SkillSkin";
	}
	roleBtn1:eui.ToggleButton
	public createChildren(): void{
		super.createChildren();
		// this.pt.titleImg.source = "t_4";
	}
	itemGroup:eui.Group;
	lookPanel:LookSkillPanel;
	public open(...param: any[]): void{
		super.open();
		for(var i:number=0;i<this.itemGroup.numChildren-1;i++)
		{
			if(this.itemGroup.getChildAt(i) != this.lookPanel)
				this.addTouchEvent(this.itemGroup.getChildAt(i),this.onClick);
		}
		UIDmgr.bindingUID(this,uid.jnP1);
	}

	private onClick(e:egret.TouchEvent):void
	{
		if(e.currentTarget instanceof SkillLvlItem)
		{
			var dx:number = parseInt(e.currentTarget.name);
			if(e.target instanceof SkillIconItem)
			{
				if(e.target.skillVo.level == 0)
				{
					UserTips.ins().showTipsBigToSmall("当前技能还未开启!")
					return;
				}
				this.lookPanel.setData(e.target.skillVo,e.target.itemIndex,dx);
				this.lookPanel.visible = true;
				this.lookPanel.y = (dx + 1)*this.RENDER_H - 28;
				for(var i:number=0;i<this.itemGroup.numChildren-1;i++)
				{
					if(i <= dx)
						this.itemGroup.getChildAt(i).y = i*this.RENDER_H;
					else
						this.itemGroup.getChildAt(i).y = this.lookPanel.y + this.lookPanel.height + 10 + (i-dx-1)*this.RENDER_H;
				}
				var dx:number = SkillMgr.NEW_STUDY.indexOf(e.target.skillVo);
				if(dx != -1)
				{
					SkillMgr.NEW_STUDY.splice(dx,1);
					//新技能、是否可升级
					if(RemindMgr.CAN_UP_SKILL.indexOf(e.target.skillVo) == -1)
						ViewManager.redToTarge(e.target,false);
					DataEventDispatcher.dispatchEventWith(GameEvent.RED_SKILL);
				}
			}
		}
	}
	RENDER_H:number = 180;
	protected euiCompete():void
	{
		super.euiCompete();
		var skills:any= SkillMgr.ins.skillGroup[UserVo.ins.jobId];
		var skillItem:SkillLvlItem;
		var i:number = 0;
		this.lookPanel = new LookSkillPanel();
		for(var key in skills)
		{
			skillItem = new SkillLvlItem();
			skillItem.name = i + "";
			skillItem.skillData = skills[key];
			// if(i == 0)
			// {
				skillItem.y = i*this.RENDER_H;
			// 	this.lookPanel.y = (0 + 1)*this.RENDER_H - 28;
			// 	this.lookPanel.setData(SkillMgr.ins.getRoleSkill(skills[key][0].secondarySkill_id),0,0);
			// }else
			// {
			// 	skillItem.y = this.lookPanel.y + this.lookPanel.height + 10 + (i-1)*this.RENDER_H;
			// }
			this.itemGroup.addChild(skillItem);
			i++;
		}
		this.itemGroup.addChild(this.lookPanel);
		this.lookPanel.visible = false;
	}
}
ViewManager.ins().reg(SkillWin, LayerManager.UI_MainUI);