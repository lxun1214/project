// TypeScript file
class ReborthWin extends BaseEuiView{

	public awardGroup :eui.DataGroup;
	public progress : eui.ProgressBar; 
	public reborthBtn : eui.Button;

	public constructor() {
		super();
		this.skinName = "ReborthSkin";
	}

	public createChildren(): void{
		super.createChildren();

		this.reborthBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
			HttpMgr.ins.sendMessage(ClientPacket.S_10011,{},ServerPacket.LOGIC_URL);
			ViewManager.ins().close(ReborthWin );

		},this);
		this.awardGroup.itemRenderer = BaseItem;
	}
	public open(...param: any[]):void
	{
		super.open(param);
		var a:any = ConfigMgr.gameConfig.rebirthAward[UserVo.ins.points];
		var c:Array<ItemInfo> = [];
		var vo:ItemInfo;
		for(var k in a)
		{
			var dx:number = MoneyUtils.isMoneyType(k)
			if(dx != -1 && a[k] > 0)
			{
				vo = new ItemInfo();
				vo.moneyType = MoneyUtils.ALL_MONEY[dx];
				vo.itemNum = a[k];
				c.push(vo);
			}
		}
		this.awardGroup.dataProvider = new eui.ArrayCollection(c);
		UIDmgr.bindingUID(this.reborthBtn,uid.cs1);
	}
}
ViewManager.ins().reg(ReborthWin, LayerManager.UI_MainUI);

