class ItemGetWayView extends BaseEuiView{
	public constructor() {
		super();
		this.skinName = "ItemGetWaySkin";
		this.b0.name = "0";
		this.b1.name = "1";
		this.item.labName.visible = false;
		this.item.labCount.visible = false;
	}
	g0:eui.Group;
	g1:eui.Group;
	item:BaseItem;
	iname:eui.Label;
	i0:eui.Image;
	i1:eui.Image;
	b0:eui.Button;
	b1:eui.Button;
	rc:eui.Rect;
	private param:Array<any>;
	public open(...param: any[]): void
	{
		this.param = [];
		var val:Array<any> = param[0];
		var icon:string = param[1];
		var itemName = param[2];
		var s:Array<string>;
		this.item.setIcon(icon);
		this.item.isClick = false;
		this.iname.text = itemName;
		this.g0.visible = this.g1.visible = false;
		for(var i:number=0;i<2;i++)
		{
			if(!val[i])
				break;
			s = (<string>val[i]).split(",");
			this.param[i] = s;
			this["g"+i].visible = true;
			this.addTouchEvent(this["b" + i],this.onTap);
			this["i" + i].source = "gainItem" + s[0];
		}
		this.addTouchEvent(this.rc,this.onTap);
	}
	private onTap(e:egret.TouchEvent):void
	{
		if(e.target == this.rc)
		{

		}else{
		var s:Array<string> = this.param[parseInt(e.target.name)];
		let uiView: UIView = ViewManager.ins().getView(UIView) as UIView;
		switch(parseInt(s[0]))
		{
			case ViewID.points:
				break;
			case ViewID.pveII:
				if(s.length == 0)
					ViewManager.ins().open(PVEWin);
				else{
					//uiView.setSelectView(PVEWinII,FBMgr.ins.fbData[parseInt(s[1])]);
				ViewManager.ins().open(PVEWinII,FBMgr.ins.fbData[parseInt(s[1])]);}
				break;
			default:
				if(s.length == 0)
				{
					ViewManager.ins().open(UIView,ViewManager.getView(parseInt(s[0])));
				}else
					egret.log("未实现!");
				break;
		}}
		ViewManager.ins().close(this);
	}
}
ViewManager.ins().reg(ItemGetWayView, LayerManager.UI_Tips);