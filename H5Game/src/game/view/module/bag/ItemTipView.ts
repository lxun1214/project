class ItemTipView extends BaseEuiView{
	// nn:eui.Label;
	l0:eui.Label;
	l1:eui.Label;
	l2:eui.Label;
	l3:eui.Label;
	l4:eui.Label;
	l5:eui.Label;
	btn0:eui.Button;
	btn1:eui.Button;
	btn2:eui.Button;
	item:BaseItem;
	bg:eui.Image;
	public constructor() {
		super();
		this.skinName = "ItemTipSkin";
		this.horizontalCenter = this.verticalCenter = 0;
		// this.item.labName.visible = false;
	}
	itemVo:any;
	tp:number;
	public open(...param: any[]): void{
		super.open(param);
		this.itemVo = param[0];
		this.item.data = this.itemVo;
		var icfg:any = BagVo.ins().getItem(this.itemVo.itemId);
		// this.nn.text = icfg.name;
		this.l5.text = "";
		this.tp = icfg.itemType;
		if(icfg.itemType == 4){
			this.btn0.visible = this.btn1.visible = true;
			this.btn1.label = "使  用";
			this.l1.text = "需要等级:" + icfg.requiredLevel; 
			this.l4.text = icfg.description; 
			this.l0.visible = this.l2.visible = this.l3.visible = this.btn2.visible = false;
			this.addTouchEvent(this.btn0,this.onTap);
			this.addTouchEvent(this.btn1,this.onTap);
			// this.height = this.l4.y + this.l4.textHeight + 98 + 10 ;

			// this.nn.textColor = ColorUtlis.QUALITY_COLOR[ConfigMgr.gameConfig["item"][icfg.itemId].rank];
		}else if(icfg.itemType == 1)
		{
			var gcfg:any = ConfigMgr.gameConfig["gemAttr"][icfg.itemId];
			this.l1.text = "品质:" + GlobalVo.RANK[icfg.rank]; 
			this.l4.textFlow = new egret.HtmlTextParser().parser(ItemTipView.getItemAtt(icfg,icfg.itemType));
			this.l3.visible = this.btn2.visible = true;
			this.l0.visible = this.l2.visible = this.btn0.visible = this.btn1.visible = false;
			this.addTouchEvent(this.btn2,this.onTap);
			// this.height = this.l4.y + this.l4.textHeight + 98 + 10;
			this.l5.text = gcfg.initialScore;

			// this.nn.textColor = ColorUtlis.QUALITY_COLOR[icfg.rank];
		}else
		{
			var ecfg:any = ConfigMgr.gameConfig["equip"][icfg.itemId];
			this.l0.visible = this.l2.visible = this.l3.visible = this.btn0.visible = this.btn1.visible = true;
			this.l0.text = "部位:" + GlobalVo.EQUIPS[ecfg.equipCoordinate];
			this.l1.text = "需要等级:" + icfg.requiredLevel;
			this.l2.text = "品质:" + GlobalVo.RANK[icfg.rank];  
			this.l4.textFlow = new egret.HtmlTextParser().parser(ItemTipView.getItemAtt(icfg));
			this.btn1.label = "穿  戴";
			this.btn2.visible = false;
			this.addTouchEvent(this.btn0,this.onTap);
			this.addTouchEvent(this.btn1,this.onTap);
			// this.height = this.l4.y + this.l4.textHeight + 98 + 10 ;
			this.l5.text = (ecfg.initialScore + (this.itemVo.level?this.itemVo.level:1) * ecfg.growScore);
			UIDmgr.bindingUID(this.btn1,uid.itemcd);

			// this.nn.textColor = ColorUtlis.QUALITY_COLOR[icfg.rank];
		}

		if(this.itemVo instanceof Number || !this.itemVo["uuid"])
		{
			this.btn0.visible =this.btn1.visible = false;
			this.btn2.visible = true;
			this.addTouchEvent(this.btn2,this.onTap);
		}
		this.btn0.y = this.btn1.y = this.btn2.y = this.l4.y + this.l4.textHeight + 10;
		this.bg.height = this.l4.y + this.l4.textHeight + 100 + 10 ;
		// this.x = (GlobalVo.GAME_W - this.measuredWidth)>>1;
		// this.y = (GlobalVo.GAME_H - this.measuredHeight)>>1;
	}

	public static getItemAtt(vo:any,type:number = 2):string
	{
		var itemCfg:any;
		if(type == 2)
			itemCfg = ConfigMgr.gameConfig["equip"][vo.itemId];
		else 
			itemCfg = ConfigMgr.gameConfig["gemAttr"][vo.itemId];
		var s:string = "";
		for(var key in itemCfg)
		{
			if(UserVo.ins.playerAttrInfo[key] != undefined && itemCfg[key] != 0 && ConfigMgr.gameConfig["attributeName"][key])
			{
				s += ConfigMgr.gameConfig["attributeName"][key].value + ":" + itemCfg[key] + PbPlayerAttrInfo.isPercent(key);;
				s += "\n";
			}
		}
		return s;
	}

	private onTap(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			// case this.btn0:
			// case this.btn2:
			// 	ViewManager.ins().close(this);
			// 	break;
			case this.btn1:
				if(this.tp  == 2)
					HttpMgr.ins.sendMessage(ClientPacket.S_10008,{uuid:this.itemVo.uuid},ServerPacket.LOGIC_URL,true);
				else if(this.tp == 4)
					HttpMgr.ins.sendMessage(ClientPacket.S_10035,{uuid:this.itemVo.uuid},ServerPacket.LOGIC_URL,true);
				break;
		}
		ViewManager.ins().close(this);
	}
	public close(...param: any[]): void{
		super.close(param);
	}
}
ViewManager.ins().reg(ItemTipView,LayerManager.UI_Popup)