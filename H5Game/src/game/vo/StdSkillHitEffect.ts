class StdSkillHitEffect {
    public type: number;
    public effect: number = 0;
    public times:number = 1;
    public keepTime:number = -1;
    public targeType:number = 1;
    private dataArr:Array<string>;
    public speed:number = 80;
    public flag:number = -1;
	public constructor() {
        this.dataArr = ["type","effect","targeType","times","keepTime","flag","speed"];
	}

	public set data(s:string)
	{
		var a:Array<string> = s.split(",");
        for(var i:number=0;i<a.length;i++)
        {
            this[this.dataArr[i]] = parseInt(a[i]);
        }
	}

}