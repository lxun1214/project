/**
 * @动画剪辑基础库
 * 
 */ 
module clips
{
    /*对象池相关*/
    var _poolingNum: number;//对象池数量
    var _poolingls: Array<BmpClip>;//对象池列表
    
    /*资源加载逻辑*/
    var _nameLength: number = 3;//资源命名字符数量
    /**
     * 动画加载器
     */
    export class ClipLoader extends egret.EventDispatcher
    {
        private _jsonLoader:egret.HttpRequest;
        private _pngLoader:egret.ImageLoader;
        private _path:string;
        private _ver:string;
        private _json:any;
        private _texture:egret.Texture;
        
        public constructor()
        {
            super();
            
            this._jsonLoader = new egret.HttpRequest();
            this._jsonLoader.responseType = egret.HttpResponseType.TEXT;
            this._jsonLoader.addEventListener(egret.Event.COMPLETE,this.onJsonComplete,this);
            this._jsonLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
            
            this._pngLoader = new egret.ImageLoader();
            this._pngLoader.crossOrigin = "anonymous";
            this._pngLoader.addEventListener(egret.Event.COMPLETE,this.onPngComplete,this);
            this._pngLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
            
        }
        
        public get jsonData():any
        {
            return this._json;
        }
        public get texture():egret.Texture
        {
            return this._texture;
        }
        
        private onError(evt: egret.IOErrorEvent): void
        {
            this._json = undefined;
            this._texture = undefined;
            this.dispatchEventWith(this._path);
        }
        
        private onJsonComplete(evt:egret.Event):void
        {
            this._json = JSON.parse(this._jsonLoader.response);
            this._pngLoader.load(this._path+".png?v"+this._ver);
        }
        
        private onPngComplete(evt:egret.Event):void
        {
            var bitmapData: egret.BitmapData = this._pngLoader.data;
            //创建纹理对象
            this._texture = new egret.Texture();
            this._texture.bitmapData = bitmapData;
            
            this.dispatchEventWith(this._path);
        }
        
        /**
         * 开始加载
         * @param path
         * @param ver
         */
        public loadClip(path:string,ver:string):void
        {
            this._path = path;
            this._ver  = ver;
            this._jsonLoader.open(this._path+".json?v"+this._ver,egret.HttpMethod.GET);
            this._jsonLoader.send();
        }
    }
    
    /**
     * 动画加载
     */ 
    export class LoadInstance extends egret.EventDispatcher
    {
        private loaderls:Array<ClipLoader>;
        private pooling: Array<ClipLoader>;
        private queueUrls:Array<any>;
        public constructor()
        {
            super();
            
            this.queueUrls = new Array<any>();
            this.loaderls = new Array<ClipLoader>();
            this.pooling = new Array<ClipLoader>();
            this.setLoaderCount(5);
        }
        
        public setLoaderCount(value:number):void
        {
            var i: number,loader: ClipLoader;
            for(i = 0;i<value;i++)
            {
                loader = new ClipLoader();
                this.loaderls.push(loader);
                this.pooling.push(loader);
            }
        }
        
        public loadClip(path:string,ver:string):void
        {
            if(DEBUG || true)
            {
                this.loadByURLLoader(path,ver);
            }else
            {
                var thisObj:any = this;
                RES.getResByUrl(path+".json?"+ver,
                    function(jsonData:any,jurl:string){
                        //trace("cliploader---",jurl).toChannel(chl.all);
                        RES.getResByUrl(path+".png?"+ver,
                            function(pngData:egret.Texture,imgUrl:string){
                                //trace("cliploader---",imgUrl).toChannel(chl.all);
                                thisObj.dispatchEventWith(path,undefined,new egret.MovieClipDataFactory(jsonData,pngData));
                            },this,RES.ResourceItem.TYPE_IMAGE);
                    },this,RES.ResourceItem.TYPE_JSON);
            }
        }
        
