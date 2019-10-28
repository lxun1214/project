class ArtifactAttrTypePanel extends BaseView{
	public labTile:eui.Label;

	public constructor() {
		super();
		this.skinName = "ArtifactAttrTypeSkin";
		this.dg.itemRenderer = PropertyRender;
	}
	dg:eui.DataGroup;
	public setTile(title: string,t:number): void{
		this.labTile.text = title;
		if(t == 0)
			this.dg.left = 20;
		else
			this.dg.right = 30;
	}
	public updateType(itemId: number,t:number=0): void{
		let typeName: string[] = ["power","intellect","alacrity","physique",
								"critRate","critDamage","blood","akillDamage",
								"attackDamage","damageReduction","skillInterval",
								"fireDamage","waterDamage","thunderDamage","windDamage",
								"fireDefenses","waterDefense","thunderDefense","windDefense"];
		let data = ConfigMgr.gameConfig["artifact"][itemId];
		
		var a:Array<any> = [];
		if(data){
			let index: number = 0;
			for(let j = 0; j < typeName.length; j++){
				if(data[typeName[j]] && data[typeName[j]] > 0){
					// this["labAttr"+index].text = ConfigMgr.gameConfig["attributeName"][typeName[j]].value+"："+data[typeName[j]];
					a.push([ConfigMgr.gameConfig["attributeName"][typeName[j]].value,data[typeName[j]]]);
					index++;
				}
			}
		}
		this.dg.dataProvider = new eui.ArrayCollection(a);
	}
}