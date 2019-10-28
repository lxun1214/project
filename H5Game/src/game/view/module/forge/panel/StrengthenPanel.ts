class StrengthenPanel extends BaseView{
	public item:ForgeItem;
	public curr:ForgeTypeView;
	public curr0:ForgeTypeView;
	public strengGroup:eui.Group;
	public labNeed1:eui.Label;
	public labNeed2:eui.Label;
	public equipBtn1:eui.Button;
	public equipBtn2:eui.Button;
	// public strenImg:eui.Image;


	private curData: ItemInfo;
	private isFive: boolean = false;
	private upNum: number = 0;
	public constructor() {
		super();
		this.skinName = "StrengSkin";
		this.name = "强 化";
		this.top = this.bottom = 0;
		this.item.itemIcon.imgBg.visible = false;
	}
	Effmc:clips.BmpClip
	public createChildren(): void{
		super.createChildren();
		this.touchEnabled = false;
		var mc:clips.BmpClip = new clips.BmpClip();
		this.Effmc = mc;
		this.Effmc.visible = false;
		ModelResMgr.getOtherEffect(10017,mc);
		this.Effmc.addEventListener(egret.Event.COMPLETE,()=>{
			this.Effmc.gotoAndStop(1);
			this.Effmc.visible = false;
		},this);
		this["g0"].addChild(mc);
	}
	public open(...param: any[]): void{
		this.curData = param[0];
		
		this.curr.setData(`当前强化`,null,true,1);
		this.curr0.setData(`下一强化`,null,false,1);
		this.strengGroup.visible = false;
		if(this.curData)this.setData(param[0]);

		
		this.addTouchEvent(this.equipBtn1,this.upEquip);
		this.addTouchEvent(this.equipBtn2, this.upEquip);
		
		UIDmgr.bindingUID(this.equipBtn2,uid.forgeBtn3);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_STRENGTH,this.onUpEquip,this);
	}
	public close(...param: any[]): void{
		this.removeTouchEvent(this.equipBtn1,this.upEquip);
		this.removeTouchEvent(this.equipBtn2, this.upEquip);
	}
	private onUpEquip(e:egret.Event): void{
		if(e.data.isSuccess){
			this.Effmc.visible = true;
			this.Effmc.play(1);
			this.upNum ++;
			if(this.isFive && this.upNum < 5){
				HttpMgr.ins.sendMessage(ClientPacket.S_10009,{itemId:this.curData.itemId},ServerPacket.LOGIC_URL,true);
			}else{
				this.upNum = 0;
				this.isFive = false;
			}
			if(this.upNum == 0){
				this.setData(this.curData);
			}
		}
	}
	public setData(data: ItemInfo): void{
		// this.item.StarIcon.visible = false;
		this.item.data = this.curData = data;
		if(!this.curData)return;
		this.strengGroup.visible = true;
		let eCfg = ForgeVo.ins().getEquipID(this.curData.itemId);
		let five = 0;
		for(let i = 0; i < 5; i++){
			five += ForgeVo.ins().getUpEquipGold(this.curData.level + i);
		}
		let userGold = UserVo.ins.gold;
		this.labNeed1.text = `消耗金币：${five}`
		this.labNeed1.textColor = userGold>=five?ColorUtlis.COLOR_GREEN:ColorUtlis.COLOR_RED;
		this.labNeed2.text = `消耗金币：${ForgeVo.ins().getUpEquipGold(this.curData.level)}`
		this.labNeed2.textColor = userGold>=ForgeVo.ins().getUpEquipGold(this.curData.level)?ColorUtlis.COLOR_GREEN:ColorUtlis.COLOR_RED;

		this.curr.setData(`当前强化`,this.curData,true,1);
		this.curr0.setData(`下一强化`,this.curData,false,1);
	}
	/**
	 * 装备升级
	 */
	private upEquip(e: egret.TouchEvent): void{
		if(e.currentTarget == this.equipBtn1){//强化5次
			this.isFive = true;
			if(this.labNeed1.textColor == ColorUtlis.COLOR_RED){
				UserTips.ins().showTipsBigToSmall(`金币不足`);
				return;
			}
		}else{
			if(this.labNeed2.textColor == ColorUtlis.COLOR_RED){
				UserTips.ins().showTipsBigToSmall(`金币不足`);
				return;
			}
		}
		ForgeVo.ins().strengthenItem = this.item.data;
		HttpMgr.ins.sendMessage(ClientPacket.S_10009,{itemId:this.item.data.itemId},ServerPacket.LOGIC_URL,true);
	}
}