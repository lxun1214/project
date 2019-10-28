/**
 * 商品Item
 */
class ShopItemRender extends BaseItemRender{
	public item:ItemIcon;
	public labName:eui.Label;
	// public goldImg:eui.Image;
	public lbMoney:AwardShow;
	public buyBtn:eui.Button;

	public itemConfig: any;
	c:eui.Label;
	public constructor() {
		super();
		this.skinName = "shopItemSkin";
		this.init();
	}
	private init(): void{
		this.addTouchEvent(this.buyBtn, this.onTap);
	}
	public createChildren(): void{
		super.createChildren();
	}
	public euiCompete(){
		this.dataChanged();
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_SHOP_BUY,this.upCount,this);
		this.item.tips = true;
	}
	protected dataChanged(): void{
		this.clears();
		if(!this.data || this.data.goods == 0)return;
		this.labName.visible= true;
		// this.goldImg.source = this.data.consume;
		this.item.data = this.data.goods;
		this.itemConfig = ConfigMgr.gameConfig["item"][this.data.goods];
		this.labName.text = this.itemConfig.name;
		this.labName.textColor = ColorUtlis.QUALITY_COLOR[this.itemConfig.rank];
		// this.lbMoney.text = this.data.consumeNum + "";
		this.lbMoney.data = [this.data.consume,this.data.consumeNum];
		this.validateNow();
		this.upCount();
	}

	private upCount():void
	{
		var v:number = ShopVo.ins().getShopBuyNum(this.data.seqId);
		if(v == -1)
			this.c.text = "";
		else
			this.c.text = "剩余购买次数:"  + v;
	}

	private onTap(): void{
		if(this.data)ViewManager.ins().open(ShopBuyTips,this.data);
	}
	public clears(): void{
		this.labName.text = "";
		// this.labDesc.text = "";
	}
}