// TypeScript file
class RechargeVo extends BaseClass {
	private buyData: any = null;
	public constructor() {
		super();
	}
	public static ins(): RechargeVo {
		return super.ins();
	}
	public initEvent(): void {
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20034,this.onRechargeOrderRequest,this);
	}
	/**
	 * 充值
	 * @param mallId 商品ID
	 */
	public sendRechargeOrderRequest(mallId: number): void{
		this.buyData = {mallId:mallId};
		HttpMgr.ins.sendMessage(ClientPacket.S_10034, this.buyData, ServerPacket.LOGIC_URL,true);
	}
	/**
	 * 订单返回
	 */
	private onRechargeOrderRequest(e:egret.Event): void{
        egret.log(e.data);
		if(e.data.orderId){
            let str = "购买成功 orderId = "+e.data.orderId
			UserTips.ins().showTipsBigToSmall(str,false);
            egret.log(e.data.orderId);
			
		}else{
            UserTips.ins().showTipsBigToSmall("购买失败");
        }
	}
	/**
	 * 更新商品购买次数
	 */
	public upDateRechargeNum(): void{
		// if(!this.buyData)return;
		// let data = UserVo.ins.storeInfos;
		// for(let key in data){
		// 	let info = data[key];
		// 	if(info.mallId == this.buyData.mallId){
		// 		info.limitPlayerNum -= this.buyData.num;
		// 		info.limitPlayerNum = info.limitPlayerNum>0?info.limitPlayerNum:0;
		// 		break;
		// 	}
		// }
	}
	/**
	 * 根据商品ID获取购买次数
	 */
	public getRechargeNum(mallId: number): number{
		// let data = UserVo.ins.storeInfos;
		// for(let key in data){
		// 	let info = data[key];
		// 	if(info.mallId == mallId){
		// 		return info.limitPlayerNum ;
		// 	}
		// }
		return -1;
	}
    /**
	 * 更新拥有钻石数量
	 */
	public upDateDiamondsNum(): void{
		
	}
}