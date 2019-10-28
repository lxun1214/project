class ShopWin extends BaseEuiView{
	public itemScroller:eui.Scroller;
	public list:eui.List;

	public b0:eui.ToggleButton;
	public b1:eui.ToggleButton;
	public b2:eui.ToggleButton;
	public b3:eui.ToggleButton;
	// public returnBtn:eui.ToggleButton;


	public constructor() {
		super();
		this.isTopLevel = true;
		this.skinName = "shopSkin";
	}
	public createChildren(): void{
		// this.pt.titleImg.source = "t_1";
		this.list.itemRenderer = ShopItemRender;
	}

	// private selectType:number = 0;
	public open(...prama: any[]): void{
		// this.update();
		super.open(prama);
		this.addTouchEvent(this.b0, this.onTap);
		this.addTouchEvent(this.b1, this.onTap);
		this.addTouchEvent(this.b2, this.onTap);
		this.addTouchEvent(this.b3, this.onTap);
		if(!this.select)
			this.b0.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
		// this.addTouchEvent(this.returnBtn, this.onTap);
	}
	private update(d:number): void{
		let ar: Array<any> = ConfigMgr.gameConfig["store"];
		var c:Array<any> = [];
		for(var i:number=0;i<ar.length;i++)
		{
			if(!ar[i].down && d == ar[i].storeType)
				c.push(ar[i]);
		}
		// this.list.itemRenderer = ShopItemRender;
		this.list.dataProvider = new eui.ArrayCollection(c);
		this.itemScroller.stopAnimation();
		this.itemScroller.viewport.scrollV = 0;
	}

	private select:eui.ToggleButton;
	private onTap(e:egret.TouchEvent): void{
		let uiView: UIView = ViewManager.ins().getView(UIView) as UIView;
		switch(e.currentTarget){
			case this.b0:
				this.update(1);
				// uiView.setSelectView(BagWin);
				break;
			case this.b1:
			this.update(2);
				// uiView.setSelectView(GemWin);
				break;
			case this.b2:
			this.update(3);
				// uiView.setSelectView(GemWin);
				break;
			case this.b3:
				this.update(4);
				// uiView.setSelectView(GemWin);
				break;
		}
		if(this.select)
			this.select.currentState = "up";
		this.select = e.currentTarget;
		this.select.currentState = "down";
		//e.currentTarget.currentState = "up";
		// ViewManager.ins().close(this);
	}
}
ViewManager.ins().reg(ShopWin, LayerManager.UI_MainUI);