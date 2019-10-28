/**
 * Scene基类
 */
class BaseScene {
	//当前所有类
	private _layers:Array<egret.DisplayObjectContainer>;
	public constructor() {
		this._layers = new Array<egret.DisplayObjectContainer>();
	}
	/**
	 * 进入Scene调用
	 */
	public onEnter():void{

	}
	/**
	 * 退出Scene调用
	 */
	public onExit(): void{
		
	}
	/**
	 * 添加一个Layer到舞台
	 * @param layer
	 */
	public addLayer(layer: egret.DisplayObjectContainer): void{
		if(layer instanceof BaseSpriteLayer){
			StageUtils.ins().getStage().addChild(layer);
			this._layers.push(layer);
		}
	}
}