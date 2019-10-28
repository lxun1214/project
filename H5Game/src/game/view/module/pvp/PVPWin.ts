class PVPWin extends BaseEuiView{
	static PVP_ing:boolean = false;
	l0:eui.Label;
	l1:eui.DataGroup;
	l3:eui.Label;
	l4:eui.Label;

	r0:PVPRender;
	r1:PVPRender;
	r2:PVPRender;

	btn:eui.Button;
	btn0:eui.Button;
	public constructor() {
		super();
		this.skinName = "PVPSkin";
	}
	protected euiCompete():void
	{
		super.euiCompete();
		this.l1.itemRenderer = AwardShow;
	}
	public open(...param: any[]): void{
		super.open();
		this.addEvent(ServerPacket.C_20020,DataEventDispatcher.dispatcher,this.upData);
		this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.challengeNum,DataEventDispatcher.dispatcher,this.upChallenge);
		this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.fightPower,DataEventDispatcher.dispatcher,this.upPower);
		this.addEvent(ServerPacket.C_20030,DataEventDispatcher.dispatcher,this.upFightInfos);
		HttpMgr.ins.sendMessage(ClientPacket.S_10020,{},ServerPacket.LOGIC_URL,true);
		this.addTouchEvent(this.btn,this.onClick);
		this.addTouchEvent(this.btn0,this.onClick);
		this.upChallenge();
		this.upPower();
		UIDmgr.bindingUID(this.r0,uid.p1);
	}
	private onClick(e:egret.TouchEvent):void
	{
		if(e.currentTarget == this.btn0)
		{
			HttpMgr.ins.sendMessage(ClientPacket.S_10026,{},ServerPacket.LOGIC_URL,true);
			return;
		}
		 var a:Array<any> = PVPMgr.ins().canRefresh;
		 if(a[0] == 0)
		 	HttpMgr.ins.sendMessage(ClientPacket.S_10030,{},ServerPacket.LOGIC_URL,true);
		 else{
		ViewManager.ins().open(TipsWin,"确定","是否花费" + a[0] + "刷新挑战对手!","提示","取消",()=>{
			if(a[1])
        		HttpMgr.ins.sendMessage(ClientPacket.S_10030,{},ServerPacket.LOGIC_URL,true);
			else
				UserTips.ins().showTipsBigToSmall(MoneyUtils.getMoneyName(MoneyUtils.M_3) + "不足,无法购买!");
		 },null,this);}
	}

	private upChallenge():void
	{
		this.l4.text = "挑战次数:" + UserVo.ins.challengeNum;
	}
	private upPower():void
	{
		this.l3.text = "我的战斗力:" + UserVo.ins.fightPower;
	}
	private upData(e:any):void
	{
		this.l0.text = "当前排名:" + e.data.rankings;
		this.upFightInfos(e);
		var i:number;
		PVPMgr.MyRank = e.data.rankings;
		this.l1.dataProvider = new eui.ArrayCollection(PVPWin.getAwardStr(e.data.rankings));
	}

	static getAwardStr(n:number):Array<any>
	{
		var d:Array<any> = []
		var a:Array<any> = ConfigMgr.gameConfig["rankingAward"];
		var i:number;
		var rank:Array<string>;
		for(i=0;i<a.length;i++)
		{
			rank = (<string>a[i].rankingId).split("#");
			if(n >= parseInt(rank[0]) && n <= parseInt(rank[1]))
			{
				if(a[i].diamond > 0)
					d.push([MoneyUtils.M_3,a[i].diamond]);
				if(a[i].battleCurrency > 0)
					d.push([MoneyUtils.M_5,a[i].battleCurrency]);
			}
		}
		return d;
	}

	private upFightInfos(e:egret.Event):void
	{
		for(var i:number=0;i<e.data.fightTargetInfos.length;i++)
		{
			this["r"+i].data = e.data.fightTargetInfos[i]?e.data.fightTargetInfos[i]:null;
		}
	}
}
	ViewManager.ins().reg(PVPWin, LayerManager.UI_MainUI);