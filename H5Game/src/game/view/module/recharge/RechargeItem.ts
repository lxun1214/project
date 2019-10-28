/**
 * 充值Item
 */
class RechargeItem extends BaseItemRender{
	public buyBtn:eui.Button;
	public labNum:eui.Label;
	public title:eui.Label;
	public price:number;
	public mallId:number;
	// public labDesc:eui.Label;
	// public buyBtn:eui.Button;
	public labName:eui.Label;

	// public itemConfig: any;
	public constructor() {
		super();
		this.skinName = "RechargeItemSkin";
		this.init();
	}
	private init(): void{
		this.addTouchEvent(this.buyBtn, this.onTap);
	}
	public createChildren(): void{
		super.createChildren();
	}
	public euiCompete(){
		this.dataChanged();
	}
	protected dataChanged(): void{
		this.clears();
		if(!this.data)return;
		let goldArr = this.data.gold.split("#");

		let arr = this.data.payAward.split("#");

		let str =  arr[1] ?  goldArr[1]  + '钻石' :  '月卡充值';
		this.title.text = str ;

		this.labName.text = this.data.payDesc == '月卡充值' ? "" :  "首次" + this.data.payDesc ;

		this.labName.visible = !UserVo.ins.isRecharge;
		let gold = this.data.gold;
		this.labNum.text = this.data.price+"元";
		this.price = this.data.price;
		this.mallId = this.data.id;
		this.validateNow();
		
	};

	
	private onTap(): void{
		if(this.data.id == 100){
			
			let mouthCard = UserVo.ins['monthCardInfo'];
			 if(mouthCard&&mouthCard["cardEndDay"]){
			 ViewManager.ins().open(TipsWin,"确定","月卡已经购买，不能重复购买","提示","",()=>{},null,this)
			return ;
		 }
		}
		if(ParamMgr.SPID == 0){
			RechargeVo.ins().sendRechargeOrderRequest(this.mallId);
			UserVo.ins.isRecharge = true;
		}else
			MoneyUtils.recharge(this.data);
		this.validateNow();
	}
	

	ReturnSignData(arr ){
		let tArr ="";
	
		arr. forEach(e=>{
			let o = e.split("=")
			tArr +=(o[1]);
		})
	
		return MoneyUtils.MD5(tArr);
	}

	public clears(): void{
		this.labNum.text = "";
		// this.labDesc.text = "";
	}
}