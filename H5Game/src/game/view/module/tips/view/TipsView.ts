class TipsView extends BaseEuiView{
	public constructor() {
		super();
		this.initUI();
	}
	public initUI(): void{
		this.touchEnabled = false;
		this.touchChildren = false;
	}
	protected labCount: number = 0;
	protected list: TipsItem[] = [];
	/**
	 * 显示Tips
	 * @param str
	 */
	public showTips(str : string):void{
		let tips: TipsItem = new TipsItem();
		tips.verticalCenter = 0;
		tips.horizontalCenter = 0;
		tips.labelText = str;
		this.addChild(tips);
		this.list.unshift(tips);
		tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTip, this);
		for(let i = this.list.length-1; i>=0; i--){
			egret.Tween.removeTweens(this.list[i]);
			let t: egret.Tween = egret.Tween.get(this.list[i]);
			t.to({"verticalCenter":(i*-30)+0},500);
		}
	}
	protected removeTip(e: egret.Event): void{
		let index: number = this.list.indexOf(e.currentTarget);
		this.list.splice(index,1);
		egret.Tween.removeTweens(e.currentTarget);
	}
}

ViewManager.ins().reg(TipsView, LayerManager.UI_Tips);
