class TipsItem extends BaseView{
	public bg: eui.Rect;
	public label:eui.Label;

	public _labelText: string;
	private _type: number;
	rc:eui.Rect;
	public constructor() {
		super();
		this.skinName = "tips_skin";
	}
	public get labelText():string{
		return this._labelText;
	}
	public set labelText(value: string){
		this._labelText = value;
		this.label.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
		this.bg.width = this.label.width + 20;
		this.bg.height = this.label.height + 20;
		this.bg.x = -10;
		this.bg.y = -10;
		this.label.alpha = 1;

		this.bg.y = 0;
		this.label.verticalCenter = -1;

		let t1: egret.Tween = egret.Tween.get(this.bg);
		t1.to({"y":-30},500).wait(800).to({"alpha":0},200).call(() =>{
			if(this.parent)this.parent.removeChild(this);
		},this	);
		let t:egret.Tween = egret.Tween.get(this.label);
		t.to({"verticalCenter":-30},500
		).wait(800).to({"alpha":0},200);
	}
}