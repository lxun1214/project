class SmeltItemRender extends BaseItemRender{
	public item:BaseItem;
	public selectGr:eui.Group;


	public constructor() {
		super();
		this.skinName = "SmeltItemSkin";
	}
	private init(): void{
		this.addTouchEvent(this,this.onTap);
	}
	protected dataChanged(): void{
		this.item.isClick = false;
		this.item.data = this.data;

		if(SmeltWin.showItem.indexOf(this.item.data) != -1)
			this.selectGr.visible = true;
		else
			this.selectGr.visible = false;
	}
	private onTap(): void{
		
	}
}