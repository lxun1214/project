class ActivityItem extends eui.ItemRenderer{
	public btn:eui.Button;
	
	public title : eui.Label;
	public dg : eui.DataGroup;


	public constructor() {
		super();
		this.skinName = "ActivityItemSkin";
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
			HttpMgr.ins.sendMessage(ClientPacket.S_10032,{activityId:this.data.activityId,activityIndex:this.itemIndex+1},ServerPacket.LOGIC_URL,true);
		},this);
	}
	public createChildren( ): void{
		super.createChildren();
		this.dg.itemRenderer = BaseItem;	
	}

	public dataChanged():void
	{
		super.dataChanged();
		this.dg.dataProvider = new eui.ArrayCollection(ActivetyMgr.ins().getActivityAwards(this.data));

		this.upStatus(!ActivetyMgr.ins().checkAtivityEnd(this.data.activityId,this.itemIndex+1));
		if(this.data.activityId == ActivetyMgr.CONTINUE_LOGIN)
			this.title.text = "持续登陆" + this.data.part1 +"天!";
		else if(this.data.activityId == ActivetyMgr.STAGE_AWARD)
			this.title.text = "关卡达到" + this.data.part1 +"层!";
		else if(this.data.activityId == ActivetyMgr.INVEST_PLAN)
			this.title.text = "重生等级达到" + this.data.part1 +"级!";
		else
			this.title.text = "累计消费" + this.data.part1 +"!";
	}

	public upStatus(isReward){
		if(isReward == -1)
			return;
		this.btn.label = isReward?"领取":"已领取";
		this.btn.enabled = isReward;
		ViewManager.redToTarge(this.btn,isReward);
	}
}