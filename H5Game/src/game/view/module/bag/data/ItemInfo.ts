class ItemInfo {
	//唯一id
	public uuid: number;
	//道具id
	public itemId: number;
	//道具数量
	public itemNum: number;
	//等级（只有道具是装备才有）
	public level: number;

	//货币类型
	public moneyType:string;

	//显示物品数量
	public showEquipsCount:boolean = false;
	public constructor() {
	}
}