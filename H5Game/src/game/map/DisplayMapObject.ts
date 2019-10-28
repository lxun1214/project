/**
 *
 * @author 
 *
 */
class DisplayMapObject extends egret.DisplayObjectContainer {
    public static MAP_CELL_WIDE: number = 48;
    public static MAP_CELL_HIDE: number = 32;
    public static MAP_IMG_WIDE:number = 256;
    public static MAP_IMG_HIDE:number = 256;
    public static MAPCELLUNITWIDTH_DEN:number = 1/48;
    public static MAPCELLUNITHEIGHT_DEN:number = 1/32;
    public static MINMAP_SCALE:number = 6;

    protected nStaticLevel: number = 0; //深度
    protected nDynamicLevel: number = 1; //相同y坐标的深度优先级，优先级大的在上层
    protected nCurrentX: number; //中心点的x坐标
    protected nCurrentY: number; //中心店的y坐标

    protected nOffsetX: number = 0;//漂移x坐标
    protected nOffsetY: number = 0;//漂移y坐标
    // protected nMapMatrix: MapNodeMatrix;//地图数据对象

    protected nSteppingX: number;//移动横向步进
    protected nSteppingY: number;//移动纵向步进
    protected nStartMoveTick: number = 0;//开始移动时间点
    protected nEndMoveTick: number;//结束移动时间点
    protected nTargetX: number = undefined;//移动目的地x
    protected nTargetY: number = undefined;//移动目的地y
    protected onMoveing: Boolean = false;
    public getTimer: Function = egret.getTimer;//获取时间函数

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }
    private onAdded(evt: egret.Event): void {
        var index: number = this.calcDisplayIndex(this.parent);
        this.parent.addChildAt(this, index);
    }

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
    public setCurrentXY(X: number, Y: number): void {
        if (X != this.nCurrentX || Y != this.nCurrentY) {
            this.sortOnContainer(this.nCurrentX, X, this.nCurrentY, Y);
        }
        this.nCurrentX = X;
        this.nCurrentY = Y;
    }
    /*
     * 获取当前坐标
     */
    public get currentX(): number {
        return this.nCurrentX;
    }
    public get currentY(): number {
        return this.nCurrentY;
    }

    /*
     * 获取动态坐标
     */
    public get distX(): number {
        if (this.nTargetX != undefined) {
            return this.nTargetX;
        }
        return this.nCurrentX;
    }
    public get distY(): number {
        if (this.nTargetY != undefined) {
            return this.nTargetY;
        }
        return this.nCurrentY;
    }

    /**
     * 设置地图显示对象的坐标
     */
    public setPosition(nx: number, ny: number): void {
        if ((nx != this.nCurrentX || ny != this.nCurrentY) && this.parent) {
            this.sortOnContainer(this.nCurrentX, nx, this.nCurrentY, ny);
        }

        // this.nCurrentX = nx;//this.nMapMatrix.checkBoundX(nx,0);
        // this.nCurrentY = ny;//this.nMapMatrix.checkBoundY(ny,0);
        this.setCurrentXY(nx,ny);

        this.x = (this.nCurrentX + 0.5) * DisplayMapObject.MAP_CELL_WIDE + this.nOffsetX;
        this.y = (this.nCurrentY + 0.5) * DisplayMapObject.MAP_CELL_HIDE + this.nOffsetY;

    }

    public setOffset(offx: number, offy: number): void {
        this.nOffsetX = offx;
        this.nOffsetY = offy;
    }

    /**
     * 移动
     */
    public moveTo(nx: number, ny: number, speed: number): Boolean {
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
    }

    /**
     * 移动过程
     */
    public processMove(tick: number): void {
        if (this.nStartMoveTick <= 0)
            return;

        if (tick > this.nEndMoveTick) {
            this.endMove();
            return;
        }
        var dtick: number = tick - this.nStartMoveTick;
        this.x = (this.nCurrentX + 0.5) * DisplayMapObject.MAP_CELL_WIDE + this.nSteppingX * dtick + this.nOffsetX;
        this.y = (this.nCurrentY + 0.5) * DisplayMapObject.MAP_CELL_HIDE + this.nSteppingY * dtick + this.nOffsetY;
        //egret.log("process---"+this["nRace"] +","+ this.x+","+this.y);
    }

    /**
     * 结束移动并同步地图坐标
     */
    public endMove(sync: Boolean = true): void {
        this.onMoveing = false;
        if (this.nStartMoveTick > 0 && this.nTargetX != undefined && this.nTargetY != undefined && sync) {
            this.setPosition(this.nTargetX, this.nTargetY);
        } else {
            this.nTargetX = Math.floor(this.x / DisplayMapObject.MAP_CELL_WIDE);
            this.nTargetY = Math.floor(this.y / DisplayMapObject.MAP_CELL_HIDE);
            this.setPosition(this.nTargetX, this.nTargetY);
        }

        this.nEndMoveTick = this.getTimer();
        this.nStartMoveTick = 0;
        this.nTargetX = undefined;
        this.nTargetY = undefined;
    }
    public get isMoving(): Boolean {
        return this.onMoveing;
    }

    /**
     *计算指定显示对象的坐标相对于容器里的深度值 
     * @param Container
     * @return
     *  
     */
    public calcDisplayIndex(container: egret.DisplayObjectContainer): number {
        var mapObj: DisplayMapObject;
        var nIndex: number = container.numChildren - 1;

        while (nIndex > -1) {
            mapObj = <DisplayMapObject>container.getChildAt(nIndex);
            if (mapObj == this) {
                nIndex--;
                continue;
            }
            if (mapObj.nStaticLevel < this.nStaticLevel)
                break;

            if (mapObj.nStaticLevel == this.nStaticLevel)//y坐标小于等于当前则应放在下层跳出
            {
                if (mapObj.nCurrentY < this.nCurrentY)//坐标小的上面
                    break;
                else if (mapObj.nCurrentY == this.nCurrentY)//相同坐标
                {
                    if (mapObj.nDynamicLevel < this.nDynamicLevel)//相同坐标则去优先级高的在上面
                        break;
                    if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX > this.nCurrentX)//左边的在下面
                        break;
                }
            }

            nIndex--;
        }

        return nIndex + 1;
    }

    public set depthPriority(value: number) {
        if (this.nStaticLevel == value)
            return;

        this.nStaticLevel = value;

        if (!this.parent)
            return;

        var index: number = this.calcDisplayIndex(this.parent);
        this.parent.addChildAt(this, index);
    }
    public set dynamicLevel(value: number) {
        this.nDynamicLevel = value;
    }

    public update(CurrentTick: number, tickNum: number): void {

    }

    /*
     * 计算与目标的距离
     */
    public distance(target: DisplayMapObject,dx?:number,dy?:number): number {
        if(!target)
            return Math.max(Math.abs(dx-this.distX),Math.abs(dy-this.distY));
        var dx: number = Math.abs(target.distX - this.distX);
        var dy: number = Math.abs(target.distY - this.distY);
        if (dx > dy)
            return dx;
        else
            return dy;
    }

    /**
     * 方向向量
     */
    public static DIR_LS: Array<egret.Point> = [
        new egret.Point(0, -1),//上
        new egret.Point(1, -1),//右上
        new egret.Point(1, 0),//右
        new egret.Point(1, 1),//右下
        new egret.Point(0, 1),//下
        new egret.Point(-1, 1),//左下
        new egret.Point(-1, 0),//左
        new egret.Point(-1, -1)];//左上

    /**
     * 计算与目标的朝向
     */
    public getDirctionByTarget(target: DisplayMapObject): number {
        var i: number = 0;
        var dx: number = target.distX - this.nCurrentX;
        var dy: number = target.distY - this.nCurrentY;
        //egret.log("dir---" + target.currentX + "," + target.currentY);
        var po: egret.Point = new egret.Point(Math.abs(dx) / dx, Math.abs(dy) / dy);
        for (i; i < DisplayMapObject.DIR_LS.length; i++) {
            if (DisplayMapObject.DIR_LS[i].x == po.x && DisplayMapObject.DIR_LS[i].y == po.y) {
                return i;
            }
        }
        return 0;
    }

    
     /**
     * 根据像素点来计算角度
     */
    public countAngle2(target: any): number {
        return Math.atan2(target.y-50 - this.y, target.x - this.x) * 180 / Math.PI;
    }
    /**
     * 计算角度
     */
    public countAngle(target: DisplayMapObject, defaultDir?: number, isReal?: boolean): number {
        if (target.distX == this.nCurrentX && target.distY == this.nCurrentY && defaultDir != undefined) {
            return defaultDir;
        }
        var rod: number = Math.atan2(target.distY - this.nCurrentY, target.distX - this.nCurrentX) + Math.PI / 2;
        rod = rod * 180 / Math.PI;
        rod = (720 + rod) % (360);
        // rod = Math.floor(rod / 45);

        if (!isReal) {
            rod = Math.round(rod / 45) & 7;
        }

        //trace("rod---",rod).toChannel(chl.all);
        return rod;
    }
    /**
     * 寻路与目标的方向
     * 
     */
    public countTargetDirection(target: DisplayMapObject, moveDir?: number): number {
        var dx: number = Math.abs(this.currentX - target.distX);
        var dy: number = Math.abs(this.currentY - target.distY);
        //var dr:number = Math.abs(this.currentX - target.distX)-Math.abs(this.currentY - target.distY);
        if (dy > dx)//如果纵向距离大则先纵向移动
        {
            if (target.distY > this.currentY)//下
                return 4;
            else if (target.distY < this.currentY)//上
                return 0;
        } else if (dx > dy) {
            if (target.distX > this.currentX)//右
                return 2;
            else if (target.distX < this.currentX)//左
                return 6;
        } else {
            if (target.distX > this.currentX) {
                if (target.distY > this.currentY)//右下
                    return 3;
                else//右上
                    return 1;
            } else if (target.distX < this.currentX) {
                if (target.distY > this.currentY)//左下
                    return 5;
                else//左上
                    return 7;
            }

            if (dx == 0 && moveDir != undefined) {
                return moveDir;
            } else {
                return 5;//左下
            }
        }

        return 0;//上
    }

    /**
     * 计算到点的寻路方向
     */
    public countPointDirection(target: egret.Point, moveDir?: number): number {
        var dx: number = Math.abs(this.currentX - target.x);
        var dy: number = Math.abs(this.currentY - target.y);
        //var dr:number = Math.abs(this.currentX - target.distX)-Math.abs(this.currentY - target.distY);
        if (dy > dx)//如果纵向距离大则先纵向移动
        {
            if (target.y > this.currentY)//下
                return 4;
            else if (target.y < this.currentY)//上
                return 0;
        } else if (dx > dy) {
            if (target.x > this.currentX)//右
                return 2;
            else if (target.x < this.currentX)//左
                return 6;
        } else {
            if (target.x > this.currentX) {
                if (target.y > this.currentY)//右下
                    return 3;
                else//右上
                    return 1;
            } else if (target.x < this.currentX) {
                if (target.y > this.currentY)//左下
                    return 5;
                else//左上
                    return 7;
            }

            if (dx == 0 && moveDir != undefined) {
                return moveDir;
            } else {
                return 5;
            }
        }

        return 0;
    }

    /**
     *排列深度
     * @param OldX
     * @param NewX
     * @param OldY
     * @param NewY
     * 
     */
    protected sortOnContainer(oldx: number, newx: number, oldy: number, newy: number): void {
        var mapObj: DisplayMapObject;
        var nY: number;

        if (!this.parent)//无父级显示对象则返回
            return;

        var childNum: number = this.parent.numChildren;
        var oldIndex: number = this.parent.getChildIndex(this);
        var newIndex: number = oldIndex;

        if (newy < oldy)//新坐标小于旧坐标,前遍历
        {
            newIndex--;

            //遍历到指定的坐标对应的深度
            while (newIndex > -1) {
                mapObj = <DisplayMapObject>this.parent.getChildAt(newIndex);
                if (mapObj.nStaticLevel < this.nStaticLevel)
                    break;

                if (mapObj.nStaticLevel == this.nStaticLevel) {
                    if (mapObj.nCurrentY < newy)//坐标小的上面
                        break;
                    else if (mapObj.nCurrentY == newy)//相同坐标
                    {
                        if (mapObj.nDynamicLevel < this.nDynamicLevel)//相同坐标则去优先级高的在上面
                            break;
                        if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX > newx)//右边在下面
                            break;
                    }
                }

                newIndex--;
            }
            newIndex++;

        } else if (newy > oldy)//新坐标大于旧坐标,往后遍历
        {
            newIndex++;
            //遍历到指定的坐标对应的深度
            while (newIndex < childNum) {
                mapObj = <DisplayMapObject>this.parent.getChildAt(newIndex);
                if (mapObj.nStaticLevel > this.nStaticLevel)
                    break;

                if (mapObj.nStaticLevel == this.nStaticLevel) {
                    if (mapObj.nCurrentY > newy)//坐标小的上面
                        break;
                    else if (mapObj.nCurrentY == newy)//相同坐标
                    {
                        if (mapObj.nDynamicLevel > this.nDynamicLevel)//相同坐标则去优先级高的在上面
                            break;
                        if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX < newx)//左边在上面
                            break;
                    }
                }

                newIndex++;
            }
            newIndex--;

        } else//新坐标等于旧坐标
        {
            if (newx < oldx)//新x坐标在左边,往上遍历
            {
                newIndex++;
                //遍历到指定的坐标对应的深度
                while (newIndex < childNum) {
                    mapObj = <DisplayMapObject>this.parent.getChildAt(newIndex);
                    if (mapObj.nStaticLevel > this.nStaticLevel)
                        break;

                    if (mapObj.nStaticLevel == this.nStaticLevel) {
                        if (mapObj.nCurrentY > newy)//坐标小的上面
                            break;
                        else if (mapObj.nCurrentY == newy)//相同坐标
                        {
                            if (mapObj.nDynamicLevel > this.nDynamicLevel)//相同坐标则去优先级高的在上面
                                break;
                            if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX < newx)//左边在上面
                                break;
                        }
                    }

                    newIndex++;
                }
                newIndex--;

            } else if (newx > oldx)//新x坐标在右边,往下遍历
            {
                newIndex--;

                //遍历到指定的坐标对应的深度
                while (newIndex > -1) {
                    mapObj = <DisplayMapObject>this.parent.getChildAt(newIndex);
                    if (mapObj.nStaticLevel < this.nStaticLevel)
                        break;

                    if (mapObj.nStaticLevel == this.nStaticLevel) {
                        if (mapObj.nCurrentY < newy)//坐标小的上面
                            break;
                        else if (mapObj.nCurrentY == newy)//相同坐标
                        {
                            if (mapObj.nDynamicLevel < this.nDynamicLevel)//相同坐标则去优先级高的在上面
                                break;
                            if (mapObj.nDynamicLevel == this.nDynamicLevel && mapObj.nCurrentX > newx)//右边在下面
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
    }

    public static calcForwardPosition(currentX: number, currentY: number, direction: number, step: number): egret.Point {
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
    }

    public static jumpDestXY(currentX: number, currentY: number, direction: number, step: number): egret.Point {
        var endPoint: egret.Point = new egret.Point(currentX, currentY);
        var checkPoint: egret.Point;
        for (var i: number = 0; i < step; i++) {
            checkPoint = DisplayMapObject.calcForwardPosition(endPoint.x, endPoint.y, direction, 1);
            if (!MapVo.ins.moveable(checkPoint.x, checkPoint.y))
                break;
            endPoint.x = checkPoint.x;
            endPoint.y = checkPoint.y;
        }
        checkPoint = null;
        return endPoint;
    }
}