class OfflineWin extends BaseEuiView{
	l0:eui.Label;
	l1:eui.Label;
	l2:eui.Label;
	l3:eui.Label;
	l4:eui.Label;
	l5:eui.Label;
	b0:eui.Button;
	b1:eui.Button;
	// b2:eui.Button;
	// rc:eui.Rect;
	public constructor() {
		super();
		this.skinName = "offlineSkin";
	}
	public open(...param: any[]): void{
		super.open();
		var obj:any = param[0];
		this.l0.text = "离线时间:" + DateTimeUtils.toTimeString(obj.offlineTime);
		this.l1.text = "" + CommonUtils.overLength(obj.gold);
		this.l2.text = "" + CommonUtils.overLength(obj.exp);
		this.b0.visible = obj.amplitude == 0;
		// this.l3.text = "0";
		this.l4.text = "" + CommonUtils.overLength(obj.gold*obj.amplitude/100);
		this.l5.text = "" + CommonUtils.overLength(obj.exp*obj.amplitude/100);
		this.addTouchEvent(this.b0,this.onTap);
		// this.addTouchEvent(this.rc,this.onTap);
		this.addTouchEvent(this.b1,this.onTap);
		// this.addTouchEvent(this.b2,this.onTap);
		this.addEvent(egret.Event.ADDED_TO_STAGE,this,this.addStage);
	}
	private addStage():void
	{
		this.addTouchEvent(this.stage,this.onTap);
	}
	private onTap(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this.b0:
				ViewManager.ins().open(MonthCard);
				break;
		}
		ViewManager.ins().close(this);
	}
}
ViewManager.ins().reg(OfflineWin, LayerManager.UI_Tips);