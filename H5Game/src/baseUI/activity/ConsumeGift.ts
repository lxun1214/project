// TypeScript file
class ConsumeGift extends BaseActivityPanel{
	public constructor() {
		super();
	}
	public createChildren():void
	{
		super.createChildren();
		this.activetyID = ActivetyMgr.CONSUME_GIFT;
	}
}