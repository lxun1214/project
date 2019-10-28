/**
 *
 * @author 
 *  buff对象，支持并联和串联
 */
class BuffVo
{
    public static pooling: Array<BuffVo> = new Array<BuffVo>();
    
    public type: number;
    
    public value: number = 0;//属性值
    
    /*效果相关*/
    public endTime: number = 0;//结束时间
    public interval:Array<number>;//作用间隔
    public triggerCount:number = 0;//触发次数
    private static seed:number = 0;
    public hurtType:number = -1;//0+ 1*
    public handle:number;

    public effs:Array<clips.BmpClip>;
	public constructor()
	{
        this.interval = [];
	}
    public reset(type: number,value: number): void
	{
        this.type = type;
        this.value = value;
	}
	
    public static create(type: number,value: number):BuffVo
    {
        var buff: BuffVo;
        if(BuffVo.pooling.length)
        {
            buff = BuffVo.pooling.shift();
        }else
        {
            buff = new BuffVo();
        }
        BuffVo.seed++;
        buff.handle = BuffVo.seed;
        
        buff.reset(type,value);

        return buff;
	}
    public destruct():void
    {
        this.interval.length = 0;
        this.endTime = 0;
        this.triggerCount = 0;
        this.hurtType = -1;
        if(this.effs)
        {
            var e:clips.BmpClip;
            while(this.effs.length)
            {
                (this.effs.shift()).destruct();
            }
        }
        this.effs = null;
        BuffVo.pooling.push(this);
    }
}

class BuffType
{
    static SUSTAIN_HP:number = 1;//持续伤害BUFF
}
