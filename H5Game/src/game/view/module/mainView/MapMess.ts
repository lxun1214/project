class MapMess extends eui.Component{
	public constructor() {
		super();
	}
	mmap:eui.Image;
	mm:eui.Rect;
	rr:eui.Rect;
	RX:number = 95;
	RY:number = 72;
	ln:eui.Label;
	public childrenCreated():void
	{
		super.childrenCreated();
		this.mmap.mask = this.mm;
		DataEventDispatcher.dispatcher.addEventListener(BaseMap.LOAD_MAP_COMPLETE,()=>{
			var A:GameMap = GameMap.ins();
			this.mmap.source = ResMgr.getMapImage(A.lastFile + ".jpg");
			this.ln.text = A.mapType == MapType.TYPE_3 ?"竞技场":(A.mapType == MapType.TYPE_2?"副本(第" + parseInt(A.mc.partID)%100 + "层)":"第" + A.mc.pointId + "关");
		},this);
		TimerManager.ins().doTimer(500,0,()=>{
			this.rr.visible = !this.rr.visible;
		},this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.CHANGE_MINIMAP,(e:egret.Event)=>{
			var sc:number = DisplayMapObject.MINMAP_SCALE;
			var w:number = MapVo.ins.miniMapW;
			var h:number = MapVo.ins.miniMapH;
			var a:number = e.data.a/sc;
			var b:number = e.data.b/sc;
			a -= this.mm.width/2;
			a = -a;
			b -= this.mm.height/2;
			b = -b;
			if(a >=0)
			{
				this.rr.x = this.RX - a// - this.rr.width/2;;
				a = 0;
			}
			else if(a <= this.mm.width - w)
			{
				this.rr.x = this.RX +  (-a + this.mm.width - w)// - this.rr.width/2;;
				a = this.mm.width - w;
			}
			else
			{
				this.rr.x = this.RX;
			}

			if(b >=0)
			{
				this.rr.y = this.RY - b// - this.rr.height/2;
				b = 0;
			}
			else if(b <= this.mm.height - h)
			{
				this.rr.y = this.RY +  (-b + this.mm.height - h)// - this.rr.height/2;
				b = this.mm.height - h;
			}
			else
			{
				this.rr.y = this.RY;
			}
			this.mmap.x = a + this.mm.x;
			this.mmap.y = b + 38;
		},this);
	}
}