class LoginView extends eui.Component implements IDispose{
	private t1:eui.TextInput;
	private t2:eui.TextInput;
	private b1:eui.Button;
	public constructor() {
		super();
		this.horizontalCenter = 0;
		this.skinName = "loginViewSkin";
		this.b1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.loginGame,this);

		var obj:any = egret.localStorage.getItem("an");
		if(obj)
			this.t1.text = obj + "";
		obj = egret.localStorage.getItem("pw");
		if(obj)
			this.t2.text = obj + "";
	}
	private loginGame():void
	{
		if(this.t1.text == "")
		{
			UserTips.ins().showTipsBigToSmall("请输入正确的账号!");
			return;
		}
		if(this.t2.text == "")
		{
			UserTips.ins().showTipsBigToSmall("请输入正确的密码!");
			return;
		}
		 var data:Object = {
            accountName:this.t1.text,
            passWord:this.t2.text
        }
		this.b1.touchEnabled = false;
		egret.localStorage.setItem("an",this.t1.text);
		egret.localStorage.setItem("pw",this.t2.text);
		HttpMgr.ins.sendMessage(ClientPacket.S_1002,data,ServerPacket.LOGIN_URL);
	}
	public dispose():void
	{
		if(this.parent)
			this.parent.removeChild(this);
		this.b1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.loginGame,this);
	}
}