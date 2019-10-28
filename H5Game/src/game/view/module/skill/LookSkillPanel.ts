class LookSkillPanel extends eui.Component{
	des:eui.Label;
	l6:eui.Label;
	btn:eui.Button;
	btn0:eui.Button;
	jt:eui.Image;
	// item:BaseItem;
	g0:SkillIconItemII;
	g1:SkillIconItemII;
	l7:eui.Label;
	l:eui.Image;
	public constructor() {
		super();
		this.skinName = "lookSkillSkin";
		// this.item.labName.visible = false;
		// this.item.labCount.visible = false;
		this.l.source = ResMgr.getGameItemPng(MoneyUtils.M_5);
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if(!this.canUp)
			{
				// MoneyUtils.ShowGetWay(MoneyUtils.M_5);
				return UserTips.ins().showTipsBigToSmall("材料不足,无法升级!");
			}
			// if(UserVo.ins.rebirthNum < this.skillVo.stdSkill.need_role_lzs)
			// 	return UserTips.ins().showTips("重生等级不足" + this.skillVo.stdSkill.need_role_lzs +",无法升级!");
			// if(UserVo.ins.level < this.skillVo.stdSkill.need_role_lvl)
			// 	return UserTips.ins().showTips("等级不足 " + this.skillVo.stdSkill.need_role_lvl + ",无法升级!");
			 if(!UserVo.ins.levelLimit(this.skillVo.stdSkill.need_role_lzs,this.skillVo.stdSkill.need_role_lvl))
			 	return UserTips.ins().showTipsBigToSmall("重生等级或者等级不足 " + this.skillVo.stdSkill.need_role_lvl + ",无法升级!");
			HttpMgr.ins.sendMessage(ClientPacket.S_10006,{skillTab:this.skillVo.stdSkill.tab},ServerPacket.LOGIC_URL);
		},this);
		// this.item.setIcon(MoneyUtils.M_5);
		// this.item.touchChildren = false;
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.SKILL_UP_LVL,this.updata,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL,this.updata,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE,this.updata,this);

		this.btn0.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if(this.btn0.label == "装 配 中")
				return UserTips.ins().showTipsBigToSmall("该技能已装配至战斗页对应的技能栏中!");
			UserVo.ins.skillColumn[this.skillDx] = this.skillVo.stdSkill.tab;
			DataEventDispatcher.dispatchEventWith(GameEvent.SELECT_SKILL,{a:this.skillDx,b:this.skillVo});
			this.btn0.label = "装 配 中";
		},this);
	}

	private upStatus():void
	{
		this.btn0.label = UserVo.ins.skillColumn.indexOf(this.skillVo.stdSkill.tab) != -1?"装 配 中":"装 配";
	}


	skillVo:SkillVo;
    canUp:boolean = false;
	skillDx:number;
	public setData(vo:SkillVo,dx:number,dx0:number)
	{
		this.skillDx = dx0;
		this.jt.x = 190 + 120 * dx;
		this.skillVo = vo;
		this.updata();
		this.upStatus();
		UIDmgr.bindingUID(this.btn,uid.jn2);
		var a:any = SkillMgr.ins.skillGroup[UserVo.ins.jobId];
		UIDmgr.bindingUID(this.btn0,uid.jn3);
	}
	g2:eui.Group;
	private updata():void
	{
		if(/*!this.stage || */!this.skillVo)
			return;
		this.des.text = this.skillVo.stdSkill.description;
		// this.l1.text = "LV." + this.skillVo.level;
		// this.l2.text = this.skillVo.stdSkill.description2;
		var l:number = MoneyUtils.getMoneyNum(MoneyUtils.M_5);
		this.l6.text = l + "/" + this.skillVo.stdSkill.upgrade_money;
		this.canUp = l >= this.skillVo.stdSkill.upgrade_money;
		this.g1.setSkillData(this.skillVo.stdSkill);
		var nextVo:any = ConfigMgr.gameConfig["skill"][SkillMgr.autoFillTab(this.skillVo.stdSkill.secondarySkill_id,this.skillVo.level+1)]
		if(nextVo)
		{
			this.g0.setSkillData(nextVo,1);
			this.g2.visible = this.g0.visible = true;
			this.l7.visible = false;
			// this.l3.text = "LV." + nextVo.level;
			// this.l4.text = nextVo.description2;
		}else
		{
			this.g2.visible = this.g0.visible = false;
			this.l7.visible = true;
		}
	}
}