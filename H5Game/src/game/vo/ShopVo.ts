class ShopVo extends BaseClass {
	private buyData: any;
	public constructor() {
		super();
	}
	public static ins(): ShopVo {
		return super.ins();
	}
	public initEvent(): void {
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20013,this.onBuyGoodsRequest,this);
	}
	/**
	 * 购买商品
	 * @param seqId 商品ID
	 * @param num 数量
	 */
	public sendBuyGoodsRequest(seqId: number, num:number): void{
		var c:any = {seqId:seqId, num:num};
		this.buyData = c;
		HttpMgr.ins.sendMessage(ClientPacket.S_10013, c, ServerPacket.LOGIC_URL,true);
	}
	/**
	 * 购买返回
	 */
	private onBuyGoodsRequest(e:egret.Event): void{
		if(e.data.isSuccess){
			UserTips.ins().showTipsBigToSmall("购买成功",false);
			this.upDateShopNum(e.data.seqId);
		}
	}
	/**
	 * 更新商品购买次数
	 */
	public upDateShopNum(d:number): void{
		if(!this.buyData)return;
		let data = UserVo.ins.storeInfos;
		var has:boolean = false;
		for(let key in data){
			let info = data[key];
			if(info.seqId == d){
				data[key].limitPlayerNum ++;
				has = true;
				break;
			}
		}
		if(!has)
		{
			UserVo.ins.storeInfos.push({seqId:d,limitPlayerNum:1})
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.UP_SHOP_BUY);
	}
	/**
	 * 根据商品ID获取购买次数
	 */
	public getShopBuyNum(seqId: number): number{
		let data = UserVo.ins.storeInfos;
		var d:any = this.getStoreItem(seqId);
		var v:number = d.limitPlayerNum>0? d.limitPlayerNum:(d.limitPlayerDayNum>0?d.limitPlayerDayNum:-1);
		if(v == -1)
			return v;
		for(let key in data){
			let info = data[key];
			if(info.seqId == seqId){
				return v - info.limitPlayerNum ;
			}
		}
		return v;
		//return -1;
	}


	public getStoreItem(id):any
	{
		var a:Array<any> = ConfigMgr.gameConfig["store"];
		for(var i:number = 0;i<a.length;i++)
		{
			if(a[i].seqId == id)
				return a[i];
		}
	}
}