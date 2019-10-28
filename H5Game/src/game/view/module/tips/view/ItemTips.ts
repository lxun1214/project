class ItemTips extends TipsView{
	public constructor() {
		super();
	}

	public showTips(str : string):void{
		let tips: TipsItem = new TipsItem();
		tips.bg.visible = true;
		tips.verticalCenter = 400;
		tips.horizontalCenter = 0;
		tips.labelText = str;
		this.addChild(tips);
		this.list.unshift(tips);
		tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTip, this);
		for(let i = this.list.length-1; i>=0; i--){
			egret.Tween.removeTweens(this.list[i]);
			let t: egret.Tween = egret.Tween.get(this.list[i]);
			t.to({"verticalCenter":(i*-60)+400},500);
		}
	}
}
ViewManager.ins().reg(ItemTips, LayerManager.UI_Tips);