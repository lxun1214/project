class serverDataRender extends eui.ItemRenderer{
	public constructor() {
		super();
		this.touchChildren = false;
	}
	l0:eui.Label;
	l1:eui.Image;
	public dataChanged():void
	{
		super.dataChanged();
		// var s:string = this.data.serverState == 1?"正常":"关闭";
		this.l0.textFlow = ColorUtlis.COLOR_STR(this.data.serverId + "区  " + this.data.serverName,this.data.serverState == 1);
		this.l1.source = !this.data.v?"流畅":"火爆";
	}
}