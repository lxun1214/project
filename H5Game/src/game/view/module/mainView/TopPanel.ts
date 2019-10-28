class TopPanel extends BaseView{
	public constructor() {
		super();
	}
	m2:MoneyPanel;
	m3:MoneyPanel;
	protected createChildren(){
		super.createChildren();
		this["nn"].text = UserVo.ins.playerName;
		this.m2.moneyType = MoneyUtils.M_2;
		this.m3.moneyType = MoneyUtils.M_3;
		this.addTouchEvent(this.m3.addGBtn, ()=>{
			ViewManager.ins().open(RechargeWin);
		});
	}
}