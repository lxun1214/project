class TaskMgr extends BaseClass{
	public constructor() {
		super();
		this.typeTask = [];
		var obj:any = ConfigMgr.gameConfig["task"];
		for(var key in obj)
		{
			if(!this.typeTask[obj[key].taskType])
				this.typeTask[obj[key].taskType] = [];
			this.typeTask[obj[key].taskType].push(obj[key])
		}
	}
	typeTask:Array<any>;
	public static ins(...args:any[]):TaskMgr{
		return super.ins(args) as TaskMgr
	}

	public upTask(d:Array<any>):void
	{
		var obj:any = ConfigMgr.gameConfig["task"];
		var o:Array<any>;
		var has:boolean = false;
		var newVo:any;
		for(var j:number=0;j<d.length;j++){
		var type:number = obj[d[j].taskId].taskType;
			o = UserVo.ins.getTaskInfo(type);
			for(var i:number=0;i<o.length;i++)
			{
				if(o[i].taskId == d[j].taskId)
				{
					has = true;
					o[i].completeNum = d[j].completeNum;
				}
			}
			if(!has)
			{
				newVo = {};
				newVo.taskId = d[j].taskId;
				newVo.isReceive = false;
				newVo.completeNum = d[j].completeNum;
				o.push(newVo);
		}}
			//  UserVo.ins.playerTaskInfos.threadTaskInfos = o;
		RemindMgr.ins().checkTask(0)
		// DataEventDispatcher.dispatchEventWith(GameEvent.UP_TASK,type);
	}

	public finishTask(d:any):void
	{
		if(d.code == 0)
		{
			var obj:any = ConfigMgr.gameConfig["task"];
			var type:number = obj[d.taskId].taskType;
			var o:any = UserVo.ins.getTaskInfo(type);
			for(var i:number=0;i<o.length;i++)
			{
				if(o[i].taskId == d.taskId)
				{
					o[i].isReceive = true;
					break;
				}
			}
			RemindMgr.ins().checkTask(0)
			// DataEventDispatcher.dispatchEventWith(GameEvent.UP_TASK,type);
		}else
			{
				// var o:any = ConfigMgr.gameConfig["error"][d.code];
				// var s:string = o?o.msg:d.code + "";
				// UserTips.ins().showTips(s);
			}
	}


	private get
}