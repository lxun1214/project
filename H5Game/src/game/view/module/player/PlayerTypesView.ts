class PlayerTypesView extends BaseEuiView{
	// public closeBg:eui.Rect;

	private itemInfo: ItemInfo[];
	public constructor() {
		super();
		this.skinName = "PlayerTypesSkin";
	}
	public createChildren(): void{
		super.createChildren();
	}
	public open(...param: any[]): void{
		this.itemInfo = param[0];
		// this.addTouchEvent(this.closeBg, this.onTap);
		this.update();

	}
	public close(...param: any[]): void{
	}
	private update(): void{
		var vo:PbPlayerAttrInfo = UserVo.ins.playerAttrInfo;
		var dx:number = 0;
		var s0:string = "";
		var s1:string = "";
		var d:Array<string> = ["hitRate","dodgeRate","attackRange","skillsConsumption","speedAnger"];
		for(var key in vo)
		{
			if(key == "__class__" || key == "__types__" || !ConfigMgr.gameConfig["attributeName"][key] || d.indexOf(key) != -1)
				continue;
			if(dx %2 == 0)
			{
				s0 += ConfigMgr.gameConfig["attributeName"][key].value+":" +  Math.floor(vo[key]) + PbPlayerAttrInfo.isPercent(key);
				s0 += "\n";
			}else
			{
				s1 += ConfigMgr.gameConfig["attributeName"][key].value+":" +  Math.floor(vo[key]) + PbPlayerAttrInfo.isPercent(key);;
				s1 += "\n";
			}
			dx ++;
		}
		this.l0.textFlow = new egret.HtmlTextParser().parser(s0);
		this.l1.textFlow = new egret.HtmlTextParser().parser(s1);
	}
	l0:eui.Label;
	l1:eui.Label;
	// private onTap(): void{
	// 	ViewManager.ins().close(this);
	// }
	
}
ViewManager.ins().reg(PlayerTypesView,LayerManager.UI_Popup);