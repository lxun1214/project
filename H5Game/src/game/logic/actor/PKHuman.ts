class PKHuman extends Human{
	public constructor(race:number,aiRate:number) {
		super(race,aiRate);
        this.nHPBar._truck.source = "hp2";
	}
	public getEnemy():Array<BaseActor>
    {
        var ls:Array<BaseActor> = GameLogic.ins.getActorsByType(ActorRace.MONSTER);
        ls = ls.concat(GameLogic.ins.getActorsByType(ActorRace.HUMAN))
        return ls;
    }

    public destruct(gc: Boolean = false): void
    {
        this.path = null;
        this.nDie = false;
        this.sleep = false;
        this.visible = true;
        this.nTargetPoint.x = this.nTargetPoint.y = -1;
        this.nTargeter = undefined;
        this.addHp(this.actorVo.nMaxHp,false);
        this.nHPBar.setPosition(this.actorVo.nHp,this.actorVo.nMaxHp);
        for(var i:number = this.nBuffs.length;i>=0;i--)
        {
            this.removeBuff(i);
        }
        this.sleep = false;
        this.nDie = false;
        super.destruct(gc);
        this.setDie();
        this.actorVo = null;
        GameLogic.ins.receivePkHuman();
    }
    
    public setDie():void
    {
        this.sleep = true;
        this.nDie = true;
    }
}