class AchievementWin extends BaseEuiView{
	dg:eui.DataGroup;
	public constructor() {
		super();
		this.skinName = "AchievementSkin";
		this.dg.itemRenderer = TaskRender;
	}
	public open(...param: any[]): void{
		super.open();
		this.updata();
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.RED_ACHEIEVEMENT,this.updata,this);
		UIDmgr.bindingUID(this,uid.cjParent);
	}
	protected updata(t:egret.Event = null):void
	{
		this.dg.dataProvider = new eui.ArrayCollection(RemindMgr.taskArr[3]);
	}

	public static isReceive(id:number,type:number):boolean
	{
		var c:Array<any> = UserVo.ins.getTaskInfo(type);
		for(var i:number=0;i<c.length;i++)
		{
			if(id == c[i].taskId)
			{
				if(c[i].isReceive)
					return true;
				return false;
			}
				
		}
		return false;
	}
}
ViewManager.ins().reg(AchievementWin, LayerManager.UI_MainUI);