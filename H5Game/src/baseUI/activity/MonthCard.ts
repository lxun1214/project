// TypeScript file
class MonthCard extends  BaseEuiView{
	public bg:eui.Image;
	public getBtn:eui.Button;
	public buyBtn: eui.Button;
	public left_text : eui.Label;

	gd:eui.DataGroup;
	it:BaseItem;
	public constructor() {
		super();
		this.skinName = "MonthCardSkin";	
		this.gd.itemRenderer = BaseItem;
		this.gd.dataProvider = new eui.ArrayCollection(ActivetyMgr.ins().getActivityAwards(ConfigMgr.gameConfig["monthMember"][1]));
		this.it.data = ActivetyMgr.ins().getActivityAwards(ConfigMgr.gameConfig["monthMember"][2])[0];


		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20044,(e)=>{
			console.log('----ServerPacket.C_20044----',e.data);
			this.buyBtn.visible = false;
			this.getBtn.label = "已 领 取";
			this.getBtn.enabled = false;
			UserVo.ins.monthCardInfo.isReceive = true;
		},this);

		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30010,(e)=>{
			UserVo.ins.monthCardInfo = e.data.monthCardInfo;
			this.buyBtn.visible = false;
			this.getBtn.label = "领 取";
			this.getBtn.enabled = true;
		},this);

		this["rc"].addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			ViewManager.ins().close(this);
		},this);
		this["newCloseBtn00"].addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			ViewManager.ins().close(this);
		},this);
	}
	public open(...param: any[]): void{
		super.open(param);
		 let mouthCard = UserVo.ins.monthCardInfo;
		 
		 if(mouthCard){
			let isget = mouthCard['isReceive'];
			this.buyBtn.visible = false;
			if(isget){
				this.getBtn.enabled = false;
				this.getBtn.label = "已 领 取";
			}else{
				this.getBtn.label = "领 取";
				this.getBtn.enabled = true;
			}

			this.left_text.text = `剩余${mouthCard['cardEndDay']}天`
		 }else{
			 this.getBtn.label = "未 达 成";
			 this.buyBtn.visible = true;
			 this.left_text.text = `剩余0天`
		 }


		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
			HttpMgr.ins.sendMessage(ClientPacket.S_10044,{},ServerPacket.LOGIC_URL,true);
		},this);

		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
			let data = ConfigMgr.gameConfig["paymentBase"][6];
			if(ParamMgr.SPID == 0)
				RechargeVo.ins().sendRechargeOrderRequest(data.mallId);
			else 
				MoneyUtils.recharge(data);
		},this);
	}
}

ViewManager.ins().reg(MonthCard, LayerManager.UI_MainUI);