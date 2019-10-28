/**
 * 宝石
 */
class GemWin extends BaseEuiView{
	public btn0:eui.ToggleButton;
	public btn1:eui.ToggleButton;
	public btn2:eui.ToggleButton;
	public btn3:eui.ToggleButton;
	public gen0:GemItemBase;
	public gen1:GemItemBase;
	public gen2:GemItemBase;
	public gen3:GemItemBase;
	public gen4:GemItemBase;
	public gen5:GemItemBase;
	public gen6:GemItemBase;
	public gen7:GemItemBase;
	public selectItem:ForgeItem;
	public Scroller:eui.Scroller;
	public itemList:eui.List;

	private currGem:GemItemBase;
	private currBtn: eui.ToggleButton;
	private selectIndex: number;
	public constructor() {
		super();
		this.skinName = "GemSkin";
	}
	public createChildren(): void{
		super.createChildren();

		this.itemList.itemRenderer = BaseItem;
			this.itemList.addEventListener(eui.UIEvent.RENDER,()=>{
				UIDmgr.bindingUID(this.itemList.getVirtualElementAt(0),uid.bs1);
		},this);
	}
	public open(...param: any[]): void{
		super.open(param);
		for(let i =0; i < BagVo.EQUIP_MAX; i++){
			this.addTouchEvent(this["btn"+i],this.onSelectBtn);
			this.addTouchEndEvent(this["btn"+i],this.onSelectBtn);
			this["btn"+i].name = i + "";
		}
		for(let j = 0; j<8;j++){
			this.addTouchEvent(this["gen"+j],this.onItemRender);
		}
		if(!this.currBtn)
			this.btn0.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
		this.updateGemList();

		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_GEM_DATA,this.selectEquip,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA,this.updateGemList,this);

		UIDmgr.bindingUID(this.gen0.itemIcon,uid.bs2);
		UIDmgr.bindingUID(this.gen0.upBtn,uid.bs3);
		UIDmgr.bindingUID(this.gen0.downBtn,uid.bs4);
		// UIDmgr.bindingUID(this.itemList.getVirtualElementAt(0),uid.bs1);
		UIDmgr.bindingUID(this,uid.bsParent);
		this.addEvent(GameEvent.RED_GEM_LVL,DataEventDispatcher.dispatcher,this.upRed);
		this.upRed();
	}
	public close(...param: any[]): void{
		GemVo.ins().equipPos = -1;
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_GEM_DATA,this.selectEquip,this);
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_BAG_DATA,this.updateGemList,this);
	}
	private upRed(e:egret.Event=null):void
	{
		for(var i:number=0;i<4;i++)
		{
			if(RemindMgr.GEM_CAN_UP[i].length > 0)
			{
				ViewManager.redToTarge(this["btn" + i],true);
			}else
				ViewManager.redToTarge(this["btn" + i],false);
		}
		for(var i:number=0;i<8;i++)
		{
			if(!RemindMgr.GEM_CAN_UP[this.selectIndex])
				ViewManager.redToTarge(this["gen" + i].itemIcon,false);
			else
			{
				ViewManager.redToTarge(this["gen" + i].itemIcon,RemindMgr.GEM_CAN_UP[this.selectIndex][i]?true:false);
			}
		}
	}
	/**
	 * 点击选择装备按钮
	 */
	tabBar:eui.Group;
	private onSelectBtn(e:egret.TouchEvent): void{
		// if(this.currBtn)
		// 	this.currBtn.selected = false;
		this.currBtn = e.currentTarget;
		// this.currBtn.selected = true;
		this.tabBar.$children.forEach((e,i)=>{
			let btn:eui.ToggleButton = <eui.ToggleButton>e;
			btn.currentState = btn == this.currBtn?"down":"up";
		})
		this.selectIndex = parseInt(this.currBtn.name);
		this.selectEquip();
		this.upRed();
	}
	private selectEquip(): void{
		if(this.currGem)this.currGem.setBtnGrou(false);
		GemVo.ins().equipPos = this.selectIndex;
		this.selectItem.data = UserVo.ins.Columns[this.selectIndex].itemInfo
		let equipGem = UserVo.ins.Columns[this.selectIndex].gemGrooves.gemGrooves;
		let pos: number = 0;
		for(let key in equipGem){
			let info = equipGem[key];
			this["gen" + pos].data = info;
			pos ++;
		}
		// this.selectItem.setItemName();
	}
	private updateGemList(): void{
		let gemList = BagVo.ins().getBagGemList();
		if(gemList.length < 12){
			for(let i = 0; i < 12; i++){
				if(!gemList[i]){
					gemList[i] = null;
				}
			}
		}
		this.itemList.dataProvider = new eui.ArrayCollection(gemList);
	}
	private onItemRender(e: egret.TouchEvent): void{
		if(this.currGem)this.currGem.setBtnGrou(false);
		this.currGem = e.currentTarget;
		if(this.currGem.data.gemId > 0){
			this.currGem.setBtnGrou(!this.currGem.btnGroup.visible,this.currGem==this.gen2?-133:0);
		}
	}
}
ViewManager.ins().reg(GemWin,LayerManager.UI_MainUI);