class StdSkillAction {
	public constructor() {
		this.dataArr = ["act","effect","hasDir"];
	}
	public act: string;     //动作类型
    public effect: number = 0;  //特效id
    public hasDir: number = 0;  //是否有方向

	private dataArr:Array<string>;
	public set data(s:string)
	{
		var a:Array<string> = s.split(",");
        for(var i:number=0;i<a.length;i++)
        {
            this[this.dataArr[i]] = i!= 0?parseInt(a[i]):a[i];
        }
	}
}