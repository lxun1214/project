class BaseActivityPanel extends eui.Component{
	bg:eui.Image;
	cf:any;
	dg:eui.DataGroup;
	aID:number;
	public constructor() {
		super();
	}
	public get activetyID():number
	{
		return this.aID;
	}
	public set activetyID(v:number)
	{
		this.aID = v;
		this.cf = ActivetyMgr.ins().activeConfig[v];
		this.dg.itemRenderer = ActivityItem;
		this.dg.dataProvider = new eui.ArrayCollection(this.cf);
		this.bg.source = "a" + v + "_png";
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20032,this.backGetAward,this);
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30006,this.completeActive,this);
	}
	private backGetAward(e:egret.Event):void
	{
		if(e.data.isSuccess){
			if(this.aID == e.data.activityId)
			{
				(this.dg.getElementAt(e.data.activityIndex-1) as ActivityItem).upStatus(false);
			}
		}
	}
	private completeActive(e:egret.Event):void
	{
		if(this.aID == e.data.activityId)
		{
			(this.dg.getElementAt(e.data.activityIndex-1) as ActivityItem).upStatus(true);
		}
	}
}