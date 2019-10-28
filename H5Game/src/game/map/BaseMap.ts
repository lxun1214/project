class BaseMap extends BaseClass{
	public static LOAD_MAP_COMPLETE:string = "LOAD_MAP_COMPLETE";
	public addActor(actor: any): void {
        this.actorLayer.addChild(actor);
    }
	private bg:eui.Image;
	private m_MapLayerRoot:eui.UILayer;
    public m_nLayersOffsetX: number = 0;//除背景外的各个层的微偏移量X（可做场景震动效果）
    public m_nLayersOffsetY: number = 0;//除背景外的各个层的微偏移量Y（可做场景震动效果）
	public m_nHCellCount: number;//地图水平方向半个显示区域可以容纳的坐标数量
    public m_nVCellCount: number;//地图竖直方向半个显示区域可以容纳的坐标数量
	protected m_nDisplayWidth: number;//地图显示区域的像素宽度
    protected m_nDisplayHeight: number;//地图显示区域的像素高度
	protected mapContainer: eui.UILayer;
    private mAsPath: ASPath;
	private actorLayer: eui.UILayer;
	public constructor(val:eui.UILayer) {
            super();
            this.m_MapLayerRoot = val;
			this.bg = new eui.Image();
            this.bg.scaleX = this.bg.scaleY = DisplayMapObject.MINMAP_SCALE;
			this.m_MapLayerRoot.addChild(this.bg);
			this.mapContainer = new eui.UILayer();
			this.m_MapLayerRoot.addChild(this.mapContainer);

			this.actorLayer = new eui.UILayer();
        	this.actorLayer.name = "模型层";
        	this.actorLayer.touchEnabled = this.actorLayer.touchChildren = false;
			this.m_MapLayerRoot.addChild(this.actorLayer);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMove,this);
            this.mapContainer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMove,this);
            this.mAsPath = new ASPath();
	}
    public setDisplaySize(width: number, height: number): void {
        if (width != this.m_nDisplayWidth || height != this.m_nDisplayHeight) {
            this.m_nDisplayWidth = width;
            this.m_nDisplayHeight = height;
			var vo:MapVo = MapVo.ins;
            this.m_nHCellCount = Math.ceil(width / DisplayMapObject.MAP_IMG_WIDE);
            this.m_nVCellCount = Math.ceil(height / DisplayMapObject.MAP_IMG_HIDE);
        }
    }
	public moveable(nx:number,ny:number):boolean
	{
		return MapVo.ins.moveable(nx,ny)
	}
	public get onHookMap():boolean
	{
		return this.mapType == MapType.TYPE_0;
	}
	public get inFBMap():boolean
	{
		return this.mapType == MapType.TYPE_2; 
	}
	public get inBossMap():boolean
	{
		return this.mapType == MapType.TYPE_1; 
	}
	public get inJJCMap():boolean
	{
		return this.mapType == MapType.TYPE_3; 
	}
	private _mapType:number;
	public get mapType():number
	{
		return this._mapType;
	}
	public currMapID:number;
    public lastFile:number;
    public mc:any;
  	public gotoScene(Id: number,fb:boolean): boolean {
        this.currMapID = Id;
		var mapConfig:any;
		if(!fb)
		{
			mapConfig = ConfigMgr.gameConfig["pointInfo"][Id + ""];
			this._mapType = mapConfig.maptype;
		}else
		{
			mapConfig = ConfigMgr.gameConfig["partInfo"][Id + ""];
			this._mapType = MapType.TYPE_2;
		}
		if(!mapConfig)
			throw new Error("找不到地图" + Id + fb);
		if(GuideMgr._instance)
			GuideMgr.dispatchTiggerEvent(tigger.sceneType);

        if( this.lastFile != mapConfig.sectionId)
            this.clearRes();
         this.lastFile = mapConfig.sectionId;
         this.mc = mapConfig;
		var dt:egret.ByteArray = TMXMgr.ins().mapDic[this.lastFile + ".xy"];
		if(!dt)
			return false;
		var vo:MapVo = MapVo.ins;
		vo.mapData = dt;
        this.startX = this.startY = -1;
		this.bg.source = ResMgr.getMapImage(this.lastFile + ".jpg");
        this.mAsPath.initFromMap();
        MapVo.ins.data = mapConfig;
        DataEventDispatcher.dispatchEventWith(BaseMap.LOAD_MAP_COMPLETE);
		return true;
	}
	private startX:number;
    private startY:number;
	private changeMap: boolean = false;
    private bgX:number;
    private bgY:number;
	public titleLayXY(x: number, y: number,force:boolean=false): boolean {
        x += (this.m_MapLayerRoot.scaleX - 1) * MapVo.ins.mapW;
        y += (this.m_MapLayerRoot.scaleY - 1)* MapVo.ins.mapH;
        if(this.bgX == x && this.bgY == y && !force)
            return false;
        if(!force)
        {
            this.bgX = x;
            this.bgY = y;
        }
		var vo:MapVo = MapVo.ins;
        var nx: number = x + this.m_nLayersOffsetX;
        var ny: number = y + this.m_nLayersOffsetY;
        /*this.bg.x = */this.m_MapLayerRoot.x = nx;
        /*this.bg.y = */this.m_MapLayerRoot.y = ny;

        var _startX: number = Math.floor(Math.abs(nx) / DisplayMapObject.MAP_IMG_WIDE / this.m_MapLayerRoot.scaleX);
        _startX = _startX < 0 ? 0 : _startX;
        var _startY: number = Math.floor(Math.abs(ny) / DisplayMapObject.MAP_IMG_HIDE / this.m_MapLayerRoot.scaleX);
        _startY = _startY < 0 ? 0 : _startY;

        if (this.startX != _startX || this.startY != _startY || this.changeMap) {
            this.startX = _startX;
            this.startY = _startY;
            this.changeMap = false;
            this.upMapImg(nx, ny);
    	}
        return true;
	}
	private upMapImg(nx: number, ny: number, del: boolean = true): void {
		var vo:MapVo = MapVo.ins;
        var needShow: Array<any> = [];
        var imgIndex: number;
        var xCount: number = this.startX + this.m_nHCellCount;
        var yCount: number = this.startY + this.m_nVCellCount;
        for (nx = this.startX; nx <= xCount; nx++) {
            for (ny = this.startY; ny <= yCount; ny++) {
                imgIndex = ny * vo.imgCols + nx;
                if (imgIndex < vo.imgRows * vo.imgCols)
                    needShow.push(imgIndex);
            }
        }
        var img: eui.Image;
        var imgIndex: number;
        var i: number;
        for (i = this.mapContainer.numChildren - 1; i > -1; i--) {
            img = <eui.Image>(this.mapContainer.getChildAt(i));
            imgIndex = needShow.indexOf(Number(img.name));
            if (imgIndex != -1) {
                needShow.splice(imgIndex, 1);
            }
            else {
                if (del)
                    img.parent.removeChildAt(i);
            }
        }

        var s: string;
        while (needShow.length) {
            imgIndex = needShow.pop();
            s = ResMgr.getMapImage(vo.mapFile + "/" + (imgIndex) + ".jpg");
            img = this.getImg(s);
            img.name = imgIndex + "";
            img.x = imgIndex % vo.imgCols * DisplayMapObject.MAP_IMG_WIDE;
            img.y = Math.floor(imgIndex / vo.imgCols) * DisplayMapObject.MAP_IMG_HIDE;
            this.mapContainer.addChild(img);
        }
    }

    private clearRes(): void {
        var i: number;
        var img: eui.Image;
        var obj: any;
        var time: number = egret.getTimer();
        while (this.imgHashMap.length) {
            obj = this.imgHashMap.shift() as any;
            img = obj.value as eui.Image;
            if (img.parent != null)
                img.parent.removeChild(img);
            img.source = null;
            RES.destroyRes(obj.key);
            img.name = time + "";
            // if (img.texture != null)
            //     img.texture.dispose();
            this.mapResPool.push(img);
        }
        this.imgHashMap.clear();
        if(this.bg.source)
            RES.destroyRes(/*<string>this.bg.source*/ ResMgr.getMapImage(MapVo.ins.mapFile + ".jpg"),false);
        this.bg.source = null;
    }
	private mapResPool: Array<eui.Image> = new Array<eui.Image>();
   private imgHashMap: HashMap = new HashMap()
    private getImg(s: string): eui.Image {
        var img: eui.Image = this.imgHashMap.get(s) as eui.Image;
        if (img == null) {
            if (this.mapResPool.length > 0 && egret.getTimer() - Number(this.mapResPool[0].name) > 1000) {
                img = this.mapResPool.shift();
            }
            else {
                img = new eui.Image();
            }
            img.source = s;
            this.imgHashMap.add(s, img);
        }
        return img;
    }

    public getPath( fromX: number, fromY: number,targetX: number, targetY: number,ratio:number=1,dis:number=0): Array<any> {
        var backPathArr: Array<any>;
        backPathArr = this.mAsPath.getPatch(fromX, fromY, targetX, targetY);
        if(!backPathArr)
			return null;
		if(ratio == 1)
			return backPathArr;
		else
		{
			if(backPathArr.length == 1)
				return null;
			let val:number = Math.floor(backPathArr.length * ratio) + Math.floor(dis/2);;
			while(val)
			{
				backPathArr.shift();
				val--;
			}
			return backPathArr;
		}
    }

    clickEff:clips.BmpClip;
    private onMove(e:egret.TouchEvent):void
    {
        var mx: number = e.localX;
        var my: number = e.localY;
        var po: egret.Point = this.screenToCoord(e.stageX, e.stageY);
        if (!MapVo.ins.moveable(po.x, po.y))
            return;
        if(!this.clickEff)
        {
           this.clickEff = ObjectPool.pop("clips.BmpClip");
           ModelResMgr.getOtherEffect(10044,this.clickEff);
            this.clickEff.addEventListener(egret.Event.COMPLETE,(e:egret.Event)=>{
                  this.clickEff.gotoAndStop(1);
                  if(this.clickEff.parent)
                    this.clickEff.parent.removeChild(this.clickEff);
            },this);
        }
        this.clickEff.x = po.x * DisplayMapObject.MAP_CELL_WIDE;
        this.clickEff.y = po.y * DisplayMapObject.MAP_CELL_HIDE;
        this.clickEff.play(2);
        this.actorLayer.addChild(this.clickEff)
        Human.ins.path = this.getPath(Human.ins.distX,Human.ins.distY,po.x,po.y);
    }

    public screenToCoord(x: number, y: number): egret.Point {
        var pt: egret.Point = new egret.Point(
            Math.floor((x - this.m_MapLayerRoot.x) / this.m_MapLayerRoot.scaleX * DisplayMapObject.MAPCELLUNITWIDTH_DEN),
            Math.floor((y - this.m_MapLayerRoot.y) / this.m_MapLayerRoot.scaleX * DisplayMapObject.MAPCELLUNITHEIGHT_DEN)
        );
        if (pt.x < 0) pt.x = 0;
        var vo:MapVo = MapVo.ins;
        if (pt.x >= vo.gridCols) pt.x = vo.gridCols - 1;
        if (pt.y < 0) pt.y = 0;
        if (pt.y >= vo.gridRows) pt.y = vo.gridRows - 1;
        return pt;
    }
}