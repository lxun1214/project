class BaseWin0 extends eui.Component{
	
	private tt:eui.Image;
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
		if(this.tt)
			this.tt.source = this._titleS;
	}
	
	protected createChildren():void
	{
		super.createChildren();
		if(this._titleS)
			this.tt.source = this._titleS;
	}
}