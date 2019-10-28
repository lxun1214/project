class GemItemBase extends BaseItemRender{
	public itemIcon:BaseItem;
	public labLv:eui.Label;
	// public labType:eui.Label;
	// public labName:eui.Label;
	public btnGroup:eui.Group;
	public upBtn:eui.Button;
	public downBtn:eui.Button;

	// private glowFilter:egret.GlowFilter;

	mc:clips.BmpClip;
	public constructor() {
		super();
		this.skinName = "GemItemSkin";
		this.itemIcon.labName.visible = false;
	}
	public createChildren(): void{
		super.createChildren();
		this.mc = ModelResMgr.getOtherEffect(10027);
		this["g0"].addChild(this.mc);
	}
	public euiCompete(){
		this.btnGroup.visible = false;
	}
	protected dataChanged(): void{
		this.clearData();
		if(this.data)
		{
			if(this.data.isOpen)
			{
				this.mc.stop();
				this.mc.visible = false;
			}else
			{
				this.mc.play(-1);
				this.mc.visible = true;
			}
		}
		if(!this.data || this.data.gemId == 0)return;
		this.addTouchEvent(this.upBtn,this.onTap);
		this.addTouchEvent(this.downBtn,this.onTap);
		let itemId: number = this.data.gemId;
		
		this.itemIcon.data = BagVo.ins().getItem(itemId);
		// this.setIcon(this.itemConfing.iconID);
		this.labLv.text = "LV." + GemVo.ins().getGemLv(itemId);
		// this.labName.text = this.itemConfing.name;
		// this.labName.textColor = ColorUtlis.QUALITY_COLOR[this.itemConfing.rank];
		// this.setQuality(this.itemConfing.rank);
		// this.setGemType();
	}
	/**
	 * 品质
	 */
	// public setQuality(rank: number): void{
	// 	this.itemIcon.setQuality(rank);
	// }
	// public setIcon(str: string): void{
	// 	this.itemIcon.setIcon(ResMgr.getGameItemPng(str));
	// }
	// private setGemType(): void{
	// 	this.labType.text = GemVo.ins().getGemType(this.data.gemId);//this.itemConfing.description;
	// }
	private onTap(e: egret.TouchEvent): void
	{
		if(this.upBtn == e.currentTarget){
			GemVo.ins().upGem(this.data);
		}else if(this.downBtn == e.currentTarget){
			GemVo.ins().sendGemRemoveRequest(this.data.loc);
		}
	}
	public setBtnGrou(flag: boolean,x:number = 0, y:number = 8): void{
		this.btnGroup.visible = flag;
		if(flag && x == 0)
			x = this.itemIcon.width + 5;
		this.btnGroup.x = x;
		this.btnGroup.y = y;
	}
	public clearData(): void{
		this.itemIcon.setIcon("");
		this.itemIcon.setQuality(-1);
		this.labLv.text = "";
		// this.labName.text = "";
		// this.labType.text = "";
		this.removeTouchEvent(this.upBtn,this.onTap);
		this.removeTouchEvent(this.downBtn,this.onTap);

		// this.filters = [this.glowFilter];
	}
}