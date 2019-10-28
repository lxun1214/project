class PVEWinII extends BaseEuiView{
	ls:eui.List;
	public constructor() {
		super();
		this.skinName = "PVEIISkin";
	}
	public open(...param: any[]):void
	{
		super.open(param);
		this.ls.dataProvider = new eui.ArrayCollection(param[0]);
	}
	protected closeCall():void
	{
		super.closeCall();
		ViewManager.ins().open(PVEWin);
	}
}
ViewManager.ins().reg(PVEWinII, LayerManager.UI_MainUI);