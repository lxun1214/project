class EmailRender extends eui.ItemRenderer{
	l0:eui.Label;
	l1:eui.Label;
	// btn0:eui.Button;
	public constructor() {
		super();
		this.skinName = "EmailRenderSkin";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			// if(this.data.itemState != 0)
			// 	return UserTips.ins().showTips("该邮件附件已领取!");
			// if(!this.data.itemList || this.data.itemList.length == 0)
			// 	return UserTips.ins().showTips("该邮件无附件可领取!");
			
			// HttpMgr.ins.sendMessage(ClientPacket.S_10038,{emailId:this.data.emailId},ServerPacket.LOGIC_URL,true);

			EmailMessage.ins.setData(this.data);
		},this);

		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_EMAIL_STATUS,this.upStatus,this);
	}
	public dataChanged():void
	{
		super.dataChanged();
		this.upStatus(null);
	}

	private upStatus(e:egret.Event):void
	{
		if(e && e.data.indexOf(this.data.emailId) == -1)
			return;
		// this.btn0.visible = false;
		var s:string = "";
		if(this.data.readState == 0)
			s = " <font color='#1CFF05'>未读";
		else
		{
			if(this.data.itemState == 0 && this.data.itemList && this.data.itemList.length > 0)
			{
				// if(s != "")
				// 	s += " (可领取";
				// else
					s = " <font color='#1CFF05'>可领取";
				// this.btn0.visible = true;
			}else
				s = " <font color='#F70707'>已读";
				
		}
		if(s != "")
			s += "</font>";
		this.l1.text = this.data.emailTitle;
		this.l0.textFlow = new egret.HtmlTextParser().parser(s);
	}
}