        /**
         * 使用独立加载器
         * @param path
         * @param ver
         */
        private loadByURLLoader(path:string,ver:string):void
        {
            if(this.pooling.length <= 0)
            {
                this.queueUrls.push([path,ver]);
                return;
            }
            var loader: ClipLoader = this.pooling.shift();
            loader.addEventListener(path,this.onChildComplete,this);
            loader.loadClip(path,ver);
        }
        private onChildComplete(evt:egret.Event):void
        {
            var loader: ClipLoader = <ClipLoader>evt.currentTarget;
            if(!loader)
            {
                throw new Error("加载器出错！");
            }
            loader.removeEventListener(evt.type,this.onChildComplete,this);
            if(LoadInstance.delayLoop > 0)
            {
                this.dispatchQueues.push([evt.type,new egret.MovieClipDataFactory(loader.jsonData,loader.texture)]);
                if(!this.startQueue)
                {
                    SystemInstance.addTimeHandle(this.delayDispatch,LoadInstance.delayLoop,this);
                    this.startQueue = true;
                }
            }else
            {
                var data: any;
                while(this.dispatchQueues.length)
                {
                    data = this.dispatchQueues.pop();
                    this.dispatchEventWith(String(data[0]),undefined,data[1]);
                }
                this.dispatchEventWith(evt.type,undefined,new egret.MovieClipDataFactory(loader.jsonData,loader.texture));
            }
            
            if(this.queueUrls.length)
            {
                loader.addEventListener(String(this.queueUrls[0][0]),this.onChildComplete,this);
                loader.loadClip(String(this.queueUrls[0][0]),String(this.queueUrls[0][1]));
                this.queueUrls.shift();
            }else
            {
                this.pooling.push(loader);
            }
        }
        private startQueue:boolean = false;
        public static delayLoop:number = 0;
        private dispatchQueues: Array<any> = new Array<any>();
        private delayDispatch():void
        {
            if(this.dispatchQueues.length)
            {
                LoadInstance.delayLoop -= 100;
                var data:any = this.dispatchQueues.shift();
                this.dispatchEventWith(String(data[0]),undefined,data[1]);
            }else
            {
                SystemInstance.removeTimeHandle(this.delayDispatch);
            }
        }
    }
    
	/**
	 *
	 * @author
	 * @动画分组
	 *
	 */
	export class ClipGroup
	{
        private static _loader: LoadInstance;
        private static _loadNum:number = 1;
        public static set loadNum(value:number)
        {
            if(!ClipGroup._loader)
            {
                ClipGroup._loader = new LoadInstance();
            }
            RES.setMaxLoadingThread(value);
            ClipGroup._loadNum = value;
        }
        public static get loadNum():number
        {
            return ClipGroup._loadNum;
        }
    	
        private _path: string;
        private _ver: string;
        
        private _urls: Array<any[]>;
        private _movs: Object;
        public constructor(path: string,ver? :string)
		{
            this._path = path;
            this._urls = new Array<any[]>();
            this._movs = new Object();
            
            if(ver) {
                this._ver = ver;
            }else
            {
                this._ver = "0";
            }
		}
		
