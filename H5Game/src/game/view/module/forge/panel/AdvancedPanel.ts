class AdvancedPanel extends BaseView{
	public item:ForgeItem;
	public curr:ForgeTypeView;
	public curr0:ForgeTypeView;
	public strengGroup:eui.Group;
	public labNeed:eui.Label;
	public avdBtn:eui.Button;
	public needItem:ItemIcon;
	public equip:ItemIcon;
	public labName:eui.Label;
	public labName0:eui.Label;
	star:StarIcon;

	private curData: ItemInfo;
	private isFive: boolean = false;
	private upNum: number = 0;
	public constructor() {
		super();
		this.skinName = "AdvancedSkin";
		this.touchEnabled = false;
		this.top = this.bottom = 0;
		this.item.itemIcon.imgBg.visible = false;
	}
	Effmc:clips.BmpClip
	public createChildren(): void{
		super.createChildren();
		var mc:clips.BmpClip = new clips.BmpClip();
		this.Effmc = mc;
		this.Effmc.visible = false;
		ModelResMgr.getOtherEffect(10017,mc);
		this.Effmc.stop();
		this.Effmc.addEventListener(egret.Event.COMPLETE,()=>{
			this.Effmc.gotoAndStop(1);
			this.Effmc.visible = false;
		},this);
		this["g0"].addChild(mc);
	}
	public open(...param: any[]): void{
		this.curData = param[0];
		this.curr.setData(`当前强化`,null,true,2);
		this.curr0.setData(`下一强化`,null,false,2);
		/*this.item.StarIcon.visible = */this.strengGroup.visible = false;

		this.addTouchEvent(this.avdBtn, this.upEquip);

		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_ADVANCE,this.onUpEquip,this);
		if(this.curData)this.setData(this.curData);

		UIDmgr.bindingUID(this.avdBtn,uid.forgeBtn5);
	}
	private onUpEquip(e:egret.Event): void{
		if(e.data.isSuccess){
			this.Effmc.visible = true;
			this.setData(this.curData);
			this.Effmc.play(1);
		}
	}
	public setData(data: ItemInfo): void{
		// this.item.StarIcon.visible = true;
		this.item.data = this.curData = data;
		this.needItem.setIcon(ResMgr.getGameItemPng(MoneyUtils.M_6));
		if(!this.curData)return;
		this.strengGroup.visible = true;
		let eCfg = ForgeVo.ins().getEquipID(this.curData.itemId);
		let stone = UserVo.ins.reinforcedEquipmentStone;

		this.labName0.text = stone+"/"+eCfg.reinforcedEquipmentStone;
		this.labName0.textColor = stone >= eCfg.reinforcedEquipmentStone?ColorUtlis.COLOR_GREEN:ColorUtlis.COLOR_RED;

		let itemCfg = BagVo.ins().getItem(this.curData.itemId);
		// this.labEquipN.text = itemCfg.name;
		// this.item.setIcon(itemCfg.iconID);
		this.star.setLv(eCfg.itemQuality);

		this.curr.setData(`本阶属性`,this.curData,true,2);
		this.curr0.setData(`下阶属性`,this.curData,false,2);
	}
	/**
	 * 装备升级
	 */
	private upEquip(e: egret.TouchEvent): void{
		if(this.labName0.textColor == ColorUtlis.COLOR_RED){
			UserTips.ins().showTipsBigToSmall(`升阶石不足`);
			return;
		}
		ForgeVo.ins().advanceItem = this.item.data;
		HttpMgr.ins.sendMessage(ClientPacket.S_10010,{itemId:this.item.data.itemId},ServerPacket.LOGIC_URL,true);
	}
}