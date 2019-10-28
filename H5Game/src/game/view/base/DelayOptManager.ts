class DelayOptManager extends BaseClass{
	private TIME_THRESHOLD: number = 2;
	private _delayOpts: any[];
	public constructor() {
		super();
		this._delayOpts = [];
		egret.startTick(this.runCachedFun,this);
	}
	public static ins(): DelayOptManager{
		return super.ins() as DelayOptManager;
	}
	public addDelayOptFunction(thisObj: any, fun:Function, funPara?:any, callBack?:Function,para?:any):void{
		this._delayOpts.push({"fun":fun,"funPara":funPara,"thisObj":thisObj,"callBack":callBack,"para":para});
	}
	public clear(): void{
		this._delayOpts.length;
	}
	private runCachedFun(time: number): boolean{
		if(this._delayOpts.length == 0)return false;
		let timeFlag = egret.getTimer();
		let funObj: any;
		while(this._delayOpts.length){
			funObj = this._delayOpts.shift();
			if(funObj.funPara)
				funObj.fun.call(funObj.thisObj, funObj.funPara);
			else 
				funObj.fun.call(funObj.thisObj);
			if(funObj.callBack){
				if(funObj.para != undefined){
					funObj.callBack.call(funObj.thisObj, funObj.para);
				}else
					funObj.callBack();
			}
			if(egret.getTimer() - timeFlag > this.TIME_THRESHOLD)
				break;
		}
		return false;
	}
}