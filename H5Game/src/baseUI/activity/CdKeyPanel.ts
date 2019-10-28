class CdKeyPanel extends eui.Component{
	btn:eui.Button;
	txt:eui.TextInput;
	public constructor() {
		super();
	}	
	public createChildren():void
	{
		super.createChildren();
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if(this.txt.text == "")
				return UserTips.ins().showTipsBigToSmall("请输入要兑换的激活码!");
			HttpMgr.ins.sendMessage(ClientPacket.S_10045,{giftCode:this.txt.text},ServerPacket.LOGIC_URL,true);
			this.txt.text = "";
		},this);
	}
}