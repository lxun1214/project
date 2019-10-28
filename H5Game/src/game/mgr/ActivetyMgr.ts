class ActivetyMgr extends BaseClass{
	static FIRST_CHARGE:number = 1000;//首冲
	static CONTINUE_LOGIN:number = 1001;//登陆奖励
	static STAGE_AWARD:number = 1002;//关卡奖励
	static MONTH_CARD:number = 1003;//月卡
	static INVEST_PLAN:number = 1004;//投资计划
	static CONSUME_GIFT:number = 1005;//消费礼包
	static LIMIT_CARD:number = 1006;//抽奖
	//活动序列
	static MAX_ACTIVE:number = 10007;

	public activeConfig:any;
	public constructor() {
		super();
		this.activeConfig = {};
		var a:Array<any> = ConfigMgr.gameConfig["operationActivityDetail"];
		for(var i:number=0;i<a.length;i++)
		{
			if(!this.activeConfig[a[i].activityId])
				this.activeConfig[a[i].activityId] = [];
			this.activeConfig[a[i].activityId].push(a[i]);
		}
	}


	public static ins(...args:any[]):ActivetyMgr{
		return super.ins(args) as ActivetyMgr;
	}


	public getActivityAwards(data:any):Array<ItemInfo>
	{
		var a:Array<ItemInfo> = [];
		var d:Array<any> = [];
		var vo:ItemInfo;
		var c:Array<any>;
		if(data.awardGoods != "" && data.awardGoods != "0" )
		{
			d = data.awardGoods.split("#");
			for(var i:number=0;i<d.length;i++)
			{
				c = d[i].split(":");
				vo = new ItemInfo();
				vo.itemId = parseInt(c[0]);
				vo.itemNum = parseInt(c[1]);
				a.push(vo);
			}
		}
		if(data.awardCurrency != "" && data.awardCurrency != "0" )
		{
			d = data.awardCurrency.split("#");
			for(var i:number=0;i<d.length;i++)
			{
				c = d[i].split(":");
				vo = new ItemInfo();
				vo.moneyType = c[0];
				vo.itemNum = parseInt(c[1]);
				a.push(vo);
			}
		}
		return a;
	}

	//检测奖励是否领取
	public checkAtivityEnd(id:number,dx:number):any
	{
		var a:Array<any> = UserVo.ins.activityInfos;
		for(var i:number=0;i<a.length;i++){
			if(a[i].activityId == id)
			{
				var b:Array<any> = a[i].completedActivityInfos;
				for(var j:number=0;j<b.length;j++)
				{
					if(b[j].activityIndex == dx)
						return b[j].isReward;
				}
			}
		}
		return -1;
	}
}