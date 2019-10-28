class PVPMgr extends BaseClass{
	static ChallegeRank:number;
	static MyRank:number;
	private data:Array<any>;//1购买，2刷新
	public constructor() {
		super();
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20023,this.fightBack,this);
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20021,this.buyBack,this);
		var c:any = ConfigMgr.gameConfig["commonTimes"];
		this.data = [];
		for(var key in c)
		{
			if(!this.data[c[key].type])
				this.data[c[key].type] = [];
			this.data[c[key].type].push(c[key]);
		}
	}
	public static ins(...args:any[]):PVPMgr
	{
		return super.ins(args);
	}
	private fightBack(e:egret.Event):void
	{
		UserVo.ins.upUserVo({challengeNum:UserVo.ins.challengeNum-1});
		GameLogic.ins.changeMap(UserVo.ins.points);
	}

	private buyBack(e:egret.Event):void
	{
		if(e.data.isSuccess)
		{
			UserTips.ins().showTipsBigToSmall("次数购买成功!",false)
			UserVo.ins.upUserVo({challengeNum:1,challengeCount:UserVo.ins.challengeCount+1});
		}else
		{
			UserTips.ins().showTipsBigToSmall("次数购买失败!")
		}
	}

	public pVPFightEnd(val:boolean):void
	{
		HttpMgr.ins.sendMessage(ClientPacket.S_10023,{isVictory:val},ServerPacket.LOGIC_URL,true);
	}

	public get canRefresh():Array<any>
	{
		var need:number;
		if(UserVo.ins.refreshPurchaseCount >=　this.data[2].length-2)
			need = parseInt(this.data[2][this.data[2].length-1].consume);
		else
			need = parseInt(this.data[2][UserVo.ins.refreshPurchaseCount+1].consume);
		// var bol:boolean = MoneyUtils.getMoneyNum(MoneyUtils.M_3) >= need;
		// if(!bol)
		// 	UserTips.ins().showTips(MoneyUtils.getMoneyName(MoneyUtils.M_3) + "不足,无法刷新!");
		return [need + MoneyUtils.getMoneyName(MoneyUtils.M_3),MoneyUtils.getMoneyNum(MoneyUtils.M_3) >= need];
	}


	public get buyCount():Array<any>
	{
		var need:number;
		if(UserVo.ins.challengeCount >=　this.data[2].length-2)
			need = parseInt(this.data[2][this.data[2].length-1].consume);
		else
			need = parseInt(this.data[2][UserVo.ins.challengeCount+1].consume);
		return [need + MoneyUtils.getMoneyName(MoneyUtils.M_3),MoneyUtils.getMoneyNum(MoneyUtils.M_3) >= need];
	}
}