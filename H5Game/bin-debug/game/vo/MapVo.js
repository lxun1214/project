var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapVo = (function () {
    function MapVo() {
        this.flags = [];
        this.minXYpo = new egret.Point();
        this.bornPoint = [];
        this.refreshPoint = [];
        this.mapNodeArr = [];
        this.nodePool = [];
        this.showNode = [];
    }
    Object.defineProperty(MapVo, "ins", {
        get: function () {
            if (!MapVo._ins)
                MapVo._ins = new MapVo();
            return MapVo._ins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapVo.prototype, "mapData", {
        set: function (data) {
            data.position = 0;
            this.flags.splice(0);
            data.readDouble();
            data.readDouble();
            data.readByte();
            data.readUTF();
            data.readByte();
            data.readShort();
            data.readByte();
            var len = data.readDouble();
            var c = new egret.ByteArray();
            data.readBytes(c, 0, len);
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
            for (var i = 0; i < len; i++) {
                this.flags.push(c.readByte());
            }
            this.minXYpo.x = GlobalVo.GAME_W - this.mapW;
            this.minXYpo.y = GlobalVo.GAME_H - this.mapH;
            this.miniMapW = this.mapW / DisplayMapEffect.MINMAP_SCALE;
            this.miniMapH = this.mapH / DisplayMapEffect.MINMAP_SCALE;
            this.clearMapNode();
        },
        enumerable: true,
        configurable: true
    });
    MapVo.prototype.autoChangeDX = function () {
        if (this.order == 0) {
            if (this.refreshDx >= this.refreshPoint.length - 1) {
                this.order = 1;
                this.refreshDx -= 1;
                return true;
            }
            else {
                this.refreshDx++;
            }
        }
        else {
            if (this.refreshDx == 0) {
                this.order = 0;
                this.refreshDx = 1;
            }
            else {
                this.refreshDx--;
            }
        }
        return false;
    };
    MapVo.prototype.resetData = function () {
        this.refreshDx = -1;
        this.order = 0;
    };
    Object.defineProperty(MapVo.prototype, "data", {
        set: function (vo) {
            this.resetData();
            while (this.bornPoint.length) {
                ObjectPool.push(this.bornPoint.pop());
            }
            while (this.refreshPoint.length) {
                ObjectPool.push(this.refreshPoint.pop());
            }
            var po = ObjectPool.pop("egret.Point");
            var c = vo.bron.split("#");
            po.x = parseInt(c[0]);
            po.y = parseInt(c[1]);
            this.bornPoint.push(po);
            c = vo.point.split("#");
            for (var i = 0; i < c.length / 2; i++) {
                po = ObjectPool.pop("egret.Point");
                po.x = parseInt(c[i * 2]);
                po.y = parseInt(c[i * 2 + 1]);
                this.refreshPoint.push(po);
            }
        },
        enumerable: true,
        configurable: true
    });
    MapVo.prototype.moveable = function (nx, ny) {
        var dx = nx + ny * this.gridCols;
        if (nx >= this.gridCols)
            return false;
        if (ny >= this.gridRows)
            return false;
        return this.flags[dx] == 0 || (this.flags[dx] & MapVo.UNWALK) == 0;
    };
    /**
     * 标记节点
     */
    MapVo.prototype.markNode = function (nx, ny, state) {
        if (!this.mapNodeArr[nx])
            this.mapNodeArr[nx] = [];
        var node = this.mapNodeArr[nx][ny];
        if (!node) {
            if (this.nodePool.length > 0)
                node = this.nodePool.pop();
            else
                node = new MapNode();
            this.mapNodeArr[nx][ny] = node;
            this.showNode.push(node);
        }
        node.mark(state);
    };
    /**
     * 解除标记
     */
    MapVo.prototype.unMarkNode = function (nx, ny, state) {
        if (!nx || !ny)
            return;
        if (!this.mapNodeArr[nx] || !this.mapNodeArr[nx][ny])
            return;
        var node = this.mapNodeArr[nx][ny];
        if (!node)
            return;
        node.unMark(state);
    };
    Object.defineProperty(MapVo.prototype, "markNodeCount", {
        get: function () {
            var val = 0;
            for (var i = 0; i < this.mapNodeArr.length; i++) {
                if (!this.mapNodeArr[i])
                    continue;
                for (var j = 0; j < this.mapNodeArr[i].length; j++) {
                    if (!this.mapNodeArr[i][j])
                        continue;
                    if (this.mapNodeArr[i][j].state != 0)
                        val++;
                }
            }
            return val;
        },
        enumerable: true,
        configurable: true
    });
    MapVo.prototype.clearMapNode = function () {
        while (this.showNode.length) {
            this.showNode[0].reset();
            this.nodePool.push(this.showNode.shift());
        }
        this.mapNodeArr.length = 0;
    };
    //t==0 直接晚上加  t>0  循环T次  
    MapVo.prototype.mapUNMarkNode = function (nx, ny, t) {
        if (t === void 0) { t = 0; }
        var po = ObjectPool.pop("egret.Point");
        var i, node, check;
        var dirs = DisplayMapObject.DIR_LS;
        var c = t >= 0 ? 1 : Math.abs(t);
        while (1) {
            for (i = 0; i < dirs.length; i++) {
                po.x = nx + dirs[i].x * c;
                po.y = ny + dirs[i].y * c;
                if (this.moveable(po.x, po.y) && !this.hasActor(po.x, po.y))
                    return po;
            }
            if (t >= 0) {
                c++;
                if (c == t)
                    break;
            }
            else {
                c--;
                if (c == 0)
                    break;
            }
        }
        return null;
    };
    MapVo.prototype.hasActor = function (nx, ny) {
        return this.mapNodeArr[nx] && this.mapNodeArr[nx][ny] && this.mapNodeArr[nx][ny].state != 0;
    };
    MapVo.prototype.hasOtherHuman = function (nx, ny) {
        if (this.mapNodeArr[nx] && this.mapNodeArr[nx][ny]) {
            if (this.mapNodeArr[nx][ny].markers[MapNode.PLAYER] > 1)
                return true;
        }
        return false;
    };
    MapVo.prototype.isOverlap = function (nx, ny) {
        return this.mapNodeArr[nx][ny].entityCount > 1;
    };
    MapVo.prototype.hasItem = function (nx, ny, around) {
        if (around === void 0) { around = true; }
        //遍历八方木有
        var a = this.mapNodeArr[nx] && this.mapNodeArr[nx][ny] && (this.mapNodeArr[nx][ny].state & 4) > 0;
        if (!around)
            return a;
        if (a)
            return true;
        else {
            var dirs = DisplayMapObject.DIR_LS;
            for (var i = 0; i < dirs.length; i++) {
                if (this.hasItem(nx + dirs[i].x, ny + dirs[i].y, false))
                    return true;
            }
            return false;
        }
    };
    MapVo.WALK = 0; //可通过区域 001
    MapVo.UNWALK = 1; //不可通过区域
    MapVo.CROSSED = 2; //可跳跃区域 010
    MapVo.PROJECTION = 4; //投影区域   100
    return MapVo;
}());
__reflect(MapVo.prototype, "MapVo");
var MapNode = (function () {
    function MapNode() {
        this.state = 0; //节点状态
        this.markers = [];
    }
    MapNode.prototype.reset = function () {
        this.state = 0;
        this.markers.length = 0;
    };
    Object.defineProperty(MapNode.prototype, "entityCount", {
        get: function () {
            var c = 0;
            for (var i = 0; i < this.markers.length; i++) {
                if (this.markers[i] && this.markers[i] != MapNode.ITEM)
                    c += this.markers[i];
            }
            return c;
        },
        enumerable: true,
        configurable: true
    });
    MapNode.prototype.mark = function (state) {
        this.state |= state;
        if (this.markers[state] == undefined) {
            this.markers[state] = 1;
        }
        else {
            this.markers[state] = this.markers[state] + 1;
        }
    };
    MapNode.prototype.unMark = function (state) {
        if (this.markers[state] == undefined) {
            this.markers[state] = 0;
        }
        else if (this.markers[state] > 0) {
            this.markers[state] = this.markers[state] - 1;
        }
        if (this.markers[state] == 0 && this.state != 0) {
            this.state ^= state;
        }
    };
    //地图实体标记
    MapNode.PLAYER = 1; //角色
    MapNode.MONSTER = 2; //怪物
    MapNode.ITEM = 4; //物品
    return MapNode;
}());
__reflect(MapNode.prototype, "MapNode");
//# sourceMappingURL=MapVo.js.map