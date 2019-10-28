class ChatRender extends eui.ItemRenderer{
	g0:eui.Group;
	vip:eui.BitmapLabel;
	ln:eui.Label;
	ld:eui.Label;
	icon:eui.Image;
	public constructor() {
		super();
		this.skinName = "ChatRenderSkin";
	}
	public dataChanged():void
	{
		super.dataChanged();
		var v:ChatVo = this.data;
		if(!v.id || v.id == "")
		{
			this.g0.visible = false;
			this.ln.text = "系统广播:";
			this.icon.source = null;
		}else
		{
			this.vip.text = v.vipLvl + "";
			this.g0.visible = v.vipLvl > 0;
			// this.ln.x = v.vipLvl>0?64:0;
			this.icon.source = "human" +v.sex + "_png"
			this.ln.text = v.playName + ":";
		}
		// this.ln.width = this.ln.textWidth+5;
		this.ld.text = v.des;
		this.ld.height = 89;
		// this.ld.x = this.ln.x + this.ln.width + 5;
		// this.height = this.ld.height = this.ld.textHeight + 5;
	}
	public dispose():void
	{
		if(this.parent)
			this.parent.removeChild(this);
		ObjectPool.push(this);
	}
}