class RankRender extends eui.ItemRenderer{
	public constructor() {
		super();
		this.skinName = "RankRenderSkin";
	}
	l0:eui.Label;
	l1:eui.Label;
	l2:eui.Label;
	l3:eui.Label;
	tt:eui.Image;
	public dataChanged():void
	{
		super.dataChanged();
		this.l0.text = (this.itemIndex + 1) + "";
		this.l1.text = this.data.otherPlayerName;
		this.l2.text = this.data.otherPlayerLevel + "";
		this.l3.text = this.data.otherFightPower + "";
		this.tt.source = this.itemIndex%2==0?"rankI":null;
	}
}