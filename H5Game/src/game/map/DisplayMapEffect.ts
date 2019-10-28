/**
 *
 * @author 
 *  地图特效
 */
class DisplayMapEffect extends DisplayMapObject {
    private static poollings: Array<DisplayMapEffect> = new Array<DisplayMapEffect>();

    private _clip: clips.BmpClip;//特效
    private _offsetX: number;
    private _offsetY: number;
    public skill: SkillVo;
    public user: BaseActor;//发起者
    public target: any;//对象

    public targetHandle:number;
    public constructor(hitFunc?: Function, thisObj?: any, ...arg: any[]) {
        super();
        this._offsetX = this._offsetY = 0;
    }

    public init(): void {
        this.skill = undefined;
        this.user = undefined;
        this.target = undefined;
        this._isMissile = false;
        this._startTime = -1;
        this.targetHandle = 0;
        this.visible = true;
        // super.endMove();
    }

	/**
	 * 创建场景特效
	 */
    public static create(): DisplayMapEffect {
        if (DisplayMapEffect.poollings.length > 0) {
            DisplayMapEffect.poollings[0].init();
            return DisplayMapEffect.poollings.shift();
        }
        return new DisplayMapEffect();
    }

	/**
	 * 移动
	 */
    private _isMissile: Boolean = false;
    private _startTime: number = -1;
    public moveTo(nx: number, ny: number, speed: number): Boolean {
        this._startTime = egret.getTimer() + 5000;
        this.rotation = 0;
        if (speed > 0) {
            this._isMissile = true;
            if (super.moveTo(nx, ny, speed)) {
                this.rotation = Math.atan2(this.nSteppingY, this.nSteppingX) * 180 / Math.PI + 90;
                return true;
            } else {
                this.nStartMoveTick = this.getTimer();
                this.nEndMoveTick = this.nStartMoveTick + speed;
                this.nTargetX = nx;
                this.nTargetY = ny;
            }
        } else {
            this._isMissile = false;
        }
        return false;
    }

    /**
     * 判断是否完成播放
     */
    public get finish(): Boolean {
        var t: number = egret.getTimer();
        if (!this._isMissile) {
            if (this._clip && this._clip.isComplete) {
                if ((this._clip.currentFrame == this._clip.totalFrames - 1 && this._clip.lastPlayTimes <= 0) || (this._clip.endPlayloop != 0 && this._clip.endPlayloop < t)) {
                    return true;
                }
            }
        } else if (!this.onMoveing || !this.isMoving) {
            return true;
        }

        if (this._startTime < t) {
            return true;
        }

        return false;
    }

	/**
	 * 设置特效id
	 */
    public playEffect(value: number, times: number = -1, keepTime: number = -1, offsetX: number = 0, offsetY: number = 0): void {
        if (value < 0) {
            return;
        }
        if (!this._clip) {
            this._clip = ModelResMgr.getSkillEffect(value);
        } else {
            ModelResMgr.getSkillEffect(value, this._clip);
        }
        this._offsetX = offsetX;
        this._offsetY = offsetY;
        if (!this._clip.isComplete && keepTime != -1) {
            this._clip.endPlayloop = keepTime;
            this._clip.play(times)
        } else {
            this._clip.endPlayloop = 0;
            this._clip.play(times);
        }
        this.addChild(this._clip);
    }

	/**
	 * 设置结束移动的触发函数
	 */
    public setEndHandle(SkillVo: SkillVo, user: BaseActor, target: BaseActor): void {
        this.skill = SkillVo;
        this.user = user;
        this.target = target;
        this.targetHandle = target.handleId;
    }

	/*
     * 销毁
     */
    public destruct(gc: Boolean = false): void {
        // if(gc)
        // {
        this._clip.destruct();
        //this._clip = null;
        // }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        DisplayMapEffect.poollings.push(this);
    }
}
