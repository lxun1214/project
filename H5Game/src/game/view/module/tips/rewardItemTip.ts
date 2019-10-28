class rewardItemTip extends BaseEuiView{
	nn:eui.Label;
	l0:eui.Label;
	l1:eui.Label;
	l2:eui.Label;
	l3:eui.Label;
	l4:eui.Label;
	l5:eui.Label;

	btn2:eui.Button;
	item:eui.Image;
	bg:eui.Image;
	public constructor() {
		super();
		this.skinName = "rewardItemTipSkin";
		this.horizontalCenter = this.verticalCenter = 0;
		
	}
	itemVo:any;
	tp:number;
	public open(...param: any[]): void{
		super.open(param);
		let itemconfg = (<any>Object).assign(ConfigMgr.gameConfig["item"],ConfigMgr.gameConfig["gainInfo"]  ) ;
		
		this.itemVo = itemconfg[ param[0]]
		this.itemVo.description;
		
		this.item.source = `resource/assets/item/${ this.itemVo.iconID}.png`;

		// this.item.data = this.itemVo;
		// var icfg:any = BagVo.ins().getItem(this.itemVo.itemId);
		 this.nn.text = this.itemVo.name;
		 this.l3.text = this.itemVo.description;
		// this.tp = icfg.itemType;

		this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
			
			ViewManager.ins().close(this);
				
		},this);
	

	}

	public static getItemAtt(vo:any,type:number = 2):string
	{
		var itemCfg:any;
		if(type == 2)
			itemCfg = ConfigMgr.gameConfig["equip"][vo.itemId];
		else 
			itemCfg = ConfigMgr.gameConfig["gemAttr"][vo.itemId];
		var s:string = "";
		for(var key in itemCfg){
			if(UserVo.ins.playerAttrInfo[key] && itemCfg[key] != 0 && ConfigMgr.gameConfig["attributeName"][key])
			{
				s += ConfigMgr.gameConfig["attributeName"][key].value + ":" + itemCfg[key] + PbPlayerAttrInfo.isPercent(key);;
				s += "\n";
			}
		}
		return s;
	}

	private onTap(e:egret.TouchEvent):void{
	
		ViewManager.ins().close(this);
	}
	public close(...param: any[]): void{
		super.close(param);
	}
}
ViewManager.ins().reg(rewardItemTip,LayerManager.UI_Popup)