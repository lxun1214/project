class GlobalVo {
	public static get GAME_W():number
	{
		return StageUtils.ins().getWidth();
	}
	public static get GAME_H():number{
		return StageUtils.ins().getHeight();
	}

	public static token:string;
	public static serverId:number;

	public static RANK:Array<string> = ["","绿","蓝","紫","金","暗金"];
	public static EQUIPS:Array<string> = ["武器","头盔","铠甲","吊坠","手镯","手镯","戒指","戒指","腰带","靴子"];

	public constructor() {
	}
}