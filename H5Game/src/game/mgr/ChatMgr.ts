class ChatMgr extends BaseClass{
	public constructor() {
		super();
		this.chatArr = [];
	}
	public static ins(...args:any[]):ChatMgr{
		return super.ins(args) as ChatMgr;
	}
	public chatArr:Array<ChatVo>
	public addChatMessage(d:any):void
	{
		var vo:ChatVo = ObjectPool.pop("ChatVo");
		vo.type = d.type;
		vo.des = d.content;
		vo.id = d.id;
		vo.playName = d.playName;
		vo.vipLvl = d.vipLevel;
		vo.sex = d.sex;
		this.chatArr.push(vo);
		DataEventDispatcher.dispatchEventWith(GameEvent.UP_CHAT);
	}
}
class ChatVo
{
	type:number;
	des:string;
	playName:string;
	vipLvl:number;
	id:string;
	sex:number;
	public constructor() {
	}
}