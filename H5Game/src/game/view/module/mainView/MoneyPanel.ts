class MoneyPanel extends eui.Component{
	goldImg:eui.Image;
	labGold:eui.Label;
	addGBtn:eui.Button;
	public constructor() {
		super();
		this.skinName = "moneySkin";
	}
	mt:string;
	public set moneyType(val:string)
	{
		this.mt = val;
		// var dx:number;
		// switch(val)
		// {
		// 	case MoneyUtils.M_2:
		// 		this.goldImg.source = "money_2";
		// 		// dx = propertyType.gold;
		// 		this.addGBtn.visible = false;
		// 		break;
		// 	case MoneyUtils.M_3:
		// 		this.goldImg.source = "money_3";
		// 		// dx = propertyType.diamond;
		// 		break;
		// }
		this.goldImg.source = ResMgr.getGameItemPng(val);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE,this.upVal,this);
		this.upVal();
	}

	public upVal():void
	{
		this.labGold.text = CommonUtils.overLength(MoneyUtils.getMoneyNum(this.mt));//MoneyUtils.getMoneyNum(this.mt) + "";
		
	}
}