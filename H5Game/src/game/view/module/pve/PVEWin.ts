class PVEWin extends BaseEuiView{
	ls:eui.List;
	public constructor() {
		super();
		this.skinName = "PVESkin";
	}

	protected euiCompete():void
	{
		super.euiCompete();
		var a:Array<any>=[];
		for(var i:number=0;i<FBMgr.ins.fbData.length;i++)
		{
			a.push(FBMgr.ins.fbData[i][0]);
		}
		this.ls.dataProvider = new eui.ArrayCollection(a);
	}

	public open(...param: any[]):void
	{
		super.open(param);
	}
}
ViewManager.ins().reg(PVEWin, LayerManager.UI_MainUI);