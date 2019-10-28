class PlayerEquipItem extends BaseItemRender{
	public item:ForgeItem;

	private itemConfing: any;
	public constructor() {
		super();
		this.skinName = "PlayerEquipItemSkin";
	}
	public createChildren(): void{
		super.createChildren();
		
	}
	protected dataChanged(): void{
		this.clears();
		if(!this.data|| this.data.itemId == 0)return;
		let itemId: number = this.data.itemId;
		this.itemConfing = BagVo.ins().getItem(itemId);
		this.item.data = this.data;
	}
	public clears(): void{
		this.item.data = null;
	}
}