/**
 *
 * @author 
 *
 */
class ActionType
{
    public static STAND: string = "stand";//站立
    public static WALK: string = "walk";//走路
    public static RUN: string = "run";//跑步
    public static READY: string = "ready";//攻击停留
    public static FIGHT: string = "fight";//攻击
    public static MAGIC: string = "magic";//魔法攻击
    public static DIE: string = "die";//死亡
    
    public static ATTACK7:string = "ATTACK7";
    public static ATTACK8:string = "ATTACK8";
    public static ATTACK9:string = "ATTACK9";
    public static ATTACK10:string = "ATTACK10";
    public static ATTACK11:string = "ATTACK11";
    public static ATTACK12:string = "ATTACK12";
    public static ATTACK13:string = "ATTACK13"

    static ATTACK88:string = "ATTACK88"
	public constructor()
	{
    	
	}
	
	/**
	 * 获取动作id
	 */ 
	public static getAct(type:string):string
	{
	    if(type == undefined || type == "undefined")
        {
            return "0";
        }
        var actId:number = Number(Actions[type]);
        if(isNaN(actId))
        {
            actId = 0;
        }
        if(actId >= 10)
            return actId + "";
        return "" + actId;
	}
}

enum Actions
{
    stand,
    walk,
    run,
    ready,
    fight,
    magic,
    die,
    ATTACK7,
    ATTACK8,
    ATTACK9,
    ATTACK10,
    ATTACK11,
    ATTACK12,
    ATTACK13,
    ATTACK88
}