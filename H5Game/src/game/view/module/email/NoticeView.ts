class NoticeView extends BaseEuiView{
	// rc:eui.Rect;
	btn0:eui.Button;
	l0:eui.Label;
	l1:eui.Label;
	public constructor() {
		super();
		this.skinName = "NoticeSkin";
		this.l0.textFlow = new egret.HtmlTextParser().parse(ConfigMgr.gameConfig["bulletin"][0].content);
		this.l1.textFlow = new egret.HtmlTextParser().parse(ConfigMgr.gameConfig["bulletin"][0].title);
	}
	public open(...param: any[]): void{
		super.open(param);
		this.addTouchEvent(this.btn0,this.onTap);
		// this.addTouchEvent(this.rc,this.onTap);
	}
	private onTap(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			// case this.rc:
			// 	ViewManager.ins().close(this);
			// 	break;
			case this.btn0:
				ViewManager.ins().close(this);
				break;
			default:
				break;
		}
	}
}
ViewManager.ins().reg(NoticeView,LayerManager.UI_Popup)