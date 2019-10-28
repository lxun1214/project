class ChatWin extends BaseEuiView{
	btn:eui.Button;
	g0:eui.Group;
	txt:eui.TextInput;
	public constructor() {
		super();
		this.skinName = "ChatSkin";
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			//if(UserVo.ins.level < 50)
			//	return UserTips.ins().showTipsBigToSmall("等级不足50级无法发送!");
			if(this.txt.text == "")
				return UserTips.ins().showTipsBigToSmall("请输入要发送的内容!");
			if(this.txt.text.length >24)
				return UserTips.ins().showTipsBigToSmall("发送的内容长度不能超过24!");
			HttpMgr.ins.sendMessage(ClientPacket.S_30000,{type:0,content:this.txt.text},ServerPacket.LOGIC_URL,true);
			this.txt.text  = "";
		},this);
	}
	public open(...param: any[]){
		super.open(param);
		this.addEvent(GameEvent.UP_CHAT,DataEventDispatcher.dispatcher,this.addMessage);
		this.addMessage();
	}
	private addMessage():void
	{
		var render:ChatRender;
		var d:number = this.g0.numChildren;
		var n:number = ChatMgr.ins().chatArr.length;
		if(n == d)
			return;
		while(n != d)
		{
			render = ObjectPool.pop("ChatRender");
			render.data = ChatMgr.ins().chatArr[d];
			render.y = this.dy;
			this.dy += render.height + 5;
			this.g0.addChild(render);
			d++;
		}
		this.checkDel();
	}

    dy:number = 0;
	private checkDel():void
	{
		var n:number = ChatMgr.ins().chatArr.length;
		if(n>=100)
		{
			var r:ChatRender;
			while(n>30)
			{
				ChatMgr.ins().chatArr.shift();
				n--;
				r = (this.g0.getChildAt(0) as ChatRender)
				r.dispose();
			}
			this.dy = 0;
			for(var i:number=0;i<30;i++)
			{
				r = (this.g0.getChildAt(i) as ChatRender);
				r.y = this.dy;
				this.dy += r.height + 5;
			}
		}
	}
}
ViewManager.ins().reg(ChatWin, LayerManager.UI_MainUI);