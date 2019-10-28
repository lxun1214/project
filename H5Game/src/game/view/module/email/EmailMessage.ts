class EmailMessage extends eui.Component{
	static ins:EmailMessage;
	public constructor() {
		super();
		// this.skinName = "EmailMessageSkin";
	}

	public createChildren():void
	{
		super.createChildren();
		this.dg.itemRenderer = BaseItem;
		this.btn0.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if(this.data.itemState != 0)
				return UserTips.ins().showTipsBigToSmall("该邮件附件已领取!");
			if(!this.data.itemList || this.data.itemList.length == 0)
				return UserTips.ins().showTipsBigToSmall("该邮件无附件可领取!");
			
			HttpMgr.ins.sendMessage(ClientPacket.S_10038,{emailId:this.data.emailId},ServerPacket.LOGIC_URL,true);
		},this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_EMAIL_STATUS,this.upStatus,this);
		EmailMessage.ins = this;


		DataEventDispatcher.dispatcher.addEventListener(GameEvent.REMOVE_EMAIL,(e:egret.TouchEvent)=>{
			if(this.data && e.data.indexOf(this.data.emailId) != -1)
			{
				this.l2.text = "";
				this.data = null;
			}
		},this);
	}

	dg:eui.DataGroup;
	btn0:eui.Button;
	l2:eui.Label;
	data:any;
	public setData(d:any):void
	{
		if(this.data == d)
			return;
		if(d.readState == 0)
			HttpMgr.ins.sendMessage(ClientPacket.S_10037,{emailId:d.emailId},ServerPacket.LOGIC_URL,true);
		this.btn0.visible = true;
		this.data = d;
		// this.dg.dataProvider = new eui.ArrayCollection(d.itemList);
		this.l2.text = d.emailContent;
		this.upStatus(null);
	}

	private upStatus(e:egret.Event):void
	{
		if(e && e.data.indexOf(this.data.emailId) == -1)
			return;
		this.btn0.visible = this.data.itemState == 0 && this.data.itemList && this.data.itemList.length > 0;
		if(this.btn0.visible)
			this.dg.dataProvider = new eui.ArrayCollection(this.data.itemList);
		else
			this.dg.dataProvider = new eui.ArrayCollection([]);
	}
}