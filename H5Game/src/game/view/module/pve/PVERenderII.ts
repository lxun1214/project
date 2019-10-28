class PVERenderII extends eui.ItemRenderer{
	l0:eui.Label;
	l1:eui.Label;
	l2:eui.Label;
	l3:eui.Label;
	l4:eui.Label;

	bg:eui.Image;
	public constructor() {
		super();
		this.skinName = "PVERenderSkinII";
		this.touchChildren = false;	
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);

		this.addEventListener(egret.Event.ADDED_TO_STAGE,()=>{
			if(this.data)
			{
				if(this.itemIndex == 0)
					UIDmgr.bindingUID(this,uid.fb2);
			}
		},this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.partChallengNumInfos,this.upCount,this);
	}
	protected dataChanged(): void{
		this.l0.text = this.data.sectionName;
		this.l2.text = "进入条件需要战力:" + this.data.entryConditions;
		var s:string = this.data.partType == 1?"<font color='#fffab3'>升阶石":this.data.partType == 2?"<font color='#23b62e'>宝石":"<font color='#f69c00'>技能玉";
		this.l4.textFlow = new egret.HtmlTextParser().parser("挑战可获得: " + s);
		this.upCount();

		this.bg.source = "fb" + (3 +this.data.partType) + "_png";
	}

	private upCount():void
	{
		this.l3.text = "剩余挑战次数:"　+ FBMgr.ins.getCountByType(this.data.partID);
	}

	private onTap():void
	{
		if(!this.data)
			return;
		ViewManager.ins().close(SkillWin);
		// ViewManager.ins().close(UIView);
		ViewManager.ins().close(PVEWin);
		ViewManager.ins().close(PVEWinII);
		if(!GameMap.ins().onHookMap)
			return UserTips.ins().showTipsBigToSmall("非挂机地图,无法挑战!");
		if(FBMgr.ins.getCountByType(this.data.partID) == 0)
			return UserTips.ins().showTipsBigToSmall("次数不足,无法挑战!");
		HttpMgr.ins.sendMessage(ClientPacket.S_10028,{partId:this.data.partID},ServerPacket.LOGIC_URL,true);
	}
}