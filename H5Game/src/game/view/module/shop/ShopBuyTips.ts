/**
 * 购买弹窗
 */
class ShopBuyTips extends BaseEuiView{
	// public rect:eui.Rect;
	public lbNum:eui.TextInput;
	public lbMoney:eui.Label;
	public samllBtn:eui.Button;
	public maxBtn:eui.Button;
	public sureBtn:eui.Button;
	// public closeBtn:eui.Button;
	public goldImg:eui.Image;

	private count: number = 1;
	private data:any;
	public constructor() {
		super();
		this.skinName = "suerBuyTipSkin";
		this.left = this.right = this.top = this.bottom = 0;
	}
	public open(...param: any[]): void{
		this.data = param[0];
		this.lbNum.restrict ="0-9";
		this.count = 1 ;
		this.lbNum.text = "1";
		this.goldImg.source = this.data.consume;
		this.setBuyData();
		// this.rect.touchEnabled = true;
		// this.addTouchEvent(this.rect, this.onTap);
		this.addTouchEvent(this.sureBtn, this.onTap);
		// this.addTouchEvent(this.closeBtn, this.onTap);
		this.addTouchEvent(this.samllBtn, this.onTap);
		this.addTouchEvent(this.maxBtn, this.onTap);

		this.addChangeEvent(this.lbNum, this.changeInput);
	}
	private onTap(e:egret.TouchEvent): void{
		switch(e.currentTarget){
			// case this.rect:
			// case this.closeBtn:
			// 	ViewManager.ins().close(ShopBuyTips);
			// 	break;
			case this.sureBtn:
				this.onBuyItem();
				break;
			case this.samllBtn:
				this.count -= 1;
				this.setBuyData();
				break;
			case this.maxBtn:
				this.count += 1;
				this.setBuyData();
				break;
		}
	}
	private changeInput(): void{
		this.count =  parseInt(this.lbNum.text);
		this.setBuyData();
	}
	private setBuyData(): void{
		if(this.count <= 0){
			this.count = 1;
		}else if(this.count >999){
			this.count = 999;
		}
		if(this.data.limitPlayerDayNum > 0 && this.count > ShopVo.ins().getShopBuyNum(this.data.seqId)){
			this.count = ShopVo.ins().getShopBuyNum(this.data.seqId);
		}
		this.lbNum.text = this.count + '';
		this.lbMoney.text = this.count * this.data.consumeNum + "";
	}
	private onBuyItem(): void{
		if(/*this.data.limitPlayerDayNum > 0 &&  */ShopVo.ins().getShopBuyNum(this.data.seqId) == 0){
			UserTips.ins().showTipsBigToSmall("购买次数不足");
			return;
		}
		var obj:any = ShopVo.ins().getStoreItem(this.data.seqId)
		if(obj.consumeNum * this.count >　MoneyUtils.getMoneyNum(obj.consume))
			return UserTips.ins().showTipsBigToSmall("货币不足,无法购买!");

		ShopVo.ins().sendBuyGoodsRequest(this.data.seqId,this.count);
	}

}
ViewManager.ins().reg(ShopBuyTips, LayerManager.UI_Tips);