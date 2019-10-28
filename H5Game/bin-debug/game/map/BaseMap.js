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
var BaseMap = (function (_super) {
    __extends(BaseMap, _super);
    function BaseMap(val) {
        var _this = _super.call(this) || this;
        _this.m_nLayersOffsetX = 0; //除背景外的各个层的微偏移量X（可做场景震动效果）
        _this.m_nLayersOffsetY = 0; //除背景外的各个层的微偏移量Y（可做场景震动效果）
        _this.changeMap = false;
        _this.mapResPool = new Array();
        _this.imgHashMap = new HashMap();
        _this.m_MapLayerRoot = val;
        _this.bg = new eui.Image();
        _this.bg.scaleX = _this.bg.scaleY = DisplayMapObject.MINMAP_SCALE;
        _this.m_MapLayerRoot.addChild(_this.bg);
        _this.mapContainer = new eui.UILayer();
        _this.m_MapLayerRoot.addChild(_this.mapContainer);
        _this.actorLayer = new eui.UILayer();
        _this.actorLayer.name = "模型层";
        _this.actorLayer.touchEnabled = _this.actorLayer.touchChildren = false;
        _this.m_MapLayerRoot.addChild(_this.actorLayer);
        _this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onMove, _this);
        _this.mapContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onMove, _this);
        _this.mAsPath = new ASPath();
        return _this;
    }
    BaseMap.prototype.addActor = function (actor) {
        this.actorLayer.addChild(actor);
    };
    BaseMap.prototype.setDisplaySize = function (width, height) {
        if (width != this.m_nDisplayWidth || height != this.m_nDisplayHeight) {
            this.m_nDisplayWidth = width;
            this.m_nDisplayHeight = height;
            var vo = MapVo.ins;
            this.m_nHCellCount = Math.ceil(width / DisplayMapObject.MAP_IMG_WIDE);
            this.m_nVCellCount = Math.ceil(height / DisplayMapObject.MAP_IMG_HIDE);
        }
    };
    BaseMap.prototype.moveable = function (nx, ny) {
        return MapVo.ins.moveable(nx, ny);
    };
    Object.defineProperty(BaseMap.prototype, "onHookMap", {
        get: function () {
            return this.mapType == MapType.TYPE_0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMap.prototype, "inFBMap", {
        get: function () {
            return this.mapType == MapType.TYPE_2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMap.prototype, "inBossMap", {
        get: function () {
            return this.mapType == MapType.TYPE_1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMap.prototype, "inJJCMap", {
        get: function () {
            return this.mapType == MapType.TYPE_3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMap.prototype, "mapType", {
        get: function () {
            return this._mapType;
        },
        enumerable: true,
        configurable: true
    });
    BaseMap.prototype.gotoScene = function (Id, fb) {
        this.currMapID = Id;
        var mapConfig;
        if (!fb) {
            mapConfig = ConfigMgr.gameConfig["pointInfo"][Id + ""];
            this._mapType = mapConfig.maptype;
        }
        else {
            mapConfig = ConfigMgr.gameConfig["partInfo"][Id + ""];
            this._mapType = MapType.TYPE_2;
        }
        if (!mapConfig)
            throw new Error("找不到地图" + Id + fb);
        if (GuideMgr._instance)
            GuideMgr.dispatchTiggerEvent(tigger.sceneType);
        if (this.lastFile != mapConfig.sectionId)
            this.clearRes();
        this.lastFile = mapConfig.sectionId;
        this.mc = mapConfig;
        var dt = TMXMgr.ins().mapDic[this.lastFile + ".xy"];
        if (!dt)
            return false;
        var vo = MapVo.ins;
        vo.mapData = dt;
        this.startX = this.startY = -1;
        this.bg.source = ResMgr.getMapImage(this.lastFile + ".jpg");
        this.mAsPath.initFromMap();
        MapVo.ins.data = mapConfig;
        DataEventDispatcher.dispatchEventWith(BaseMap.LOAD_MAP_COMPLETE);
        return true;
    };
    BaseMap.prototype.titleLayXY = function (x, y, force) {
        if (force === void 0) { force = false; }
        x += (this.m_MapLayerRoot.scaleX - 1) * MapVo.ins.mapW;
        y += (this.m_MapLayerRoot.scaleY - 1) * MapVo.ins.mapH;
        if (this.bgX == x && this.bgY == y && !force)
            return false;
        if (!force) {
            this.bgX = x;
            this.bgY = y;
        }
        var vo = MapVo.ins;
        var nx = x + this.m_nLayersOffsetX;
        var ny = y + this.m_nLayersOffsetY;
        /*this.bg.x = */ this.m_MapLayerRoot.x = nx;
        /*this.bg.y = */ this.m_MapLayerRoot.y = ny;
        var _startX = Math.floor(Math.abs(nx) / DisplayMapObject.MAP_IMG_WIDE / this.m_MapLayerRoot.scaleX);
        _startX = _startX < 0 ? 0 : _startX;
        var _startY = Math.floor(Math.abs(ny) / DisplayMapObject.MAP_IMG_HIDE / this.m_MapLayerRoot.scaleX);
        _startY = _startY < 0 ? 0 : _startY;
        if (this.startX != _startX || this.startY != _startY || this.changeMap) {
            this.startX = _startX;
            this.startY = _startY;
            this.changeMap = false;
            this.upMapImg(nx, ny);
        }
        return true;
    };
    BaseMap.prototype.upMapImg = function (nx, ny, del) {
        if (del === void 0) { del = true; }
        var vo = MapVo.ins;
        var needShow = [];
        var imgIndex;
        var xCount = this.startX + this.m_nHCellCount;
        var yCount = this.startY + this.m_nVCellCount;
        for (nx = this.startX; nx <= xCount; nx++) {
            for (ny = this.startY; ny <= yCount; ny++) {
                imgIndex = ny * vo.imgCols + nx;
                if (imgIndex < vo.imgRows * vo.imgCols)
                    needShow.push(imgIndex);
            }
        }
        var img;
        var imgIndex;
        var i;
        for (i = this.mapContainer.numChildren - 1; i > -1; i--) {
            img = (this.mapContainer.getChildAt(i));
            imgIndex = needShow.indexOf(Number(img.name));
            if (imgIndex != -1) {
                needShow.splice(imgIndex, 1);
            }
            else {
                if (del)
                    img.parent.removeChildAt(i);
            }
        }
        var s;
        while (needShow.length) {
            imgIndex = needShow.pop();
            s = ResMgr.getMapImage(vo.mapFile + "/" + (imgIndex) + ".jpg");
            img = this.getImg(s);
            img.name = imgIndex + "";
            img.x = imgIndex % vo.imgCols * DisplayMapObject.MAP_IMG_WIDE;
            img.y = Math.floor(imgIndex / vo.imgCols) * DisplayMapObject.MAP_IMG_HIDE;
            this.mapContainer.addChild(img);
        }
    };
    BaseMap.prototype.clearRes = function () {
        var i;
        var img;
        var obj;
        var time = egret.getTimer();
        while (this.imgHashMap.length) {
            obj = this.imgHashMap.shift();
            img = obj.value;
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
        if (this.bg.source)
            RES.destroyRes(/*<string>this.bg.source*/ ResMgr.getMapImage(MapVo.ins.mapFile + ".jpg"), false);
        this.bg.source = null;
    };
    BaseMap.prototype.getImg = function (s) {
        var img = this.imgHashMap.get(s);
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
    };
    BaseMap.prototype.getPath = function (fromX, fromY, targetX, targetY, ratio, dis) {
        if (ratio === void 0) { ratio = 1; }
        if (dis === void 0) { dis = 0; }
        var backPathArr;
        backPathArr = this.mAsPath.getPatch(fromX, fromY, targetX, targetY);
        if (!backPathArr)
            return null;
        if (ratio == 1)
            return backPathArr;
        else {
            if (backPathArr.length == 1)
                return null;
            var val = Math.floor(backPathArr.length * ratio) + Math.floor(dis / 2);
            ;
            while (val) {
                backPathArr.shift();
                val--;
            }
            return backPathArr;
        }
    };
    BaseMap.prototype.onMove = function (e) {
        var _this = this;
        var mx = e.localX;
        var my = e.localY;
        var po = this.screenToCoord(e.stageX, e.stageY);
        if (!MapVo.ins.moveable(po.x, po.y))
            return;
        if (!this.clickEff) {
            this.clickEff = ObjectPool.pop("clips.BmpClip");
            ModelResMgr.getOtherEffect(10044, this.clickEff);
            this.clickEff.addEventListener(egret.Event.COMPLETE, function (e) {
                _this.clickEff.gotoAndStop(1);
                if (_this.clickEff.parent)
                    _this.clickEff.parent.removeChild(_this.clickEff);
            }, this);
        }
        this.clickEff.x = po.x * DisplayMapObject.MAP_CELL_WIDE;
        this.clickEff.y = po.y * DisplayMapObject.MAP_CELL_HIDE;
        this.clickEff.play(2);
        this.actorLayer.addChild(this.clickEff);
        Human.ins.path = this.getPath(Human.ins.distX, Human.ins.distY, po.x, po.y);
    };
    BaseMap.prototype.screenToCoord = function (x, y) {
        var pt = new egret.Point(Math.floor((x - this.m_MapLayerRoot.x) / this.m_MapLayerRoot.scaleX * DisplayMapObject.MAPCELLUNITWIDTH_DEN), Math.floor((y - this.m_MapLayerRoot.y) / this.m_MapLayerRoot.scaleX * DisplayMapObject.MAPCELLUNITHEIGHT_DEN));
        if (pt.x < 0)
            pt.x = 0;
        var vo = MapVo.ins;
        if (pt.x >= vo.gridCols)
            pt.x = vo.gridCols - 1;
        if (pt.y < 0)
            pt.y = 0;
        if (pt.y >= vo.gridRows)
            pt.y = vo.gridRows - 1;
        return pt;
    };
    BaseMap.LOAD_MAP_COMPLETE = "LOAD_MAP_COMPLETE";
    return BaseMap;
}(BaseClass));
__reflect(BaseMap.prototype, "BaseMap");
//# sourceMappingURL=BaseMap.js.map