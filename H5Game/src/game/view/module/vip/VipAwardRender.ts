class VipAwardRender extends eui.ItemRenderer{
	dg:eui.DataGroup;
	btn:eui.Button;
	public constructor() {
		super();
		this.skinName = "VipAwardSkin";
		this.dg.itemRenderer = BaseItem;
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
				console.log('======touch');;
				let data:Object = {
					vipLvl:this.itemIndex + 1,
				}
				HttpMgr.ins.sendMessage(ClientPacket.S_10043,data,ServerPacket.LOGIC_URL,true);
			},this);

		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20043,(e)=>{
			if(e.data.isSuccess){
				UserVo.ins.vipLvlList.push(e.data.vipLvl);
				this.upStatus();
			}
		},this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel,this.upStatus,this);
	}
	public dataChanged():void{
		super.dataChanged();
		this.dg.dataProvider = new eui.ArrayCollection(ActivetyMgr.ins().getActivityAwards(this.data));
		this.upStatus();
		this.lvl.text = (this.itemIndex + 1 ) + "";
	}
	lvl:eui.Label;
	private upStatus():void
	{
		if(UserVo.ins.vipLevel >= this.itemIndex +1)
		{
			if(UserVo.ins.vipLvlList.indexOf(this.itemIndex+1) != -1)
			{
				this.btn.enabled = false;
				this.btn.label = "已 领 取";
			}else
			{
				this.btn.enabled = true;
				this.btn.label = "领  取";
			}
		}else
		{
			this.btn.enabled = false;
			this.btn.label = "未 达 成";
		}
	}
}