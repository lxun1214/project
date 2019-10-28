class ReplaceItemRender extends BaseItemRender{
	public itemIcon:BaseItem;
	// public eName:eui.Label;
	public eFighting:eui.Label;
	public labType0:eui.Label;
	public labType1:eui.Label;
	public labType2:eui.Label;
	public labType3:eui.Label;
	public labType4:eui.Label;
	public labType5:eui.Label;
	public repBtn:eui.Button;

	public constructor() {
		super();
		this.skinName = "ReplaceItemSkin";
	}
	public createChildren(): void{
		super.createChildren();
	}
	public euiCompete(){
		this.dataChanged();
		this.addTouchEvent(this.repBtn, this.onTap);
	}
	protected dataChanged(): void{
		if(!this.data)
		{
			this.itemIcon.data = null;
			this["g0"].visible = false;
			return;
		}
		this["g0"].visible = true;
		this.itemIcon.data = this.data;
		// this.eName.text = BagVo.ins().getItem(this.data.itemId).name;
		let Ecfg =  ConfigMgr.gameConfig["equip"][this.data.itemId];
		this.eFighting.text = Ecfg.initialScore;
		let typeName = ['power','intellect','alacrity','physique','attackInit','armorInit','magicAttack','magicArmorInit','critRate','critDamage','blood','attackSpeed','attackRange','movingSpeed'];
		let index: number = 0;
		for(let i = 0; i < 4; i++){
			this["labType"+ i].text = "";
			// if(i > 3)continue;
			for(index; index < typeName.length; index++){
				if(Ecfg[typeName[index]] > 0){
					this["labType"+ i].text = ConfigMgr.gameConfig["attributeName"][typeName[index]].value+":"+Ecfg[typeName[index]];
					index++;
					break;
				}
			}
		}
	}
	private onTap(e: egret.TouchEvent): void{
		HttpMgr.ins.sendMessage(ClientPacket.S_10008,{uuid:this.data.uuid},ServerPacket.LOGIC_URL,true);
	}
}