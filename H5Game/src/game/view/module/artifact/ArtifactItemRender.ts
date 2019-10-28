/**
 * 神器Item
 */
class ArtifactItemRender extends BaseItemRender{
	public itemIcon:ItemIcon;

	public itemConfing: any;
	public constructor() {
		super();
		this.skinName = "ArtifactItemSkin";
	}
	public createChildren(): void{
		super.createChildren();
	}
	public euiCompete(){
		this.dataChanged();
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.RED_ARTIFACE,this.upRed,this)
	}
	private upRed():void
	{
		ViewManager.redToTarge(this.itemIcon,RemindMgr.artifactTips[this.itemIndex] != 0);
	}

	protected dataChanged(): void{
		if(!this.data)return;
		// this.itemConfing = this.data;
		let itemId: number = this.data.itemId;
		this.itemConfing = BagVo.ins().getItem(itemId);
		this.setIcon(this.itemConfing.iconID);
		// this.labName.text = this.itemConfing.name;
		// this.setCount(this.data.itemNum);
		this.setQuality(this.itemConfing.rank);
		this.validateNow();
		if(this.itemIndex == 0)
			UIDmgr.bindingUID(this,uid.af1);
		this.upRed();
	}
	public setIcon(str: string): void{
		this.itemIcon.setIcon(ResMgr.getGameItemPng(str));
	}
	/**
	 * 品质
	 */
	public setQuality(rank: number): void{
		this.itemIcon.setQuality(rank);
	}
}