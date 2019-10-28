class FBMgr {
	private static _ins:FBMgr;
	public static get ins():FBMgr
	{
		if(FBMgr._ins == null)
			FBMgr._ins = new FBMgr();
		return FBMgr._ins;
	}
	private fbConfig:any;

	public fbData:Array<any>;
	public constructor() {
		this.fbConfig = ConfigMgr.gameConfig["partInfo"];
		this.fbData = [];
		var o:any;
		for(var key in this.fbConfig)
		{
			o = this.fbConfig[key];
			if(!this.fbData[o.partType-1])
				this.fbData[o.partType-1] = [];
			if(!this.fbData[o.partType-1][o.partRank-1])
				this.fbData[o.partType-1][o.partRank-1] = o;
		}
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20028,this.gotoScene,this);
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20029,this.exitFbBack,this);
	}

	private gotoScene(e:egret.Event):void
	{
		if(e.data.isSuccess)
		{
			ViewManager.ins().close(UIView);
			ViewManager.ins().close(PVEWinII);
			GameLogic.ins.changeMap(e.data.partId,true);
			UserVo.ins.upFbCount(e.data);
		}
	}
	private exitFbBack(e:egret.Event):void
	{
		if(e.data.isSuccess)
		{
			UserVo.ins.upUserVo(e.data);
			var c:any = ConfigMgr.gameConfig["partInfo"][e.data.partId + ""];
			// if(c.nextPartID == 0)
			// 	GameLogic.ins.changeMap(UserVo.ins.points);
			// else
			// 	GameLogic.ins.changeMap(c.nextPartID,true);
		}
	}

	public eixtFb(die:boolean=false):void
	{
		HttpMgr.ins.sendMessage(ClientPacket.S_10029,{partId:GameMap.ins().currMapID,isVictory:die},ServerPacket.LOGIC_URL,true);
		if(die)
			GameLogic.ins.changeMap(UserVo.ins.points);
	}


	private delay:boolean = false;
	public checkChangeMap():void
	{
		var id:number = GameMap.ins().currMapID;
		var c:any = ConfigMgr.gameConfig["partInfo"][id + ""];
		if(c.nextPartID == 0)
		{
			if(!this.delay)
			{
				this.delay = true;
				var obj:any = ConfigMgr.gameConfig["partInfo"][GameMap.ins().currMapID + ""];
				var arr:Array<any> = MoneyUtils.getMoneyData(obj);
				ViewManager.ins().open(FightResultWin,3,()=>{
					FBMgr.ins.eixtFb(true);
					this.delay = false;
				},obj.item,arr);
			}
		}
		else
		{
			this.eixtFb();
			GameLogic.ins.changeMap(c.nextPartID,true);
		}
	}


	public getCountByType(id:number):number
	{
		var c:any = ConfigMgr.gameConfig["partInfo"][id];
		var d:any = UserVo.ins.partChallengNumInfos;
		for(var i:number =0;i< d.length;i++)
		{
			if(d[i].partType == c.partType)
			{
				return d[i].partChallengNum;
			}
		}
	}
}