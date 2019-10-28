class SelectLogin extends eui.Component implements IDispose{
	private l1:eui.Label;
	private b1:eui.Button;
	private data:any;
	l2:eui.Label;
	l0:eui.Label;
	da:eui.DataGroup;
	serverlist:Array<any>;
	public constructor(info:any,list:Array<any>) {
		super();
		this.horizontalCenter = 0;
		this.skinName = "selectLoginSkin";
		this.data = info;
		this.serverlist = list.reverse();
		if(this.serverlist.length >　0)
		{
			var c:any = this.serverlist[0];
			c.v = true;
			this.l0.textFlow = ColorUtlis.COLOR_STR(c.serverId + "区  " + c.serverName,c.serverState == 1);
		}
		this.da.itemRenderer = serverDataRender;
		this.da.dataProvider = new eui.ArrayCollection(list);
		// var s:string = info.serverState == 1?"正常":"关闭";
		this.l2.textFlow = this.l1.textFlow = ColorUtlis.COLOR_STR(info.serverId + "区  " + info.serverName,info.serverState == 1);
		this.b1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getServer,this);
		this.da.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getServer,this);
		this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getServer,this);
		this.r.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getServer,this);
	}
	r:eui.Rect;
	bg:eui.Image;
	g0:eui.Group;
	private getServer(e:egret.TouchEvent):void
	{
		if(e.currentTarget == this.bg){
			this.g0.visible = true;
		}else if(e.currentTarget == this.r){
			this.g0.visible = false;
		}
		else if(e.currentTarget == this.b1){
		if(this.data.serverState != 1)
		{
			UserTips.ins().showTipsBigToSmall("当前区服属于关闭状态,请重新选择!");
			return;
		}
		this.b1.touchEnabled = false;
		var data:Object = {
            serverId:this.data.serverId,
            userId:UserVo.ins.userId
        }
		GlobalVo.serverId = this.data.serverId;
		HttpMgr.ins.sendMessage(ClientPacket.S_1004,data,ServerPacket.LOGIN_URL);
		}else
		{
			if(e.target instanceof serverDataRender)
			{
				this.g0.visible = false;
				var info:any = this.serverlist[e.target.itemIndex];
				this.data = info;
				// var s:string = info.serverState == 1?"正常":"关闭";
				this.l1.textFlow = ColorUtlis.COLOR_STR(info.serverId + "区  " + info.serverName,info.serverState == 1);
			}
		}
	}

	public dispose():void
	{
		if(this.parent)
			this.parent.removeChild(this);
		this.b1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.getServer,this);
	}
}