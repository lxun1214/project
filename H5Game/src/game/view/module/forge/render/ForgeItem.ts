/**
 * 装备item
 */
class ForgeItem extends BaseItemRender{
	public itemIcon:BaseItem;
	// public labStreng:eui.Label;
	// public labName:eui.Label;
	// jie:eui.Label;
	private itemConfing: any;
	// private equipConfing: EquipConfing;
	public constructor() {
		super();
		this.skinName="EquipSkin";
		this.itemIcon.isClick = false;
	}
	protected dataChanged(): void{
		this.itemIcon.clears();
		if(!this.data || this.data.itemId == 0)return;
		this.itemIcon.data = this.data;
		// let itemId: number = this.data.itemId;
		// this.equipConfing = ForgeVo.ins().getEquipID(itemId);
		// this.itemConfing = BagVo.ins().getItem(itemId);
		// this.setIcon(this.itemConfing.iconID);
		// this.labStreng.text = this.data.level>0?"+"+this.data.level:"";
		// this.setStarLv(this.equipConfing.itemQuality);
		// this.setQuality(this.itemConfing.rank);
		// this.labCount.text = this.data.itemNum;
	}
	// public setIcon(str: string): void{
	// 	this.itemIcon.setIcon(ResMgr.getGameItemPng(str));
		
	// }
	// public setItemName(): void{
	// 	if(!this.itemConfing){
	// 		this.labName.text = "";
	// 		return;
	// 	}
	// 	this.labName.text = this.itemConfing.name;
	// 	this.labName.textColor = ColorUtlis.QUALITY_COLOR[this.itemConfing.rank];
	// }
	/**
	 * 品质
	 */
	// public setQuality(rank: number): void{
	// 	this.itemIcon.setQuality(rank);
	// }
	/**
	 * 设置装备阶等级星星
	 */
	// public setStarLv(lv: number): void{
	// 	this.jie.text = lv?lv+"阶":"";
	// }
	// public onTap(): void{
	// 	this.labStreng.text = "";
	// }
	// public onClears(): void{
	// 	this.labName.text = "";
	// 	this.labStreng.text = "";
	// 	this.itemIcon.setIcon("");
	// 	this.setStarLv(0);
	// 	this.setQuality(-1);
	// 	this.labStreng.text = "";
	// 	this.itemConfing = null;
	// 	this.labName.textColor = 0xffffff;
	// }
}