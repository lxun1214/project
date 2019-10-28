class ForgeWin extends BaseEuiView{
	public equipGrp:eui.Group;
	public equip0:ForgeItem;
	public equip1:ForgeItem;
	public equip2:ForgeItem;
	public equip3:ForgeItem;
	public viewStack:eui.ViewStack;
	public tabBar:eui.TabBar;
	private panel: StrengthenPanel | AdvancedPanel;
	private currItem:ForgeItem;
	private curData: ItemInfo;
	private glowFilter:egret.GlowFilter;

	private isFive: boolean = false;
	private upNum: number = 0;
	public constructor() {
		super();
		this.skinName = "ForgeSkin";
		
	}
	public createChildren(): void{
		super.createChildren();
		this.glowFilter = new egret.GlowFilter( 0xffff00, 0.8, 35, 35,2, egret.BitmapFilterQuality.HIGH, false, false );
		var mc:clips.BmpClip = new clips.BmpClip();
		mc.setScaleX(1.2);
		mc.scaleY = 1.2;
		ModelResMgr.getOtherEffect(10007,mc);
		mc.play(-1);
		this["g0"].addChild(mc);
		for(let i = 0; i < 10; i++){
			this["equip"+i].itemIcon.labName.visible= false;
		}
	}
	public open(...param: any[]): void{
		super.open(param);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_STRENGTH,this.onUpEquip,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_ADVANCE,this.onAdvancedEquip,this);
		this.addChangeEvent(this.tabBar, this.selectPanel);
		this.addEvent(GameEvent.RED_STRENG,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_EQUIP_LVL,DataEventDispatcher.dispatcher,this.upRed);
		this.viewStack.selectedIndex = 0;
		this.panel = this.viewStack.getElementAt(0) as StrengthenPanel;
		this.update();
		for(let i = 0; i < 10; i++){
			this.addTouchEvent(this["equip"+i],this.onSelectEquip);
		}
		this.panel.open(this.curData);
		for(var i:number=0;i<10;i++)
		{
			if(this["equip" + i].data)
			{
				UIDmgr.bindingUID(this["equip" + i],uid.forgeBtn1);
				break;
			}
		}
		this.upRed();
	}

	private upRed():void
	{
		ViewManager.redToTarge(this.tabBar.getVirtualElementAt(0),RemindMgr.StrengEquips.length > 0);
		ViewManager.redToTarge(this.tabBar.getVirtualElementAt(1),RemindMgr.upEquipsLvl.length > 0);

		if(this.viewStack.selectedIndex == 0)
		{
			for(var i:number=0;i<10;i++)
			{
				ViewManager.redToTarge(this["equip"+i].itemIcon,RemindMgr.StrengEquips[i]?true:false);
			}
		}else
		{
			for(var i:number=0;i<10;i++)
			{
				ViewManager.redToTarge(this["equip"+i].itemIcon,RemindMgr.upEquipsLvl[i]?true:false);
			}
		}
	}
	public close(...param: any[]): void{
		// if(this.currItem)this.currItem.itemIcon.filters = [];
		// this.currItem = null;
	}
	private selectPanel(): void{
		if(this.viewStack.selectedIndex == 0){
			this.panel = this.viewStack.getElementAt(0) as StrengthenPanel;
		}else{
			this.panel = this.viewStack.getElementAt(1) as AdvancedPanel;
		}
		this.setSelectData();
		this.panel.open(this.curData);
		this.upRed();
	}
	private onUpEquip(e:egret.Event): void{
		if(e.data.isSuccess){
			this.update();
			this.setSelectData();
		}
	}
	private onAdvancedEquip(e:egret.Event): void{
		if(e.data.isSuccess){
			// UserVo.ins.reinforcedEquipmentStone = e.data.reinforcedStone;
			// UserVo.ins.fightPower = e.data.fightPower;
			this.curData.itemId ++;
			this.update();
			this.setSelectData();
		}
	}
	private update(): void{
		if(!UserVo.ins.Columns)return;
		for(let i = 0; i < UserVo.ins.Columns.length; i++){
			let itemInfo: ItemInfo = UserVo.ins.Columns[i].itemInfo;
			this.removeTouchEvent(this["equip"+i], this.onSelectEquip);
			this.addTouchEvent(this["equip"+i], this.onSelectEquip);
			// if(!itemInfo)continue;
			this["equip"+i].data = itemInfo;
			// this["equip"+i].setItemName();
		}
	}
	private onSelectEquip(e: egret.TouchEvent): void{
		if(this.currItem)this.currItem.itemIcon.filters = [];
		this.currItem = e.currentTarget;
		let data: ItemInfo = this.currItem.data;
		if(!data)return;
		this.curData = data;
		this.setSelectData();
		this.currItem.itemIcon.filters = [this.glowFilter];
		UIDmgr.bindingUID(this.tabBar.getVirtualElementAt(0),uid.forgeBtn2);
		UIDmgr.bindingUID(this.tabBar.getVirtualElementAt(1),uid.forgeBtn4);
	}
	private setSelectData(): void{
		this.panel.setData(this.curData);
		
	}
	
}
ViewManager.ins().reg(ForgeWin,LayerManager.UI_MainUI)