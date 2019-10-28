class DataEventDispatcher {
    public static dispatcher: egret.EventDispatcher = new egret.EventDispatcher();
	
    public static dispatchEventWith(type:string,data?:any):void
    {
        DataEventDispatcher.dispatcher.dispatchEventWith(type,false,data);
    }
}