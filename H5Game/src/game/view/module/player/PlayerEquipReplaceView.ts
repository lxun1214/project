/**
 * 更换装备
 */
class PlayerEquipReplaceView extends BaseEuiView {
	public unloadBtn:eui.Button;
	public viewStack:eui.ViewStack;
	public group:eui.Group;
	public itemScroller:eui.Scroller;
	public itemList:eui.List;
	c:ReplaceItemRender;
	private curInfo: ItemInfo;
	private selectPos: number;
	public constructor() {
		super();
		this.skinName = "PlayerEquipReplaceSkin";
		this.unloadBtn = this.c.repBtn;
		this.unloadBtn.skinName = "Btn001Skin"
		this.c.repBtn.label = "卸下";
	}
	public createChildren(): void{
		super.createChildren();
		this.itemList.itemRenderer = ReplaceItemRender;
	}
	public open(...param: any[]): void{
		this.curInfo = param[0];
		this.selectPos = param[1]|0;
		this.addTouchEvent(this.unloadBtn, this.onTap);
		this.update();

		 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA,this.update,this);
	}
	public close(...param: any[]): void{
		 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA,this.update,this);
	}
	private update(): void{
		this.c.data = this.curInfo  = UserVo.ins.Columns[this.selectPos].itemInfo;
		// if(!this.curInfo)return;
		// let Ecfg =  ConfigMgr.gameConfig["equip"][this.curInfo.itemId];
		let list: ItemInfo[] = BagVo.ins().getPosEquipList(this.selectPos);
		this.itemList.dataProvider = new eui.ArrayCollection(list);
	}
	private onTap(e: egret.TouchEvent): void{
		switch(e.currentTarget){
			case this.unloadBtn:
				HttpMgr.ins.sendMessage(ClientPacket.S_10031,{loc:this.selectPos},ServerPacket.LOGIC_URL,true);
				ViewManager.ins().close(this);
				break;
		}
	}
}
ViewManager.ins().reg(PlayerEquipReplaceView,LayerManager.UI_Popup);