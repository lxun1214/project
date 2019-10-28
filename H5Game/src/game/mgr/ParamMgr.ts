class ParamMgr {
	private static synRes:string = "resource";
	public static ressite:string = "";
	public static ver:string;
	public static serverUrl:string = "http://106.12.117.205:8080/";//选服服务器
	public static gameUrl:string = "";//游戏登陆的服务器


	public static SPID:number= 0;//运营商Id
	public static rechargeURL:string = "";//充值接口

	public static times:number;//登陆时间
	public static APP_key:string;//key
	public static tickets:string;//加密


	public static username:string;
	public static nickname:string;

	public static gameName:string;

	public static sign:string;
	public static game_id:number;
	public static user_id:number;
	public constructor() {
	}
	public static get gameSynRes():string
	{
		if(DEBUG)
			return ParamMgr.synRes;
		else
			return "resource";
	}
	
	public static initParam():void
	{
		var obj: any = window["gameParam"];
		if(obj)
		{
			for(var k in obj)
			{
				this[k] = obj[k];
			}
		}
	}
}