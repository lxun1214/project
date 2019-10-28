// TypeScript file
class VipWin extends BaseEuiView{
    // public player:PlayerTopView;
    // public labDengji:eui.Label;
    public labNext:eui.Label;
	public vipList :eui.DataGroup;

	public progress : eui.ProgressBar; 
	c:eui.Label;
	static MAX_VIP_LVL:number;
	public constructor() {
		super();
		this.skinName = "VipSkin";
		// this.horizontalCenter = this.verticalCenter = 0;
		VipWin.MAX_VIP_LVL = ConfigMgr.gameConfig["vipBase"].length;
		this.vipList.itemRenderer = VipAwardRender;
		this.vipList.dataProvider = new eui.ArrayCollection(ConfigMgr.gameConfig["vipBase"]);
	}

	public upVip():void
	{
		// this.labDengji.text = `${UserVo.ins.vipLevel}`
		let next = UserVo.ins.vipLevel >=VipWin.MAX_VIP_LVL ?  'VIP达到最大等级' : ConfigMgr.gameConfig["vipBase"][UserVo.ins.vipLevel ]["vipDesc"];
		this.labNext.text = next;

		this.progress.maximum = UserVo.ins.vipLevel >=VipWin.MAX_VIP_LVL?100:ConfigMgr.gameConfig["vipBase"][UserVo.ins.vipLevel].payGold;

		this.progress.value =  UserVo.ins.vipExp;
		this.c.text = "当前VIP等级:" + UserVo.ins.vipLevel;
	}

	public open(...param: any[]): void{
		super.open();
		this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel,DataEventDispatcher.dispatcher,this.upVip);
		this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipExp,DataEventDispatcher.dispatcher,this.upVip);
		this.upVip();
	}
}
ViewManager.ins().reg(VipWin, LayerManager.UI_MainUI);

