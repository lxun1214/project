class ItemIcon extends BaseItemRender{
	public imgBg:eui.Image;
	public imgIcon:eui.Image;

	private itemConfing: any;
	private iconStr: string;
	public constructor() {
		super();
		this.skinName = "ItemIconSkin";
	}
	eff:eui.Group;
	mc:clips.BmpClip;
	public euiCompete(){
		// this.setIcon(this.iconStr);
	}
	protected dataChanged(): void{
		if(!this.data)return;
		let itemId: number = 0;
		if(!isNaN(this.data)){
			let info = new ItemInfo();
			info.itemId = this.data as number;
			info.itemNum = 0;
			itemId = info.itemId;
		}else{
			itemId = this.data.itemId;
		}
		// this.data.itemId;
		if(itemId == 0)return;
		this.itemConfing = BagVo.ins().getItem(itemId);
		this.setQuality(this.itemConfing.rank);
		this.setIcon(ResMgr.getGameItemPng(this.itemConfing.iconID));
	}
	public setData(config: any): void{

	}
	public setIcon(str: string): void{
		this.iconStr = str;
		this.imgIcon.source = str;
	}
	/**
	 * 设置品质背景
	 * @param num 品质(1蓝，2紫，3金，4暗金，5橙）
	 */
	public setQuality(num: number): void{
		this.imgBg.source = num ==0?null:(num==-1?"quality_10":("quality_1" + num));
		if(num >=3)
		{
			if(!this.mc)
				this.mc = new clips.BmpClip();
			ModelResMgr.getOtherEffect(10007+num,this.mc);
			this.eff.addChild(this.mc);
			this.mc.play(-1);
		}else
		{
			if(this.mc)
			{
				this.mc.stop();
				if(this.mc.parent)
					this.mc.parent.removeChild(this.mc);
			}
		}
	}


	
	private _tips : boolean;
	public get tips() : boolean {
		return this._tips;
	}
	public set tips(v : boolean) {
		this._tips = v;
		if(v)
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tipsShow,this);
		else
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tipsShow,this);
	}
	
	private tipsShow():void
	{
		ViewManager.ins().open(ItemTipView,this.itemConfing);
	}
}