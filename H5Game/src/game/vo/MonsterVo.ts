class MonsterVo {
	static TEST_NAME:number = 0;

	public testName:string;
	public nid:number;
	public nHp:number;

	public jobId:number = 4;
	public skillArr:Array<SkillVo>;
	public playerAttrInfo:PbPlayerAttrInfo;

	public difficultyFactor:number;
	public constructor(vo:any) {
		this.playerAttrInfo = new PbPlayerAttrInfo();
		this.nid = vo.monsterModel;
		this.difficultyFactor = vo.difficultyFactor;
		this.testName = MonsterVo.TEST_NAME + "";
		MonsterVo.TEST_NAME ++;
		var a:Array<string>;
		if(vo.skillId1 != 0 && vo.skillId1 && vo.skillId1 != "" && vo.skillId1 != "0")
		{
			a = (<string>vo.skillId1).split("#");
			var skill:SkillVo;
			this.skillArr = [];
			for(var i:number = 0;i<a.length;i++)
			{
				skill = new SkillVo(parseInt(a[i]),1);
				this.skillArr.push(skill);
			}
		}

		for(var key in vo)
		{
			if(this.playerAttrInfo[key] != undefined)
				this.playerAttrInfo[key] = vo[key];
		}

		this.nHp = this.nMaxHp;
	}

	public get nMaxHp():number
	{
		return this.playerAttrInfo.blood;
	}
}