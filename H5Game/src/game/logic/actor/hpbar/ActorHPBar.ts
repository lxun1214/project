/**
 *
 * @author 
 *  血条
 */
class ActorHPBar extends egret.DisplayObjectContainer
{
    private static INIT_WIDTH: number = 138;
    private static INIT_HEIGHT: number = 20;
    
    public _truck: eui.Image;
    private _frame: eui.Image;
    
    private _value: number = 1;
    private _max: number = 1;
    
	public constructor()
	{
        super();
        
        this._truck = new  eui.Image("hp1");

        this._frame = new  eui.Image("hp0");
        this.addChild(this._frame);
        this.addChild(this._truck);
        
        this.setSize(ActorHPBar.INIT_WIDTH,ActorHPBar.INIT_HEIGHT);
	}
	
	/**
	 * 设置尺寸
	 */ 
	public setSize(wide:number,hide:number):void
	{
        this._truck.scaleX = wide / ActorHPBar.INIT_WIDTH;
        this._truck.scaleY = hide / ActorHPBar.INIT_HEIGHT;
        this._frame.x = this._truck.x = -wide / 2;
        
        this.setPosition(this._value,this._max);
	}
	
	/**
	 * 设置进度
	 */
	public setPosition(value:number,max:number):void
	{
        this._value = value;
        this._max = max;
        if(this._value > this._max)
        {
            this._value = this._max;
        }
        this._truck.scaleX = this._value / this._max;
	}
}
