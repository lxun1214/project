class BagWin extends BaseEuiView{
	private viewStack:eui.ViewStack;
	private itemScroller:eui.Scroller;
	private itemList:eui.List;
	private smeltBtn:eui.Button;
	private btn0:eui.Button;
	private btn1:eui.Button;
	private btn2:eui.Button;

	private group: eui.Group;

	private curTabBtn: eui.Button;
	private btnIndex: number;
	private typeAr: number[] = [];
	private currList: ItemInfo[];
	public constructor() {
		super();
		this.skinName = "BagSkin";
		this.isTopLevel = true;

		this.itemList.addEventListener(egret.Event.RENDER,()=>{
			UIDmgr.bindingUID(this.itemList.getVirtualElementAt(0),uid.bagItem);
		},this);
	}
	public open(...param: any[]){
		super.open(param);
		this.typeAr = [BagVo.ITEM_TYPE_EQUIP,BagVo.ITEM_TYPE_OTHER,BagVo.ITEM_TYPE_GEM];
		this.btnIndex = param[0]|0;
		this.currList = [];
		this.itemList.itemRenderer = BaseItem;
		this.group.visible = this.smeltBtn.visible = true;
		// this.equipBtn.visible = this.gemBtn.visible = true;
		let data = ConfigMgr.gameConfig["item"][2001];
		 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA,this.selectType,this);

		this.addTouchEvent(this.smeltBtn, this.onTap);
		this.addTouchEvent(this.btn0, this.onTypeTap);
		this.addTouchEvent(this.btn1, this.onTypeTap);
		this.addTouchEvent(this.btn2, this.onTypeTap);
		// this.update();
		this.selectType();
		UIDmgr.bindingUID(this.btn0,uid.equipBtn);
		UIDmgr.bindingUID(this.smeltBtn,uid.rl0);
		UIDmgr.bindingUID(this.group,uid.itemParent);
			this.addEvent(GameEvent.RED_BAG_RED,DataEventDispatcher.dispatcher,this.upRed);
		UIDmgr.bindingUID(this.itemList.getVirtualElementAt(0),uid.bagItem);

		ViewManager.redToTarge(this.btn1,RemindMgr.hasOtherItem);

	}

	private upRed():void
	{
		ViewManager.redToTarge(this.btn1,RemindMgr.hasOtherItem);
	}

	public close(...param: any[]): void{
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_BAG_DATA,this.selectType,this);
		if(this.curTabBtn)this.curTabBtn.currentState = "up";
	}
	
	private update(): void{
		if(this.currList.length < 36){
			for(let i = 0; i < 36; i++){
				if(!this.currList[i])
					this.currList[i] = null;
			}
		}
		this.itemList.dataProvider = new eui.ArrayCollection(this.currList);
	}
	private onTap(e: egret.TouchEvent): void{
		ViewManager.ins().open(SmeltWin);
	}
	private onTypeTap(e: egret.TouchEvent): void{
		switch(e.currentTarget){
			case this.btn0:
				this.btnIndex = 0;
				break;
			case this.btn1:
				this.btnIndex = 1;
				break;
			case this.btn2:
				this.btnIndex = 2;
				break;
		}
		this.selectType();
	}
	private selectType(): void{
		if(this.curTabBtn)this.curTabBtn.currentState = "up";
		this.curTabBtn = this["btn" + this.btnIndex];
		this.curTabBtn.currentState = "down";

		this.smeltBtn.visible = this.btnIndex==0;
		
		this.currList = BagVo.ins().getTypeItemList(this.typeAr[this.btnIndex]);
		this.update();
	}
}
ViewManager.ins().reg(BagWin, LayerManager.UI_MainUI);