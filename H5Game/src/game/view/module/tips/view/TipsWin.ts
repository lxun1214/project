class TipsWin extends BaseEuiView{
	// public closeBg:eui.Rect;
	// public closeBtn:eui.Button;
	public buyBtn0:eui.Button;
	public buyBtn1:eui.Button;
	public buyBtn2:eui.Button;
	public labDesc:eui.Label;
	win1:BaseWin1;
	// private l0: eui.Label;
	public constructor() {
		super();
		this.skinName = "TipsViewSkin";
	}
	/**
	 * 确定
	 * 内容
	 * 标题 null:提示
	 * 取消 null
	 * 确定回调 null
	 * 取消回调 null
	 * this
	 */
	private call0:Function;
	private call1:Function;
	private arg:any;
	public open(...param: any[]): void{
		// this.tipStr = param[0]||"";
		if(!param[3] || param[3] == "")
		{
			this.buyBtn1.visible = this.buyBtn2.visible = false;
			this.buyBtn0.visible = true;
			this.buyBtn0.label = param[0];
		}
		else
		{
			this.buyBtn1.visible = this.buyBtn2.visible = true;
			this.buyBtn0.visible = false;
			this.buyBtn1.label = param[0];
			this.buyBtn2.label = param[3];
		}
		this.labDesc.text = param[1];
		this.win1.titleS = param[2]?param[2]:"提示";
		this.call0 = param[4];
		this.call1 = param[5];
		this.arg = param[6];
		// this.addTouchEvent(this.closeBg, this.onTap);
		// this.addTouchEvent(this.closeBtn, this.onTap);
		this.addTouchEvent(this.buyBtn0, this.onTap);
		this.addTouchEvent(this.buyBtn1, this.onTap);
		this.addTouchEvent(this.buyBtn2, this.onTap);
		// this.setTips();
	}
	// private setTips(): void{
	// 	this.labDesc.text = this.tipStr;
	// }
	private onTap(e:egret.TouchEvent): void{
		switch(e.currentTarget)
		{
			case this.buyBtn0:
			case this.buyBtn1:
				if(this.call0)
					this.call0.apply(this.arg);
				break;
			default:
				if(this.call1)
					this.call1.apply(this.arg);
				break;
		}
		ViewManager.ins().close(this);
	}
}
ViewManager.ins().reg(TipsWin,LayerManager.UI_Tips);