		/*
		 * @获取动画
		 * @index 动画序号
		 * @mc    动画实例
		 */ 
		public getBmpClip(id:number,mov?: egret.MovieClip,part?:string):BmpClip
		{
            if(part && part.indexOf("undefined") != -1){
    		    throw new Error("错误的动作或朝向 "+part);
    		}
    		
    		/*格式化资源url*/
            var index: string = id.toString();
            while(index.length < _nameLength)
            {
                index = "0" + index;
            }
            var url: string = this._path + index;
            if(part != undefined)
            {
                url += part;
            }
             
            /*分析资源载体*/
            var mc: egret.MovieClip;
            if(!mov)
            {
                mc = new BmpClip(null,url);
            }else
            {
                mc = mov;
                if(mc instanceof BmpClip)
                {
                    if((<BmpClip>mc).url == url)
                    {
                        return <BmpClip>mc;
                    }
                    (<BmpClip>mc).url = url;
                }
            }
            
            /*判断是否已经加载完毕*/
            if(ModelResMgr._url_moviedatas[url])
            {
                mc.movieClipData = ModelResMgr._url_moviedatas[url];
                mc.dispatchEventWith(url,ModelResMgr._url_moviedatas[url]);
                return <BmpClip>mc;
            }
            if(mc.movieClipData)
            {
                mc.movieClipData = null;
            }

            /*缓存尚未加载完毕的载体*/
            if(!this._urls[url])
            {
                this._urls[url] = new Array<egret.MovieClip>();
            }
            var oldUrl: string = this._movs[String(mc.hashCode)];
            if(oldUrl != undefined && oldUrl != url)
            {
                var mcs: any[] = this._urls[oldUrl];
                var idx: number = mcs.indexOf(mc);
                mcs.splice(idx,1);
            }
            this._urls[url].push(mc);
            ClipGroup._loader.addEventListener(url,this.onClipComplete,this);
            ClipGroup._loader.loadClip(url,this._ver);
            return <BmpClip>mc;
		}
		
		private onClipComplete(evt:egret.Event):void
		{
    		var url:string = evt.type;
            var fc: egret.MovieClipDataFactory = <egret.MovieClipDataFactory>evt.data;
            ModelResMgr._url_moviedatas[url] = fc.generateMovieClipData();
            var mcs: any[] = this._urls[url];
            if(!mcs)
            {
                throw new Error("错误的资源url");
            }
            //trace("渲染动画---",egret.getTimer(),mcs.length).toChannel(chl.guild);
            while(mcs.length)
    		{
                (<egret.MovieClip>mcs[0]).movieClipData = ModelResMgr._url_moviedatas[url];
                (<egret.EventDispatcher>mcs[0]).dispatchEventWith(url);
                mcs.shift();
    		}
		}
	}
	
	/**
	 *
	 * @author 
	 * @动画基类
	 *
	 */
	export class BmpClip extends egret.MovieClip
	{
        private _url: string = "";//资源地址
        
        private _playTimes: number = 0;//播放次数
        private _lessPlayTimes: number = -1;//剩余播放次数
        private _playAfterLoaded: boolean = false;//是否在加载完毕后播放
        private _scaleX: number = 1;//左右调换
        private _frameTick: number = 30;//帧幅
        private _playLoopTime: number = 0;//播放一次的时间
        public endPlayloop: number = 0;//停止播放的时间点
        public isActionEff:boolean = false;//动作特效
        
        public constructor(movieClipData?: egret.MovieClipData,url:string = "")
    	{
            super(movieClipData);
            this.url = url;
            
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
            this.addEventListener(egret.Event.COMPLETE,this.onPlayComplete,this);
            this.addEventListener(egret.Event.LOOP_COMPLETE,this.onPlayComplete,this);
    	}
    	
    	public static create():BmpClip
    	{
    	    return ObjectPool.pop("clips.BmpClip");
    	}
        
        
        
        /**
         * 数据加载完毕
         */ 
        private onDataComplete(evt: egret.Event): void
        {
            this.removeEventListener(evt.type,this.onDataComplete,this);
            
            if(this._playLoopTime > 0 && this.isComplete)//如果有设定播放速度
            {
                this.frameRate = 1000 / (this._playLoopTime / this.totalFrames);
            }
            
            if(this._playAfterLoaded)//加载完后播放
            {
                this.play(this._lessPlayTimes);
            }
            
            this.scaleX = this._scaleX;
        }
        
        /**
         * 左右对称调换
         */ 
        public setScaleX(value:number):void
        {
            this.scaleX = value;
            this._scaleX = value;
        }
        
        /**
         * 获取剩余播放次数
         */ 
        public get lastPlayTimes():number
        {
            return this._lessPlayTimes;
        }
        
