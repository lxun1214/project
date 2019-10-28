class WelcomWin extends eui.Component{
	btn:eui.Button;
	rc:eui.Rect;
	public constructor() {
		super();
		this.skinName = "welcomeSkin";
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
		this.rc.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
		this.width = GlobalVo.GAME_W;
		this.height= GlobalVo.GAME_H;
		this.y = -GlobalVo.GAME_H;

		UIDmgr.bindingUID(this.btn,uid.beginGame);
		UIDmgr.bindingUID(this,uid.beginGameP);
	}
	private onclick(e:egret.TouchEvent):void
	{
		this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
		this.rc.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
		if(this.parent)
			this.parent.removeChild(this);
		GuideMgr._instance.save(1);
        GuideMgr._instance.guides.forEach(element => {
        if (element.id == 1) {
                element.status = guideStep.End;
            }
        });
		GameLogic.GAME_STATUS = 0;
		GuideMgr._instance.openFistGuide = false;
	}
}