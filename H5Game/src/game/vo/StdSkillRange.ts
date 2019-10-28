class StdSkillRange {
	public w:number;
	public h:number;
	public g:number;
	public c:number;
	public type:number;
	// public isClear:boolean = true;
	public constructor() {
	}

	public set data(s:string)
	{
		this.clear();
		if(!s || s == "" || s == "0")
			return;
		var a:Array<string> = s.split(",");
		switch(a[0])
		{
			case "0":
				this.type = 0;
				this.g = parseInt(a[1]);
				break;
			case "1":
				this.type = 1;
				this.w = parseInt(a[1]);
				this.h = parseInt(a[2]);
				break;
			case "2":
				this.type = 2;
				this.g = parseInt(a[1]);
				break;
		}
		// this.isClear = false;
	}

	public clear():void
	{
		this.w = this.h = this.g = this.c = null;
		// this.isClear = true;
		this.type = -1;
	}
}