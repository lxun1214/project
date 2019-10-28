// TypeScript file
class FirstCharge extends BaseEuiView{
	activetyID:number;
	public awardGroup:eui.Group;

	public getBtn:eui.Button;
	public getedBtn:eui.Button;
	public unCompleteImg : eui.Image;
	gd:eui.DataGroup;
	public constructor() {
		super();
		this.skinName = "FirstChargeSkin";	
		this["rc"].addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			ViewManager.ins().close(this);
		},this);
		this["newCloseBtn00"].addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			ViewManager.ins().close(this);
		},this);
		this.activetyID = ActivetyMgr.FIRST_CHARGE;
	}
	public open(...param: any[]): void{
		super.open(param);
		this.addEvent(GameEvent.UP_PLAYER_PROPERTY+propertyType.isRecharge,DataEventDispatcher.dispatcher,this.dataChange);
		this.dataChange();
	}
	public createChildren(): void{
		
		super.createChildren();
		this.gd.itemRenderer = BaseItem;
		this.gd.dataProvider = new eui.ArrayCollection(ActivetyMgr.ins().getActivityAwards(ActivetyMgr.ins().activeConfig[ActivetyMgr.FIRST_CHARGE][0]))

		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
			if(this.getBtn.label == "我要充值")
			{
				ViewManager.ins().open(RechargeWin);
				return;
			}
			let data:Object = {
				activityId:ActivetyMgr.FIRST_CHARGE,
				activityIndex:1
		}
			HttpMgr.ins.sendMessage(ClientPacket.S_10032,data,ServerPacket.LOGIC_URL,true);
		},this);

		this.dataChange();
	}


	public dataChange( ){
		var isReward:any = ActivetyMgr.ins().checkAtivityEnd(this.activetyID,1);
		if(UserVo.ins.isRecharge)//充值了
		{
			if(isReward == true)
			{
				this.getBtn.enabled = false;
				this.getBtn.label = "已 领 取";
			}else
			{
				this.getBtn.enabled = true;
				this.getBtn.label = "领 取";
			}
		}else
		{
			this.getBtn.enabled = true;
			this.getBtn.label = "我要充值";
		}
	}
}

ViewManager.ins().reg(FirstCharge, LayerManager.UI_MainUI);
