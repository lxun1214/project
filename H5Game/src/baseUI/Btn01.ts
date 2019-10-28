class Btn01 extends eui.Button{
	public constructor() {
		super();
	}

	
	private _s0 : string;
	public get s0() : string {
		return this._s0;
	}
	public set s0(v : string) {
		this._s0 = v;
		if(this.n0)
			this.n0.source = this.s0;
	}
	
	
	private _s1 : string;
	public get s1() : string {
		return this._s1;
	}
	public set s1(v : string) {
		this._s1 = v;
		if(this.n1)
			this.n1.source = this.s1;
	}
	
	private n1:eui.Image;
	private n0:eui.Image;
	public createChildren():void
	{
		super.createChildren();
		if(this.s1)
			this.n1.source = this.s1;
		if(this.s0)
			this.n0.source = this.s0;
	}
}