class EmailMgr extends BaseClass{
	public constructor() {
		super();
	}
	public static ins(...args:any[]):EmailMgr{
		return super.ins(args) as EmailMgr;
	}

	

	public addEmail(a:any):void
	{
		if(!UserVo.ins.emailInfos)
			UserVo.ins.emailInfos = [];
		UserVo.ins.emailInfos.unshift(a);// a.concat(UserVo.ins.emailInfos);
		DataEventDispatcher.dispatchEventWith(GameEvent.ADD_EMAIL);
	}

	public readEmail(id:number):void
	{
		var d:Array<any> = UserVo.ins.emailInfos;
		for(var i:number=0;i<d.length;i++)
		{
			if(d[i].emailId == id)
			{
				d[i].readState = 1;
				break;
			}
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.UP_EMAIL_STATUS,[id]);
	}

	public removeEmail(c:Array<any>):void
	{
		var d:Array<any> = UserVo.ins.emailInfos;
		for(var i:number=0;i<c.length;i++)
		{
			for(var j:number=0;j<d.length;j++)
			{
				if(d[j].emailId == c[i])
				{
					d.splice(j,1);
					break;
				}
			}
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.REMOVE_EMAIL,c);
	}

	public getAward(c:Array<any>):void
	{
		var d:Array<any> = UserVo.ins.emailInfos;
		for(var i:number=0;i<c.length;i++)
		{
			for(var j:number=0;j<d.length;j++)
			{
				if(d[j].emailId == c[i])
				{
					d[j].itemState = 1;
					break;
				}
			}
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.UP_EMAIL_STATUS,c);
	}
}