    	/**
    	 * 设置播放一次的时间
    	 */ 
    	public set playLoopTime(time:number)
    	{
            this._playLoopTime = time;
            if(this.isComplete)
            {
                this.frameRate = 1000 / (this._playLoopTime / this.totalFrames);
            }
    	}
    	public get playLoopTime():number
    	{
            return this._playLoopTime;
    	}
    	
    	/**
    	 * 是否已经加载完毕
    	 */ 
    	public get isComplete():boolean
    	{
            return Boolean(this.movieClipData && this.movieClipData.$isDataValid);
    	}
    	
        public get onPlaying():boolean
        {
            return this._playAfterLoaded || this.isPlaying;
        }
        
        /**
         * 标示对应资源的url
         */ 
        public set url(value: string)
        {
            if(this._url != value)
            {
                this.removeEventListener(this._url,this.onDataComplete,this);
                this.movieClipData = null;
            }
            this._url = value;
            this.addEventListener(this._url,this.onDataComplete,this);
            this.addEventListener(egret.Event.COMPLETE,this.onPlayComplete,this);
            this.addEventListener(egret.Event.LOOP_COMPLETE,this.onPlayComplete,this);
        }
        public get url(): string
        {
            return this._url;
        }
    	
        /**
         * 添加到场景时触发
         */ 
        private onAddedToStage(evt: egret.Event): void
        {
            if(this._playAfterLoaded)
            {
                this.play(this._lessPlayTimes);
            }
        }
        
        /**
         * 播放记数
         */ 
        private onPlayComplete(evt:egret.Event):void
        {
            if(this._lessPlayTimes > 0)
            {
                this._lessPlayTimes--;
                //trace("onPlay---",this._lessPlayTimes);
            }
            if(this._lessPlayTimes == 0)
            {
                this.stop();
            }
        }

        /**
         * 清除数据
         */ 
        public clearData():void
        {
            this.url = "";
            this.movieClipData = null;
        }
        
    	/*
    	 * @销毁
    	 */ 
        public destruct():void
        {
            this.x = this.y = 0;
            this._playTimes = 0;//播放次数
            this._lessPlayTimes = -1;//剩余播放次数
            this._playAfterLoaded = false;//是否在加载完毕后播放
            this._scaleX = 1;//左右调换
            this._frameTick = 30;//帧幅
            this._playLoopTime = 0;//播放一次的时间
            this.endPlayloop = 0;//停止播放的时间点
            this.isActionEff = false;
            this.frameRate = 12;
            this.stop();
            this.clearData();
            this.removeEventListener(egret.Event.COMPLETE,this.onPlayComplete,this);
            this.removeEventListener(egret.Event.LOOP_COMPLETE,this.onPlayComplete,this);
            
            if(this.parent && this.parent.contains(this))
            {
                this.parent.removeChild(this);
            }
            ObjectPool.push(this);
        }
        

        ///////////////////////////////////////////////////////
        //重写api
        ///////////////////////////////////////////////////////
        /**
         * 播放控制
         */
        public play(playTimes?: number): void
        {
            this._playTimes = playTimes;
            this._lessPlayTimes = playTimes;
            this._playAfterLoaded = true;
            if(this.isPlaying)
            {
                return;
            }
            super.play(playTimes);
        }
        public stop(): void
        {
            this._lessPlayTimes = 0;
            this._playTimes = 0;
            this._playAfterLoaded = false;
            // this.isPlaying = false;
            super.stop();
        }
        /**
         * 播放控制
         */
        public gotoAndPlay(frame: any,playTimes?: number): void
        {
            this._playTimes = playTimes;
            this._lessPlayTimes = playTimes;
            this._playAfterLoaded = true;
            //trace("gotoAndPlay---",frame,typeof frame === "string");
            super.gotoAndPlay(frame,playTimes);
        }
        public gotoAndStop(frame: any): void
        {
            this._playAfterLoaded = false;
            super.gotoAndStop(frame);
        }
	}
}
