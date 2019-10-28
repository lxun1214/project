/*
http://cdnhjzl.xhlgame.com?times=1494834658&APP_key=7002568415863fd467a2c3c72fe244ed7a3e5297&tickets=dXNlcm5hbWU9MTIzNDU2Jm5pY2tuYW1lPVgxXzAx

rutong  rutong1124
*/
class RechargeWin extends BaseEuiView{
	public Scroller:eui.Scroller;
	public reItemGroup:eui.DataGroup;
	public bg:eui.Image;

	public constructor() {
		super();
		this.skinName = "RechargeSkin";
	}
	public createChildren(): void{
		super.createChildren();
	}
	public open(...prama: any[]): void{
		super.open();
		this.update();
		this.reItemGroup.itemRenderer = RechargeItem;

		var obj:any = ConfigMgr.gameConfig["paymentBase"];
		
		this.reItemGroup.dataProvider = new eui.ArrayCollection(obj);
	
	}
	private update(): void{
		
	}
	RENDER_H:number = 210;
	RENDER_W:number = 340;
}
ViewManager.ins().reg(RechargeWin, LayerManager.UI_MainUI);