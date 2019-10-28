class ForgeTypeView extends BaseView{
	public l0:eui.Label;
	dg0:eui.DataGroup;

	public constructor() {
		super();
		this.skinName = "ForgeTypeSkin";
		this.dg0.itemRenderer = PropertyRender;
	}
	public open(...param: any[]): void{
		
	}
	public setData(tile:string, info: ItemInfo, isCurr: boolean = true, type:number): void{
		// this.labTile.text = tile;
		let typeAr:string[] = [ "powerQuality","intellectQuality","alacrityQuality","physiqueQuality"];
		let value:string[] = ["力量资质","智力资质","敏捷资质","体力资质"];

		var a:Array<any> = [];
		if(info == null){
			this.l0.text = "选择装备!";
			this.l0.visible = true;
		}
		let str: string = "";
		let cfg = null;
		if(type == 1 && info){
			this.l0.visible = false;
			value = ["力量","智力","敏捷","体力"];
			for(let i = 0; i < typeAr.length; i++){
				if(ConfigMgr.gameConfig["equip"][info.itemId][typeAr[i]] > 0){
					a.push([value[i],(isCurr?info.level:1)*ConfigMgr.gameConfig["equip"][info.itemId][typeAr[i]]]);
				}
			}
			
		}else if(type == 2 && info){
			cfg = ConfigMgr.gameConfig["equip"][isCurr?info.itemId:info.itemId+1];
			if(!cfg){
				this.l0.text = "已达极限!";
				this.l0.visible = true;
			}else{
				this.l0.visible = false;
				for(let i = 0; i < typeAr.length; i++){
					if(cfg[typeAr[i]] > 0){
						a.push([value[i],info.level*cfg[typeAr[i]]]);
					}
				}
			}
			
		}
		this.dg0.dataProvider = new eui.ArrayCollection(a);
	}
}