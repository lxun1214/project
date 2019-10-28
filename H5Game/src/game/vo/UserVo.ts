class UserVo {
	static NO_GUIDE:boolean = false;
	//主角数据
	public static _ins:UserVo;
	public static get ins():UserVo
	{
		if(UserVo._ins == null)
			UserVo._ins = new UserVo();
		return UserVo._ins;
	}

	public uuid:string = "";
	public userId:number = 0;
	public playerId:string = "";
	public jobId:number = 0;
	public playerName:string = "";
	public gold:number = 0;
	public diamond:number = 0;
	public headId:number = 0;
	exp:number =  0;
	public level:number = 0;
	public vipLevel:number = 0;
	public sex:number = 1;

	public playerAttrInfo:PbPlayerAttrInfo = null;

	public nHp:number = 0;
	public rebirthNum:number = 0;//重生
	public points:number = 1;//当前关卡

	public strengthenArtifactStone:number = 0;//神器强化石
	public upgradeSkillsJade:number = 0;//技能玉
	public reinforcedEquipmentStone:number = 0;//装备升阶石

	public skillTabs:Array<string> = null;//升级了的技能列表
	public skillColumn:Array<string> = null;//技能栏里的技能列表
	public fightPower:number = 0;
	public Columns:Array<any> = null;//装备栏
	public storeInfos:any = null;//商城限制商品购买次数信息
	public sportsMoney:number = 0;//竞技币
	public artifactInfos:number[] = null;//已拥有神器集合(artifact.xls表的itemId集合)
	public challengeNum:number = 0;//当前竞技场挑战次数
	public challengeCount:number = 0;//竞技场购买挑战的已购买次数
	public playerTaskInfos:any = null;//任务集合
	public partChallengNumInfos:any = null;//副本挑战次数
	public refreshPurchaseCount:number = 0;//竞技场刷新挑战者，已购买次数
	public offlineRewardInfo:any = null;//离线获得奖励信息
	public activityInfos:Array<any> = null;//已完成活动信息（返回的是已完成的）
	//抽卡信息
	public drawCardInfo:any = null;
	//vip经验（已累计充值多少钻石）
    public vipExp:number = 0;
	//已领取vip奖励信息
	public vipLvlList:Array<number> = null;
	//月卡信息
	public  monthCardInfo:any = null;
	//是否购买了投资计划 0未购买  1已购买
	public purchaseInvestment = 35;
	public guideStep:number = 0;
	public emailInfos:Array<any>;
	public isRecharge :boolean = false;
	

	public historyMaxLevel:number = 0;
	public historyMaxPointsId:number = 0;
	public get nMaxHp():number
	{
		return this.playerAttrInfo.blood;
	}

	public get MAX_LVL():number
	{
		return this.historyMaxLevel > this.level?this.historyMaxLevel:this.level;
	}
	public get MAX_POINTS():number
	{
		return this.historyMaxPointsId > this.points?this.historyMaxPointsId:this.points;
	}

	public constructor() {
		this.playerAttrInfo = new PbPlayerAttrInfo();
	}

	public dispose():void
	{
		DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_30004,this.upFight,this);
		DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_30005,this.upMoney,this);
	}

	private upFight(e:any):void
	{
		this.upUserVo({fightPower:e.data.fightPower});
	}
	private upMoney(e:any):void
	{
			var s:any = MoneyUtils.getPropertyByType(e.data.currencyType);
			var obj:any = {};
			obj[s] = e.data.changeNum;
			this.upUserVo(obj);
			DataEventDispatcher.dispatcher.dispatchEventWith(GameEvent.MONEY_TYPE_CHANGE);
	}
	
	public setData(obj:any,$targe?:any):void
	{	
		if(this == UserVo.ins)
		{
			DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30004,this.upFight,this);
			DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30005,this.upMoney,this);
		}
		var targe = $targe?$targe:this;
		for(var k in obj)
		{
			targe[k] = obj[k];
		}
		var svo:any = ConfigMgr.gameConfig["heroAttribute"][this.jobId+""];
		AttributeUtlis.attributeMgr(svo,true,this.playerAttrInfo,this.jobId);
		this.addLevelPro(this.level);
		if(isNaN(this.nHp))
			this.nHp = this.nMaxHp;

		var c:Array<any> = this.skillColumn.concat();
		this.skillColumn = [];
		for(var i:number=0;i<c.length;i++)
		{
			this.skillColumn[c[i].loc] = c[i].skillTab;
		}

		if(this.Columns){
			ForgeVo.ins().setEquipAttr(this);
			GemVo.ins().addGemAtts(this);
		}
		if(this.artifactInfos)
			ArtifactVo.ins().initArtPropertys(this);
		if(this.offlineRewardInfo && this == UserVo.ins)
			ViewManager.ins().open(OfflineWin,this.offlineRewardInfo);

		if(this == UserVo.ins)
		{
			GuideMgr.createAndInit([this.guideStep]);
			GuideMgr.dispatchTiggerEvent(tigger.points, UserVo.ins.points);
			GuideMgr.dispatchTiggerEvent(tigger.rebirthNum, UserVo.ins.rebirthNum);
			GuideMgr.dispatchTiggerEvent(tigger.level, UserVo.ins.level);
		}
		
	}

	public addLevelPro(currLv:number,oldLv:number = 1):void
	{
		var d:Array<any> = ConfigMgr.gameConfig["attributesIncrease"];
		var len:number = d.length/3;
		var i:number;
		var upLvl:number = currLv - oldLv;
		var j:number;
		var key;
		var obj:any;
		for(var i:number=len-1;i>=0;i--)
		{
			obj = d[(this.jobId-1)*len + i];
			if(obj.lvMin <= currLv)
			{
				if(currLv - obj.lvMin >= upLvl)
				{
					//直接添加upLvl次属性
					for(j=0;j<upLvl;j++)
					{
						for(key in obj)
						{
							if(key == "heroType" || key == "lvMin" || key == "lvMax")
								continue;d
							var np:any = {};
							np["" + key] = obj[key];
							AttributeUtlis.attributeMgr(np,true,this.playerAttrInfo,this.jobId);
						}
					}
				}else
				{
					//继续下轮添加
					upLvl -= currLv - d[(this.jobId-1)*len + i].lvMin;
					for(j=0;j<upLvl;j++)
					{
						for(key in obj)
						{
							if(key == "heroType" || key == "lvMin" || key == "lvMax")
								continue;
							AttributeUtlis.attributeMgr({key:obj[key]},true,this.playerAttrInfo,this.jobId);
						}
					}
				}
			}
		}
	}

	public levelLimit(v0:number,v1:number):boolean
	{
		return v0 <= this.rebirthNum && v1 <= this.MAX_LVL;
	}

	public upUserVo(d:any):void
	{
		for(var key in d)
		{
			if(this[key] != undefined)
			{
				switch(key)
				{
					case "level":
						this.addLevelPro(d[key],this.level);
						GuideMgr.dispatchTiggerEvent(tigger.level, d[key]);
						break;
					case "points":
							GuideMgr.dispatchTiggerEvent(tigger.points, d[key]);
						break;
					case "rebirthNum":
							GuideMgr.dispatchTiggerEvent(tigger.rebirthNum, d[key]);
						break;
				}
				var dx:number = MoneyUtils.isMoneyType(key);
				if(dx != -1 && d[key] > this[key])//暂时只做货币提示
					UserTips.ins().showitemTips(MoneyUtils.getMoneyName(MoneyUtils.ALL_MONEY[dx]) + ": +" + (d[key] - this[key]));
				var needDis:boolean = this[key] != d[key];
				this[key] = d[key];
				if(needDis)
					DataEventDispatcher.dispatcher.dispatchEventWith(GameEvent.UP_PLAYER_PROPERTY + propertyType[key]);
			}
		}
	}

	public getTaskInfo(type:number):any
	{
		switch(type)
		{
			case 1:
				return this.playerTaskInfos.threadTaskInfos;
			case 2:
				return this.playerTaskInfos.dayTaskInfos;
			default:
				return this.playerTaskInfos.achieveTaskInfos;
		}
	}

	public upFbCount(d:any):void
	{
		var c:any = ConfigMgr.gameConfig["partInfo"][d.partId];
		for(var i:number=0;i<this.partChallengNumInfos.length;i++)
		{
			if(this.partChallengNumInfos[i].partType == c.partType)
			{
				this.partChallengNumInfos[i].partChallengNum = d.partChallengNum;
				DataEventDispatcher.dispatcher.dispatchEventWith(GameEvent.UP_PLAYER_PROPERTY + propertyType.partChallengNumInfos);
				return;
			}
		}
	}






	public PK_ROLE_DATA(d:any):void
	{
		var a0:Array<string> = [
			"playerId","playerName","level","jobId","headId","fightPower","skillTabs"
			,"skillColumn","Columns","artifactInfos","sex"
		]
		var a1:Array<string> = [
			"otherPlayerId","otherPlayerName","level","otherJobId","otherHeadId","otherFightPower","skillTabs"
			,"skillColumn","Columns","artifactInfos","sex"
		]
		var c:any = {};
		for(var i:number=0;i<a0.length;i++)
		{
			c[a0[i]] = d.fightTargetDetailInfo[a1[i]];
		}
		this.setData(c);
		PVPMgr.ChallegeRank = d.fightTargetDetailInfo.otherRankings;
		//d.otherRankings
	}
}

enum propertyType
{
	level = 0,
	challengeNum = 1,
	fightPower = 2,
	gold = 3,
	vipExp = 4,
	vipLevel = 5,
	isRecharge = 6,
	// upgradeSkillsJade = 7,
	// reinforcedEquipmentStone = 8,
	// sportsMoney = 9,
	partChallengNumInfos = 10,
	rebirthNum = 11,
	points = 12,
}