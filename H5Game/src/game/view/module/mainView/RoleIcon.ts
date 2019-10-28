class RoleIcon extends eui.Component{
	icon:eui.Image;
	lvl:eui.Label;
	public constructor() {
		super();
		this.skinName = "roleIconSkin";
	}
	protected createChildren():void
	{
		super.createChildren();
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.level,this.upLvl,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum,this.upLvl,this);
		this.upLvl();

		this.icon.source = "human" +UserVo.ins.sex + "_png"//ResMgr.getGameOtherPng("human" + UserVo.ins.sex);

		var mc:clips.BmpClip = new clips.BmpClip();
		ModelResMgr.getOtherEffect(10029,mc);
		mc.play(-1);
		this["eff"].addChild(mc);
	}
	private upLvl():void
	{
		this.lvl.text = UserVo.ins.rebirthNum + "重" + UserVo.ins.level + "级";
	}
}