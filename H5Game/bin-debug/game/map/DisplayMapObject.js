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
 *
 * @author
 *
 */
var DisplayMapObject = (function (_super) {
    __extends(DisplayMapObject, _super);
    function DisplayMapObject() {
        var _this = _super.call(this) || this;
        _this.nStaticLevel = 0; //深度
        _this.nDynamicLevel = 1; //相同y坐标的深度优先级，优先级大的在上层
        _this.nOffsetX = 0; //漂移x坐标
        _this.nOffsetY = 0; //漂移y坐标
        _this.nStartMoveTick = 0; //开始移动时间点
        _this.nTargetX = undefined; //移动目的地x
        _this.nTargetY = undefined; //移动目的地y
        _this.onMoveing = false;
        _this.getTimer = egret.getTimer; //获取时间函数
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        return _this;
    }
    DisplayMapObject.prototype.onAdded = function (evt) {
        var index = this.calcDisplayIndex(this.parent);
        this.parent.addChildAt(this, index);
    };
    /**
     * 设置地图数据
     */
    // public setMapMatrix(matrix: MapNodeMatrix): void {
    //     this.nMapMatrix = matrix;
    // }
    /**
     *设置中心坐标
     * @param X
     * @param Y
     *
     */
    DisplayMapObject.prototype.setCurrentXY = function (X, Y) {
        if (X != this.nCurrentX || Y != this.nCurrentY) {
            this.sortOnContainer(this.nCurrentX, X, this.nCurrentY, Y);
        }
        this.nCurrentX = X;
        this.nCurrentY = Y;
    };
    Object.defineProperty(DisplayMapObject.prototype, "currentX", {
        /*
         * 获取当前坐标
         */
        get: function () {
            return this.nCurrentX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayMapObject.prototype, "currentY", {
        get: function () {
            return this.nCurrentY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayMapObject.prototype, "distX", {
        /*
         * 获取动态坐标
         */
        get: function () {
            if (this.nTargetX != undefined) {
                return this.nTargetX;
            }
            return this.nCurrentX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayMapObject.prototype, "distY", {
        get: function () {
            if (this.nTargetY != undefined) {
                return this.nTargetY;
            }
            return this.nCurrentY;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置地图显示对象的坐标
     */
    DisplayMapObject.prototype.setPosition = function (nx, ny) {
        if ((nx != this.nCurrentX || ny != this.nCurrentY) && this.parent) {
            this.sortOnContainer(this.nCurrentX, nx, this.nCurrentY, ny);
        }
        // this.nCurrentX = nx;//this.nMapMatrix.checkBoundX(nx,0);
        // this.nCurrentY = ny;//this.nMapMatrix.checkBoundY(ny,0);
        this.setCurrentXY(nx, ny);
        this.x = (this.nCurrentX + 0.5) * DisplayMapObject.MAP_CELL_WIDE + this.nOffsetX;
        this.y = (this.nCurrentY + 0.5) * DisplayMapObject.MAP_CELL_HIDE + this.nOffsetY;
    };
    DisplayMapObject.prototype.setOffset = function (offx, offy) {
        this.nOffsetX = offx;
        this.nOffsetY = offy;
    };
    /**
     * 移动
     */
    DisplayMapObject.prototype.moveTo = function (nx, ny, speed) {
        if (this.nTargetX == nx && this.nTargetY == ny)
            return false;
        // if (nx > this.nMapMatrix.mapWidthNum - 1) {
        //     nx = this.nMapMatrix.mapWidthNum - 1;
        // } else if (nx < 0) {
        //     nx = 0;
        // }
        // if(ny > DisplayMapObject.MAP_LIMIT_BOTTOM) {
        //     ny = DisplayMapObject.MAP_LIMIT_BOTTOM;
        // } else if(ny < DisplayMapObject.MAP_LIMIT_TOP) {
        //     ny = DisplayMapObject.MAP_LIMIT_TOP;
        // }
        this.onMoveing = true;
        this.nTargetX = nx;
        this.nTargetY = ny;
        this.nStartMoveTick = this.getTimer();
        this.nEndMoveTick = this.nStartMoveTick + speed;
        this.nSteppingX = (this.nTargetX - this.nCurrentX) * DisplayMapObject.MAP_CELL_WIDE / speed;
        this.nSteppingY = (this.nTargetY - this.nCurrentY) * DisplayMapObject.MAP_CELL_HIDE / speed;
        return true;
    };
    /**
     * 移动过程
     */
    DisplayMapObject.prototype.processMove = function (tick) {
        if (this.nStartMoveTick <= 0)
            return;
        if (tick > this.nEndMoveTick) {
            this.endMove();
            return;
        }
        var dtick = tick - this.nStartMoveTick;
        this.x = (this.nCurrentX + 0.5) * DisplayMapObject.MAP_CELL_WIDE + this.nSteppingX * dtick + this.nOffsetX;
        this.y = (this.nCurrentY + 0.5) * DisplayMapObject.MAP_CELL_HIDE + this.nSteppingY * dtick + this.nOffsetY;
        //egret.log("process---"+this["nRace"] +","+ this.x+","+this.y);
    };
    /**
     * 结束移动并同步地图坐标
     */
    DisplayMapObject.prototype.endMove = function (sync) {
        if (sync === void 0) { sync = true; }
        this.onMoveing = false;
        if (this.nStartMoveTick > 0 && this.nTargetX != undefined && this.nTargetY != undefined && sync) {
            this.setPosition(this.nTargetX, this.nTargetY);
        }
        else {
            this.nTargetX = Math.floor(this.x / DisplayMapObject.MAP_CELL_WIDE);
            this.nTargetY = Math.floor(this.y / DisplayMapObject.MAP_CELL_HIDE);
            this.setPosition(this.nTargetX, this.nTargetY);
        }
        this.nEndMoveTick = this.getTimer();
        this.nStartMoveTick = 0;
        this.nTargetX = undefined;
        this.nTargetY = undefined;
    };
    Object.defineProperty(DisplayMapObject.prototype, "isMoving", {
        get: function () {
            return this.onMoveing;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *计算指定显示对象的坐标相对于容器里的深度值
     * @param Container
     * @return
     *
     */
    DisplayMapObject.prototype.calcDisplayIndex = function (container) {
        var mapObj;
        var nIndex = container.numChildren - 1;
        while (nIndex > -1) {
            mapObj = container.getChildAt(nIndex);
            if (mapObj == this) {
                nIndex--;
                continue;
            }
            if (mapObj.nStaticLevel < this.nStaticLevel)
                break;
            if (mapObj.nStaticLevel == this.nStaticLevel) {
                if (mapObj.nCurrentY < this.nCurrentY)
                    break;
                else if (mapObj.nCurrentY == this.nCurrentY) {
                    if (mapObj.nDynamicLevel < this.nDynamicLevel)
                        break;
                    if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX > this.nCurrentX)
                        break;
                }
            }
            nIndex--;
        }
        return nIndex + 1;
    };
    Object.defineProperty(DisplayMapObject.prototype, "depthPriority", {
        set: function (value) {
            if (this.nStaticLevel == value)
                return;
            this.nStaticLevel = value;
            if (!this.parent)
                return;
            var index = this.calcDisplayIndex(this.parent);
            this.parent.addChildAt(this, index);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayMapObject.prototype, "dynamicLevel", {
        set: function (value) {
            this.nDynamicLevel = value;
        },
        enumerable: true,
        configurable: true
    });
    DisplayMapObject.prototype.update = function (CurrentTick, tickNum) {
    };
    /*
     * 计算与目标的距离
     */
    DisplayMapObject.prototype.distance = function (target, dx, dy) {
        if (!target)
            return Math.max(Math.abs(dx - this.distX), Math.abs(dy - this.distY));
        var dx = Math.abs(target.distX - this.distX);
        var dy = Math.abs(target.distY - this.distY);
        if (dx > dy)
            return dx;
        else
            return dy;
    };
    /**
     * 计算与目标的朝向
     */
    DisplayMapObject.prototype.getDirctionByTarget = function (target) {
        var i = 0;
        var dx = target.distX - this.nCurrentX;
        var dy = target.distY - this.nCurrentY;
        //egret.log("dir---" + target.currentX + "," + target.currentY);
        var po = new egret.Point(Math.abs(dx) / dx, Math.abs(dy) / dy);
        for (i; i < DisplayMapObject.DIR_LS.length; i++) {
            if (DisplayMapObject.DIR_LS[i].x == po.x && DisplayMapObject.DIR_LS[i].y == po.y) {
                return i;
            }
        }
        return 0;
    };
    /**
    * 根据像素点来计算角度
    */
    DisplayMapObject.prototype.countAngle2 = function (target) {
        return Math.atan2(target.y - 50 - this.y, target.x - this.x) * 180 / Math.PI;
    };
    /**
     * 计算角度
     */
    DisplayMapObject.prototype.countAngle = function (target, defaultDir, isReal) {
        if (target.distX == this.nCurrentX && target.distY == this.nCurrentY && defaultDir != undefined) {
            return defaultDir;
        }
        var rod = Math.atan2(target.distY - this.nCurrentY, target.distX - this.nCurrentX) + Math.PI / 2;
        rod = rod * 180 / Math.PI;
        rod = (720 + rod) % (360);
        // rod = Math.floor(rod / 45);
        if (!isReal) {
            rod = Math.round(rod / 45) & 7;
        }
        //trace("rod---",rod).toChannel(chl.all);
        return rod;
    };
    /**
     * 寻路与目标的方向
     *
     */
    DisplayMapObject.prototype.countTargetDirection = function (target, moveDir) {
        var dx = Math.abs(this.currentX - target.distX);
        var dy = Math.abs(this.currentY - target.distY);
        //var dr:number = Math.abs(this.currentX - target.distX)-Math.abs(this.currentY - target.distY);
        if (dy > dx) {
            if (target.distY > this.currentY)
                return 4;
            else if (target.distY < this.currentY)
                return 0;
        }
        else if (dx > dy) {
            if (target.distX > this.currentX)
                return 2;
            else if (target.distX < this.currentX)
                return 6;
        }
        else {
            if (target.distX > this.currentX) {
                if (target.distY > this.currentY)
                    return 3;
                else
                    return 1;
            }
            else if (target.distX < this.currentX) {
                if (target.distY > this.currentY)
                    return 5;
                else
                    return 7;
            }
            if (dx == 0 && moveDir != undefined) {
                return moveDir;
            }
            else {
                return 5; //左下
            }
        }
        return 0; //上
    };
    /**
     * 计算到点的寻路方向
     */
    DisplayMapObject.prototype.countPointDirection = function (target, moveDir) {
        var dx = Math.abs(this.currentX - target.x);
        var dy = Math.abs(this.currentY - target.y);
        //var dr:number = Math.abs(this.currentX - target.distX)-Math.abs(this.currentY - target.distY);
        if (dy > dx) {
            if (target.y > this.currentY)
                return 4;
            else if (target.y < this.currentY)
                return 0;
        }
        else if (dx > dy) {
            if (target.x > this.currentX)
                return 2;
            else if (target.x < this.currentX)
                return 6;
        }
        else {
            if (target.x > this.currentX) {
                if (target.y > this.currentY)
                    return 3;
                else
                    return 1;
            }
            else if (target.x < this.currentX) {
                if (target.y > this.currentY)
                    return 5;
                else
                    return 7;
            }
            if (dx == 0 && moveDir != undefined) {
                return moveDir;
            }
            else {
                return 5;
            }
        }
        return 0;
    };
    /**
     *排列深度
     * @param OldX
     * @param NewX
     * @param OldY
     * @param NewY
     *
     */
    DisplayMapObject.prototype.sortOnContainer = function (oldx, newx, oldy, newy) {
        var mapObj;
        var nY;
        if (!this.parent)
            return;
        var childNum = this.parent.numChildren;
        var oldIndex = this.parent.getChildIndex(this);
        var newIndex = oldIndex;
        if (newy < oldy) {
            newIndex--;
            //遍历到指定的坐标对应的深度
            while (newIndex > -1) {
                mapObj = this.parent.getChildAt(newIndex);
                if (mapObj.nStaticLevel < this.nStaticLevel)
                    break;
                if (mapObj.nStaticLevel == this.nStaticLevel) {
                    if (mapObj.nCurrentY < newy)
                        break;
                    else if (mapObj.nCurrentY == newy) {
                        if (mapObj.nDynamicLevel < this.nDynamicLevel)
                            break;
                        if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX > newx)
                            break;
                    }
                }
                newIndex--;
            }
            newIndex++;
        }
        else if (newy > oldy) {
            newIndex++;
            //遍历到指定的坐标对应的深度
            while (newIndex < childNum) {
                mapObj = this.parent.getChildAt(newIndex);
                if (mapObj.nStaticLevel > this.nStaticLevel)
                    break;
                if (mapObj.nStaticLevel == this.nStaticLevel) {
                    if (mapObj.nCurrentY > newy)
                        break;
                    else if (mapObj.nCurrentY == newy) {
                        if (mapObj.nDynamicLevel > this.nDynamicLevel)
                            break;
                        if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX < newx)
                            break;
                    }
                }
                newIndex++;
            }
            newIndex--;
        }
        else {
            if (newx < oldx) {
                newIndex++;
                //遍历到指定的坐标对应的深度
                while (newIndex < childNum) {
                    mapObj = this.parent.getChildAt(newIndex);
                    if (mapObj.nStaticLevel > this.nStaticLevel)
                        break;
                    if (mapObj.nStaticLevel == this.nStaticLevel) {
                        if (mapObj.nCurrentY > newy)
                            break;
                        else if (mapObj.nCurrentY == newy) {
                            if (mapObj.nDynamicLevel > this.nDynamicLevel)
                                break;
                            if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX < newx)
                                break;
                        }
                    }
                    newIndex++;
                }
                newIndex--;
            }
            else if (newx > oldx) {
                newIndex--;
                //遍历到指定的坐标对应的深度
                while (newIndex > -1) {
                    mapObj = this.parent.getChildAt(newIndex);
                    if (mapObj.nStaticLevel < this.nStaticLevel)
                        break;
                    if (mapObj.nStaticLevel == this.nStaticLevel) {
                        if (mapObj.nCurrentY < newy)
                            break;
                        else if (mapObj.nCurrentY == newy) {
                            if (mapObj.nDynamicLevel < this.nDynamicLevel)
                                break;
                            if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX > newx)
                                break;
                        }
                    }
                    newIndex--;
                }
                newIndex++;
            }
        }
        if (newIndex != oldIndex)
            this.parent.setChildIndex(this, newIndex);
    };
    DisplayMapObject.calcForwardPosition = function (currentX, currentY, direction, step) {
        switch (direction) {
            case 0: return new egret.Point(currentX, currentY - step);
            case 1: return new egret.Point(currentX + step, currentY - step);
            case 2: return new egret.Point(currentX + step, currentY);
            case 3: return new egret.Point(currentX + step, currentY + step);
            case 4: return new egret.Point(currentX, currentY + step);
            case 5: return new egret.Point(currentX - step, currentY + step);
            case 6: return new egret.Point(currentX - step, currentY);
            case 7: return new egret.Point(currentX - step, currentY - step);
            default: throw new Error("计算前方位置时传递了无效的方向:" + direction);
        }
    };
    DisplayMapObject.jumpDestXY = function (currentX, currentY, direction, step) {
        var endPoint = new egret.Point(currentX, currentY);
        var checkPoint;
        for (var i = 0; i < step; i++) {
            checkPoint = DisplayMapObject.calcForwardPosition(endPoint.x, endPoint.y, direction, 1);
            if (!MapVo.ins.moveable(checkPoint.x, checkPoint.y))
                break;
            endPoint.x = checkPoint.x;
            endPoint.y = checkPoint.y;
        }
        checkPoint = null;
        return endPoint;
    };
    DisplayMapObject.MAP_CELL_WIDE = 48;
    DisplayMapObject.MAP_CELL_HIDE = 32;
    DisplayMapObject.MAP_IMG_WIDE = 256;
    DisplayMapObject.MAP_IMG_HIDE = 256;
    DisplayMapObject.MAPCELLUNITWIDTH_DEN = 1 / 48;
    DisplayMapObject.MAPCELLUNITHEIGHT_DEN = 1 / 32;
    DisplayMapObject.MINMAP_SCALE = 6;
    /**
     * 方向向量
     */
    DisplayMapObject.DIR_LS = [
        new egret.Point(0, -1),
        new egret.Point(1, -1),
        new egret.Point(1, 0),
        new egret.Point(1, 1),
        new egret.Point(0, 1),
        new egret.Point(-1, 1),
        new egret.Point(-1, 0),
        new egret.Point(-1, -1)
    ]; //左上
    return DisplayMapObject;
}(egret.DisplayObjectContainer));
__reflect(DisplayMapObject.prototype, "DisplayMapObject");
//# sourceMappingURL=DisplayMapObject.js.map