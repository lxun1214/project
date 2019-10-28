class MapVo{
	private static _ins:MapVo;
	public static get ins():MapVo
	{
		if(!MapVo._ins)
			MapVo._ins = new MapVo();
		return MapVo._ins;
	}


	public mapFile:string;
	public mapW:number;
	public mapH:number;
	public imgW:number;
	public imgH:number;
	public gridW:number;
	public gridH:number;
	public gridRows:number;
	public gridCols:number;
	public imgRows:number;
	public imgCols:number;

	public flags:Array<number> = [];

	public minXYpo:egret.Point = new egret.Point();

	public miniMapW:number;
	public miniMapH:number;
	public set mapData(data:egret.ByteArray)
	{
		data.position = 0;
		this.flags.splice(0);
		data.readDouble();
		data.readDouble();
		data.readByte();
		data.readUTF();
		data.readByte();
		data.readShort();
		data.readByte();
		var len:number = data.readDouble();
		var c:egret.ByteArray = new egret.ByteArray();
		data.readBytes(c,0,len);

		this.mapFile = c.readUTF();
			
		this.mapW = c.readShort();
		this.mapH = c.readShort();
			
		this.imgW = c.readShort();
		this.imgH = c.readShort();
			
		this.gridW = c.readShort();
		this.gridH = c.readShort();
			
		this.gridRows = c.readShort();
		this.gridCols = c.readShort();
			
		this.imgRows = c.readShort();
		this.imgCols = c.readShort();


		len = c.readUnsignedInt();
		for(var i:number=0;i<len;i++){
			this.flags.push(c.readByte());
		}

        this.minXYpo.x = GlobalVo.GAME_W - this.mapW;
        this.minXYpo.y = GlobalVo.GAME_H - this.mapH;
		this.miniMapW = this.mapW / DisplayMapEffect.MINMAP_SCALE;
		this.miniMapH = this.mapH / DisplayMapEffect.MINMAP_SCALE;
		this.clearMapNode();
	}

	public constructor() {
		this.mapNodeArr = [];
		this.nodePool = [];
		this.showNode = [];
	}
	public autoChangeDX():boolean
	{
		if(this.order == 0)
		{
			if(this.refreshDx >= this.refreshPoint.length - 1)
			{
				this.order = 1;
				this.refreshDx -= 1; 
				return true;
			}else
			{
				this.refreshDx ++;
			}
		}else
		{
			if(this.refreshDx == 0)
			{
				this.order = 0;
				this.refreshDx = 1; 
			}else
			{
				this.refreshDx --;
			}
		}
		return false;
	}

	public resetData():void
	{
		this.refreshDx = -1;
		this.order = 0;
	}

	public bornPoint:Array<egret.Point> = [];
	public refreshPoint:Array<any>= [];
	public refreshDx:number;
	private order:number;//0正序、1逆序
	public set data(vo:any)
	{
		this.resetData();
		while(this.bornPoint.length)
		{
			ObjectPool.push(this.bornPoint.pop());
		}
		while(this.refreshPoint.length)
		{
			ObjectPool.push(this.refreshPoint.pop());
		}
		var po:egret.Point = ObjectPool.pop("egret.Point");
		var c:Array<string> = (<string>vo.bron).split("#");
		po.x = parseInt(c[0]);
		po.y = parseInt(c[1]);
		this.bornPoint.push(po);
		c = (<string>vo.point).split("#");
		for(var i:number=0;i<c.length/2;i++)
		{
			po = ObjectPool.pop("egret.Point");
			po.x = parseInt(c[i*2]);
			po.y = parseInt(c[i*2+1]);
			this.refreshPoint.push(po);
		}
	}


	public static WALK: number = 0;//可通过区域 001
	public static UNWALK: number = 1;//不可通过区域
    public static CROSSED: number = 2;//可跳跃区域 010
    public static PROJECTION: number = 4;//投影区域   100
	public moveable(nx:number,ny:number):boolean
	{
		var dx:number = nx + ny * this.gridCols;
		if(nx >= this.gridCols)
			return false;
		if(ny >= this.gridRows)
			return false;
		return this.flags[dx] == 0 || (this.flags[dx] & MapVo.UNWALK) == 0;
	}


	private mapNodeArr:Array<any>;
	private nodePool:Array<MapNode>;
	private showNode:Array<MapNode>;
	
	/**
	 * 标记节点
	 */ 
	public markNode(nx: number,ny: number,state:number):void
    {
		if(!this.mapNodeArr[nx])
			this.mapNodeArr[nx] = [];
		let node:MapNode = this.mapNodeArr[nx][ny];
		if(!node)
		{
			if(this.nodePool.length >　0)
				node = this.nodePool.pop();
			else
				node = new MapNode();
			this.mapNodeArr[nx][ny] = node;
			this.showNode.push(node);
		}
		node.mark(state);
	}
	/**
	 * 解除标记
	 */ 
	 public unMarkNode(nx: number,ny: number,state: number): void
	 {
		 if(!nx || !ny)
		 	return;
		 if(!this.mapNodeArr[nx] || !this.mapNodeArr[nx][ny])
		 	return;
		 let node:MapNode = this.mapNodeArr[nx][ny];
		 if(!node)
			return;
		 node.unMark(state);
	 }

	 private get markNodeCount():number
	 {
		 var val:number = 0;
		 for(var i:number = 0;i<this.mapNodeArr.length;i++)
		 {
			 if(!this.mapNodeArr[i])
			 	continue;
			 for(var j:number=0;j<this.mapNodeArr[i].length;j++)
			 {
				 if(!this.mapNodeArr[i][j])
				 	continue;
				 if(this.mapNodeArr[i][j].state != 0)
				 	val ++;
			 }
		 }
		 return val;
	 }

	 public clearMapNode():void
	 {
		 while(this.showNode.length)
		 {
			 this.showNode[0].reset()
			 this.nodePool.push(this.showNode.shift());
		 }
		 this.mapNodeArr.length = 0;
	 }
	 //t==0 直接晚上加  t>0  循环T次  
	public mapUNMarkNode(nx: number,ny: number,t:number=0):egret.Point
	 {
		 var po:egret.Point = ObjectPool.pop("egret.Point");
		var i:number,node:MapNode,check:MapNode;
        var dirs: Array<egret.Point> = DisplayMapObject.DIR_LS;
		var c = t>=0?1:Math.abs(t);
		while (1)
		{
			for(i = 0;i < dirs.length;i++)
		 	{
				po.x = nx + dirs[i].x*c;
			 	po.y = ny + dirs[i].y*c;
			 	if(this.moveable(po.x,po.y) && !this.hasActor(po.x,po.y))
			 		return po;
		 	}
			 if(t >= 0)
			 {
				c++;
				if(c == t)
					break;
			 }
			 else
			 {
				 c--;
				 if(c == 0)
				 	break;
			 }
		}
		 return null;
	 }

	 private hasActor(nx,ny):boolean
	 {
		 return this.mapNodeArr[nx] && this.mapNodeArr[nx][ny] && this.mapNodeArr[nx][ny].state != 0;
	 }

	 public hasOtherHuman(nx,ny):boolean
	 {
		 if(this.mapNodeArr[nx] && this.mapNodeArr[nx][ny])
		 {
			 if(this.mapNodeArr[nx][ny].markers[MapNode.PLAYER] > 1)
			 	return true;
		 }
		 return false;
	 }

	 public isOverlap(nx,ny):boolean
	 {
		 return this.mapNodeArr[nx][ny].entityCount > 1;
	 }

	 public hasItem(nx,ny,around:boolean=true):boolean
	 {
		 //遍历八方木有
		 var a:boolean = this.mapNodeArr[nx] && this.mapNodeArr[nx][ny] && (this.mapNodeArr[nx][ny].state & 4) >0;
		 if(!around)
		 	return a;
		if(a)
		 	return true;
		else
		{
			var dirs: Array<egret.Point> = DisplayMapObject.DIR_LS;
			for(var i:number = 0;i < dirs.length;i++)
			{
				if(this.hasItem(nx+dirs[i].x,ny+dirs[i].y,false))
					return true;
			}
			return false;
		}
	 }
}

class MapNode
{
	//地图实体标记
	public static PLAYER: number = 1;//角色
	public static MONSTER:number = 2;//怪物
	public static ITEM:number = 4;//物品
	
	public state:number = 0;//节点状态
    public markers:Array<number>;
	public constructor()
	{
		this.markers = [];
	}
	public reset():void
    {
        this.state = 0;
        this.markers.length = 0;
    }
    
	public get entityCount():number
	{
		var c:number = 0;
		for(var i:number = 0;i<this.markers.length;i++)
		{
			if(this.markers[i] && this.markers[i] != MapNode.ITEM)
				c += this.markers[i];
		}
		return c;
	}

    public mark(state:number):void
    {
        this.state |= state;
        if(this.markers[state] == undefined)
        {
            this.markers[state] = 1;
        }else
        {
            this.markers[state] = this.markers[state]+1;
        }
    }
    
    public unMark(state:number):void
    {
        if(this.markers[state] == undefined)
        {
            this.markers[state] = 0;
		} else if(this.markers[state] > 0){
            this.markers[state] = this.markers[state] - 1;
        }
        if(this.markers[state] == 0 && this.state != 0)
        {
            this.state ^= state;
        }
    }
}