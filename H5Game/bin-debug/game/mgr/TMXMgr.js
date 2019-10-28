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
var TMXMgr = (function (_super) {
    __extends(TMXMgr, _super);
    function TMXMgr() {
        return _super.call(this) || this;
    }
    TMXMgr.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    TMXMgr.prototype.loadTmx = function () {
        this.myload = new egret.URLLoader();
        this.myload.dataFormat = egret.URLLoaderDataFormat.BINARY;
        this.myload.addEventListener(egret.Event.COMPLETE, this.loadZipCom, this);
        this.myload.addEventListener(egret.ProgressEvent.PROGRESS, LoadingUI.ins.onProgress, this);
        this.myload.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadZipErr, this);
        var url = ResMgr.getMapImage("xy/xy");
        var request = new egret.URLRequest(url);
        //开始加载
        this.myload.load(request);
    };
    TMXMgr.prototype.loadZipCom = function (e) {
        var zip = new JSZip(e.target.data);
        this.mapDic = {};
        var data;
        for (var k in zip["files"]) {
            this.mapDic[k] = new egret.ByteArray(zip.file(k).asArrayBuffer());
        }
        // egret.log("地图加载完毕！");
        DataEventDispatcher.dispatchEventWith(TMXMgr.LOAD_TMX_END);
    };
    TMXMgr.prototype.loadZipErr = function (data) {
        egret.log("地图加载错误！");
    };
    TMXMgr.LOAD_TMX_END = "LOAD_TMX_END";
    return TMXMgr;
}(BaseClass));
__reflect(TMXMgr.prototype, "TMXMgr");
//# sourceMappingURL=TMXMgr.js.map