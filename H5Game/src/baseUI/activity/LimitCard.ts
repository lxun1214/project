// TypeScript file
class LimitCard extends  BaseEuiView{
	public bg:eui.Image;

	public getOne:eui.Button;
	public getTen:eui.Button;

	public nextDraw : eui.Label;

	MAX_NUM:number = 50;
	public constructor() {
		super();
		this.skinName = "LimitCardSkin";
		this["rc"].addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			ViewManager.ins().close(this);
		},this);
	}

	public createChildren(): void{

		// DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20042,(e)=>{
			// if(e.data.isSuccess){
			// 	this.nextDraw.text = "连抽" + (50-e.data.drawCardNum) + "次必获得稀有道具"
			// }
		// },this);

		// this.nextDraw.text =  "连抽" + (50-UserVo.ins.drawCardInfo.drawCardNum) + "次必获得稀有道具";



		this.getOne.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
			if(UserVo.ins.diamond < 50){
				ViewManager.ins().open(TipsWin,"确定","钻石不足","提示","",()=>{
					//location.replace(document.referrer);
				},null,this)
				return ;
			}
			let data = {
				drawType:1
			}
			HttpMgr.ins.sendMessage(ClientPacket.S_10042 ,data,ServerPacket.LOGIC_URL,true);
		},this);

		this.getTen.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
			if(UserVo.ins.diamond < 450){
				ViewManager.ins().open(TipsWin,"确定","钻石不足","提示","",()=>{
					//location.replace(document.referrer);
				},null,this)

				return ;

			}
			let data = {
				drawType:2
			}
			HttpMgr.ins.sendMessage(ClientPacket.S_10042 ,data,ServerPacket.LOGIC_URL,true);
		},this);
	}
}
ViewManager.ins().reg(LimitCard, LayerManager.UI_MainUI);