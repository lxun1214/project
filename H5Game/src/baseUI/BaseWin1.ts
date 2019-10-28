class BaseWin1 extends eui.Component{
	
	private g0:eui.Group;
	private title:eui.Label;
	private rc:eui.Rect;
	private newCloseBtn00:eui.Button;
	public constructor() {
		super();
		this.left = this.right = this.top = this.bottom = 0;
	}
	
	private _titleS : string;
	public get titleS() : string {
		return this._titleS;
	}
	public set titleS(v : string) {
		this._titleS = v;
		if(this.title)
			this.title.text = this._titleS;
	}
	
	
	private _bgH : number;
	public get bgH() : number {
		return this._bgH;
	}
	public set bgH(v : number) {
		this._bgH = v;
		if(this.g0)
			this.g0.height = v;
	}
	


	protected createChildren():void
	{
		super.createChildren();
		if(this._titleS)
			this.title.text = this._titleS;
		if(this.g0)
			this.g0.height = this._bgH;
		this.rc.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			ViewManager.ins().close(this.parent);
		},this);
		if(this.newCloseBtn00)
		{
			this.newCloseBtn00.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				ViewManager.ins().close(this.parent);
			},this);
		}
	}
}