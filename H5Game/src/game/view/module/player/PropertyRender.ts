class PropertyRender extends eui.ItemRenderer{
	public constructor() {
		super();
		this.skinName = "PropertySkin";
	}
	pn:eui.Label;
	pv:eui.Label;
	public dataChanged():void
	{
		super.dataChanged();
		this.pn.text = this.data[0];
		this.pv.text = this.data[1];
	}
}