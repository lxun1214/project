class GameMap extends BaseMap{
	public static ins(...args:any[]):GameMap{
		return super.ins(args[0]) as GameMap;
	}
	private m_nShakeRangeX: number;//地图震荡水平方向范围限制
	private m_nShakeRangeY: number;//地图震荡垂直方向范围限制
    public m_dwShakingOverTick: number;//地图震荡的结束时间，0表示没有在震荡中
	public constructor(val:eui.UILayer) {
		super(val);
	}
	public update(CurrentTick: number): void
	{
		//处理地图震荡效果，在EnterFrame事件中也会处理
		if ( this.m_dwShakingOverTick )
		{
            this.runShakeEffect(CurrentTick);
		}
    }
	/**
	* 开始地图震动效果 
	* @param xRange 水平方向震动的范围限制
	* @param yRange 垂直方向震动的范围限制
	* @param shakeTime 震动持续时间，单位是毫秒
	* 
	*/
	public shake(xRange: number, yRange: number, shakeTime: number): void
	{
        this.m_nShakeRangeX = xRange;
        this.m_nShakeRangeY = yRange;
        this.m_dwShakingOverTick = egret.getTimer() + shakeTime;
	}
	/**
	* 强制结束屏幕震荡效果 
	* 
	*/
	public stopShake(): void
	{
        if(this.m_dwShakingOverTick)
		{
            this.m_dwShakingOverTick = 0;
		}
	}
	/**
	* 处理地图震荡效果 
	* 
	*/
	private runShakeEffect(CurrentTick: number): void
	{
        if(CurrentTick < this.m_dwShakingOverTick )
		{
            var nOldX: number = this.m_nLayersOffsetX;
            var nOldY: number = this.m_nLayersOffsetY;
			//根据地图震荡参数，随机产生震荡偏移 
            this.m_nLayersOffsetX = -this.m_nShakeRangeX / 2 + egret.getTimer() % this.m_nShakeRangeX;
            this.m_nLayersOffsetY = -this.m_nShakeRangeY / 2 + egret.getTimer() % this.m_nShakeRangeY;
			//如果随机的偏移与上次的偏移相同，则再次随机以避免两次偏移相同而导致看起来没有震荡
            if(nOldX == this.m_nLayersOffsetX && this.m_nShakeRangeX != 0)
                this.m_nLayersOffsetX += -6 + Math.random() * 1000 % 11;
            if(nOldY == this.m_nLayersOffsetY && this.m_nShakeRangeY != 0)
                this.m_nLayersOffsetY += -6 + Math.random() * 1000 % 11;
		}
		else
		{
            this.m_nLayersOffsetX = this.m_nLayersOffsetY = 0;
            this.m_dwShakingOverTick = 0;
		}
	}
}