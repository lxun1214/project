/**
 * 道具基类
 */
class BaseItem extends BaseItemRender{
	public itemIcon:ItemIcon;
	public imgBg:eui.Image;
	public labCount:eui.Label;
	public labName:eui.Label;
	jie:eui.Label;
	private itemConfing: any;

	public isClick: boolean = true;
	public constructor() {
		super();
		this.skinName="BaseItemSkin";
		this.init();
	}
	private init(): void{
		this.addTouchEvent(this,this.onTap);
	}
	protected dataChanged(): void{
		this.clears();
		if(!this.data)return;
		if(this.data.moneyType)
		{
			this.setIcon(this.data.moneyType);
			this.setName(MoneyUtils.getMoneyName(this.data.moneyType));
			this.setCount(this.data.itemNum);
			this.itemIcon.setQuality(-1);
			return;
		}this.parent.parent.parent.parent
		let itemId: number = this.data.itemId;
		this.itemConfing = BagVo.ins().getItem(itemId);
		this.setIcon(this.itemConfing.iconID);
		this.labName.text = this.itemConfing.name;
		this.labName.textColor = ColorUtlis.QUALITY_COLOR[this.itemConfing.rank];
		this.setCount(this.data.itemNum);
		this.validateNow();
		this.setQuality(this.itemConfing.rank);
	}
	public setIcon(str: string): void{
		this.itemIcon.setIcon(str == ""?null:ResMgr.getGameItemPng(str));
	}
	public setName(str: string): void{
		this.labName.text = str;
	}
	/**
	 * 设置数量
	 */
	public setCount(count: number): void{
		if(this.itemConfing && this.itemConfing.itemType == BagVo.ITEM_TYPE_EQUIP){
			if(!this.data.showEquipsCount)
				this.labCount.text = (this.data.level>0?"+"+this.data.level:"") + "";
			else
				this.labCount.text = (count>0?count:"") + "";
			var equipConfing:any = ForgeVo.ins().getEquipID(this.data.itemId);
			this.jie.text = equipConfing.itemQuality + "阶";
		}else{
			this.labCount.text = (count>0?count:"") + "";
			this.jie.text = "";
		}
		
	}
	/**
	 * 品质
	 */
	public setQuality(rank: number): void{
		this.itemIcon.setQuality(rank);
		// this.imgBg.source = "quality_1" + (rank>4?4:rank);
	}
	private onTap(): void{
		if(this.isClick){
			this.onRescript();
			// if(!this.data)return;
			// let byte = new egret.ByteArray();
			// byte.writeDouble(this.data.uuid);
			// HttpMgr.ins.sendMessage(ClientPacket.S_10008,{uuid:this.data.uuid},ServerPacket.LOGIC_URL,true);
		}
	}
	protected onRescript(): void{
		if(!this.data || !this.itemConfing)return;
		//装备
		if(this.itemConfing.itemType == 2){
			// let byte = new egret.ByteArray();
			// byte.writeDouble(this.data.uuid);
			// HttpMgr.ins.sendMessage(ClientPacket.S_10008,{uuid:this.data.uuid},ServerPacket.LOGIC_URL,true);
		//宝石
		}else if(this.itemConfing.itemType == 1){
			if(ViewManager.ins().isShow(GemWin)){
				var dx:number = GemVo.ins().isEquipGem(this.itemConfing.itemId)
				if (dx != -1) 
					return UserTips.ins().showTipsBigToSmall("已镶嵌同类型了的宝石!");
				//GemVo.ins().sendGemMountRequest(this.data.uuid, dx);
				GemVo.ins().sendGemMountRequest(this.data.uuid);
				return;
			}
		}
		//console.log('----item data',this.data);
		ViewManager.ins().open(ItemTipView,this.data);
	}
	public clears(): void{
		this.labName.textColor = 0xffffff;
		this.itemIcon.setIcon("");
		this.labName.text = "";
		this.labCount.text =  "";
		this.imgBg.source = "";
		this.setQuality(-1);
		this.jie.text = "";
		// this.itemIcon.imgBg.source = "";
	}
}