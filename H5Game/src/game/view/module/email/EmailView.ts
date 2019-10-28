class EmailView extends BaseEuiView{
	g0:eui.DataGroup;
	btn0:eui.Button;
	btn1:eui.Button;
	// rc:eui.Rect;
	// mess:EmailMessage;
	public constructor() {
		super();
		this.skinName = "EmailSkin";

		this.g0.itemRenderer = EmailRender;
		// this.mess = new EmailMessage();
	}
	public open(...param: any[]): void{
		super.open(param);
		// this.addTouchEvent(this.g0,this.onTap);
		this.addTouchEvent(this.btn0,this.onTap);
		this.addTouchEvent(this.btn1,this.onTap);
		// this.addTouchEvent(this.rc,this.onTap);
		this.currDx = -1;
		this.addEvent(GameEvent.REMOVE_EMAIL,DataEventDispatcher.dispatcher,this.upEmail);
		this.addEvent(GameEvent.ADD_EMAIL,DataEventDispatcher.dispatcher,this.upEmail);
		this.upEmail();
	}
	
	private upEmail():void
	{
		// while(this.g0.numChildren)
		// {
		// 	this.g0.removeChildAt(0);
		// }
		this.g0.dataProvider = new eui.ArrayCollection(UserVo.ins.emailInfos);
		// var s:EmailRender;
		// for(var i:number=0;i<UserVo.ins.emailInfos.length;i++)
		// {
		// 	s = new EmailRender();
		// 	s.data = UserVo.ins.emailInfos[i];
		// 	this.g0.addChild(s);
		// }
	}

	currDx:number;
	private onTap(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			// case this.rc:
			// 	ViewManager.ins().close(this);
			// 	break;
			case this.btn0:
			    // var a:Array<number> = []
				// for(var i:number=0;i<UserVo.ins.emailInfos.length;i++)
				// {
				// 	if(UserVo.ins.emailInfos[i].readState == 1)
				// 		a.push(UserVo.ins.emailInfos[i].emailId);
				// }
				// if(a.length == 0)
				// 	return UserTips.ins().showTips("没有可删除的邮件!");
				HttpMgr.ins.sendMessage(ClientPacket.S_10041,{},ServerPacket.LOGIC_URL,true);
				break;
			case this.btn1:
				var has:boolean = false;
				for(var i:number=0;i<UserVo.ins.emailInfos.length;i++)
				 {
				 	if(UserVo.ins.emailInfos[i].itemList && UserVo.ins.emailInfos[i].itemList.length > 0 && UserVo.ins.emailInfos[i].itemState == 0)
				 		has =true;
				 }
				 if(!has)
				 	return UserTips.ins().showTipsBigToSmall("没有可领取的邮件!");
				HttpMgr.ins.sendMessage(ClientPacket.S_10039,{},ServerPacket.LOGIC_URL,true);
				break;
			// default:
				// if(e.target instanceof EmailRender)
				// {
				// 	var dx:number = this.g0.getChildIndex(e.target);
				// 	this.currDx = this.currDx ==-1?dx+1:(this.currDx < dx?dx:dx+1);

				// 	HttpMgr.ins.sendMessage(ClientPacket.S_10037,{emailId:e.target.data.emailId},ServerPacket.LOGIC_URL,true);
				// 	this.mess.setData(e.target .data);
				// 	this.g0.addChildAt(this.mess,this.currDx);
				// }
				// break;
		}
	}
}
ViewManager.ins().reg(EmailView,LayerManager.UI_MainUI)