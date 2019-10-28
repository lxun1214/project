class ContinueLogin extends BaseActivityPanel{
	public constructor() {
		super();
	}
	public createChildren():void
	{
		super.createChildren();
		this.activetyID = ActivetyMgr.CONTINUE_LOGIN;
	}
}