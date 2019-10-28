/**
 *
 * @author 
 *
 */
class AutoTimer extends egret.Timer
{
    private funcs: Array<Function>;
    private params: Array<any>;
    
	public constructor(delay:number,repeat?:number)
	{
        var times: number = 0;
        if(repeat)
        {
            times = repeat;
        }
        super(delay,repeat);
        
        this.funcs = new Array<Function>();
        this.params = new Array<any>();
        
	}
	
	public hasFunc(func:Function):Boolean
	{
        return this.funcs.indexOf(func) != -1;
	}
	
	private checkFuncs():Boolean
	{
        return this.funcs.length > 0 && !this.hasEventListener(egret.TimerEvent.TIMER)
	}
	
	public addFunc(func:Function,thisObj:any,arg:any[],once:Boolean = false):void
	{
        var index: number = this.funcs.indexOf(func);
        if(index == -1)
        {
            this.funcs.push(func);
            this.params.push({ thisObj: thisObj,params: arg,once: once});
        }else
        {
            this.params[index] = { thisObj: thisObj,params: arg ,once:once};
        }
        if(this.checkFuncs())
        {
            this.addEventListener(egret.TimerEvent.TIMER,this.onTime,this);
            this.start();
        }
	}
	private onTime(evt:egret.TimerEvent):void
	{
        var i: number,func: Function,param:Object;
        var len: number = this.funcs.length - 1;
        var result:Boolean;
        for(i = len;i >= 0;i--)
        {
            func = this.funcs[i];
            param = this.params[i];

            result = func.apply(param["thisObj"],param["params"]);
            if(param["once"] || result == true)
            {
                this.funcs.splice(i,1);
                this.params.splice(i,1);
            }
            //egret.log("ontime---" + param["once"]);
        }
        //egret.log("ontime---"+this.funcs.length);
        if(this.funcs.length <= 0)
        {
            this.stop();
            this.removeEventListener(egret.TimerEvent.TIMER,this.onTime,this);
        }
	}
	public removeFunc(func:Function):void
	{
        var index:number = this.funcs.indexOf(func);
        if(index != -1)
        {
            this.funcs.splice(index,1);
            this.params.splice(index,1);
        }
        if(this.funcs.length <= 0) {
            this.stop();
            this.removeEventListener(egret.TimerEvent.TIMER,this.onTime,this);
        }
        //egret.log("removeFunc---" + this.funcs.length);
	}

    /*
     * @销毁
     */ 
   public destruct(): void
   {
       //egret.log("removeFunc---" + this.funcs.length);
       this.stop();
       this.removeEventListener(egret.TimerEvent.TIMER,this.onTime,this);
       this.funcs = null;
       this.params = null;
   }
}
