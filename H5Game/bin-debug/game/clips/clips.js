var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * @动画剪辑基础库
 *
 */
var clips;
(function (clips) {
    /*对象池相关*/
    var _poolingNum; //对象池数量
    var _poolingls; //对象池列表
    /*资源加载逻辑*/
    var _nameLength = 3; //资源命名字符数量
    /**
     * 动画加载器
     */
    var ClipLoader = (function (_super) {
        __extends(ClipLoader, _super);
        function ClipLoader() {
            var _this = _super.call(this) || this;
            _this._jsonLoader = new egret.HttpRequest();
            _this._jsonLoader.responseType = egret.HttpResponseType.TEXT;
            _this._jsonLoader.addEventListener(egret.Event.COMPLETE, _this.onJsonComplete, _this);
            _this._jsonLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, _this.onError, _this);
            _this._pngLoader = new egret.ImageLoader();
            _this._pngLoader.crossOrigin = "anonymous";
            _this._pngLoader.addEventListener(egret.Event.COMPLETE, _this.onPngComplete, _this);
            _this._pngLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, _this.onError, _this);
            return _this;
        }
        Object.defineProperty(ClipLoader.prototype, "jsonData", {
            get: function () {
                return this._json;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClipLoader.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            enumerable: true,
            configurable: true
        });
        ClipLoader.prototype.onError = function (evt) {
            this._json = undefined;
            this._texture = undefined;
            this.dispatchEventWith(this._path);
        };
        ClipLoader.prototype.onJsonComplete = function (evt) {
            this._json = JSON.parse(this._jsonLoader.response);
            this._pngLoader.load(this._path + ".png?v" + this._ver);
        };
        ClipLoader.prototype.onPngComplete = function (evt) {
            var bitmapData = this._pngLoader.data;
            //创建纹理对象
            this._texture = new egret.Texture();
            this._texture.bitmapData = bitmapData;
            this.dispatchEventWith(this._path);
        };
        /**
         * 开始加载
         * @param path
         * @param ver
         */
        ClipLoader.prototype.loadClip = function (path, ver) {
            this._path = path;
            this._ver = ver;
            this._jsonLoader.open(this._path + ".json?v" + this._ver, egret.HttpMethod.GET);
            this._jsonLoader.send();
        };
        return ClipLoader;
    }(egret.EventDispatcher));
    clips.ClipLoader = ClipLoader;
    __reflect(ClipLoader.prototype, "clips.ClipLoader");
    /**
     * 动画加载
     */
    var LoadInstance = (function (_super) {
        __extends(LoadInstance, _super);
        function LoadInstance() {
            var _this = _super.call(this) || this;
            _this.startQueue = false;
            _this.dispatchQueues = new Array();
            _this.queueUrls = new Array();
            _this.loaderls = new Array();
            _this.pooling = new Array();
            _this.setLoaderCount(5);
            return _this;
        }
        LoadInstance.prototype.setLoaderCount = function (value) {
            var i, loader;
            for (i = 0; i < value; i++) {
                loader = new ClipLoader();
                this.loaderls.push(loader);
                this.pooling.push(loader);
            }
        };
        LoadInstance.prototype.loadClip = function (path, ver) {
            if (true || true) {
                this.loadByURLLoader(path, ver);
            }
            else {
                var thisObj = this;
                RES.getResByUrl(path + ".json?" + ver, function (jsonData, jurl) {
                    //trace("cliploader---",jurl).toChannel(chl.all);
                    RES.getResByUrl(path + ".png?" + ver, function (pngData, imgUrl) {
                        //trace("cliploader---",imgUrl).toChannel(chl.all);
                        thisObj.dispatchEventWith(path, undefined, new egret.MovieClipDataFactory(jsonData, pngData));
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                }, this, RES.ResourceItem.TYPE_JSON);
            }
        };
        /**
         * 使用独立加载器
         * @param path
         * @param ver
         */
        LoadInstance.prototype.loadByURLLoader = function (path, ver) {
            if (this.pooling.length <= 0) {
                this.queueUrls.push([path, ver]);
                return;
            }
            var loader = this.pooling.shift();
            loader.addEventListener(path, this.onChildComplete, this);
            loader.loadClip(path, ver);
        };
        LoadInstance.prototype.onChildComplete = function (evt) {
            var loader = evt.currentTarget;
            if (!loader) {
                throw new Error("加载器出错！");
            }
            loader.removeEventListener(evt.type, this.onChildComplete, this);
            if (LoadInstance.delayLoop > 0) {
                this.dispatchQueues.push([evt.type, new egret.MovieClipDataFactory(loader.jsonData, loader.texture)]);
                if (!this.startQueue) {
                    SystemInstance.addTimeHandle(this.delayDispatch, LoadInstance.delayLoop, this);
                    this.startQueue = true;
                }
            }
            else {
                var data;
                while (this.dispatchQueues.length) {
                    data = this.dispatchQueues.pop();
                    this.dispatchEventWith(String(data[0]), undefined, data[1]);
                }
                this.dispatchEventWith(evt.type, undefined, new egret.MovieClipDataFactory(loader.jsonData, loader.texture));
            }
            if (this.queueUrls.length) {
                loader.addEventListener(String(this.queueUrls[0][0]), this.onChildComplete, this);
                loader.loadClip(String(this.queueUrls[0][0]), String(this.queueUrls[0][1]));
                this.queueUrls.shift();
            }
            else {
                this.pooling.push(loader);
            }
        };
        LoadInstance.prototype.delayDispatch = function () {
            if (this.dispatchQueues.length) {
                LoadInstance.delayLoop -= 100;
                var data = this.dispatchQueues.shift();
                this.dispatchEventWith(String(data[0]), undefined, data[1]);
            }
            else {
                SystemInstance.removeTimeHandle(this.delayDispatch);
            }
        };
        LoadInstance.delayLoop = 0;
        return LoadInstance;
    }(egret.EventDispatcher));
    clips.LoadInstance = LoadInstance;
    __reflect(LoadInstance.prototype, "clips.LoadInstance");
    /**
     *
     * @author
     * @动画分组
     *
     */
    var ClipGroup = (function () {
        function ClipGroup(path, ver) {
            this._path = path;
            this._urls = new Array();
            this._movs = new Object();
            if (ver) {
                this._ver = ver;
            }
            else {
                this._ver = "0";
            }
        }
        Object.defineProperty(ClipGroup, "loadNum", {
            get: function () {
                return ClipGroup._loadNum;
            },
            set: function (value) {
                if (!ClipGroup._loader) {
                    ClipGroup._loader = new LoadInstance();
                }
                RES.setMaxLoadingThread(value);
                ClipGroup._loadNum = value;
            },
            enumerable: true,
            configurable: true
        });
        /*
         * @获取动画
         * @index 动画序号
         * @mc    动画实例
         */
        ClipGroup.prototype.getBmpClip = function (id, mov, part) {
            if (part && part.indexOf("undefined") != -1) {
                throw new Error("错误的动作或朝向 " + part);
            }
            /*格式化资源url*/
            var index = id.toString();
            while (index.length < _nameLength) {
                index = "0" + index;
            }
            var url = this._path + index;
            if (part != undefined) {
                url += part;
            }
            /*分析资源载体*/
            var mc;
            if (!mov) {
                mc = new BmpClip(null, url);
            }
            else {
                mc = mov;
                if (mc instanceof BmpClip) {
                    if (mc.url == url) {
                        return mc;
                    }
                    mc.url = url;
                }
            }
            /*判断是否已经加载完毕*/
            if (ModelResMgr._url_moviedatas[url]) {
                mc.movieClipData = ModelResMgr._url_moviedatas[url];
                mc.dispatchEventWith(url, ModelResMgr._url_moviedatas[url]);
                return mc;
            }
            if (mc.movieClipData) {
                mc.movieClipData = null;
            }
            /*缓存尚未加载完毕的载体*/
            if (!this._urls[url]) {
                this._urls[url] = new Array();
            }
            var oldUrl = this._movs[String(mc.hashCode)];
            if (oldUrl != undefined && oldUrl != url) {
                var mcs = this._urls[oldUrl];
                var idx = mcs.indexOf(mc);
                mcs.splice(idx, 1);
            }
            this._urls[url].push(mc);
            ClipGroup._loader.addEventListener(url, this.onClipComplete, this);
            ClipGroup._loader.loadClip(url, this._ver);
            return mc;
        };
        ClipGroup.prototype.onClipComplete = function (evt) {
            var url = evt.type;
            var fc = evt.data;
            ModelResMgr._url_moviedatas[url] = fc.generateMovieClipData();
            var mcs = this._urls[url];
            if (!mcs) {
                throw new Error("错误的资源url");
            }
            //trace("渲染动画---",egret.getTimer(),mcs.length).toChannel(chl.guild);
            while (mcs.length) {
                mcs[0].movieClipData = ModelResMgr._url_moviedatas[url];
                mcs[0].dispatchEventWith(url);
                mcs.shift();
            }
        };
        ClipGroup._loadNum = 1;
        return ClipGroup;
    }());
    clips.ClipGroup = ClipGroup;
    __reflect(ClipGroup.prototype, "clips.ClipGroup");
    /**
     *
     * @author
     * @动画基类
     *
     */
    var BmpClip = (function (_super) {
        __extends(BmpClip, _super);
        function BmpClip(movieClipData, url) {
            if (url === void 0) { url = ""; }
            var _this = _super.call(this, movieClipData) || this;
            _this._url = ""; //资源地址
            _this._playTimes = 0; //播放次数
            _this._lessPlayTimes = -1; //剩余播放次数
            _this._playAfterLoaded = false; //是否在加载完毕后播放
            _this._scaleX = 1; //左右调换
            _this._frameTick = 30; //帧幅
            _this._playLoopTime = 0; //播放一次的时间
            _this.endPlayloop = 0; //停止播放的时间点
            _this.isActionEff = false; //动作特效
            _this.url = url;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
            _this.addEventListener(egret.Event.COMPLETE, _this.onPlayComplete, _this);
            _this.addEventListener(egret.Event.LOOP_COMPLETE, _this.onPlayComplete, _this);
            return _this;
        }
        BmpClip.create = function () {
            return ObjectPool.pop("clips.BmpClip");
        };
        /**
         * 数据加载完毕
         */
        BmpClip.prototype.onDataComplete = function (evt) {
            this.removeEventListener(evt.type, this.onDataComplete, this);
            if (this._playLoopTime > 0 && this.isComplete) {
                this.frameRate = 1000 / (this._playLoopTime / this.totalFrames);
            }
            if (this._playAfterLoaded) {
                this.play(this._lessPlayTimes);
            }
            this.scaleX = this._scaleX;
        };
        /**
         * 左右对称调换
         */
        BmpClip.prototype.setScaleX = function (value) {
            this.scaleX = value;
            this._scaleX = value;
        };
        Object.defineProperty(BmpClip.prototype, "lastPlayTimes", {
            /**
             * 获取剩余播放次数
             */
            get: function () {
                return this._lessPlayTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BmpClip.prototype, "playLoopTime", {
            get: function () {
                return this._playLoopTime;
            },
            /**
             * 设置播放一次的时间
             */
            set: function (time) {
                this._playLoopTime = time;
                if (this.isComplete) {
                    this.frameRate = 1000 / (this._playLoopTime / this.totalFrames);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BmpClip.prototype, "isComplete", {
            /**
             * 是否已经加载完毕
             */
            get: function () {
                return Boolean(this.movieClipData && this.movieClipData.$isDataValid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BmpClip.prototype, "onPlaying", {
            get: function () {
                return this._playAfterLoaded || this.isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BmpClip.prototype, "url", {
            get: function () {
                return this._url;
            },
            /**
             * 标示对应资源的url
             */
            set: function (value) {
                if (this._url != value) {
                    this.removeEventListener(this._url, this.onDataComplete, this);
                    this.movieClipData = null;
                }
                this._url = value;
                this.addEventListener(this._url, this.onDataComplete, this);
                this.addEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
                this.addEventListener(egret.Event.LOOP_COMPLETE, this.onPlayComplete, this);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加到场景时触发
         */
        BmpClip.prototype.onAddedToStage = function (evt) {
            if (this._playAfterLoaded) {
                this.play(this._lessPlayTimes);
            }
        };
        /**
         * 播放记数
         */
        BmpClip.prototype.onPlayComplete = function (evt) {
            if (this._lessPlayTimes > 0) {
                this._lessPlayTimes--;
                //trace("onPlay---",this._lessPlayTimes);
            }
            if (this._lessPlayTimes == 0) {
                this.stop();
            }
        };
        /**
         * 清除数据
         */
        BmpClip.prototype.clearData = function () {
            this.url = "";
            this.movieClipData = null;
        };
        /*
         * @销毁
         */
        BmpClip.prototype.destruct = function () {
            this.x = this.y = 0;
            this._playTimes = 0; //播放次数
            this._lessPlayTimes = -1; //剩余播放次数
            this._playAfterLoaded = false; //是否在加载完毕后播放
            this._scaleX = 1; //左右调换
            this._frameTick = 30; //帧幅
            this._playLoopTime = 0; //播放一次的时间
            this.endPlayloop = 0; //停止播放的时间点
            this.isActionEff = false;
            this.frameRate = 12;
            this.stop();
            this.clearData();
            this.removeEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
            this.removeEventListener(egret.Event.LOOP_COMPLETE, this.onPlayComplete, this);
            if (this.parent && this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
            ObjectPool.push(this);
        };
        ///////////////////////////////////////////////////////
        //重写api
        ///////////////////////////////////////////////////////
        /**
         * 播放控制
         */
        BmpClip.prototype.play = function (playTimes) {
            this._playTimes = playTimes;
            this._lessPlayTimes = playTimes;
            this._playAfterLoaded = true;
            if (this.isPlaying) {
                return;
            }
            _super.prototype.play.call(this, playTimes);
        };
        BmpClip.prototype.stop = function () {
            this._lessPlayTimes = 0;
            this._playTimes = 0;
            this._playAfterLoaded = false;
            // this.isPlaying = false;
            _super.prototype.stop.call(this);
        };
        /**
         * 播放控制
         */
        BmpClip.prototype.gotoAndPlay = function (frame, playTimes) {
            this._playTimes = playTimes;
            this._lessPlayTimes = playTimes;
            this._playAfterLoaded = true;
            //trace("gotoAndPlay---",frame,typeof frame === "string");
            _super.prototype.gotoAndPlay.call(this, frame, playTimes);
        };
        BmpClip.prototype.gotoAndStop = function (frame) {
            this._playAfterLoaded = false;
            _super.prototype.gotoAndStop.call(this, frame);
        };
        return BmpClip;
    }(egret.MovieClip));
    clips.BmpClip = BmpClip;
    __reflect(BmpClip.prototype, "clips.BmpClip");
})(clips || (clips = {}));
//# sourceMappingURL=clips.js.map