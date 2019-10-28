class VipIcon extends eui.Component{
	public constructor() {
		super();
	}
	public createChildren():void
	{
		super.createChildren();
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY+propertyType.vipLevel,this.upVip,this);
		this.upVip();
	}
	vip:eui.BitmapLabel;
	// vipImg:eui.Image;
	private upVip():void
	{
		this.vip.text = `${UserVo.ins.vipLevel}`;
		// this.vipImg.source = `VIP_json.v_${UserVo.ins.vipLevel + 1}`
		
	}
}