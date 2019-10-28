class AwardShow extends eui.ItemRenderer{
	goldImg:eui.Image;
	labGold:eui.Label;
	public constructor() {
		super();
		this.skinName = "AwardShowSkin"
	}

	public dataChanged():void
	{
		super.dataChanged();
		this.goldImg.source = ResMgr.getGameItemPng(this.data[0]);
		this.labGold.text = "x" + this.data[1];
	}
}