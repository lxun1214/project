/**
 * 熔炼
 */
class SmeltWin extends BaseEuiView{
	public viewStack:eui.ViewStack;
	public group:eui.Group;
	public itemScroller:eui.Scroller;
	public itemList:eui.List;
	public userItem:BaseItem;
	public smaltItem:BaseItem;
	public smeltBtn:eui.Button;
	// public returnBtn:eui.ToggleButton;

	// private selectData: ItemInfo[];
	private dataList: ItemInfo[];
	public static selectAr: number[] = [];
	public static showItem:ItemInfo[];
	public constructor() {
		super();
		this.skinName = "SmeltSkin";
	}
	public createChildren(): void{
		super.createChildren();
		this.group.visible = true;
		// this.selectData = [];
		this.userItem.isClick = false;
		this.smaltItem.isClick = false;

	}
	public open(...param: any[]): void{
		super.open(param);
		this.addTouchEvent(this.smeltBtn, this.onTap);
		this.itemList.itemRenderer = SmeltItemRender;

		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA,this.onBox,this);

		// SmeltWin.selectAr = [];
		SmeltWin.showItem = []
		let colorAr = [0xffffff,0x0000ff,0xff00ff,0xffff00,0xe69138,0xffd966];
		for(let i=0; i<6; i++){
			// this.getChildAt
			this.addChangeEvent(this["box"+i], this.onBox);
			this["box"+i].getChildAt(2).textColor = colorAr[i];
		}
		this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onList,this);
		this.onBox(null);

		UIDmgr.bindingUID(this.smeltBtn,uid.rl1);
	}
	public updateList(): void{
		// this.dataList = BagVo.ins().getSmeltList();
		if(!this.dataList)return;
		this.itemList.dataProvider = new eui.ArrayCollection(this.dataList);

		this.updateObtain();
	}
	private onTap(e: egret.TouchEvent): void{
		switch(e.currentTarget){
			// case this.returnBtn:
			// 	ViewManager.ins().close(this);
			// 	break;
			case this.smeltBtn:
				this.sendSmelt();
				break;
		}
	}
	/**
	 * 选择品质道具
	 */
	private onBox(e: egret.TouchEvent): void{
		let box: eui.CheckBox = e?e.currentTarget:undefined;
		if(box){
			SmeltWin.selectAr = [];
		for(let i = 0; i<6;i++){
			if(this["box"+i].selected){
				SmeltWin.selectAr.push(i);
			}
		}}
		if(!box || !(box instanceof eui.CheckBox)){
			// this["box0"].selected = true;
			// SmeltWin.selectAr = [0];
			this.dataList = BagVo.ins().getQualitySmeltList([0]);
		}
		// else if(this.selectAr.length > 0 && !this.selectAr.indexOf(0)){
		// 	this["box0"].selected = false;
		// }
		SmeltWin.showItem  = BagVo.ins().getQualitySmeltList(SmeltWin.selectAr);
		this.updateList();
		
	}
	/**
	 * 点击熔炼列表
	 */
	public onList(e:eui.ItemTapEvent): void{
		let item: SmeltItemRender = e.itemRenderer as SmeltItemRender;
		item.selectGr.visible = !item.selectGr.visible;
		if(item.selectGr.visible){
			SmeltWin.showItem.push(item.data);
		}else{
			SmeltWin.showItem.splice(SmeltWin.showItem.indexOf(item.data),1);
		}
		this.updateObtain();
	}
	/**
	 * 更新获取
	 */
	private updateObtain(): void{
		if(!SmeltWin.showItem || SmeltWin.showItem.length == 0){
			this.userItem.data = null;
			this.smaltItem.data = null;
			return;
		}
		this.userItem.setQuality(1);
		this.userItem.setIcon("money_6");
		this.userItem.setName("升阶石");
		this.userItem.setCount(UserVo.ins.reinforcedEquipmentStone);
		this.smaltItem.setQuality(1);
		this.smaltItem.setIcon("money_6");
		this.smaltItem.setName("升阶石");
		let addNum: number = 0;
		for(let key in SmeltWin.showItem){
			let info: ItemInfo = SmeltWin.showItem[key];
			let cfg =  ConfigMgr.gameConfig["equip"][info.itemId];
			addNum += cfg.fenjieEquipmentStone;
		}
		this.smaltItem.setCount(UserVo.ins.reinforcedEquipmentStone + addNum);
	}
	private sendSmelt(): void{
		if(SmeltWin.showItem.length == 0)
			return UserTips.ins().showTipsBigToSmall("没有可熔炼的装备!");
		let data: any = {};
		data.uuids = [];
		for (let key in SmeltWin.showItem) {
			let element = SmeltWin.showItem[key];
			data.uuids.push(element.uuid);
		}
		HttpMgr.ins.sendMessage(ClientPacket.S_10012,data,ServerPacket.LOGIC_URL,true);
	}
}
ViewManager.ins().reg(SmeltWin,LayerManager.UI_MainUI);