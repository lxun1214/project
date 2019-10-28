// TypeScript file
class StageAward extends BaseActivityPanel{
	public constructor() {
		super();
	}
	public createChildren():void
	{
		super.createChildren();
		this.activetyID = ActivetyMgr.STAGE_AWARD;
	}
}