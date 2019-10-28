class ToggleBtn01 extends eui.ToggleButton{
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
	
	private _c0 : string;
	public get c0() : string {
		return this._c0;
	}
	public set c0(v : string) {
		this._c0 = v;
		if(this.a0)
			this.a0.source = this.c0;
	}
	
	
	private _c1 : string;
	public get c1() : string {
		return this._c1;
	}
	public set c1(v : string) {
		this._c1 = v;
		if(this.a1)
			this.a1.source = this.c1;
	}

	private n1:eui.Image;
	private n0:eui.Image;
	private a1:eui.Image;
	private a0:eui.Image;
	public createChildren():void
	{
		super.createChildren();
		if(this.n1)
			this.n1.source = this.s1;
		if(this.n0)
			this.n0.source = this.s0;
		if(this.a1 && this.c1)
			this.a1.source = this.c1;
		if(this.a0 && this.c0)
			this.a0.source = this.c0;
	}
}